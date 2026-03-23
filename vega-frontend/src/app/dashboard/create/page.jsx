"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { blogService } from "@/services/blog.service";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import FileInput from "@/components/ui/FileInput";

import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function CreateBlogPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", content: "" });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("content", form.content);
    if (file) fd.append("image", file);
    try {
      await blogService.create(fd);
      router.push("/dashboard/my-blogs");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">

        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-semibold text-sm transition group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Dashboard
          </Link>

          <Button
            type="submit"
            form="blogForm"
            loading={loading}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <Save size={18} /> Publish
          </Button>

        </div>

        {/* Card */}
        <div className="bg-white shadow-xl rounded-2xl border border-gray-100 p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Write a New Blog</h1>
            <p className="text-sm text-gray-500">
              Share your knowledge, thoughts and ideas with others.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-200">
              {error}
            </div>
          )}

          <form id="blogForm" onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Blog Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              required
            />

            <Input
              multiline
              label="Blog Content"
              value={form.content}
              onChange={(e) =>
                setForm({ ...form, content: e.target.value })
              }
              required
              className="min-h-[180px]"
            />

            <FileInput
              label="Cover Image"
              value={file}
              onChange={setFile}
            />
          </form>
        </div>
      </div>
    </div>
  );
}