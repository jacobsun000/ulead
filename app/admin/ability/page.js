"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableItem({ id, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-3">
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-200 rounded"
        aria-label="Drag handle"
      >
        ☰
      </button>
      {children}
    </div>
  );
}

export default function AbilitiesManager() {
  const [tags, setTags] = useState([]);
  const [tagColors, setTagColors] = useState([]);
  const [newTag, setNewTag] = useState({ text: "", type: "", pos: "top" });
  const [newTagColor, setNewTagColor] = useState({ type: "", color: "#000000" });
  const [hasTagOrderChanged, setHasTagOrderChanged] = useState(false);
  const [hasTagColorOrderChanged, setHasTagColorOrderChanged] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleTagDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTags((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        setHasTagOrderChanged(true);
        return newItems;
      });
    }
  };

  const handleTagColorDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTagColors((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        setHasTagColorOrderChanged(true);
        return newItems;
      });
    }
  };

  const handleUpdateTagOrder = async () => {
    if (!confirm("确定要更新标签排序吗？")) return;

    try {
      const items = tags.map((item, index) => ({
        id: item.id,
        order_index: index,
      }));

      const res = await fetch("/api/admin/tag", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();
      if (data.success) {
        setHasTagOrderChanged(false);
        fetchTags();
      }
    } catch (err) {
      console.error("更新排序失败", err);
    }
  };

  const handleUpdateTagColorOrder = async () => {
    if (!confirm("确定要更新标签颜色类型排序吗？")) return;

    try {
      const items = tagColors.map((item, index) => ({
        id: item.id,
        order_index: index,
      }));

      const res = await fetch("/api/admin/tag-color", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();
      if (data.success) {
        setHasTagColorOrderChanged(false);
        fetchTagColors();
      }
    } catch (err) {
      console.error("更新排序失败", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">能力标签管理</h2>

      {hasTagOrderChanged && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex justify-between items-center">
          <span className="text-yellow-800">标签排序已更改，请保存新的排序</span>
          <button
            onClick={handleUpdateTagOrder}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
          >
            更新排序
          </button>
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleTagDragEnd}
      >
        <SortableContext
          items={tags.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {tags.map((tag) => (
              <SortableItem key={tag.id} id={tag.id}>
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
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>

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

      {hasTagColorOrderChanged && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex justify-between items-center">
          <span className="text-yellow-800">标签颜色类型排序已更改，请保存新的排序</span>
          <button
            onClick={handleUpdateTagColorOrder}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
          >
            更新排序
          </button>
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleTagColorDragEnd}
      >
        <SortableContext
          items={tagColors.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {tagColors.map((color) => (
              <SortableItem key={color.id} id={color.id}>
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
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="mt-6 flex gap-3">
        <input
          type="text"
          placeholder="新标签类型名称"
          value={newTagColor.type}
          className="border p-2 w-full"
          onChange={(e) => setNewTagColor({ ...newTagColor, type: e.target.value })}
        />
        <input
          type="color"
          value={newTagColor.color}
          onChange={(e) => setNewTagColor({ ...newTagColor, color: e.target.value })}
        />
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          onClick={addTagColor}
        >
          新增
        </button>
      </div>
    </div>
  );
}
