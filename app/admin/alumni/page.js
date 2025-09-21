"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function AlumniManager() {
  const [alumni, setAlumni] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    image: "",
    highschool: "",
    university: "",
    university_logo: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/alumni", { method: "GET" });
      const data = await res.json();
      if (data.success) setAlumni(data.data);
      else setError(data.message);
    } catch {
      setError("Failed to fetch alumni");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file) => {
    const res = await fetch(`/api/admin/image-upload?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    const data = await res.json();
    return data.url; // The uploaded image URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload images if files are provided
      const imageUrl = imageFile ? await handleImageUpload(imageFile) : form.image;
      const logoUrl = logoFile ? await handleImageUpload(logoFile) : form.university_logo;

      const method = form.id ? "PUT" : "POST";

      const res = await fetch("/api/admin/alumni", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, image: imageUrl, university_logo: logoUrl }),
      });

      const data = await res.json();
      if (data.success) {
        fetchAlumni(); // Refresh list
        setForm({ id: null, name: "", image: "", highschool: "", university: "", university_logo: "" });
        setImageFile(null);
        setLogoFile(null);
      } else setError(data.message);
    } catch {
      setError("Failed to save alumni");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/alumni", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) fetchAlumni(); // Refresh list
      else setError(data.message);
    } catch {
      setError("Failed to delete alumni");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold text-primary mb-6">Alumni Manager</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            className="w-1/2 p-2 border rounded"
            required
          />
          <input
            type="text"
            value={form.highschool}
            onChange={(e) => setForm({ ...form, highschool: e.target.value })}
            placeholder="High School"
            className="w-1/2 p-2 border rounded"
            required
          />
        </div>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={form.university}
            onChange={(e) => setForm({ ...form, university: e.target.value })}
            placeholder="University"
            className="w-1/2 p-2 border rounded"
            required
          />
        </div>
        <div className="flex gap-4 mb-4">
          <label className="block w-1/2">
            <span>Profile Image:</span>
            <input
              type="file"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full p-2 border rounded"
            />
          </label>
          <label className="block w-1/2">
            <span>University Logo:</span>
            <input
              type="file"
              onChange={(e) => setLogoFile(e.target.files[0])}
              className="w-full p-2 border rounded"
            />
          </label>
        </div>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
          {form.id ? "Update Alumni" : "Add Alumni"}
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
                <th className="p-4">Image</th>
                <th className="p-4">High School</th>
                <th className="p-4">University</th>
                <th className="p-4">University Logo</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {alumni.map((a) => (
                <tr key={a.id} className="hover:bg-gray-100">
                  <td className="p-4">{a.id}</td>
                  <td className="p-4">{a.name}</td>
                  <td className="p-4">
                    <Image src={a.image} alt={a.name} width={500} height={500} className="w-16 h-16 rounded" />
                  </td>
                  <td className="p-4">{a.highschool}</td>
                  <td className="p-4">{a.university}</td>
                  <td className="p-4">
                    <Image src={a.university_logo} alt={`${a.university} logo`} width={500} height={500} className="w-16 h-16 rounded" />
                  </td>
                  <td className="p-4 flex gap-2">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => setForm(a)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDelete(a.id)}
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
