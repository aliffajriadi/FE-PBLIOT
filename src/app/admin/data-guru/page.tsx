// TeachersPage.tsx
"use client";

import AdminLayout from "../component/layout/Layout";
import TeachersTable from "../component/guru/TableGuru";
import TableHeaderControls from "../component/guru/TableHeaderControls";
import SkeletonTable from "@/components/SkeletonTable";
import { useState, useEffect } from "react";
import { useUserQuery } from "@/lib/hooks/useUser";
import { Teacher } from "@/types/Guru";

export default function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // --- Ambil data guru dari API ---
  const { data, isLoading, isError } = useUserQuery(
    page.toString(),
    limit.toString(),
    "guru"
  );
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);

  // --- Filter data tiap searchQuery atau data berubah ---
  useEffect(() => {
    if (data?.users) {
      const teachers = data.users.filter(
        (u: Teacher) => u.role?.toLowerCase() === "guru"
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

  if (isLoading)
    return (
      <AdminLayout>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center pb-4">
            <h3 className="text-2xl font-bold text-primary">Data Guru</h3>
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

  const totalPages = data?.total ? Math.ceil(data.total / limit) : 1;

  return (
    <AdminLayout>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <TableHeaderControls
          onSearch={setSearchQuery}
        />

        <div className="mt-6">
          <TeachersTable
            data={filteredTeachers}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            totalData={data?.total || filteredTeachers.length}
            limit={limit}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
