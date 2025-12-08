'use client'

import { useState, useRef, useEffect } from 'react'
import { Menu, Users, LogOut } from 'lucide-react'
import { useLogout } from '@/lib/hooks/useLogout';
import { useCurrentUser } from '@/lib/hooks/useUser';

interface NavbarProps {
  onMenuClick: () => void
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { data: user, isLoading } = useCurrentUser();
  const logoutMutation = useLogout();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-30">
      <div className="px-6 py-4 flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>

        <h1 className="text-2xl font-bold text-gray-800 hidden lg:block">
          Dashboard
        </h1>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 focus:outline-none"
          >
            <span className="text-sm font-medium text-gray-700 hidden sm:block capitalize">
              {isLoading ? "Memuat..." : user?.name || "Pengguna"}
            </span>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 shadow-xl rounded-xl z-40 p-2 animate-fadeIn">
              <button
                onClick={() => logoutMutation.mutate()}
                className="flex items-center gap-3 w-full px-3 py-2.5 
                           rounded-lg text-sm font-medium text-gray-700 
                           hover:bg-red-50 transition-all duration-150 
                           hover:text-red-600"
              >
                <LogOut className="w-4 h-4 text-red-500/70" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
