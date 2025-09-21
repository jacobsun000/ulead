"use client";

import { useState, useEffect, useCallback } from "react";

const storyTypes = ["University", "HighSchool"];

export default function SuccessStoryManager() {
  const [storyType, setStoryType] = useState("");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
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

  const fetchStories = useCallback(async () => {
    setLoading(true);
    try {
      const url = storyType ? `/api/admin/success-story?type=${storyType}` : "/api/admin/success-story";
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setStories(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch success stories");
    } finally {
      setLoading(false);
    }
  }, [storyType]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

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
        : form.image;

      const method = form.id ? "PUT" : "POST";
      const res = await fetch("/api/admin/success-story", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          image: imageUrl,
        }),
      });

      const data = await res.json();
      if (data.success) {
        fetchStories();
        resetForm();
        setError("");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to save success story");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this success story?")) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/success-story", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (data.success) {
        fetchStories();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to delete success story");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (storyRecord) => {
    setForm({
      ...storyRecord,
      labels: storyRecord.labels || [],
      offers: storyRecord.offers || [],
    });
  };

  const resetForm = () => {
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
  };

  const handleLabelsChange = (e) => {
    const value = e.target.value;
    const labelsArray = value.split(",").map(label => label.trim()).filter(label => label);
    setForm({ ...form, labels: labelsArray });
  };

  const handleOffersChange = (e) => {
    const value = e.target.value;
    const offersArray = value.split(",").map(offer => offer.trim()).filter(offer => offer);
    setForm({ ...form, offers: offersArray });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold text-primary mb-6">Success Story Manager</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Type (optional)
        </label>
        <select
          value={storyType}
          onChange={(e) => setStoryType(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Types</option>
          {storyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type *
            </label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Type</option>
              {storyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Student Name *
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
              School *
            </label>
            <input
              type="text"
              value={form.school}
              onChange={(e) => setForm({ ...form, school: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Student Image
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

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Labels (comma-separated)
            </label>
            <input
              type="text"
              value={form.labels.join(", ")}
              onChange={handleLabelsChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Academic Excellence, Leadership, Sports"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Offers (comma-separated)
            </label>
            <input
              type="text"
              value={form.offers.join(", ")}
              onChange={handleOffersChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Harvard University, Stanford University, MIT"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Evaluation
            </label>
            <textarea
              value={form.evaluation}
              onChange={(e) => setForm({ ...form, evaluation: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
              placeholder="Student's testimonial or evaluation of the program"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? "Saving..." : form.id ? "Update Story" : "Add Story"}
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
        <p>Loading success stories...</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="table-auto w-full text-left">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Type</th>
                <th className="p-4">Name</th>
                <th className="p-4">Image</th>
                <th className="p-4">School</th>
                <th className="p-4">Labels</th>
                <th className="p-4">Offers</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stories.map((record) => (
                <tr key={record.id} className="hover:bg-gray-100">
                  <td className="p-4">{record.id}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      record.type === 'University'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {record.type}
                    </span>
                  </td>
                  <td className="p-4 font-medium">{record.name}</td>
                  <td className="p-4">
                    {record.image ? (
                      <img
                        src={record.image}
                        alt="Student"
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="p-4">{record.school}</td>
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
                    {record.offers && record.offers.length > 0 ? (
                      <div className="max-w-xs">
                        {record.offers.slice(0, 2).map((offer, index) => (
                          <div key={index} className="text-sm">{offer}</div>
                        ))}
                        {record.offers.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{record.offers.length - 2} more
                          </div>
                        )}
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