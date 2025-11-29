"use client";

import { useState, useEffect, useCallback } from "react";
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

const schoolTypes = ["university", "highschool", "other"];
const schoolTypeLabels = {
  university: "大学",
  highschool: "高中",
  other: "其他",
};

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

export default function OfferManager() {
  const [schoolType, setSchoolType] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [hasOrderChanged, setHasOrderChanged] = useState(false);
  const [form, setForm] = useState({
    id: null,
    logo: "",
    name: "",
    country: "",
    rank: "",
    name_cn: "",
    count: 0,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/offer?type=${schoolType}`);
      const data = await res.json();
      if (data.success) setRecords(data.data);
      else console.error(data.message);
    } catch {
      console.error("获取录取数据失败");
    } finally {
      setLoading(false);
    }
  }, [schoolType]);

  useEffect(() => {
    if (schoolType) fetchRecords();
  }, [schoolType, fetchRecords]);


  const handleImageUpload = async () => {
    const res = await fetch(`/api/admin/image-upload?filename=${imageFile.name}`, {
      method: "POST",
      body: imageFile,
    });

    const data = await res.json();
    return data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const action = form.id ? "更新" : "新增";
    if (!confirm(`确定要${action}该 Offer 记录吗？`)) return;

    setLoading(true);

    try {
      const logoUrl = imageFile ? await handleImageUpload() : form.logo;
      const method = form.id ? "PUT" : "POST";
      const res = await fetch(`/api/admin/offer`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: schoolType, ...form, logo: logoUrl }),
      });

      const data = await res.json();
      if (data.success) {
        fetchRecords();
        setForm({
          id: null,
          logo: "",
          name: "",
          country: "",
          rank: "",
          name_cn: "",
          count: 0,
        });
        setImageFile(null);
        setError("");
      } else setError(data.message);
    } catch {
      setError("保存数据失败");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("确定要删除该 Offer 记录吗？")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/offer`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: schoolType, id }),
      });
      const data = await res.json();
      if (data.success) fetchRecords();
      else setError(data.message);
    } catch {
      setError("删除数据失败");
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setRecords((items) => {
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
      const items = records.map((item, index) => ({
        id: item.id,
        order_index: index,
      }));

      const res = await fetch("/api/admin/offer", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();
      if (data.success) {
        setHasOrderChanged(false);
        fetchRecords();
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
      <h1 className="text-4xl font-bold text-primary mb-6">Offer 管理</h1>

      <select
        value={schoolType}
        onChange={(e) => setSchoolType(e.target.value)}
        className="mb-6 p-2 border rounded"
      >
        <option value="">请选择学校类型</option>
        {schoolTypes.map((type) => (
          <option key={type} value={type}>
            {schoolTypeLabels[type]}
          </option>
        ))}
      </select>

      {schoolType && (
        <>
          {loading ? (
            <p>加载中...</p>
          ) : error ? (
            <p className="text-red-500 mb-4">{error}</p>
          ) : null}
          {
            <>
              <form onSubmit={handleSubmit} className="mb-6">
                <div className="mb-4">
                  <label className="block">
                    <span className="">Logo 图片:</span>
                    <input
                      type="file"
                      onChange={(e) => setImageFile(e.target.files[0])}
                      className="w-full p-2 border rounded mt-1"
                      accept="image/*"
                    />
                  </label>
                  {form.logo && (
                    <div className="mt-2">
                      <img src={form.logo} alt="Current logo" className="w-16 h-16 object-cover rounded" />
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block">
                    <span className="">学校名称:</span>
                    <input
                      type="text"
                      placeholder="Princenton University"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full p-2 border rounded mt-1"
                      required
                    />
                  </label>
                </div>
                {schoolType === "university" && (
                  <>
                    <div className="mb-4">
                      <label className="block">
                        <span className="">国家:</span>
                        <input
                          type="text"
                          placeholder="美国"
                          value={form.country}
                          onChange={(e) => setForm({ ...form, country: e.target.value })}
                          className="w-full p-2 border rounded mt-1"
                          required
                        />
                      </label>
                    </div>
                    <div className="mb-4">
                      <label className="block">
                        <span className="">排名:</span>
                        <input
                          type="text"
                          placeholder="US#1"
                          value={form.rank}
                          onChange={(e) => setForm({ ...form, rank: e.target.value })}
                          className="w-full p-2 border rounded mt-1"
                          required
                        />
                      </label>
                    </div>
                  </>
                )}
                <div className="mb-4">
                  <label className="block">
                    <span className="">中文名称:</span>
                    <input
                      type="text"
                      placeholder="普林斯顿大学"
                      value={form.name_cn}
                      onChange={(e) => setForm({ ...form, name_cn: e.target.value })}
                      className="w-full p-2 border rounded mt-1"
                    />
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block">
                    <span className="">录取数量:</span>
                    <input
                      type="number"
                      placeholder="1"
                      value={form.count}
                      onChange={(e) => setForm({ ...form, count: Number(e.target.value) })}
                      className="w-full p-2 border rounded mt-1"
                      required
                      min="0"
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded"
                  disabled={loading}
                >
                  {form.id ? "更新记录" : "新增记录"}
                </button>
              </form>

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
                        <th className="p-4">Logo</th>
                        <th className="p-4">学校名称</th>
                        <th className="p-4">中文名称</th>
                        {schoolType === "university" && (
                          <>
                            <th className="p-4">国家</th>
                            <th className="p-4">排名</th>
                          </>
                        )}
                        <th className="p-4">数量</th>
                        <th className="p-4">操作</th>
                      </tr>
                    </thead>
                    <SortableContext
                      items={records.map((r) => r.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <tbody>
                        {records.map((record) => (
                          <SortableRow key={record.id} record={record}>
                            <td className="p-4">
                              <img
                                src={record.logo}
                                alt="Logo"
                                className="w-16 h-16 object-cover rounded"
                              />
                            </td>
                            <td className="p-4">{record.name}</td>
                            <td className="p-4">{record.name_cn}</td>
                            {schoolType === "university" && (
                              <>
                                <td className="p-4">{record.country}</td>
                                <td className="p-4">{record.rank}</td>
                              </>
                            )}
                            <td className="p-4">{record.count}</td>
                            <td className="p-4 flex gap-2">
                              <button
                                className="text-blue-500 hover:underline"
                                onClick={() => setForm(record)}
                              >
                                编辑
                              </button>
                              <button
                                className="text-red-500 hover:underline"
                                onClick={() => handleDelete(record.id)}
                              >
                                删除
                              </button>
                            </td>
                          </SortableRow>
                        ))}
                      </tbody>
                    </SortableContext>
                  </table>
                </DndContext>
              </div>
            </>
          }
        </>
      )}
    </div>
  );
}
