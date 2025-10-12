"use client";
import React, { useState } from 'react';

// ============================================
// MAIN PAGE COMPONENT - LUPA PASSWORD
// ============================================
export default function ForgotPasswordPage() {
  const [nisn, setNisn] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = () => {
    // Validasi field kosong
    if (!nisn || !phoneNumber) {
      alert('Mohon lengkapi semua field!');
      return;
    }

    // Validasi format nomor HP
    const phoneRegex = /^[0-9]{10,13}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert('Format nomor HP tidak valid. Masukkan 10-13 digit angka.');
      return;
    }

    // Simulasi kirim OTP
    console.log('Data:', { nisn, phoneNumber });
    alert(`OTP akan dikirim ke WhatsApp nomor: ${phoneNumber}\n\nNISN/NIP: ${nisn}`);
    
    // Reset form
    setNisn('');
    setPhoneNumber('');
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
                  Pastikan nomor anda terdaftar, kami akan mengirimkan Kode OTP secara otomatis di whatsapp anda.
                </p>
              </div>

              {/* Button Kirim OTP */}
              <button
                onClick={handleSubmit}
                className="w-full bg-[#2F4C87] text-white py-3.5 rounded-lg font-semibold text-lg hover:bg-[#253a6a] transform hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-xl mt-2"
              >
                Kirim OTP
              </button>

              {/* Link Kembali ke Login */}
              <div className="text-center mt-6">
                <a 
                  href="/login" 
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
                  <span>Kembali ke Login</span>
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