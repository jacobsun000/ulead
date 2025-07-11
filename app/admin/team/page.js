"use client";

import { useEffect, useState } from "react";

export default function TeamManager() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    order_index: 0,
    image_url: "",
    description: [],
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/team", { method: "GET" });
      const data = await res.json();
      if (data.success) setTeamMembers(data.data);
      else setError(data.message);
    } catch {
      setError("Failed to fetch team members");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async () => {
    const res = await fetch(`/api/admin/image-upload?filename=${imageFile.name}`, {
      method: "POST",
      body: imageFile,
    });

    const data = await res.json();
    return data.url; // The uploaded image URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = imageFile ? await handleImageUpload() : form.image_url;
      const method = form.id ? "PUT" : "POST";

      const res = await fetch("/api/admin/team", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, image_url: imageUrl }),
      });

      const data = await res.json();
      if (data.success) {
        fetchTeamMembers(); // Refresh list
        setForm({ id: null, name: "", order_index: 0, image_url: "", description: [] });
        setImageFile(null);
        setError("");
      } else setError(data.message);
    } catch {
      setError("Failed to save team member");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/team", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) fetchTeamMembers(); // Refresh list
      else setError(data.message);
    } catch {
      setError("Failed to delete team member");
    } finally {
      setLoading(false);
    }
  };

  const handleArrayChange = (index, value) => {
    const updatedArray = [...form.description];
    updatedArray[index] = value;
    setForm({ ...form, description: updatedArray });
  };

  const addToArray = () => {
    setForm({ ...form, description: [...form.description, ""] });
  };

  const removeFromArray = (index) => {
    const updatedArray = [...form.description];
    updatedArray.splice(index, 1);
    setForm({ ...form, description: updatedArray });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold text-primary mb-6">Team Manager</h1>

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
        </div>
        <input
          type="number"
          value={form.order_index ?? 0}
          onChange={(e) => setForm({ ...form, order_index: parseInt(e.target.value) })}
          placeholder="Order"
          className="w-1/4 p-2 border rounded"
          required
        />
        <div className="flex gap-4 mb-4">
          <label className="block w-1/2">
            <span>Image:</span>
            <input
              type="file"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full p-2 border rounded"
            />
          </label>
        </div>
        <div className="mb-4">
          <h3>Description:</h3>
          {form.description.map((desc, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={desc}
                onChange={(e) => handleArrayChange(index, e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => removeFromArray(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addToArray}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Add Description
          </button>
        </div>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
          {form.id ? "Update Team Member" : "Add Team Member"}
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
                <th className="p-4">Order</th>
                <th className="p-4">Image</th>
                <th className="p-4">Description</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((t) => (
                <tr key={t.id} className="hover:bg-gray-100">
                  <td className="p-4">{t.id}</td>
                  <td className="p-4">{t.name}</td>
                  <td className="p-4">{t.order_index}</td>
                  <td className="p-4">
                    <img src={t.image_url} alt={t.name} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="p-4">{t.description.join(", ")}</td>
                  <td className="p-4 flex gap-2">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => setForm(t)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDelete(t.id)}
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
