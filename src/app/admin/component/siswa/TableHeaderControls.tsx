'use client';

import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TableHeaderControls() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleAddSiswa = () => {
    router.push('/admin/DataSiswa/add');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
      <h2 className="text-xl font-bold text-gray-800">Data Siswa</h2>
      
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        {/* Search Bar */}
        <div className="relative flex-1 sm:flex-initial">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari Siswa....."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-80 pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Add Button */}
        <button
          onClick={handleAddSiswa}
          className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-6 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Siswa</span>
        </button>
      </div>
    </div>
  );
}