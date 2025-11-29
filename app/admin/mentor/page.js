"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableRow({ record, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: record.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr ref={setNodeRef} style={style} className="hover:bg-gray-100">
      <td className="p-4">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-200 rounded"
          aria-label="Drag handle"
        >
          ☰
        </button>
      </td>
      {children}
    </tr>
  );
}

export default function MentorManager() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [hasOrderChanged, setHasOrderChanged] = useState(false);
  const [form, setForm] = useState({
    id: null,
    name: "",
    degree: "",
    institution: "",
    research_domains: "",
    projects: "",
    supported_programs: "",
    image_url: ""
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/mentor");
      const data = await res.json();
      if (data.success) {
        setMentors(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("获取导师数据失败");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file, filename) => {
    const res = await fetch(`/api/admin/image-upload?filename=${filename}`, {
      method: "POST",
      body: file,
    });
    const data = await res.json();
    return data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const action = form.id ? "更新" : "添加";
    if (!confirm(`确定要${action}该导师信息吗？`)) return;

    setLoading(true);

    try {
      const imageUrl = imageFile
        ? await handleImageUpload(imageFile, imageFile.name)
        : form.image_url;

      const method = form.id ? "PUT" : "POST";
      const res = await fetch("/api/admin/mentor", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          image_url: imageUrl,
        }),
      });

      const data = await res.json();
      if (data.success) {
        fetchMentors();
        resetForm();
        setError("");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("保存导师信息失败");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("确定要删除这位导师吗？")) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/mentor", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (data.success) {
        fetchMentors();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("删除导师失败");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (mentorRecord) => {
    setForm({ ...mentorRecord });
  };

  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      degree: "",
      institution: "",
      research_domains: "",
      projects: "",
      supported_programs: "",
      image_url: ""
    });
    setImageFile(null);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setMentors((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        setHasOrderChanged(true);
        return newItems;
      });
    }
  };

  const handleUpdateOrder = async () => {
    if (!confirm("确定要更新排序吗？")) return;

    setLoading(true);
    try {
      const items = mentors.map((item, index) => ({
        id: item.id,
        order_index: index,
      }));

      const res = await fetch("/api/admin/mentor", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();
      if (data.success) {
        setHasOrderChanged(false);
        fetchMentors();
        setError("");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("更新排序失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold text-primary mb-6">导师管理</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              姓名 *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              学位
            </label>
            <input
              type="text"
              value={form.degree}
              onChange={(e) => setForm({ ...form, degree: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="例如：计算机科学博士"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              任职机构
            </label>
            <input
              type="text"
              value={form.institution}
              onChange={(e) => setForm({ ...form, institution: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="例如：Stanford University"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              导师照片
            </label>
            <input
              type="file"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded"
              accept="image/*"
            />
            {form.image_url && (
              <img src={form.image_url} alt="Current image" className="mt-2 w-16 h-16 object-cover rounded" />
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              研究领域
            </label>
            <textarea
              value={form.research_domains}
              onChange={(e) => setForm({ ...form, research_domains: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              rows="2"
              placeholder="例如：Machine Learning, Artificial Intelligence, Data Science"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              可参与项目
            </label>
            <textarea
              value={form.projects}
              onChange={(e) => setForm({ ...form, projects: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              rows="3"
              placeholder="填写代表性项目与成果"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              支持的项目
            </label>
            <textarea
              value={form.supported_programs}
              onChange={(e) => setForm({ ...form, supported_programs: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              rows="2"
              placeholder="例如：本科科研、研究生申请、博士申请"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? "保存中..." : form.id ? "更新导师" : "添加导师"}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            重置表单
          </button>
        </div>
      </form>

      {loading ? (
        <p>正在加载导师...</p>
      ) : (
        <>
          {hasOrderChanged && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex justify-between items-center">
              <span className="text-yellow-800">排序已更改，请保存新的排序</span>
              <button
                onClick={handleUpdateOrder}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? "保存中..." : "更新排序"}
              </button>
            </div>
          )}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <table className="table-auto w-full text-left">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="p-4">拖动</th>
                    <th className="p-4">姓名</th>
                    <th className="p-4">照片</th>
                    <th className="p-4">学位</th>
                    <th className="p-4">任职机构</th>
                    <th className="p-4">研究领域</th>
                    <th className="p-4">操作</th>
                  </tr>
                </thead>
                <SortableContext
                  items={mentors.map((m) => m.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <tbody>
                    {mentors.map((record) => (
                      <SortableRow key={record.id} record={record}>
                        <td className="p-4 font-medium">{record.name}</td>
                        <td className="p-4">
                          {record.image_url ? (
                            <img
                              src={record.image_url}
                              alt="Mentor"
                              className="w-16 h-16 object-cover rounded"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                              暂无照片
                            </div>
                          )}
                        </td>
                        <td className="p-4">{record.degree || "-"}</td>
                        <td className="p-4">{record.institution || "-"}</td>
                        <td className="p-4">
                          <div className="max-w-xs truncate" title={record.research_domains}>
                            {record.research_domains || "-"}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              className="text-blue-500 hover:underline"
                              onClick={() => handleEdit(record)}
                            >
                              编辑
                            </button>
                            <button
                              className="text-red-500 hover:underline"
                              onClick={() => handleDelete(record.id)}
                            >
                              删除
                            </button>
                          </div>
                        </td>
                      </SortableRow>
                    ))}
                  </tbody>
                </SortableContext>
              </table>
            </DndContext>
          </div>
        </>
      )}
    </div>
  );
}
