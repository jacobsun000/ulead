"use client";

import { useState, useEffect } from "react";

const schoolTypes = ["university", "high_school", "other_school"];

export default function OfferManager() {
  const [schoolType, setSchoolType] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    id: null,
    logo: "",
    school: "",
    country: "",
    rank: "",
    school_cn: "",
    count: 0,
  });

  useEffect(() => {
    if (schoolType) fetchRecords();
  }, [schoolType]);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/offer?type=${schoolType}`);
      const data = await res.json();
      if (data.success) setRecords(data.data);
      else console.error(data.message);
    } catch {
      console.error("Failed to fetch records");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = form.id ? "PUT" : "POST";
      const res = await fetch(`/api/admin/offer`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: schoolType, ...form }),
      });

      const data = await res.json();
      if (data.success) {
        fetchRecords();
        setForm({
          id: null,
          logo: "",
          school: "",
          country: "",
          rank: "",
          school_cn: "",
          count: 0,
        });
      } else setError(data.message);
    } catch {
      setError("Failed to save record");
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
      setError("Failed to delete record");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold text-primary mb-6">Offer Manager</h1>

      <select
        value={schoolType}
        onChange={(e) => setSchoolType(e.target.value)}
        className="mb-6 p-2 border rounded"
      >
        <option value="">Select School Type</option>
        {schoolTypes.map((type) => (
          <option key={type} value={type}>
            {type.replace("_", " ").toUpperCase()}
          </option>
        ))}
      </select>

      {schoolType && (
        <>
          {loading ? (

            <p>Loading...</p>
          ) :
            <>
              <form onSubmit={handleSubmit} className="mb-6">
                <input
                  type="text"
                  placeholder="Logo URL"
                  value={form.logo}
                  onChange={(e) => setForm({ ...form, logo: e.target.value })}
                  className="mb-4 w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="School Name"
                  value={form.school}
                  onChange={(e) => setForm({ ...form, school: e.target.value })}
                  className="mb-4 w-full p-2 border rounded"
                  required
                />
                {schoolType === "university" && (
                  <>
                    <input
                      type="text"
                      placeholder="Country"
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      className="mb-4 w-full p-2 border rounded"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Rank"
                      value={form.rank}
                      onChange={(e) => setForm({ ...form, rank: e.target.value })}
                      className="mb-4 w-full p-2 border rounded"
                      required
                    />
                    <input
                      type="text"
                      placeholder="School CN"
                      value={form.school_cn}
                      onChange={(e) => setForm({ ...form, school_cn: e.target.value })}
                      className="mb-4 w-full p-2 border rounded"
                      required
                    />
                  </>
                )}
                <input
                  type="number"
                  placeholder="Count"
                  value={form.count}
                  onChange={(e) => setForm({ ...form, count: Number(e.target.value) })}
                  className="mb-4 w-full p-2 border rounded"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded"
                >
                  {form.id ? "Update Record" : "Add Record"}
                </button>
              </form>
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="table-auto w-full text-left">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="p-4">ID</th>
                      <th className="p-4">Logo</th>
                      <th className="p-4">School</th>
                      {schoolType === "university" && (
                        <>
                          <th className="p-4">Country</th>
                          <th className="p-4">Rank</th>
                          <th className="p-4">School CN</th>
                        </>
                      )}
                      <th className="p-4">Count</th>
                      <th className="p-4">Actions</th>
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
                        <td className="p-4">{record.school}</td>
                        {schoolType === "university" && (
                          <>
                            <td className="p-4">{record.country}</td>
                            <td className="p-4">{record.rank}</td>
                            <td className="p-4">{record.school_cn}</td>
                          </>
                        )}
                        <td className="p-4">{record.count}</td>
                        <td className="p-4 flex gap-2">
                          <button
                            className="text-blue-500 hover:underline"
                            onClick={() => setForm(record)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-500 hover:underline"
                            onClick={() => handleDelete(record.id)}
                          >
                            Delete
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
