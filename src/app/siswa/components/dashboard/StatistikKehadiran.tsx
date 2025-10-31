"use client";

import { motion } from "framer-motion";

export default function StatistikKehadiran() {
  const data = [
    { label: "Kehadiran (Bulan ini)", value: "90%" },
    { label: "Total Terlambat (Bulan ini)", value: "3" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {data.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all"
        >
          <p className="text-sm text-gray-500 mb-1">{item.label}</p>
          <p className="text-3xl font-bold text-[#29437c]">{item.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
