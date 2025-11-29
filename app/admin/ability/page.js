"use client";

import { useState, useEffect } from "react";

export default function AbilitiesManager() {
  const [tags, setTags] = useState([]);
  const [tagColors, setTagColors] = useState([]);
  const [newTag, setNewTag] = useState({ text: "", type: "", pos: "top" });
  const [newTagColor, setNewTagColor] = useState({ type: "", color: "#000000" });

  useEffect(() => {
    fetchTags();
    fetchTagColors();
  }, []);

  async function fetchTags() {
    try {
      const res = await fetch("/api/admin/tag");
      const data = await res.json();
      if (data.success) setTags(data.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  }

  async function fetchTagColors() {
    try {
      const res = await fetch("/api/admin/tag-color");
      const data = await res.json();
      if (data.success) setTagColors(data.data);
    } catch (error) {
      console.error("Error fetching tag colors:", error);
    }
  }

  async function updateTag(updatedTag) {
    if (!confirm("确定要更新该标签吗？")) {
      fetchTags(); // Refresh to revert changes
      return;
    }

    await fetch(`/api/admin/tag`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTag),
    });
    fetchTags();
  }

  async function updateTagColor(updatedTagColor) {
    if (!confirm("确定要更新该标签颜色类型吗？")) {
      fetchTagColors(); // Refresh to revert changes
      return;
    }

    await fetch(`/api/admin/tag-color`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTagColor),
    });
    fetchTagColors();
  }

  async function addTag() {
    if (!newTag.text.trim()) return;
    if (!confirm("确定要新增该标签吗？")) return;

    await fetch("/api/admin/tag", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTag),
    });
    setNewTag({ text: "", type: "", pos: "top" });
    fetchTags();
  }

  async function addTagColor() {
    if (!newTagColor.type.trim()) return;
    if (!confirm("确定要新增该标签颜色类型吗？")) return;

    await fetch("/api/admin/tag-color", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTagColor),
    });
    setNewTagColor({ type: "", color: "#000000" });
    fetchTagColors();
  }

  async function deleteTag(id) {
    if (!confirm("确定要删除该标签吗？")) return;

    await fetch("/api/admin/tag", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchTags();
  }

  async function deleteTagColor(id) {
    if (!confirm("确定要删除该标签颜色类型吗？")) return;

    await fetch("/api/admin/tag-color", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchTagColors();
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">能力标签管理</h2>
      <div className="space-y-4">
        {tags.map((tag) => (
          <div key={tag.id} className="flex items-center gap-3">
            <input
              type="text"
              value={tag.text}
              className="border p-2 w-full"
              onChange={(e) =>
                setTags(tags.map((t) => (t.id === tag.id ? { ...t, text: e.target.value } : t)))
              }
              onBlur={() => updateTag(tag)}
            />
            <select
              value={tag.pos}
              onChange={(e) =>
                setTags(tags.map((t) => (t.id === tag.id ? { ...t, pos: e.target.value } : t)))
              }
              onBlur={() => updateTag(tag)}
              className="border p-2"
            >
              <option value="top">顶部</option>
              <option value="bottom">底部</option>
            </select>
            <select
              value={tag.type}
              onChange={(e) =>
                setTags(tags.map((t) => (t.id === tag.id ? { ...t, type: e.target.value } : t)))
              }
              onBlur={() => updateTag(tag)}
              className="border p-2"
            >
              {tagColors.map((color) => (<option key={color.id} value={color.type}>{color.type}</option>))}
            </select>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => deleteTag(tag.id)}
            >
              删除
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-3">
        <input
          type="text"
          placeholder="新标签名称"
          value={newTag.text}
          className="border p-2 w-full"
          onChange={(e) => setNewTag({ ...newTag, text: e.target.value })}
        />
        <select
          value={newTag.pos}
          onChange={(e) => setNewTag({ ...newTag, pos: e.target.value })}
          className="border p-2"
        >
          <option value="top">顶部</option>
          <option value="bottom">底部</option>
        </select>
        <select
          value={newTag.type}
          onChange={(e) => setNewTag({ ...newTag, type: e.target.value })}
          className="border p-2"
        >
          {tagColors.map((color) => (<option key={color.id} value={color.type}>{color.type}</option>))}
        </select>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          onClick={addTag}
        >
          新增
        </button>
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-4">能力标签类型管理</h2>
      <div className="space-y-4">
        {tagColors.map((color) => (
          <div key={color.id} className="flex items-center gap-3">
            <input
              type="text"
              value={color.type}
              className="border p-2 w-full"
              onChange={(e) =>
                setTagColors(tagColors.map((c) => (c.id === color.id ? { ...c, type: e.target.value } : c)))
              }
              onBlur={() => updateTagColor(color)}
            />
            <input
              type="color"
              value={color.color}
              onChange={(e) =>
                setTagColors(tagColors.map((c) => (c.id === color.id ? { ...c, color: e.target.value } : c)))
              }
              onBlur={() => updateTagColor(color)}
            />
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => deleteTagColor(color.id)}
            >
              删除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
