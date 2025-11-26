'use client';

import AdminLayout from '../component/layout/Layout';
import TeachersTable from '../component/guru/TableGuru';
import TableHeaderControls from '../component/guru/TableHeaderControls';
import { useState,useEffect } from 'react';
import { useUsers } from '@/lib/hooks/useUser';
import {Loading} from '@/components/Loading';
import {Teacher} from '@/types/Guru';
export default function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading, isError } = useUsers(); // fetch semua users
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  // Filter data setiap searchQuery berubah
  useEffect(() => {
    if (data?.users) {
      const teachers = data.users.filter(
        (u: Teacher) => u.role?.toLowerCase() === 'guru'
      );

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        setFilteredTeachers(
          teachers.filter(
            (t: Teacher) =>
              t.name?.toLowerCase().includes(q) ||
              t.nip?.toLowerCase().includes(q)
          )
        );
      } else {
        setFilteredTeachers(teachers);
      }
    }
  }, [data, searchQuery]);

  if (isLoading) return <div><Loading/></div>;
  if (isError) return <div>Error loading data.</div>;

  return (
    <AdminLayout>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <TableHeaderControls onSearch={setSearchQuery} />
        <TeachersTable data={filteredTeachers} />
      </div>
    </AdminLayout>
  );
}