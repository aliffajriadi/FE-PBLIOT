"use client";

import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import ProfilInfo from "./ProfilInfo";
import UbahPassword from "./UbahPassword";
import { useCurrentUser } from "@/lib/hooks/useUser";

export default function SettingProfilGuru() {

  const { data: user, isLoading } = useCurrentUser();
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
        <ProfilInfo 
          name={user.name} 
          nip={user.nip} 
          nohp={user.nohp || "-"} 
          uidRfid={user.rfid?.rfid}
        />
        <UbahPassword />
      </div>
    </motion.div>
  );
}
