"use client";

import { ChevronLeft, ChevronRight, Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Teacher } from "@/types/Guru";
import { useDeleteUser } from "@/lib/hooks/useUser";
import { useState } from "react";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { toast } from "sonner";

interface TeachersTableProps {
  data: Teacher[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalData: number;
  limit: number;
}


export default function TeachersTable({
  data,
  page,
  totalPages,
  onPageChange,
  totalData,
  limit,
}: TeachersTableProps) {
  const router = useRouter();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

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
        toast.success("Data Guru berhasil dihapus");

        // jika halaman kosong setelah hapus, mundur 1 halaman
        if (data.length === 1 && page > 1) {
          onPageChange(page - 1);
        } else {
          onPageChange(page); // refresh halaman sekarang
        }
      },
      onError: (err: unknown) => {
        const msg = getErrorMessage(err);
        toast.error("Gagal menghapus Guru", { description: msg });
      },
    });
  };
  

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + data.length;

  // Komponen foto guru
  function FotoGuru({ photo, name }: { photo?: string; name?: string }) {
    const [isLoading, setIsLoading] = useState(true);

    const src = photo === "default"
      ? `/default.jpeg`
      : `https://jokilek.diskon.com/storage/files/${photo}`;

    return (
      <div className="relative w-[50px] h-[50px]">
        {isLoading && (
          <div className="absolute inset-0 rounded-full bg-gray-200 animate-pulse" />
        )}

        <Image
          src={src}
          alt={name || "Guru"}
          width={50}
          height={50}
          className={`rounded-full object-cover transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoadingComplete={() => setIsLoading(false)}
        />
      </div>
    );
  }

  return (
    <>
      {/* ===== TABLE ===== */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-xl shadow-sm min-w-[600px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">
                Foto Guru
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">
                NIP
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">
                Nama Guru
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">
                Kontak
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((guru) => (
              <tr
                key={guru.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-4">
                  <FotoGuru photo={guru.photo} name={guru.name} />
                </td>

                <td className="py-4 px-4 font-mono text-sm text-gray-600">
                  {guru.nip ?? "-"}
                </td>

                <td className="py-4 px-4 font-medium text-gray-800">
                  {guru.name}
                </td>

                <td className="py-4 px-4 text-gray-600">
                  {guru.nohp ?? "-"}
                </td>

                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        router.push(`/admin/data-guru/${guru.id}/edit`)
                      }
                      className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                    </button>

                    <button
                      onClick={() => handleConfirmDelete(Number(guru.id))}
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

      {/* ===== PAGINATION ===== */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 px-2">
        <p className="text-sm text-gray-500">
          Menampilkan{" "}
          <span className="font-medium text-gray-900">{startIndex + 1}</span>{" "}
          sampai{" "}
          <span className="font-medium text-gray-900">
            {Math.min(endIndex, totalData)}
          </span>{" "}
          dari <span className="font-medium text-gray-900">{totalData}</span>{" "}
          data
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  page === p
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
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
              title="Hapus Data Guru"
              message="Apakah kamu yakin ingin menghapus data Guru ini? Tindakan ini tidak dapat dibatalkan."
            />
    </>
  );
}
