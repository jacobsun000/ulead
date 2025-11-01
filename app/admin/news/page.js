"use client";

import { useEffect, useMemo, useState } from "react";

const DEFAULT_FORM = {
  id: null,
  title: "",
  author: "",
  badges: [],
  excerpt: "",
  published_at: "",
  image_url: "",
  external_url: "",
  is_published: true,
  is_top: false,
};

export default function NewsManager() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(DEFAULT_FORM);
  const [badgesInput, setBadgesInput] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const isEditing = useMemo(() => form.id !== null, [form.id]);

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    setBadgesInput((form.badges || []).join(", "));
  }, [form.badges]);

  async function fetchNews() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/news");
      const data = await res.json();
      if (data.success) {
        setNews(data.data);
      } else {
        setError(data.message || "Failed to fetch news");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch news");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm(DEFAULT_FORM);
    setBadgesInput("");
    setImageFile(null);
  }

  function handleEdit(record) {
    setForm({
      ...DEFAULT_FORM,
      ...record,
      published_at: record.published_at
        ? new Date(record.published_at).toISOString().slice(0, 10)
        : "",
    });
    setImageFile(null);
  }

  function normalizeBadgesInput(value) {
    return value
      .split(",")
      .map((badge) => badge.trim())
      .filter(Boolean);
  }

  async function handleImageUpload(file, filename) {
    const res = await fetch(`/api/admin/image-upload?filename=${encodeURIComponent(filename)}`, {
      method: "POST",
      body: file,
    });
    if (!res.ok) {
      throw new Error("Image upload failed");
    }
    const data = await res.json();
    return data.url;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let imageUrl = form.image_url;

      if (imageFile) {
        imageUrl = await handleImageUpload(imageFile, imageFile.name);
      }

      if (!imageUrl) {
        setError("Please provide an image URL or upload an image.");
        setLoading(false);
        return;
      }

      const method = isEditing ? "PUT" : "POST";
      const payload = {
        ...form,
        badges: normalizeBadgesInput(badgesInput),
        image_url: imageUrl,
      };

      const res = await fetch("/api/admin/news", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        await fetchNews();
        resetForm();
      } else {
        setError(data.message || "Failed to save news");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to save news");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this news item?")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/news", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchNews();
      } else {
        setError(data.message || "Failed to delete news item");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to delete news item");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold text-primary mb-6">News Manager</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-semibold">Existing Articles</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Total: {news.length} {loading ? "(Loading…)" : ""}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Author</th>
                  <th className="p-3 text-left">Badges</th>
                  <th className="p-3 text-left">Link</th>
                  <th className="p-3 text-center">Top</th>
                  <th className="p-3 text-center">Published</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {news.map((item) => (
                  <tr key={item.id} className="border-b last:border-0">
                    <td className="p-3 max-w-xs truncate" title={item.title}>
                      {item.title}
                    </td>
                    <td className="p-3">{item.author || "-"}</td>
                    <td className="p-3">
                      {(item.badges || []).length > 0
                        ? item.badges.join(", ")
                        : "-"}
                    </td>
                    <td className="p-3 max-w-xs truncate" title={item.external_url}>
                      {item.external_url}
                    </td>
                    <td className="p-3 text-center">
                      {item.is_top ? "Yes" : "No"}
                    </td>
                    <td className="p-3 text-center">
                      {item.is_published ? "Yes" : "No"}
                    </td>
                    <td className="p-3">
                      {item.published_at
                        ? new Date(item.published_at).toLocaleDateString("zh-CN")
                        : "-"}
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {news.length === 0 && !loading && (
                  <tr>
                    <td className="p-4 text-center text-gray-500" colSpan={7}>
                      No news articles found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {isEditing ? "Edit Article" : "Add New Article"}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium">Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="mt-1 w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Author (displays with special styling)
              </label>
              <input
                type="text"
                value={form.author || ""}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="mt-1 w-full border rounded px-3 py-2"
                placeholder="合领教育王晓丹"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Additional Badges (comma separated)
              </label>
              <input
                type="text"
                value={badgesInput}
                onChange={(e) => setBadgesInput(e.target.value)}
                className="mt-1 w-full border rounded px-3 py-2"
                placeholder="IECA认证专业顾问, Top 30 寄宿高中顾问"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                These render with outline styling. Leave blank to omit.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium">Excerpt</label>
              <textarea
                value={form.excerpt || ""}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="mt-1 w-full border rounded px-3 py-2"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Published Date *
              </label>
              <input
                type="date"
                value={form.published_at}
                onChange={(e) =>
                  setForm({ ...form, published_at: e.target.value })
                }
                className="mt-1 w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Cover Image URL (optional if uploading a file)
              </label>
              <input
                type="text"
                value={form.image_url}
                onChange={(e) =>
                  setForm({ ...form, image_url: e.target.value })
                }
                className="mt-1 w-full border rounded px-3 py-2"
              />
              <input
                type="file"
                accept="image/*"
                className="mt-2 block w-full text-sm text-gray-700"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Uploading a file will overwrite the URL with the hosted image.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium">
                Article Link (external_url) *
              </label>
              <input
                type="text"
                value={form.external_url}
                onChange={(e) =>
                  setForm({ ...form, external_url: e.target.value })
                }
                className="mt-1 w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="is_top"
                type="checkbox"
                checked={form.is_top}
                onChange={(e) =>
                  setForm({ ...form, is_top: e.target.checked })
                }
                className="h-4 w-4"
              />
              <label htmlFor="is_top" className="text-sm font-medium">
                Mark as 作者精选
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="is_published"
                type="checkbox"
                checked={form.is_published}
                onChange={(e) =>
                  setForm({ ...form, is_published: e.target.checked })
                }
                className="h-4 w-4"
              />
              <label htmlFor="is_published" className="text-sm font-medium">
                Published
              </label>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 disabled:opacity-60"
                disabled={loading}
              >
                {isEditing ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50"
                disabled={loading}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
