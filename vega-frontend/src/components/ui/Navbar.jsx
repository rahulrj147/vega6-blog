"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Button from "./Button";
import { LayoutDashboard, User } from "lucide-react";
import { getImageUrl } from "@/lib/utils";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-50 px-6 py-4 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-sm">V</div>
          <span className="font-black text-xl tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">VEGA6</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest">Explore</Link>
          {user ? (
            <div className="flex items-center gap-4 border-l border-gray-100 pl-6">
              <Link href="/dashboard" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors">
                <LayoutDashboard size={18} /> <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                {user.profilePicture ? <img src={getImageUrl(user.profilePicture)} className="w-full h-full object-cover" /> : <User size={18} className="text-gray-300" />}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest">Sign In</Link>
              <Link href="/register"><Button className="!px-5 !py-2 !rounded-xl !text-sm">Get Started</Button></Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
