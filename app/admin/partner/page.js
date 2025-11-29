"use client";

import { useState, useEffect } from "react";

export default function PartnerManager() {
  const [schools, setSchools] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", state: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/partner", { method: "GET" });
      const data = await res.json();
      if (data.success) setSchools(data.data);
      else setError(data.message);
    } catch {
      setError("获取目标学校失败");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const action = form.id ? "更新" : "新增";
    if (!confirm(`确定要${action}该合作院校吗？`)) return;

    const method = form.id ? "PUT" : "POST";
    try {
      const res = await fetch("/api/admin/partner", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        fetchSchools(); // Refresh list
        setForm({ id: null, name: "", state: "" }); // Reset form
      } else setError(data.message);
    } catch {
      setError("保存目标学校失败");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("确定要删除该合作院校吗？")) return;

    try {
      const res = await fetch("/api/admin/partner", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) fetchSchools(); // Refresh list
      else setError(data.message);
    } catch {
      setError("删除目标学校失败");
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold text-primary mb-6">合作院校管理</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="学校名称"
            className="w-1/2 p-2 border rounded"
            required
          />
          <input
            type="text"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
            placeholder="州/省份"
            className="w-1/2 p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded"
        >
          {form.id ? "更新学校" : "新增学校"}
        </button>
      </form>

      {loading ? (
        <p>加载中...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="table-auto w-full text-left">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">学校名称</th>
                <th className="p-4">州/省份</th>
                <th className="p-4">操作</th>
              </tr>
            </thead>
            <tbody>
              {schools.map((school) => (
                <tr key={school.id} className="hover:bg-gray-100">
                  <td className="p-4">{school.id}</td>
                  <td className="p-4">{school.name}</td>
                  <td className="p-4">{school.state}</td>
                  <td className="p-4 flex gap-2">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => setForm(school)}
                    >
                      编辑
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDelete(school.id)}
                    >
                      删除
                    </button>
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
