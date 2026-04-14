"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FileText, Users, BookOpen, Settings, ChevronLeft, LogOut, Menu, ClipboardList
} from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: ClipboardList, label: "Applications", href: "/admin/applications" },
  { icon: Users, label: "Leads", href: "/admin/leads" },
  { icon: BookOpen, label: "Blog", href: "/admin/blog" },
  { icon: FileText, label: "Team", href: "/admin/team" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn("flex items-center gap-3 p-5 border-b border-[#3A2428]", collapsed && "justify-center px-3")}>
        <Image src="/kle-logo.png" alt="KLE" width={36} height={36} className="object-contain flex-shrink-0" />
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="font-bold text-white text-sm font-[family-name:var(--font-playfair)] whitespace-nowrap">KLE Mortgage</p>
            <p className="text-xs text-gray-400 whitespace-nowrap">Admin CRM</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ icon: Icon, label, href }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#6B1C23] text-white"
                  : "text-gray-300 hover:bg-[#2A1A1C] hover:text-white",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? label : undefined}
            >
              <Icon className="w-4.5 h-4.5 flex-shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={cn("p-4 border-t border-[#3A2428] space-y-2", collapsed && "px-2")}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center gap-2 w-full px-3 py-2 text-xs text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-[#2A1A1C]"
        >
          <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
          {!collapsed && "Collapse"}
        </button>
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 px-3 py-2 text-xs text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-[#2A1A1C]",
            collapsed && "justify-center px-2"
          )}
          title={collapsed ? "View Site" : undefined}
        >
          <FileText className="w-4 h-4" />
          {!collapsed && "View Site"}
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className={cn(
            "flex items-center gap-2 w-full px-3 py-2 text-xs text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-[#2A1A1C]",
            collapsed && "justify-center px-2"
          )}
          title={collapsed ? "Sign Out" : undefined}
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && "Sign Out"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F8F6F3] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col bg-[#1C1214] border-r border-[#3A2428] transition-all duration-300 flex-shrink-0",
          collapsed ? "w-16" : "w-56"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64 bg-[#1C1214] flex flex-col">{sidebarContent}</div>
          <div className="flex-1 bg-black/50" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-[#E8E0D8]">
          <button onClick={() => setMobileOpen(true)} className="p-1.5 rounded-md hover:bg-[#F0EBE3]">
            <Menu className="w-5 h-5 text-[#1A1A1A]" />
          </button>
          <Image src="/kle-logo.png" alt="KLE" width={28} height={28} className="object-contain" />
          <span className="font-bold text-sm text-[#1A1A1A] font-[family-name:var(--font-playfair)]">KLE Admin</span>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
