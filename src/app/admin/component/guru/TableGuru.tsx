'use client';

import { Edit2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDeleteUser } from '@/lib/hooks/useUser';
import { useState } from 'react';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import { Teacher } from '@/types/Guru';

interface TeachersTableProps {
  data: Teacher[];
}

export default function TeachersTable({ data }: TeachersTableProps) {
  const router = useRouter();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false); 

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
      },
      onError: (err: unknown) => {
        console.error(err);
        alert("Gagal menghapus guru");
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
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Nama Guru</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">NIP</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">RFID Code</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((teacher: any, index: number) => (
              <tr
                key={teacher.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-4 font-mono text-sm text-gray-600">{`G00${index + 1}`}</td>
              <td className="py-4 px-4 font-medium text-gray-800">{teacher.name}</td>
              <td className="py-4 px-4 text-gray-600">{teacher.nip}</td>
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
  