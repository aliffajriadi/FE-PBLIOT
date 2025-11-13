'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, Users, LogOut } from 'lucide-react'

interface NavbarProps {
  role?: 'admin' | 'guru' | 'siswa'
  onMenuClick: () => void
}

export default function Navbar({ role = 'admin', onMenuClick }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    // Arahkan ke halaman login menggunakan router Next.js
    router.push('/login')
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-30">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Tombol buka sidebar di mobile */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>

        {/* Judul dashboard tetap */}
        <h1 className="text-2xl font-bold text-gray-800 hidden lg:block">
          Dashboard
        </h1>

        {/* Profil user */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 focus:outline-none"
          >
            <span className="text-sm font-medium text-gray-700 hidden sm:block capitalize">
              {role}
            </span>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-700 to-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
          </button>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-md z-40">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl"
              >
                <LogOut className="w-4 h-4 text-gray-600" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
