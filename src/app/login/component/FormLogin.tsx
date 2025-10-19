"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import Image from "next/image";
import { InputFieldProps, SelectFieldProps, FormData } from "@/types/login";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// ============================================
// INPUT FIELD COMPONENT
// ============================================
const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  showPasswordToggle = false,
  onTogglePassword,
  showPassword,
}) => {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <input
          type={
            showPasswordToggle ? (showPassword ? "text" : "password") : type
          }
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
const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
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
// LOGIN FORM COMPONENT
// ============================================
const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    loginAs: "SISWA",
    nisn: "",
    password: "",
  });
  let isNullForm = false;
  if (formData.nisn === "" || formData.password === "") {
    isNullForm = true;
  }

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const loginOptions = [
    { value: "SISWA", label: "SISWA", loginWith: "NOMOR INDUK SISWA" },
    { value: "GURU", label: "GURU", loginWith: "NOMOR INDUK PEGAWAI" },
    { value: "ADMIN", label: "ADMIN", loginWith: "USERNAME" },
  ];

  const handleInputChange =
    (field: keyof FormData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://0.0.0.0:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Login berhasil sebagai ${data.role}`);
      } else {
        alert(`Login gagal: ${data.message}`);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat login.");
    }
  };

  return (
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
            Masuk ke Dashboard
          </h2>
          <p className="text-sm text-gray-500">
            Monitoring Absensi Siswa dan Guru
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <SelectField
            label="LOGIN SEBAGAI"
            value={formData.loginAs}
            onChange={handleInputChange("loginAs")}
            options={loginOptions}
          />

          <InputField
            label={
              formData.loginAs === "SISWA"
                ? "NOMOR INDUK SISWA"
                : formData.loginAs === "GURU"
                ? "NOMOR INDUK PEGAWAI"
                : "USERNAME"
            }
            type="text"
            placeholder={
              formData.loginAs === "SISWA"
                ? "Masukkan NISN Anda"
                : formData.loginAs === "GURU"
                ? "Masukkan NIP Anda"
                : "Masukkan Username Anda"
            }
            value={formData.nisn}
            onChange={handleInputChange("nisn")}
          />

          <InputField
            label="Password"
            placeholder="Masukkan password Anda"
            value={formData.password}
            onChange={handleInputChange("password")}
            showPasswordToggle={true}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />

          <div className="text-right mt-6">
            <Button asChild variant="link"><Link href="/lupa-password">Lupa Password?</Link></Button>
          </div>

          <button
            type="submit"
            disabled={isNullForm}
            className={`w-full bg-[#2F4C87] text-white py-3.5 rounded-lg font-semibold text-lg transform transition-all duration-200 shadow-md hover:shadow-xl 
    ${
      !formData.nisn || !formData.password
        ? "opacity-50 cursor-not-allowed"
        : "hover:bg-[#253a6a] hover:-translate-y-0.5"
    }`}
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;