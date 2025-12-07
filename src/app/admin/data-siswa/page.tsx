"use client";

import { useState } from "react";
import AdminLayout from "../component/layout/Layout";
import SiswaTable from "../component/siswa/TableSiswa";
import TableHeaderControls from "../component/siswa/TableHeaderControls";
import { useUserQuery } from "@/lib/hooks/useUser";
import SkeletonTable from "@/components/SkeletonTable";
import { Siswa } from "@/types/Siswa";

export default function SiswaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // jumlah data per halaman

  // Panggil API
  const { data, isLoading, isError } = useUserQuery(
    page.toString(),
    limit.toString(),
    "siswa"
  );

  // Filter data berdasarkan search
  const filteredStudents =
    data?.users.filter(
      (s: Siswa) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.nisn && s.nisn.toLowerCase().includes(searchQuery.toLowerCase()))
    ) || [];

  // Total pages dari backend
  const totalPages = data?.total ? Math.ceil(data.total / limit) : 1;

  if (isLoading)
    return (
      <AdminLayout>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center pb-4">
            <h3 className="text-2xl font-bold text-primary">Data Siswa</h3>
            <p className="text-gray-500 animate-pulse text-sm">
              Sedang Memuat Data....
            </p>
          </div>
          <SkeletonTable rows={10} cols={6} />
        </div>
      </AdminLayout>
    );

  if (isError)
    return (
      <AdminLayout>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center text-red-500">
          Gagal mengambil data. Pastikan backend menyala.
        </div>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <TableHeaderControls
          onSearch={setSearchQuery}
          title="Data Siswa"
          addButtonLink="/admin/data-siswa/add"
          addButtonLabel="Tambah Siswa"
        />

        <div className="mt-6">
          <SiswaTable
            data={filteredStudents}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            totalData={data.total}
            limit={limit}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
