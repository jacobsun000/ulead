"use client";

import { useState, useEffect } from "react";

export default function AlumniManager() {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [universityLogoFile, setUniversityLogoFile] = useState(null);
  const [form, setForm] = useState({
    id: null,
    name: "",
    image: "",
    highschool: "",
    university: "",
    university_logo: "",
    title: "",
    highschool_cn: "",
    university_cn: "",
    labels: [],
    evaluation: "",
    plan: ""
  });

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/alumni");
      const data = await res.json();
      if (data.success) {
        setAlumni(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("获取校友数据失败");
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
    if (!confirm(`确定要${action}该校友记录吗？`)) return;

    setLoading(true);

    try {
      const imageUrl = imageFile
        ? await handleImageUpload(imageFile, imageFile.name)
        : form.image;

      const universityLogoUrl = universityLogoFile
        ? await handleImageUpload(universityLogoFile, universityLogoFile.name)
        : form.university_logo;

      const method = form.id ? "PUT" : "POST";
      const res = await fetch("/api/admin/alumni", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          image: imageUrl,
          university_logo: universityLogoUrl,
        }),
      });

      const data = await res.json();
      if (data.success) {
        fetchAlumni();
        resetForm();
        setError("");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("保存校友信息失败");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("确定要删除这条校友记录吗？")) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/alumni", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (data.success) {
        fetchAlumni();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("删除校友记录失败");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (alumniRecord) => {
    setForm({
      ...alumniRecord,
      labels: alumniRecord.labels || [],
    });
  };

  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      image: "",
      highschool: "",
      university: "",
      university_logo: "",
      title: "",
      highschool_cn: "",
      university_cn: "",
      labels: [],
      evaluation: "",
      plan: ""
    });
    setImageFile(null);
    setUniversityLogoFile(null);
  };

  const handleLabelsChange = (e) => {
    const value = e.target.value;
    const labelsArray = value.split(",").map(label => label.trim()).filter(label => label);
    setForm({ ...form, labels: labelsArray });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold text-primary mb-6">校友案例管理</h1>

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
              头衔
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              高中 *
            </label>
            <input
              type="text"
              value={form.highschool}
              onChange={(e) => setForm({ ...form, highschool: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              高中（中文）
            </label>
            <input
              type="text"
              value={form.highschool_cn}
              onChange={(e) => setForm({ ...form, highschool_cn: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              大学 *
            </label>
            <input
              type="text"
              value={form.university}
              onChange={(e) => setForm({ ...form, university: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              大学（中文）
            </label>
            <input
              type="text"
              value={form.university_cn}
              onChange={(e) => setForm({ ...form, university_cn: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              学生照片 *
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              大学 Logo *
            </label>
            <input
              type="file"
              onChange={(e) => setUniversityLogoFile(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded"
              accept="image/*"
            />
            {form.university_logo && (
              <img src={form.university_logo} alt="Current university logo" className="mt-2 w-16 h-16 object-cover rounded" />
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
              placeholder="标签1, 标签2, 标签3"
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
              rows="3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              规划
            </label>
            <textarea
              value={form.plan}
              onChange={(e) => setForm({ ...form, plan: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              rows="3"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? "保存中..." : form.id ? "更新校友" : "添加校友"}
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
        <p>正在加载校友...</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="table-auto w-full text-left">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">姓名</th>
                <th className="p-4">照片</th>
                <th className="p-4">高中</th>
                <th className="p-4">大学</th>
                <th className="p-4">大学 Logo</th>
                <th className="p-4">标签</th>
                <th className="p-4">操作</th>
              </tr>
            </thead>
            <tbody>
              {alumni.map((record) => (
                <tr key={record.id} className="hover:bg-gray-100">
                  <td className="p-4">{record.id}</td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium">{record.name}</div>
                      {record.title && <div className="text-sm text-gray-500">{record.title}</div>}
                    </div>
                  </td>
                  <td className="p-4">
                    <img
                      src={record.image}
                      alt="Student"
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-4">
                    <div>{record.highschool}</div>
                    {record.highschool_cn && <div className="text-sm text-gray-500">{record.highschool_cn}</div>}
                  </td>
                  <td className="p-4">
                    <div>{record.university}</div>
                    {record.university_cn && <div className="text-sm text-gray-500">{record.university_cn}</div>}
                  </td>
                  <td className="p-4">
                    <img
                      src={record.university_logo}
                      alt="University Logo"
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
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
