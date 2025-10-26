'use client';

import AdminLayout from '../../../component/layout/AdminLayout';
import SiswaForm from '../../../component/siswa/FormSiswa';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getSiswaById } from '@/lib/mockData';
import { useEffect, useState } from 'react';
import { Siswa } from '@/types/Siswa';

interface EditSiswaPageProps {
  params: {
    nisn: string;
  };
}

export default function EditSiswaPage({ params }: EditSiswaPageProps) {
  const router = useRouter();
  const [Siswa, setSiswa] = useState<Siswa | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const fetchTeacher = async () => {  
      // In real app, this would be an API call
      const data = getSiswaById(params.nisn);
      setSiswa(data || null);
      setIsLoading(false);
    };

    fetchTeacher();
  }, [params.nisn]);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  if (!Siswa) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">Data Siswa tidak ditemukan</p>
          <button
            onClick={() => router.push('/admin/DataSiswa')}
            className="mt-4 text-blue-600 hover:underline"
          >
            Kembali ke Daftar Siswa
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
        <h1 className="text-2xl font-bold text-gray-800">Edit Data Siswa</h1>
        <p className="text-gray-600 mt-1">NISN Siswa: {Siswa.nisn}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <SiswaForm mode="edit" initialData={Siswa} />
      </div>
    </AdminLayout>
  );
}   