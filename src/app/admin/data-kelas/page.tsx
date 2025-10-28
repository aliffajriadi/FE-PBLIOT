'use client';

import AdminLayout from '../component/layout/AdminLayout';
import ClassesTable from '../component/kelas/ClassesTable';
import TableHeaderControls from '../component/kelas/TableHeaderControls';

export default function ClassesPage() {
  return (
    <AdminLayout>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <TableHeaderControls />
        <ClassesTable />
      </div>
    </AdminLayout>
  );
}