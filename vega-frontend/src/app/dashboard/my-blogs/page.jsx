"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { blogService } from "@/services/blog.service";
import { getImageUrl } from "@/lib/utils";
import BlogModal from "@/components/BlogModal";
import DeleteModal from "@/components/ui/DeleteModal";
import Pagination from "@/components/ui/Pagination";
import { Search, Edit3, Trash2, ExternalLink, Plus } from "lucide-react";


export default function MyBlogsPage() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");
  const limit = 10;


  useEffect(() => {
    if (user) fetchBlogs();
  }, [user, page]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const d = await blogService.getAll({ author: user._id, page, limit });
      setBlogs(d.result || []);
      setPagination(d.pagination);
    } finally {
      setLoading(false);
    }
  };

  const onSave = async (fd) => {
    if (editing) await blogService.update(editing._id, fd);
    else await blogService.create(fd);
    setModal(false);
    setEditing(null);
    fetchBlogs();
  };

  const onDelete = (id) => {
    setItemToDelete(id);
    setDeleteModal(true);
  };

  const onConfirmDelete = async () => {
    if (!itemToDelete) return;
    setDeleting(true);
    try {
      await blogService.delete(itemToDelete);
      setDeleteModal(false);
      setItemToDelete(null);
      fetchBlogs();
    } finally {
      setDeleting(false);
    }
  };


  const filtered = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Blogs</h1>
            <p className="text-sm text-gray-500">
              Manage, edit and publish your blogs.
            </p>
          </div>

          <Link
            href="/dashboard/create"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <Plus size={18} /> New Blog
          </Link>
        </div>

        
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition outline-none bg-white shadow-sm"
          />
        </div>

        
        <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-20 text-center">
              <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm text-gray-500 mt-4">Loading blogs...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-20 text-center">
              <p className="text-gray-500 text-sm">No blogs found.</p>
              <Link
                href="/dashboard/create"
                className="inline-block mt-4 text-indigo-600 font-semibold hover:underline"
              >
                Create your first blog →
              </Link>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((b) => (
                  <tr key={b._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {b.image ? (
                          <img
                            src={getImageUrl(b.image)}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-100" />
                        )}
                        <span className="font-semibold text-gray-800">
                          {b.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(b.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/blog/${b._id}`}
                          target="_blank"
                          className="p-2 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <ExternalLink size={16} />
                        </Link>
                        <button
                          onClick={() => {
                            setEditing(b);
                            setModal(true);
                          }}
                          className="p-2 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => onDelete(b._id)}
                          className="p-2 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        
        <div className="pt-4">
          <Pagination 
            pagination={pagination} 
            onPageChange={(p) => setPage(p)} 
          />
        </div>

        
        <BlogModal
          isOpen={modal}
          onClose={() => setModal(false)}
          onSubmit={onSave}
          initialData={editing}
          title={editing ? "Edit Blog" : "New Blog"}
        />

        <DeleteModal 
          isOpen={deleteModal}
          onClose={() => setDeleteModal(false)}
          onConfirm={onConfirmDelete}
          loading={deleting}
        />

      </div>
    </div>
  );
}