"use client";

import { useState, useEffect } from "react";

export default function MentorManager() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
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
      setError("Failed to fetch mentors");
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
      setError("Failed to save mentor");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this mentor?")) return;

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
      setError("Failed to delete mentor");
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

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold text-primary mb-6">Mentor Manager</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name *
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
              Degree
            </label>
            <input
              type="text"
              value={form.degree}
              onChange={(e) => setForm({ ...form, degree: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="e.g., Ph.D. in Computer Science"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Institution
            </label>
            <input
              type="text"
              value={form.institution}
              onChange={(e) => setForm({ ...form, institution: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="e.g., Stanford University"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mentor Image
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
              Research Domains
            </label>
            <textarea
              value={form.research_domains}
              onChange={(e) => setForm({ ...form, research_domains: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              rows="2"
              placeholder="e.g., Machine Learning, Artificial Intelligence, Data Science"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Projects
            </label>
            <textarea
              value={form.projects}
              onChange={(e) => setForm({ ...form, projects: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              rows="3"
              placeholder="Describe notable projects and achievements"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Supported Programs
            </label>
            <textarea
              value={form.supported_programs}
              onChange={(e) => setForm({ ...form, supported_programs: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              rows="2"
              placeholder="e.g., Undergraduate Research, Graduate Admissions, PhD Applications"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? "Saving..." : form.id ? "Update Mentor" : "Add Mentor"}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Reset Form
          </button>
        </div>
      </form>

      {loading ? (
        <p>Loading mentors...</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="table-auto w-full text-left">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Image</th>
                <th className="p-4">Degree</th>
                <th className="p-4">Institution</th>
                <th className="p-4">Research Domains</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mentors.map((record) => (
                <tr key={record.id} className="hover:bg-gray-100">
                  <td className="p-4">{record.id}</td>
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
                        No Image
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
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleDelete(record.id)}
                      >
                        Delete
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