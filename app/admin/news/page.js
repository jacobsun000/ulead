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
        setError(data.message || "获取新闻失败");
      }
    } catch (err) {
      console.error(err);
      setError("获取新闻失败");
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
        setError("请提供封面图片链接或上传图片。");
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
        setError(data.message || "保存新闻失败");
      }
    } catch (err) {
      console.error(err);
      setError("保存新闻失败");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("确定要删除该新闻文章吗？")) return;
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
        setError(data.message || "删除新闻失败");
      }
    } catch (err) {
      console.error(err);
      setError("删除新闻失败");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold text-primary mb-6">新闻管理</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-semibold">已发布文章</h2>
            <p className="text-sm text-muted-foreground mt-1">
              总数：{news.length} {loading ? "(加载中...)" : ""}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 text-left">标题</th>
                  <th className="p-3 text-left">作者</th>
                  <th className="p-3 text-left">徽章</th>
                  <th className="p-3 text-left">链接</th>
                  <th className="p-3 text-center">精选</th>
                  <th className="p-3 text-center">已发布</th>
                  <th className="p-3 text-left">日期</th>
                  <th className="p-3 text-right">操作</th>
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
                      {item.is_top ? "是" : "否"}
                    </td>
                    <td className="p-3 text-center">
                      {item.is_published ? "是" : "否"}
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
                        编辑
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(item.id)}
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                ))}
                {news.length === 0 && !loading && (
                  <tr>
                    <td className="p-4 text-center text-gray-500" colSpan={7}>
                      暂无新闻。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {isEditing ? "编辑文章" : "新增文章"}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium">标题 *</label>
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
                作者（将以特殊样式展示）
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
                额外徽章（以逗号分隔）
              </label>
              <input
                type="text"
                value={badgesInput}
                onChange={(e) => setBadgesInput(e.target.value)}
                className="mt-1 w-full border rounded px-3 py-2"
                placeholder="IECA认证专业顾问, Top 30 寄宿高中顾问"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                将以描边样式显示，留空则不展示。
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium">摘要</label>
              <textarea
                value={form.excerpt || ""}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="mt-1 w-full border rounded px-3 py-2"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                发布日期 *
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
                封面图片 URL（上传文件时可选）
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
                上传文件后会自动替换为托管图片的链接。
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium">
                文章链接（external_url）*
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
                标记为「作者精选」
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
                发布
              </label>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 disabled:opacity-60"
                disabled={loading}
              >
                {isEditing ? "更新" : "创建"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50"
                disabled={loading}
              >
                重置
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
