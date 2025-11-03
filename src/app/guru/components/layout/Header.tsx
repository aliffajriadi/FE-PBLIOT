'use client';

import { useState } from 'react';
import Sidebar from '../layout/Sidebar';
import { Menu, Users } from 'lucide-react';

interface GuruLayoutProps {
  children: React.ReactNode;
}

export default function Header({ children }: GuruLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="lg:ml-72">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center md:justify-end justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700 hidden sm:block">Guru</span>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-700 to-blue-600 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}