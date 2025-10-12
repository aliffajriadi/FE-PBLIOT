"use client";
import React, { useState } from 'react';
import { Eye, EyeOff, ChevronDown } from 'lucide-react';

// ============================================
// INPUT FIELD COMPONENT (Reusable)
// ============================================
const InputField = ({ 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  showPasswordToggle = false,
  onTogglePassword,
  showPassword 
}) => {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPasswordToggle ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

// ============================================
// SELECT/DROPDOWN COMPONENT
// ============================================
const SelectField = ({ label, value, onChange, options }) => {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 bg-gray-100 border-none rounded-lg text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 cursor-pointer font-medium"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
      </div>
    </div>
  );
};

// ============================================
// LOGO COMPONENT
// ============================================
const SmartPresenceLogo = () => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-3">
        {/* Logo SVG */}
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
        
        {/* Brand Name */}
        <h1 className="text-2xl md:text-3xl font-bold text-[#2F4C87]">
          Smart<span className="font-normal">Presence</span>
        </h1>
      </div>
    </div>
  );
};

// ============================================
// LOGIN FORM COMPONENT (Main Form)
// ============================================
const LoginForm = () => {
  const [formData, setFormData] = useState({
    loginAs: 'SISWA',
    nisn: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const loginOptions = [
    { value: 'SISWA', label: 'SISWA' },
    { value: 'GURU', label: 'GURU' },
    { value: 'ADMIN', label: 'ADMIN' }
  ];

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://0.0.0.0:3000/api/auth/login", { // ganti sesuai port backend
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      alert(`Login berhasil sebagai ${data.role}`);
      // Bisa redirect ke dashboard misalnya
      // router.push("/dashboard");
    } else {
      alert(`Login gagal: ${data.message}`);
    }
  } catch (error) {
    console.error("Error saat login:", error);
    alert("Terjadi kesalahan, coba lagi nanti.");
  }
};

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
        {/* Logo */}
        <SmartPresenceLogo />

        {/* Form Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-medium text-[#2F4C87] mb-2">
            Masuk ke Dashboard
          </h2>
          <p className="text-sm text-gray-500">
            Monitoring Absensi Siswa dan Guru
          </p>
        </div>

        {/* Login Form */}
        <div>
          {/* Login As Dropdown */}
          <SelectField
            label="LOGIN SEBAGAI"
            value={formData.loginAs}
            onChange={handleInputChange('loginAs')}
            options={loginOptions}
          />

          {/* NISN/NIP Input */}
          <InputField
            label="NISN/NIP"
            type="text"
            placeholder="Masukkan NISN atau NIP Anda"
            value={formData.nisn}
            onChange={handleInputChange('nisn')}
          />

          {/* Password Input */}
          <InputField
            label="Password"
            placeholder="Masukkan password Anda"
            value={formData.password}
            onChange={handleInputChange('password')}
            showPasswordToggle={true}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />

          {/* Forgot Password Link */}
          <div className="text-right mb-6">
            <a 
              href="/lupa-password" 
              className="text-sm text-gray-600 hover:text-[#2F4C87] transition-colors font-medium"
            >
              Lupa password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#2F4C87] text-white py-3.5 rounded-lg font-semibold text-lg hover:bg-[#253a6a] transform hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-xl"
          >
            Masuk
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 flex flex-col">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center py-12">
        <LoginForm />
      </div>

      {/* Footer Text */}
      <footer className="text-center pb-8">
        <p className="text-[#2F4C87] font-semibold text-lg">
          Smart System for School Attendance Needs.
        </p>
      </footer>
    </div>
  );
}