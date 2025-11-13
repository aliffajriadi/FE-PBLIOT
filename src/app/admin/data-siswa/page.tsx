'use client';

import AdminLayout from '../component/layout/Layout';
import SiswaTable from '../component/siswa/TableSiswa';
import TableHeaderControls from '../component/siswa/TableHeaderControls';

export default function SiswaPage() {
  return (
    <AdminLayout>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <TableHeaderControls />
        <SiswaTable />
      </div>
    </AdminLayout>
  );
}