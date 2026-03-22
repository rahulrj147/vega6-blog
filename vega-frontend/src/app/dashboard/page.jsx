"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/auth.service";
import { blogService } from "@/services/blog.service";
import { getImageUrl } from "@/lib/utils";

import {
  Plus,
  ExternalLink,
  FileText,
  MessageSquare,
  TrendingUp,
  Home,
} from "lucide-react";


export default function DashboardPage() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [statsData, setStatsData] = useState({ blogCount: 0, commentCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBlogs();
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const data = await authService.getDashboardStats();
      setStatsData(data);
    } catch (err) {}
  };


  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const d = await blogService.getAll({ author: user._id });
      setBlogs(d.result || []);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      label: "Blogs",
      value: statsData.blogCount,
      Icon: FileText,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Comments",
      value: statsData.commentCount,
      Icon: MessageSquare,
      color: "bg-purple-50 text-purple-600",
    },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500">
              Welcome back. Here's what's happening today.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="bg-white text-gray-600 border border-gray-200 px-5 py-2.5 rounded-xl font-semibold text-sm transition flex items-center gap-2 hover:bg-gray-50 shadow-sm"
            >
              <Home size={18} /> Home
            </Link>
            <Link
              href="/dashboard/create"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Plus size={18} /> New Blog
            </Link>
          </div>

        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {stats.map(({ label, value, Icon, color }) => (
            <div
              key={label}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex items-center gap-4 hover:shadow-xl transition"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
              >
                <Icon size={22} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>

        
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Blogs
            </h2>
            <Link
              href="/dashboard/my-blogs"
              className="text-sm font-semibold text-indigo-600 hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="divide-y">
            {loading ? (
              <div className="p-10 text-center">
                <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : blogs.length === 0 ? (
              <div className="p-10 text-center text-sm text-gray-500">
                No blogs found. Start writing today!
              </div>
            ) : (
              blogs.slice(0, 5).map((b) => (
                <div
                  key={b._id}
                  className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    {b.image ? (
                      <img
                        src={getImageUrl(b.image)}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gray-100" />
                    )}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">
                        {b.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {new Date(b.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${b._id}`}
                    target="_blank"
                    className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <ExternalLink size={16} />
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}