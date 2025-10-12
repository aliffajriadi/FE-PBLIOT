"use client";
import React, { useState, useRef, useEffect } from 'react';

// ============================================
// OTP INPUT COMPONENT (4 boxes)
// ============================================
const OtpInput = ({ otp, setOtp }) => {
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  const handleChange = (index, value) => {
    // Hanya ambil karakter terakhir (untuk handle paste multiple chars)
    const newValue = value.slice(-1);
    
    // Update OTP array
    const newOtp = [...otp];
    newOtp[index] = newValue.toUpperCase();
    setOtp(newOtp);

    // Auto-focus ke input berikutnya jika ada value
    if (newValue && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Jika backspace dan input kosong, focus ke input sebelumnya
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4).toUpperCase();
    
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // Focus ke input terakhir yang diisi atau input terakhir
    const focusIndex = Math.min(pastedData.length, 3);
    inputRefs[focusIndex].current?.focus();
  };

  return (
    <div className="flex justify-center gap-3 sm:gap-4">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={inputRefs[index]}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="w-14 h-14 sm:w-16 sm:h-16 text-center text-2xl sm:text-3xl font-bold bg-gray-100 border-none rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 uppercase"
        />
      ))}
    </div>
  );
};

// ============================================
// MAIN PAGE COMPONENT - OTP VERIFICATION
// ============================================
export default function OtpVerificationPage() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Countdown Timer Effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleSubmit = () => {
    const otpCode = otp.join('');
    
    if (otpCode.length !== 4) {
      alert('Mohon lengkapi semua digit OTP!');
      return;
    }

    console.log('OTP Submitted:', otpCode);
    alert(`Kode OTP yang dimasukkan: ${otpCode}\n\nVerifikasi berhasil!`);
    
    // Reset OTP
    setOtp(['', '', '', '']);
  };

  const handleResendOtp = () => {
    if (canResend) {
      console.log('Resending OTP...');
      alert('Kode OTP baru telah dikirim ke WhatsApp Anda!');
      
      // Reset countdown
      setCountdown(60);
      setCanResend(false);
      setOtp(['', '', '', '']);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 flex flex-col">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
            
            {/* Logo */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-3">
                <svg 
                  width="50" 
                  height="50" 
                  viewBox="0 0 50 50" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#2F4C87]"
                >
                  <circle cx="13" cy="10" r="5" fill="currentColor" />
                  <circle cx="25" cy="10" r="5" fill="currentColor" />
                  <circle cx="37" cy="10" r="5" fill="currentColor" />
                  <path 
                    d="M13 18 C13 18, 15 25, 20 30 L20 45 C20 47, 18 47, 18 45 L18 32 C18 32, 15 27, 13 25 Z" 
                    fill="currentColor"
                  />
                  <path 
                    d="M25 18 C25 18, 28 35, 30 45 C30 47, 28 47, 28 45 C26 35, 23 18, 25 18 Z" 
                    fill="currentColor"
                  />
                </svg>
                
                <h1 className="text-2xl md:text-3xl font-bold text-[#2F4C87]">
                  Smart<span className="font-normal">Presence</span>
                </h1>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-medium text-[#2F4C87] mb-2">
                Masukkan Kode OTP
              </h2>
            </div>

            {/* Form */}
            <div>
              {/* Label OTP */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
                  OTP
                </label>
                
                {/* OTP Input Boxes */}
                <OtpInput otp={otp} setOtp={setOtp} />
              </div>

              {/* Countdown / Resend OTP */}
              <div className="text-center mb-6 mt-4">
                {!canResend ? (
                  <p className="text-sm text-gray-500">
                    Kirim ulang OTP dalam waktu{' '}
                    <span className="font-bold text-[#2F4C87]">{countdown}</span> detik
                  </p>
                ) : (
                  <button
                    onClick={handleResendOtp}
                    className="text-sm text-[#2F4C87] hover:text-[#253a6a] font-semibold transition-colors underline"
                  >
                    Kirim ulang OTP
                  </button>
                )}
              </div>

              {/* Button Kirim OTP */}
              <button
                onClick={handleSubmit}
                className="w-full bg-[#2F4C87] text-white py-3.5 rounded-lg font-semibold text-lg hover:bg-[#253a6a] transform hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-xl"
              >
                Kirim OTP
              </button>

              {/* Link Kembali */}
              <div className="text-center mt-6">
                <a 
                  href="/lupa-password" 
                  className="text-sm text-gray-600 hover:text-[#2F4C87] transition-colors font-medium inline-flex items-center justify-center space-x-1"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                    />
                  </svg>
                  <span>Kembali</span>
                </a>
              </div>
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