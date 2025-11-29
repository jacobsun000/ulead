"use client";

import { useState, useEffect } from "react";

export default function TeamMemberManager() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [form, setForm] = useState({
    id: null,
    name: "",
    image_url: "",
    description: [],
    order_index: 0,
    name_zh: "",
    title_zh: "",
    description_zh: []
  });

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/team-member");
      const data = await res.json();
      if (data.success) {
        setTeamMembers(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("获取团队成员失败");
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
    if (!confirm(`确定要${action}该团队成员吗？`)) return;

    setLoading(true);

    try {
      const imageUrl = imageFile
        ? await handleImageUpload(imageFile, imageFile.name)
        : form.image_url;

      const method = form.id ? "PUT" : "POST";
      const res = await fetch("/api/admin/team-member", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          image_url: imageUrl,
        }),
      });

      const data = await res.json();
      if (data.success) {
        fetchTeamMembers();
        resetForm();
        setError("");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("保存团队成员失败");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("确定要删除该团队成员吗？")) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/team-member", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (data.success) {
        fetchTeamMembers();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("删除团队成员失败");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (memberRecord) => {
    setForm({
      ...memberRecord,
      description: memberRecord.description || [],
      description_zh: memberRecord.description_zh || [],
    });
  };

  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      image_url: "",
      description: [],
      order_index: 0,
      name_zh: "",
      title_zh: "",
      description_zh: []
    });
    setImageFile(null);
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    const descArray = value.split("\n").filter(line => line.trim());
    setForm({ ...form, description: descArray });
  };

  const handleDescriptionZhChange = (e) => {
    const value = e.target.value;
    const descArray = value.split("\n").filter(line => line.trim());
    setForm({ ...form, description_zh: descArray });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold text-primary mb-6">团队成员管理</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              姓名（英文）*
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
              姓名（中文）
            </label>
            <input
              type="text"
              value={form.name_zh}
              onChange={(e) => setForm({ ...form, name_zh: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Chinese name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              排序序号
            </label>
            <input
              type="number"
              value={form.order_index}
              onChange={(e) => setForm({ ...form, order_index: parseInt(e.target.value) || 0 })}
              className="w-full p-2 border border-gray-300 rounded"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              中文头衔
            </label>
            <input
              type="text"
              value={form.title_zh}
              onChange={(e) => setForm({ ...form, title_zh: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Chinese title"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              头像
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
              简介（英文，每行一条）*
            </label>
            <textarea
              value={form.description.join("\n")}
              onChange={handleDescriptionChange}
              className="w-full p-2 border border-gray-300 rounded"
              rows="5"
              placeholder="每行输入一条简介&#10;Ph.D. in Computer Science&#10;10+ years experience&#10;Research focus on AI"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              简介（中文，每行一条）
            </label>
            <textarea
              value={form.description_zh.join("\n")}
              onChange={handleDescriptionZhChange}
              className="w-full p-2 border border-gray-300 rounded"
              rows="5"
              placeholder="每行输入一条中文简介&#10;计算机科学博士&#10;10年以上经验&#10;人工智能研究专家"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? "保存中..." : form.id ? "更新成员" : "添加成员"}
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
        <p>正在加载团队成员...</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="table-auto w-full text-left">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">排序</th>
                <th className="p-4">姓名</th>
                <th className="p-4">头像</th>
                <th className="p-4">中文名</th>
                <th className="p-4">中文头衔</th>
                <th className="p-4">简介条目</th>
                <th className="p-4">操作</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((record) => (
                <tr key={record.id} className="hover:bg-gray-100">
                  <td className="p-4">{record.id}</td>
                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {record.order_index}
                    </span>
                  </td>
                  <td className="p-4 font-medium">{record.name}</td>
                  <td className="p-4">
                    {record.image_url ? (
                      <img
                        src={record.image_url}
                        alt="Team member"
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs">
                        暂无头像
                      </div>
                    )}
                  </td>
                  <td className="p-4">{record.name_zh || "-"}</td>
                  <td className="p-4">{record.title_zh || "-"}</td>
                  <td className="p-4">
                    <div className="max-w-xs">
                      <div className="text-sm font-medium text-gray-900">
                        EN：{record.description ? record.description.length : 0} 条
                      </div>
                      {record.description && record.description.length > 0 && (
                        <div className="text-xs text-gray-600 truncate">
                          {record.description[0]}
                          {record.description.length > 1 && "..."}
                        </div>
                      )}
                      {record.description_zh && record.description_zh.length > 0 && (
                        <div className="text-xs text-gray-600 mt-1">
                          ZH：{record.description_zh.length} 条
                        </div>
                      )}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
