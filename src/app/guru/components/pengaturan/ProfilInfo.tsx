"use client";

import { User } from "lucide-react";

// Props untuk ProfilInfo
interface ProfilInfoProps {
  nama: string;
  nip: string;
  noHp: string;
  uidRfid: string;
}

// Komponen untuk menampilkan informasi profil guru
export default function ProfilInfo({ nama, nip, noHp, uidRfid }: ProfilInfoProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 border-b pb-4 mb-2">
        <User className="w-5 h-5 text-primary-600" />
        <h2 className="text-xl font-semibold text-gray-800">Informasi Akun</h2>
      </div>

      {/* Nama Lengkap */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap:</label>
        <p className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-semibold text-gray-800">
          {nama}
        </p>
      </div>

      {/* NIP */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">NIP:</label>
        <p className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-semibold text-gray-800">
          {nip}
        </p>
      </div>

      {/* Nomor HP */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">No. HP:</label>
        <p className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-semibold text-gray-800">
          {noHp}
        </p>
      </div>

      {/* UID RFID */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">UID RFID:</label>
        <div className="w-full bg-indigo-50 border border-indigo-200 rounded-lg p-3 text-sm font-mono font-semibold text-primary-800 shadow-inner tracking-wide">
          {uidRfid}
        </div>
      </div>
    </div>
  );
}
