"use client";

import { useState, useEffect, useCallback } from "react";

const storyTypes = ["University", "HighSchool"];
const storyTypeLabels = {
  University: "大学",
  HighSchool: "高中",
};

export default function SuccessStoryManager() {
  const [storyType, setStoryType] = useState("");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [form, setForm] = useState({
    id: null,
    type: "",
    name: "",
    image: "",
    school: "",
    labels: [],
    offers: [],
    evaluation: ""
  });

  const fetchStories = useCallback(async () => {
    setLoading(true);
    try {
      const url = storyType ? `/api/admin/success-story?type=${storyType}` : "/api/admin/success-story";
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setStories(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("获取成功案例失败");
    } finally {
      setLoading(false);
    }
  }, [storyType]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

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
    setLoading(true);

    try {
      const imageUrl = imageFile
        ? await handleImageUpload(imageFile, imageFile.name)
        : form.image;

      const method = form.id ? "PUT" : "POST";
      const res = await fetch("/api/admin/success-story", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          image: imageUrl,
        }),
      });

      const data = await res.json();
      if (data.success) {
        fetchStories();
        resetForm();
        setError("");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("保存成功案例失败");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("确定要删除该成功案例吗？")) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/success-story", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (data.success) {
        fetchStories();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("删除成功案例失败");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (storyRecord) => {
    setForm({
      ...storyRecord,
      labels: storyRecord.labels || [],
      offers: storyRecord.offers || [],
    });
  };

  const resetForm = () => {
    setForm({
      id: null,
      type: "",
      name: "",
      image: "",
      school: "",
      labels: [],
      offers: [],
      evaluation: ""
    });
    setImageFile(null);
  };

  const handleLabelsChange = (e) => {
    const value = e.target.value;
    const labelsArray = value.split(",").map(label => label.trim()).filter(label => label);
    setForm({ ...form, labels: labelsArray });
  };

  const handleOffersChange = (e) => {
    const value = e.target.value;
    const offersArray = value.split(",").map(offer => offer.trim()).filter(offer => offer);
    setForm({ ...form, offers: offersArray });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold text-primary mb-6">成功案例管理</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          按类型筛选（可选）
        </label>
        <select
          value={storyType}
          onChange={(e) => setStoryType(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">全部类型</option>
          {storyTypes.map((type) => (
            <option key={type} value={type}>
              {storyTypeLabels[type]}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              类型 *
            </label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">请选择类型</option>
              {storyTypes.map((type) => (
                <option key={type} value={type}>
                  {storyTypeLabels[type]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              学生姓名 *
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
              就读学校 *
            </label>
            <input
              type="text"
              value={form.school}
              onChange={(e) => setForm({ ...form, school: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              学生照片
            </label>
            <input
              type="file"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded"
              accept="image/*"
            />
            {form.image && (
              <img src={form.image} alt="Current image" className="mt-2 w-16 h-16 object-cover rounded" />
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              标签（逗号分隔）
            </label>
            <input
              type="text"
              value={form.labels.join(", ")}
              onChange={handleLabelsChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Academic Excellence, Leadership, Sports"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Offer（逗号分隔）
            </label>
            <input
              type="text"
              value={form.offers.join(", ")}
              onChange={handleOffersChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Harvard University, Stanford University, MIT"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              评价
            </label>
            <textarea
              value={form.evaluation}
              onChange={(e) => setForm({ ...form, evaluation: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
              placeholder="学生反馈或导师评价"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? "保存中..." : form.id ? "更新案例" : "添加案例"}
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
        <p>正在加载成功案例...</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="table-auto w-full text-left">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">类型</th>
                <th className="p-4">姓名</th>
                <th className="p-4">照片</th>
                <th className="p-4">学校</th>
                <th className="p-4">标签</th>
                <th className="p-4">Offer</th>
                <th className="p-4">操作</th>
              </tr>
            </thead>
            <tbody>
              {stories.map((record) => (
                <tr key={record.id} className="hover:bg-gray-100">
                  <td className="p-4">{record.id}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      record.type === 'University'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {storyTypeLabels[record.type] || record.type}
                    </span>
                  </td>
                  <td className="p-4 font-medium">{record.name}</td>
                  <td className="p-4">
                    {record.image ? (
                      <img
                        src={record.image}
                        alt="Student"
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                        暂无照片
                      </div>
                    )}
                  </td>
                  <td className="p-4">{record.school}</td>
                  <td className="p-4">
                    {record.labels && record.labels.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {record.labels.map((label, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="p-4">
                    {record.offers && record.offers.length > 0 ? (
                      <div className="max-w-xs">
                        {record.offers.slice(0, 2).map((offer, index) => (
                          <div key={index} className="text-sm">{offer}</div>
                        ))}
                        {record.offers.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{record.offers.length - 2} 条更多
                          </div>
                        )}
                      </div>
                    ) : (
                      "-"
                    )}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
