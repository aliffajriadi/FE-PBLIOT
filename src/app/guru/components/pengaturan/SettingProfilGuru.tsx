"use client";

import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import ProfilInfo from "./ProfilInfo";
import UbahPassword from "./UbahPassword";

// Mock profile
const mockProfile = {
  nama: "Dr. Yuki, S.KOM, M.KOM, PHD",
  nip: "198503152010011001",
  noHp: "082170251116",
  uidRfid: "A1:B2:C3:D4:E5",
};

export default function SettingProfilGuru() {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-3xl font-bold tracking-tight text-gray-800 flex items-center gap-2">
        <Settings className="w-7 h-7 text-primary-600" />
        Pengaturan Profil
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProfilInfo {...mockProfile} />
        <UbahPassword />
      </div>
    </motion.div>
  );
}
