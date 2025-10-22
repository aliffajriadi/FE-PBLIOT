'use client';

import AdminLayout from '../component/layout/AdminLayout';
import TeachersTable from '../component/guru/TableGuru';
import TableHeaderControls from '../component/guru/TableHeaderControls';

export default function TeachersPage() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Data Guru</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <TableHeaderControls />
        <TeachersTable />
      </div>
    </AdminLayout>
  );
}