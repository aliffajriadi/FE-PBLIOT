'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '../component/layout/Layout';
import SiswaTable from '../component/siswa/TableSiswa';
import TableHeaderControls from '../component/siswa/TableHeaderControls';
import { useUsers } from '@/lib/hooks/useUser';

export default function SiswaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // 1. PANGGIL API (Ambil data asli dari Database)
  // useUsers() akan mengambil semua user (admin, guru, siswa) dari backend
  const { data, isLoading, isError } = useUsers(); 
  
  const [filteredStudents, setFilteredStudents] = useState([]);

  // 2. FILTER DATA (Hanya ambil yang role-nya 'siswa')
  useEffect(() => {
    if (data?.users) {
      // Ambil hanya user dengan role 'siswa'
      const students = data.users.filter(
        (u: any) => u.role?.toLowerCase() === 'siswa'
      );

      // Logika Pencarian (Search)
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        setFilteredStudents(
          students.filter(
            (s: any) =>
              s.name.toLowerCase().includes(q) ||
              (s.nisn && s.nisn.toLowerCase().includes(q))
          )
        );
      } else {
        setFilteredStudents(students);
      }
    }
  }, [data, searchQuery]);

  if (isLoading) return (
    <AdminLayout>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            Loading data siswa...
        </div>
    </AdminLayout>
  );

  if (isError) return (
    <AdminLayout>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center text-red-500">
            Gagal mengambil data. Pastikan backend menyala.
        </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        {/* Header dengan Pencarian & Tombol Tambah */}
        {/* Pastikan link addButtonLink mengarah ke form tambah siswa */}
        <TableHeaderControls 
            onSearch={setSearchQuery} 
            title="Data Siswa"
            addButtonLink="/admin/data-siswa/add" 
            addButtonLabel="Tambah Siswa"
        />
        
        {/* Tabel Data Asli */}
        {/* Mengirim data siswa yang sudah difilter ke komponen tabel */}
        <div className="mt-6">
            <SiswaTable data={filteredStudents} />
        </div>
      </div>
    </AdminLayout>
  );
}