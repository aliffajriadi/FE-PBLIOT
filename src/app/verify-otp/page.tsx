"use client";
import React, { useState, useEffect } from "react";
import { OtpInput } from "./component/Otp-Input";
import { Countdown } from "./component/Countdown";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { toast } from "sonner";

export default function OtpVerificationPage() {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [countdown, setCountdown] = useState(180);
  const [canResend, setCanResend] = useState(false);
  const [isNullForm, setIsNullForm] = useState(true);

  // Update isNullForm setiap kali otp berubah
  useEffect(() => {
    setIsNullForm(otp.some((digit) => digit === ""));
  }, [otp]);

  // Countdown effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleSubmit = () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 4) {
      toast.error("Mohon lengkapi semua digit OTP!");
      return;
    }
    toast.info(`Kode OTP yang dimasukkan: ${otpCode}\n\nVerifikasi berhasil!`);
    setOtp(["", "", "", ""]);
  };

  const handleResendOtp = () => {
    if (canResend) {
      toast.success("Kode OTP baru telah dikirim ke WhatsApp Anda!");
      setCountdown(180);
      setCanResend(false);
      setOtp(["", "", "", ""]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
            <Image
              className="mx-auto mb-5"
              src="/LOGO.png"
              alt="Logo SmartPresence"
              width={250}
              height={250}
            />

            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-medium text-[#2F4C87] mb-2">
                Masukkan Kode OTP
              </h2>
            </div>

            <div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
                  OTP
                </label>
                <OtpInput otp={otp} setOtp={setOtp} />
              </div>

              <Countdown
                countdown={countdown}
                canResend={canResend}
                onResend={handleResendOtp}
              />

              <button
                disabled={isNullForm}
                onClick={handleSubmit}
                className={`w-full ${
                  isNullForm ? "opacity-50 cursor-not-allowed" : ""
                } bg-[#2F4C87] text-white py-3.5 rounded-lg font-semibold text-lg hover:bg-[#253a6a] transform hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-xl`}
              >
                Kirim OTP
              </button>

              <div className="text-center mt-6">
                <Button variant="link" asChild><Link href="/login"><MoveLeft/> Kembali ke halaman login</Link></Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center pb-8">
        <p className="text-[#2F4C87] font-semibold text-lg">
          Smart System for School Attendance Needs.
        </p>
      </footer>
    </div>
  );
}
