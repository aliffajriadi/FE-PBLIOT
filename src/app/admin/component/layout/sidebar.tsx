import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Users,
  GraduationCap,
  Building2,
  Calendar,
  Settings,
  X,
  LayoutDashboard
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
    { label: "Data Kelas", icon: Building2, href: "/admin/Datakelas" },
    { label: "Data Guru", icon: GraduationCap, href: "/admin/Dataguru" },
    { label: "Data Siswa", icon: Users, href: "/admin/siswa" },
    { label: "Laporan Absensi", icon: Calendar, href: "/admin/absensi" },
    { label: "Pengaturan", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white shadow-xl z-50 transition-transform duration-300
          w-72 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/LOGO.png"
              alt="SmartPresence Logo"
              width={200}
              height={200}
            />
          </div>
          <button onClick={onClose} className="lg:hidden">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <LayoutDashboard className="w-6 h-6 text-blue-700" />
              <h2 className="text-lg font-bold text-gray-800">Admin</h2>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-gray-600 hover:bg-gray-50"}
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
