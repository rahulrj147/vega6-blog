"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { blogService } from "@/services/blog.service";
import Navbar from "@/components/ui/Navbar";
import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import { ArrowRight, Clock, User } from "lucide-react";
import { getImageUrl } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 6;


  useEffect(() => {
    setLoading(true);
    blogService
      .getAll({ limit, page })
      .then((d) => {
        setBlogs(d.result || []);
        setPagination(d.pagination);
      })
      .finally(() => setLoading(false));
  }, [page]);


  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <header className="py-28 px-6 text-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
          Share your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            ideas
          </span>{" "}
          with the world.
        </h1>

        <p className="text-gray-500 max-w-2xl mx-auto mb-10 text-lg">
          Join a modern community of creators and readers. Explore blogs,
          insights and knowledge from people around the world.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link href={user ? "/dashboard" : "/login"}>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl">
              Get Started Free
            </Button>
          </Link>

          <a
            href="#blogs"
            className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition"
          >
            Explore Blogs →
          </a>
        </div>
      </header>

      {/* Blog Section */}
      <main id="blogs" className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-bold text-gray-800">
            Latest Blogs
          </h2>

          <Link
            href={user ? "/dashboard" : "/login"}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group"
          >
            Write a blog
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-10 h-10 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((b) => (
              <Link
                href={`/blog/${b._id}`}
                key={b._id}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
              >
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  {b.image ? (
                    <img
                      src={getImageUrl(b.image)}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-indigo-50 flex items-center justify-center text-indigo-300">
                      <User size={40} />
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="text-indigo-600 font-semibold">
                      {b.author?.name}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {new Date(b.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition">
                    {b.title}
                  </h3>

                  <p className="text-sm text-gray-500 line-clamp-2">
                    {b.content}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        
        <div className="mt-16">
          <Pagination
            pagination={pagination}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      </main>


      
      <footer className="py-16 text-center border-t border-gray-100 bg-gray-50">
        <p className="text-sm text-gray-500 mb-4">
          © 2026 VEGA6 Blog Platform. All rights reserved.
        </p>

        <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
          <Link href="/login" className="hover:text-indigo-600">
            Login
          </Link>
          <Link href="/register" className="hover:text-indigo-600">
            Register
          </Link>
          <a href="#" className="hover:text-indigo-600">
            Privacy
          </a>
        </div>
      </footer>
    </div>
  );
}