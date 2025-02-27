"use client";

import { useEffect, useState } from "react";

export default function StoriesManager() {
  const [type, setType] = useState("HighSchool");
  const [stories, setStories] = useState([]);
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
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStories();
  }, [type]);

  const fetchStories = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/success-stories?type=${type}`, { method: "GET" });
      const data = await res.json();
      if (data.success) setStories(data.data);
      else setError(data.message);
    } catch (err) {
      setError("Failed to fetch success stories");
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
      const imageUrl = imageFile ? await handleImageUpload() : form.image;
      const method = form.id ? "PUT" : "POST";

      const res = await fetch("/api/admin/success-stories", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, image: imageUrl, type }),
      });

      const data = await res.json();
      if (data.success) {
        fetchStories(); // Refresh list
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
      } else setError(data.message);
    } catch (err) {
      setError("Failed to save success story");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/success-stories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) fetchStories(); // Refresh list
      else setError(data.message);
    } catch {
      setError("Failed to delete success story");
    } finally {
      setLoading(false);
    }
  };

  const handleArrayChange = (field, index, value) => {
    const updatedArray = [...form[field]];
    updatedArray[index] = value;
    setForm({ ...form, [field]: updatedArray });
  };

  const addToArray = (field) => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const removeFromArray = (field, index) => {
    const updatedArray = [...form[field]];
    updatedArray.splice(index, 1);
    setForm({ ...form, [field]: updatedArray });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold text-primary mb-6">Success Story Manager</h1>
      <select value={type} onChange={(e) => setType(e.target.value)} className="mb-6 p-2 border rounded" >
        <option value="HighSchool">High School</option>
        <option value="University">University</option>
      </select>

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
            value={form.school}
            onChange={(e) => setForm({ ...form, school: e.target.value })}
            placeholder="School"
            className="w-1/2 p-2 border rounded"
            required
          />
        </div>
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
          <h3>Labels:</h3>
          {form.labels.map((label, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={label}
                onChange={(e) => handleArrayChange("labels", index, e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => removeFromArray("labels", index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addToArray("labels")}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Add Label
          </button>
        </div>
        <div className="mb-4">
          <h3>Offers:</h3>
          {form.offers.map((offer, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={offer}
                onChange={(e) => handleArrayChange("offers", index, e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => removeFromArray("offers", index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addToArray("offers")}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Add Offer
          </button>
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={form.evaluation}
            onChange={(e) => setForm({ ...form, evaluation: e.target.value })}
            placeholder="Case Evaluation"
            className="w-1/2 p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
          {form.id ? "Update Success Story" : "Add Success Story"}
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
                <th className="p-4">School</th>
                <th className="p-4">Labels</th>
                <th className="p-4">Offers</th>
                <th className="p-4">Evaluation</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stories.map((t) => (
                <tr key={t.id} className="hover:bg-gray-100">
                  <td className="p-4">{t.id}</td>
                  <td className="p-4">{t.name}</td>
                  <td className="p-4">
                    <img src={t.image} alt={t.name} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="p-4">{t.school}</td>
                  <td className="p-4">{t.labels.join(", ")}</td>
                  <td className="p-4">{t.offers.join(", ")}</td>
                  <td className="p-4">{t.evaluation}</td>
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
