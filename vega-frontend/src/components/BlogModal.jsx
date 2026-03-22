"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import FileInput from "@/components/ui/FileInput";

import { getImageUrl } from "@/lib/utils";

export default function BlogModal({ isOpen, onClose, onSubmit, initialData, title }) {
  const [form, setForm] = useState({ title: "", content: "" });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(initialData ? { title: initialData.title || "", content: initialData.content || "" } : { title: "", content: "" });
    setFile(null);
    setError("");
  }, [initialData, isOpen]);


  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("content", form.content);
    if (file) fd.append("image", file);
    try { await onSubmit(fd); onClose(); } catch { } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[24px] p-8 w-full max-w-lg shadow-2xl border border-gray-100 animate-fade-in-up">
        <h2 className="text-xl font-black text-gray-900 mb-6">{title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <Input multiline label="Content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required />
          <FileInput 
            label="Cover Image" 
            value={file} 
            onChange={setFile} 
            initialPreview={getImageUrl(initialData?.image)}
          />

          <div className="flex gap-3 justify-end pt-4 border-t border-gray-50 mt-6">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
            <Button type="submit" loading={loading} className="!px-8">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
