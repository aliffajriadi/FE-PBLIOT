'use client';

import { Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDeleteUser } from '@/lib/hooks/useUser';
import { useState } from 'react';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import { Siswa } from '@/types/Siswa'; 
import { getErrorMessage } from '@/utils/getErrorMessage';
import { toast } from "sonner"; // Import Sonner

interface TableSiswaProps {
  data: Siswa[];
}

export default function TableSiswa({ data }: TableSiswaProps) {
  const router = useRouter();

  // --- STATE PAGINATION ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Ubah angka ini sesuai kebutuhan

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

  // --- NAVIGASI ---
  const handleEdit = (id: number) => router.push(`/admin/data-siswa/${id}/edit`);
  
  // --- DELETE LOGIC ---
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
        
        toast.success("Data siswa berhasil dihapus");

        // Cek jika halaman jadi kosong setelah hapus, mundur 1 halaman
        if (currentData.length === 1 && currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
      },
      onError: (err: unknown) => {
        console.error(err);
        const msg = getErrorMessage(err);
        toast.error("Gagal menghapus siswa", {
            description: msg
        });
      },
    });
  };

  // State Kosong
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
              <th className="text-left py-3 px-4 font-semibold text-gray-700">ID Siswa</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">NISN</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Nama Siswa</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Kontak Orang Tua</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">UID RFID</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((siswa : Siswa, index : number) => (
              <tr
                key={siswa.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {/* 0. ID Siswa (Disesuaikan dengan halaman aktif) */}
                <td className="py-4 px-4 font-mono text-sm text-gray-600">
                  {`S00${startIndex + index + 1}`}
                </td>

                {/* 1. NISN */}
                <td className="py-4 px-4 font-mono text-sm text-gray-600">
                  {siswa.nisn ?? '-' }
                </td>

                {/* 2. Nama Siswa */}
                <td className="py-4 px-4 font-medium text-gray-800">
                  {siswa.name}
                </td>

                {/* 3. Kontak Ortu */}
                <td className="py-4 px-4 text-gray-600">
                  {siswa.nohp}
                </td>

                {/* 4. UID RFID */}
                <td className="py-4 px-4 font-mono text-sm text-gray-600">
                  {siswa.rfid?.rfid || '-'}
                </td>

                {/* 5. Aksi */}
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

      {/* --- FOOTER PAGINATION --- */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 px-2">
        <p className="text-sm text-gray-500">
          Menampilkan <span className="font-medium text-gray-900">{data.length > 0 ? startIndex + 1 : 0}</span> sampai{' '}
          <span className="font-medium text-gray-900">
            {Math.min(endIndex, data.length)}
          </span>{' '}
          dari <span className="font-medium text-gray-900">{data.length}</span> data
        </p>

        <div className="flex items-center gap-2">
            <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
            <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === page
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                >
                {page}
                </button>
            ))}
            </div>

            <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
            <ChevronRight className="w-4 h-4" />
            </button>
        </div>
      </div>

      {/* Modal Konfirmasi */}
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