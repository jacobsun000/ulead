"use client";

import { useState, useEffect, useCallback } from "react";

const schoolTypes = ["university", "highschool", "other"];
const schoolTypeLabels = {
  university: "大学",
  highschool: "高中",
  other: "其他",
};

export default function OfferManager() {
  const [schoolType, setSchoolType] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    id: null,
    logo: "",
    name: "",
    country: "",
    rank: "",
    name_cn: "",
    count: 0,
  });

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
                    <span>Logo 图片：</span>
                    <input
                      type="file"
                      onChange={(e) => setImageFile(e.target.files[0])}
                      className="w-full p-2 border rounded"
                      accept="image/*"
                    />
                  </label>
                  {form.logo && (
                    <div className="mt-2">
                      <img src={form.logo} alt="Current logo" className="w-16 h-16 object-cover rounded" />
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="学校名称"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mb-4 w-full p-2 border rounded"
                  required
                />
                {schoolType === "university" && (
                  <>
                    <input
                      type="text"
                      placeholder="国家"
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      className="mb-4 w-full p-2 border rounded"
                      required
                    />
                    <input
                      type="text"
                      placeholder="排名"
                      value={form.rank}
                      onChange={(e) => setForm({ ...form, rank: e.target.value })}
                      className="mb-4 w-full p-2 border rounded"
                      required
                    />
                  </>
                )}
                <input
                  type="text"
                  placeholder="中文名称"
                  value={form.name_cn}
                  onChange={(e) => setForm({ ...form, name_cn: e.target.value })}
                  className="mb-4 w-full p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="数量"
                  value={form.count}
                  onChange={(e) => setForm({ ...form, count: Number(e.target.value) })}
                  className="mb-4 w-full p-2 border rounded"
                  required
                  min="0"
                />
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded"
                  disabled={loading}
                >
                  {form.id ? "更新记录" : "新增记录"}
                </button>
              </form>
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="table-auto w-full text-left">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="p-4">ID</th>
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
                  <tbody>
                    {records.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-100">
                        <td className="p-4">{record.id}</td>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          }
        </>
      )}
    </div>
  );
}
