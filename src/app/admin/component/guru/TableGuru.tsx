'use client';

import { Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDeleteUser } from '@/lib/hooks/useUser';
import { useState } from 'react';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import { Teacher } from '@/types/Guru';
import { toast } from "sonner";

interface TeachersTableProps {
  data: Teacher[];
}

export default function TeachersTable({ data }: TeachersTableProps) {
  const router = useRouter();

  // --- STATE PAGINATION ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Ubah angka ini jika ingin menampilkan lebih banyak/sedikit

  // --- STATE LAINNYA ---
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  // --- LOGIKA PAGINATION ---
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  // Handler Ganti Halaman
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // --- LOGIKA EXISTING ---
  const handleEdit = (id: string) => router.push(`/admin/data-guru/${id}/edit`);
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
        toast.success("Data guru berhasil dihapus");
        
        // Reset ke halaman 1 jika halaman saat ini kosong setelah hapus
        if (currentData.length === 1 && currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
      },
      onError: (err: unknown) => {
        console.error(err);
        toast.error("Gagal menghapus guru", {
          description: "Terjadi kesalahan sistem, silakan coba lagi.",
        });
      },
    });
  };

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Tidak ada data guru
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-xl shadow-sm min-w-[600px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">ID Guru</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">NIP</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Nama Guru</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">No Telepon</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">RFID Code</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {/* Render data yang sudah di-slice (currentData) */}
            {currentData.map((teacher: Teacher, index: number) => (
              <tr
                key={teacher.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {/* Hitung nomor urut asli berdasarkan halaman */}
                <td className="py-4 px-4 font-mono text-sm text-gray-600">
                    {`G00${startIndex + index + 1}`}
                </td>
                <td className="py-4 px-4 font-medium text-gray-800">{teacher.nip}</td>
                <td className="py-4 px-4 text-gray-600">{teacher.name}</td>
                <td className="py-4 px-4 text-gray-600">{teacher.nohp ?? '-'}</td>
                <td className="py-4 px-4 text-gray-600">{teacher.rfid?.rfid ?? '-'}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(teacher.id)}
                      className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleConfirmDelete(Number(teacher.id))}
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

      {/* --- BAGIAN FOOTER PAGINATION --- */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 px-2">
        {/* Info Text */}
        <p className="text-sm text-gray-500">
          Menampilkan <span className="font-medium text-gray-900">{startIndex + 1}</span> sampai{' '}
          <span className="font-medium text-gray-900">
            {Math.min(endIndex, data.length)}
          </span>{' '}
          dari <span className="font-medium text-gray-900">{data.length}</span> data
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-2">
            {/* Tombol Previous */}
            <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
            <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Nomor Halaman */}
            <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === page
                    ? 'bg-primary text-white' // Ganti bg-primary sesuai config tailwind Anda, atau pakai bg-blue-600
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                >
                {page}
                </button>
            ))}
            </div>

            {/* Tombol Next */}
            <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
            <ChevronRight className="w-4 h-4" />
            </button>
        </div>
      </div>

      <ConfirmDeleteModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Hapus Data Guru"
        message="Apakah kamu yakin ingin menghapus data guru ini? Tindakan ini tidak dapat dibatalkan."
      />
    </>
  );
}