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
      setError("Failed to fetch target schools");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      setError("Failed to save target school");
    }
  };

  const handleDelete = async (id) => {
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
      setError("Failed to delete target school");
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold text-primary mb-6">Partner Manager</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="School Name"
            className="w-1/2 p-2 border rounded"
            required
          />
          <input
            type="text"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
            placeholder="State"
            className="w-1/2 p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded"
        >
          {form.id ? "Update School" : "Add School"}
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="table-auto w-full text-left">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">State</th>
                <th className="p-4">Actions</th>
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
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDelete(school.id)}
                    >
                      Delete
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
