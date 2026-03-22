"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { blogService } from "@/services/blog.service";
import Navbar from "@/components/ui/Navbar";
import { ArrowLeft, Clock, User } from "lucide-react";
import CommentSection from "@/components/CommentSection";
import { useAuth } from "@/context/AuthContext";
import { getImageUrl } from "@/lib/utils";

export default function BlogDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id)
      blogService
        .getById(id)
        .then(setBlog)
        .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-400 font-semibold">
        Blog not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <Navbar />

      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-semibold text-sm mb-10 transition group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back
        </button>

        {/* Cover Image */}
        {blog.image && (
          <div className="w-full aspect-video rounded-2xl overflow-hidden mb-10 shadow-lg">
            <img
              src={getImageUrl(blog.image)}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Title + Author */}
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {blog.title}
          </h1>

          <div className="flex items-center gap-4 border-b pb-6">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100">
              {blog.author?.profilePicture ? (
                <img
                  src={getImageUrl(blog.author.profilePicture)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <User size={22} />
                </div>
              )}
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800">
                {blog.author?.name || "Anonymous"}
              </p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Clock size={12} />
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap">
          {blog.content}
        </div>

        {/* Comments */}
        <div className="mt-16">
          <CommentSection blogId={id} user={user} />
        </div>
      </article>
    </div>
  );
}