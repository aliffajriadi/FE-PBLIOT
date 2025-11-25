'use client';

import { Edit2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDeleteUser } from '@/lib/hooks/useUser'; // Menggunakan hook delete yang sama
import { useState } from 'react';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'; // Menggunakan modal yang sama
// Hapus import Teacher jika tidak dipakai, atau sesuaikan jika mau pakai tipe Siswa
import { Siswa } from '@/types/Siswa'; 


interface TableSiswaProps {
  data: Siswa[];
}

export default function TableSiswa({ data }: TableSiswaProps) {
  const router = useRouter();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false); 

  // Navigasi Edit (Sesuai route siswa)
  const handleEdit = (id: number) => router.push(`/admin/data-siswa/${id}/edit`);
  
  // Hook Delete
  const deleteUserMutation = useDeleteUser();

  const handleConfirmDelete = (id: number) => {
    setSelectedId(id);
    setShowModal(true);
  };
  
  const handleDelete = () => {
    if (!selectedId) return;

    deleteUserMutation.mutate(selectedId, {
      onSuccess: () => {
        setShowModal(false);
        setSelectedId(null);
        // Refresh halaman agar data hilang dari tabel
        window.location.reload();
      },
      onError: (err: any) => {
        console.error(err);
        alert("Gagal menghapus siswa: " + (err?.response?.data?.message || "Terjadi kesalahan"));
      },
    });
  };

  // State Loading / Kosong
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Tidak ada data siswa
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-xl shadow-sm min-w-[600px]">
          <thead className="bg-gray-50">
            <tr>
              {/* Header Kolom Siswa */}
              <th className="text-left py-3 px-4 font-semibold text-gray-700">NISN</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Nama Siswa</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">UID RFID</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Kelas</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Nama Orang Tua</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Kontak Ortu</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((siswa:Siswa, index) => (
              <tr
                key={siswa.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {/* 1. NISN */}
                <td className="py-4 px-4 font-mono text-sm text-gray-600">
                  {siswa.nisn }
                </td>

                {/* 2. Nama Siswa */}
                <td className="py-4 px-4 font-medium text-gray-800">
                  {siswa.name}
                </td>

                {/* 3. RFID */}
                <td className="py-4 px-4 text-gray-600">
                  {siswa.rfid?.rfid || '-'}
                </td>

                {/* 4. Kelas (Placeholder Style) */}
                <td className="py-4 px-4 text-gray-600">
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-lg font-medium">
                    {siswa.kelas || '-'}
                  </span>
                </td>

                {/* 5. Nama Orang Tua (Placeholder) */}
                <td className="py-4 px-4 text-gray-600 font-medium text-sm">
                  {siswa.nama_orang_tua || '-'}
                </td>

                {/* 6. Kontak Ortu */}
                <td className="py-4 px-4 font-mono text-sm text-gray-600">
                  {siswa.nohp}
                </td>

                {/* 7. Aksi (Sama persis dengan Guru) */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(Number(siswa.id))}
                      className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleConfirmDelete(Number(siswa.id))}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Konfirmasi (Sama persis dengan Guru) */}
      <ConfirmDeleteModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Hapus Data Siswa"
        message="Apakah kamu yakin ingin menghapus data siswa ini? Tindakan ini tidak dapat dibatalkan."
      />
    </>
  );
}