"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileText, PlusCircle, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const links = [
  { href: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/dashboard/my-blogs", label: "My Blogs", Icon: FileText },
  { href: "/dashboard/create", label: "Create Blog", Icon: PlusCircle },
  { href: "/dashboard/profile", label: "Profile", Icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col p-6 z-50 shadow-sm">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-sm">V</div>
        <span className="font-black text-lg tracking-tight text-gray-900 uppercase">Vega6</span>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {links.map(({ href, label, Icon }) => (
          <Link key={href} href={href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition ${pathname === href ? "bg-indigo-50 text-indigo-700" : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"}`}>
            <Icon size={18} /> {label}
          </Link>
        ))}
      </nav>

      <div className="pt-6 border-t border-gray-50 flex flex-col gap-4">
        <div className="flex items-center gap-3 px-2">
          {user?.profilePicture ? <img src={user.profilePicture} className="w-8 h-8 rounded-lg object-cover" /> : <div className="w-8 h-8 rounded-lg bg-gray-100" />}
          <div className="truncate"><p className="text-xs font-bold text-gray-900 truncate">{user?.name}</p></div>
        </div>
        <button onClick={() => { logout(); router.push("/login"); }} className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-red-400 hover:text-red-600 transition">
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </aside>
  );
}
