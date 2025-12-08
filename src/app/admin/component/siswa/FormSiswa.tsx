"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, X, User } from "lucide-react";
import { useCreateUser, useUpdateUser } from "@/lib/hooks/useUser";
import { Siswa, SiswaFormData, FormErrors } from "@/types/Siswa";
import React from "react";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

interface SiswaFormProps {
  mode: "add" | "edit";
  initialData?: Siswa;
}

export default function SiswaForm({ mode, initialData }: SiswaFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync: mutateCreate, isPending: isCreating } = useCreateUser();
  const { mutateAsync: mutateUpdate, isPending: isUpdating } = useUpdateUser();
  const isSubmitting = isCreating || isUpdating;

  const [formData, setFormData] = useState<SiswaFormData>({
    nisn: "",
    name: "",
    rfid: "",
    nohp: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Load data saat edit
  useEffect(() => {
    if (mode === "edit" && initialData) {
      console.log("Data awal edit:", initialData);

      setFormData({
        nisn: initialData.nisn || "",
        name: initialData.name || "",
        rfid: initialData.rfid?.rfid || "",
        nohp: initialData.nohp || "",
      });
    }
  }, [mode, initialData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nisn.trim()) {
      newErrors.nisn = "NISN harus diisi";
    }
    if (!formData.name.trim()) {
      newErrors.nama_lengkap = "Nama lengkap harus diisi";
    }
    if (!formData.nohp.trim()) {
      newErrors.nohp = "Kontak orang tua harus diisi";
    }
    if (!(formData.rfid || "").trim()) {
      newErrors.rfidCode = "UID RFID harus diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const basePayload = {
      name: formData.name,
      role: "siswa" as const,
      nisn: formData.nisn,
      rfidCode: formData.rfid,
      nohp: formData.nohp,
    };

    try {
      if (mode === "add") {
        await mutateCreate({
          ...basePayload,
          password: "siswa123",
        });
        toast.success("Data siswa berhasil dibuat!");
      } else if (mode === "edit" && initialData?.id) {
        await mutateUpdate({
          id: Number(initialData.id),
          data: basePayload,
        });
        toast.success("Data siswa berhasil diperbarui!");
      }

      router.push("/admin/data-siswa");
    } catch (err: unknown) {
      const msg = getErrorMessage(err);
      toast.error("Gagal menyimpan data", { description: msg });
    } finally {
      queryClient.invalidateQueries({ queryKey: ["userParams"] });
    }
  };

  const handleCancel = () => {
    router.push("/admin/data-siswa");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const getPhotoUrl = () => {
    if (!initialData?.photo || initialData.photo === "default") {
      return "/default.jpeg";
    }
    return `https://jokilek.diskon.com/storage/files/${initialData.photo}`;
  };

  return (
    <div className="space-y-6">
      {/* Section Foto Profil */}
      {mode === "edit" && initialData && (
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Foto Profil Siswa
          </h3>
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
              <Image
                src={getPhotoUrl()}
                alt={`Foto ${initialData.name || "Siswa"}`}
                fill
                className="object-cover"
                sizes="128px"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">
                Foto profil siswa saat ini
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <User className="w-4 h-4" />
                <span>{initialData.name || "Nama belum diisi"}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Data Siswa */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-6">
          {mode === "add" ? "Tambah Data Siswa" : "Edit Data Siswa"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* NISN */}
            <div>
              <label
                htmlFor="nisn"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                NISN Siswa <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nisn"
                name="nisn"
                value={formData.nisn}
                onChange={handleChange}
                disabled={mode === "edit"}
                placeholder="Contoh: 123456"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  errors.nisn
                    ? "border-red-500"
                    : "border-gray-200 focus:ring-blue-500"
                } ${mode === "edit" ? "bg-gray-50 cursor-not-allowed" : ""}`}
              />
              {errors.nisn && (
                <p className="text-red-500 text-sm mt-1">{errors.nisn}</p>
              )}
            </div>

            {/* Nama Lengkap */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Contoh: Budi Santoso"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  errors.nama_lengkap
                    ? "border-red-500"
                    : "border-gray-200 focus:ring-blue-500"
                }`}
              />
              {errors.nama_lengkap && (
                <p className="text-red-500 text-sm mt-1">{errors.nama_lengkap}</p>
              )}
            </div>

            {/* RFID */}
            <div>
              <label
                htmlFor="rfid"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                UID Rfid <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="rfid"
                name="rfid"
                value={formData.rfid}
                onChange={handleChange}
                placeholder="Scan Kartu / Masukkan Kode RFID"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  errors.rfidCode
                    ? "border-red-500"
                    : "border-gray-200 focus:ring-blue-500"
                }`}
              />
              {errors.rfidCode && (
                <p className="text-red-500 text-sm mt-1">{errors.rfidCode}</p>
              )}
            </div>

            {/* Kontak Orang Tua */}
            <div>
              <label
                htmlFor="nohp"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Kontak Orang Tua (No HP) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nohp"
                name="nohp"
                value={formData.nohp}
                onChange={handleChange}
                placeholder="Contoh: 081234567890"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  errors.nohp
                    ? "border-red-500"
                    : "border-gray-200 focus:ring-blue-500"
                }`}
              />
              {errors.nohp && (
                <p className="text-red-500 text-sm mt-1">{errors.nohp}</p>
              )}
            </div>
          </div>

          {/* Tombol */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-primary text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50 transition-all"
            >
              <Save className="w-5 h-5" />
              <span>{isSubmitting ? "Menyimpan..." : "Simpan Data Siswa"}</span>
            </button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="flex-1 bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold border-2 border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
            >
              <X className="w-5 h-5" />
              <span>Batal</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}