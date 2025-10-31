"use client";

import { User } from "lucide-react";

interface ProfilInfoProps {
  nama: string;
  nisn: string;
  noHp: string;
  uidRfid: string;
}

export default function InfoProfil({ nama, nisn, noHp, uidRfid }: ProfilInfoProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 space-y-6">
      <div className="flex items-center gap-3 border-b pb-4 mb-2">
        <User className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-800">Informasi Akun</h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap:</label>
        <p className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-semibold text-gray-800">
          {nama}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">NISN:</label>
        <p className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-semibold text-gray-800">
          {nisn}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">No. HP:</label>
        <p className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-semibold text-gray-800">
          {noHp}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">UID RFID:</label>
        <div className="w-full bg-indigo-50 border border-indigo-200 rounded-lg p-3 text-sm font-mono font-semibold text-indigo-800 shadow-inner">
          {uidRfid}
        </div>
      </div>
    </div>
  );
}
