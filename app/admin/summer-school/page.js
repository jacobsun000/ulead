"use client";

import { useEffect, useState } from "react";

export default function SummerSchoolManager() {
  const [summerSchools, setSummerSchools] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    tags: [],
    description: "",
    programs: [{ name: "", description: "", href: "" }],
    type: "university",
    href: "",
    image: "",
  });
  const [tagsInput, setTagsInput] = useState("");
  const [programsJson, setProgramsJson] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [jsonError, setJsonError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [programEditMode, setProgramEditMode] = useState("form"); // "form" or "json"

  useEffect(() => {
    fetchSummerSchools();
  }, []);

  useEffect(() => {
    // Update JSON editor when programs change
    setProgramsJson(JSON.stringify(form.programs, null, 2));
  }, [form.programs]);

  const fetchSummerSchools = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/summer-school", { method: "GET" });
      const data = await res.json();
      if (data.success) setSummerSchools(data.data);
      else setError(data.message);
    } catch {
      setError("Failed to fetch summer schools");
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

  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      tags: [],
      description: "",
      programs: [{ name: "", description: "", href: "" }],
      type: "university",
      href: "",
      image: "",
    });
    setTagsInput("");
    setProgramsJson(JSON.stringify([{ name: "", description: "", href: "" }], null, 2));
    setIsEditing(false);
    setJsonError("");
    setImageFile(null);
    setProgramEditMode("form");
  };

  const handleTagsChange = (input) => {
    setTagsInput(input);
    const tags = input.split(',').map(tag => tag.trim()).filter(tag => tag);
    setForm({ ...form, tags });
  };

  const handleProgramsJsonChange = (json) => {
    setProgramsJson(json);
    setJsonError("");

    try {
      const programs = JSON.parse(json);
      if (Array.isArray(programs)) {
        setForm({ ...form, programs });
      } else {
        setJsonError("Programs must be an array");
      }
    } catch (e) {
      setJsonError("Invalid JSON format");
    }
  };

  const addProgram = () => {
    setForm({
      ...form,
      programs: [...form.programs, { name: "", description: "", href: "" }]
    });
  };

  const removeProgram = (index) => {
    const newPrograms = form.programs.filter((_, i) => i !== index);
    setForm({ ...form, programs: newPrograms });
  };

  const updateProgram = (index, field, value) => {
    const newPrograms = [...form.programs];
    newPrograms[index] = { ...newPrograms[index], [field]: value };
    setForm({ ...form, programs: newPrograms });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (programEditMode === "json" && jsonError) {
      setError("Please fix JSON errors before submitting");
      return;
    }

    setLoading(true);

    try {
      const imageUrl = imageFile
        ? await handleImageUpload(imageFile, imageFile.name)
        : form.image;

      const url = "/api/admin/summer-school";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          image: imageUrl,
        }),
      });

      const data = await res.json();
      if (data.success) {
        fetchSummerSchools();
        resetForm();
        setError("");
      } else {
        setError(data.message);
      }
    } catch {
      setError("Failed to save summer school");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (summerSchool) => {
    setForm({
      ...summerSchool,
      tags: summerSchool.tags || [],
      programs: summerSchool.programs || [{ name: "", description: "", href: "" }]
    });
    setTagsInput((summerSchool.tags || []).join(', '));
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this summer school?")) return;

    try {
      const res = await fetch("/api/admin/summer-school", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (data.success) {
        fetchSummerSchools();
        setError("");
      } else {
        setError(data.message);
      }
    } catch {
      setError("Failed to delete summer school");
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold text-primary mb-6">Summer School Manager</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {isEditing ? "Edit Summer School" : "Add New Summer School"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Type *</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full p-2 border rounded"
                required
              >
                <option value="university">University</option>
                <option value="highschool">High School</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tags * (comma-separated)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => handleTagsChange(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="tag1, tag2, tag3"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description *</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full p-2 border rounded"
                rows="4"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">Programs *</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setProgramEditMode("form")}
                    className={`px-3 py-1 text-xs rounded ${
                      programEditMode === "form"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Form Mode
                  </button>
                  <button
                    type="button"
                    onClick={() => setProgramEditMode("json")}
                    className={`px-3 py-1 text-xs rounded ${
                      programEditMode === "json"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    JSON Mode
                  </button>
                </div>
              </div>

              {programEditMode === "form" ? (
                <div className="space-y-3 border p-4 rounded">
                  {form.programs.map((program, index) => (
                    <div key={index} className="border p-3 rounded bg-gray-50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Program {index + 1}</span>
                        {form.programs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeProgram(index)}
                            className="text-red-500 text-xs hover:underline"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Program Name *
                          </label>
                          <input
                            type="text"
                            value={program.name || ""}
                            onChange={(e) => updateProgram(index, "name", e.target.value)}
                            className="w-full p-2 border rounded text-sm"
                            placeholder="Enter program name"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <textarea
                            value={program.description || ""}
                            onChange={(e) => updateProgram(index, "description", e.target.value)}
                            className="w-full p-2 border rounded text-sm"
                            rows="2"
                            placeholder="Enter program description"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Website URL
                          </label>
                          <input
                            type="url"
                            value={program.href || ""}
                            onChange={(e) => updateProgram(index, "href", e.target.value)}
                            className="w-full p-2 border rounded text-sm"
                            placeholder="https://..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addProgram}
                    className="w-full p-2 border-2 border-dashed border-gray-300 rounded text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors"
                  >
                    + Add Another Program
                  </button>
                </div>
              ) : (
                <div>
                  {jsonError && <div className="text-red-500 text-sm mb-2">{jsonError}</div>}
                  <textarea
                    value={programsJson}
                    onChange={(e) => handleProgramsJsonChange(e.target.value)}
                    className={`w-full p-2 border rounded font-mono text-sm ${jsonError ? 'border-red-500' : ''}`}
                    rows="8"
                    placeholder='[{"name": "Program Name", "description": "Program Description", "href": "https://..."}]'
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    Each program should have: name (required), description (optional), href (optional)
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Website URL</label>
              <input
                type="url"
                value={form.href}
                onChange={(e) => setForm({ ...form, href: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Summer School Image</label>
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full p-2 border rounded"
                accept="image/*"
              />
              {form.image && (
                <div className="mt-2">
                  <img src={form.image} alt="Current image" className="w-20 h-20 object-cover rounded" />
                  <p className="text-xs text-gray-600 mt-1">Current image</p>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <button
                type="submit"
                disabled={loading || (programEditMode === "json" && jsonError)}
                className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
              >
                {loading ? "Saving..." : isEditing ? "Update" : "Add"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <h2 className="text-2xl font-semibold p-6 pb-0">Summer Schools</h2>
          {loading && !summerSchools.length ? (
            <p className="p-6">Loading summer schools...</p>
          ) : (
            <div className="max-h-screen overflow-y-auto">
              {summerSchools.map((school) => (
                <div key={school.id} className="border-b p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      {school.image && (
                        <img
                          src={school.image}
                          alt={school.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div>
                        <h3 className="font-semibold">{school.name}</h3>
                        <div className="text-sm text-gray-600 mt-1">
                          <span className="bg-blue-100 px-2 py-1 rounded">{school.type}</span>
                        </div>
                        {school.tags && (
                          <div className="mt-2">
                            {school.tags.map((tag, idx) => (
                              <span key={idx} className="inline-block bg-gray-200 px-2 py-1 rounded text-xs mr-1">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <p className="text-sm text-gray-700 mt-2">{school.description.substring(0, 100)}...</p>
                        {school.programs && (
                          <p className="text-xs text-gray-500 mt-1">
                            {school.programs.length} program(s)
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1 ml-2">
                      <button
                        onClick={() => handleEdit(school)}
                        className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(school.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}