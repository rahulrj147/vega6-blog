"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/ui/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => { if (!loading && !user) router.push("/login"); }, [user, loading, router]);
  useEffect(() => setSidebarOpen(false), [pathname]);

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-white"><div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" /></div>;
  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-white flex-col md:flex-row">
      <button
        type="button"
        onClick={() => setSidebarOpen((v) => !v)}
        className="md:hidden fixed left-4 top-4 z-50 p-2 rounded-lg bg-white border border-gray-200 shadow-sm"
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      <div
        className={`md:hidden fixed inset-0 bg-black/30 z-40 ${sidebarOpen ? "block" : "hidden"}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className={`${sidebarOpen ? "block" : "hidden"} md:block`} aria-hidden={!sidebarOpen}>
        <Sidebar />
      </div>

      <main className="flex-1 md:ml-64 p-6 sm:p-8 md:p-10 pt-14 md:pt-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
