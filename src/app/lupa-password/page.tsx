"use client";
import { toast } from "sonner";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
// ============================================
// MAIN PAGE COMPONENT - LUPA PASSWORD
// ============================================
export default function ForgotPasswordPage() {
  const [nisn, setNisn] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  let isNullForm = false;
  if (nisn === "" || phoneNumber === "") {
    isNullForm = true;
  }

  const handleSubmit = () => {
    // Validasi field kosong
    if (!nisn || !phoneNumber) {
      toast.error("Mohon lengkapi semua field!");
      return;
    }

    // Validasi format nomor HP
    const phoneRegex = /^[0-9]{10,13}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast.error("Format nomor HP tidak valid. Masukkan 10-13 digit angka.");

      return;
    }

    // Simulasi kirim OTP
    console.log("Data:", { nisn, phoneNumber });

    // ✅ Buka modal setelah validasi sukses

    // Reset form
    setNisn("");
    setPhoneNumber("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
            <Image
              src="/LOGO.png"
              alt="Logo"
              width={250}
              height={250}
              className="mx-auto mb-5"
            />

            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-medium text-[#2F4C87] mb-2">
                Lupa Password
              </h2>
            </div>

            {/* Form */}
            <div>
              {/* Input NISN/NIP */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  NISN/NIP
                </label>
                <input
                  type="text"
                  value={nisn}
                  onChange={(e) => setNisn(e.target.value)}
                  placeholder="Masukkan NISN atau NIP Anda"
                  className="w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              </div>

              {/* Input NO HP */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  NO HP
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Masukkan Nomor Hp"
                  className="w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                  Pastikan nomor anda terdaftar, kami akan mengirimkan Kode OTP
                  secara otomatis di whatsapp anda.
                </p>
              </div>

              {/* Button Kirim OTP */}
              <button
                disabled={isNullForm}
                onClick={handleSubmit}
                className={`w-full ${
                  isNullForm ? "opacity-50 cursor-not-allowed" : ""
                } bg-[#2F4C87] text-white py-3.5 rounded-lg font-semibold text-lg hover:bg-[#253a6a] transform hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-xl mt-2`}
              >
                Kirim OTP
              </button>

              {/* Link Kembali ke Login */}
              <Button asChild variant="link" className="mt-4 mx-auto">
                <Link href="/login">
                  <MoveLeft className="mr-2" /> Kembali ke Login
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center pb-8">
        <p className="text-[#2F4C87] font-semibold text-lg">
          Smart System for School Attendance Needs.
        </p>
      </footer>
    </div>
  );
}
