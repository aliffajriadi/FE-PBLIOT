'use client';

import AdminLayout from '../../../component/layout/AdminLayout';
import TeacherForm from '../../../component/guru/FormGuru';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getTeacherById } from '@/lib/mockData';
import { useEffect, useState } from 'react';
import { Teacher } from '@/types/Guru';

interface EditTeacherPageProps {
  params: {
    id: string;
  };
}

export default function EditTeacherPage({ params }: EditTeacherPageProps) {
  const router = useRouter();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const fetchTeacher = async () => {
      // In real app, this would be an API call
      const data = getTeacherById(params.id);
      setTeacher(data || null);
      setIsLoading(false);
    };

    fetchTeacher();
  }, [params.id]);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  if (!teacher) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">Data guru tidak ditemukan</p>
          <button
            onClick={() => router.push('/admin/Dataguru')}
            className="mt-4 text-blue-600 hover:underline"
          >
            Kembali ke Daftar Guru
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Kembali</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Edit Data Guru</h1>
        <p className="text-gray-600 mt-1">ID Guru: {teacher.id}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <TeacherForm mode="edit" initialData={teacher} />
      </div>
    </AdminLayout>
  );
}