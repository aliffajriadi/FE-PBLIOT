"use client";

import { User } from "lucide-react";
import { ProfilInfoProps } from "@/types/user";
import { useState } from "react";

export default function ProfilInfo({ name, nip, nohp, uidRfid }: ProfilInfoProps) {
  const [waNotificationEnabled, setWaNotificationEnabled] = useState(false);
  const [editableNoHp, setEditableNoHp] = useState(nohp);

  const handleToggle = () => {
    setWaNotificationEnabled(!waNotificationEnabled);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 relative space-y-6">

      <div className="flex items-center gap-3 border-b pb-4 mb-4">
        <User className="w-5 h-5 text-primary-600" />
        <h2 className="text-xl font-semibold text-gray-800">Informasi Akun</h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap:</label>
        <p className="w-full border border-gray-200 rounded-lg p-3 text-sm font-semibold text-gray-800 bg-gray-50">
          {name}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">NIP:</label>
          <p className="w-full border border-gray-200 rounded-lg p-3 text-sm font-semibold text-gray-800 bg-gray-50">
            {nip}
          </p>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">UID RFID:</label>
          <p className="w-full border border-gray-200 rounded-lg p-3 text-sm font-mono font-semibold text-gray-800">
            {uidRfid}
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">No. HP:</label>
        <input
          type="text"
          value={editableNoHp}
          onChange={(e) => setEditableNoHp(e.target.value)}
          className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Toggle Notifikasi ke WhatsApp */}
      <div className="flex items-center gap-3 mt-4 md:absolute md:bottom-6 md:left-6">
        <button
          onClick={handleToggle}
          role="switch"
          aria-checked={waNotificationEnabled}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            waNotificationEnabled ? "bg-primary" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              waNotificationEnabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
        <label className="text-sm font-medium text-gray-700 select-none cursor-pointer">
          Aktifkan notifikasi WhatsApp
        </label>
      </div>

    </div>
  );
}
