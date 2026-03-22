"use client";
import React, { useEffect } from "react";
import Sidebar from "@/components/ui/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => { if (!loading && !user) router.push("/login"); }, [user, loading, router]);

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-white"><div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" /></div>;
  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 ml-64 p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
