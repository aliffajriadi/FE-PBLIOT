'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X } from 'lucide-react';
import { Teacher, TeacherFormData } from '@/types/Guru';
import { createUser } from "@/lib/api/user";
import { AxiosError } from 'axios';

interface TeacherFormProps {
  mode: 'add' | 'edit';
  initialData?: Teacher;
}

interface FormErrors {
  id?: string;
  nama?: string;
  email?: string;
  telepon?: string;
  rfidCode?: string;
}

export default function TeacherForm({ mode, initialData }: TeacherFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<TeacherFormData>({
    id: '',
    nama: '',
    nip: '',
    email: '',
    telepon: '',
    alamat: '',
    rfidCode: '',
    mataPelajaran: [],
    role: 'guru', // default literal type
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        ...initialData,
        nip: initialData.nip || '',
        rfidCode: initialData.rfidCode || '',
        role: initialData.role as 'guru' | 'siswa' | 'admin',
      });
    }
  }, [mode, initialData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nip.trim()) newErrors.id = 'NIP Guru harus diisi';
    if (!formData.nama.trim()) newErrors.nama = 'Nama lengkap harus diisi';
    if (!formData.email.trim()) newErrors.email = 'Email harus diisi';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Format email tidak valid';
    if (!formData.telepon.trim()) newErrors.telepon = 'Nomor telepon harus diisi';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const payload = {
      name: formData.nama,
      role: formData.role as 'guru' | 'admin' | 'siswa',
      nip: formData.nip,
      rfidCode: formData.rfidCode,
      nohp: formData.telepon,
      password: 'guru123',
    };

    console.log("Payload to send:", payload);

    try {
      const newUser = await createUser(payload);
      console.log("User created:", newUser);
      router.push("/admin/data-guru");
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        console.error("Backend error:", axiosError.response.data);
        alert("Error from server: " + JSON.stringify(axiosError.response.data));
      } else if (axiosError.request) {
        console.error("No response received:", axiosError.request);
        alert("No response received from server");
      } else {
        console.error("Error setting up request:", axiosError.message);
        alert("Error: " + axiosError.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/data-guru');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* NIP Guru */}
        <div>
          <label htmlFor="id" className="block text-sm font-semibold text-gray-700 mb-2">
            NIP <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nip"
            name="nip"
            value={formData.nip}
            onChange={handleChange}
            disabled={mode === 'edit'}
            placeholder="Contoh: 1234567890, 0987654321"
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
              mode === 'edit' ? 'bg-gray-100 cursor-not-allowed' : ''
            } ${
              errors.id
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-200 focus:ring-blue-500 focus:border-transparent'
            }`}
          />
          {errors.id && <p className="text-red-500 text-sm mt-1">{errors.id}</p>}
        </div>

        {/* Nama Lengkap */}
        <div>
          <label htmlFor="nama" className="block text-sm font-semibold text-gray-700 mb-2">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Contoh: Dr. Budi Santoso"
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
              errors.nama
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-200 focus:ring-blue-500 focus:border-transparent'
            }`}
          />
          {errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="contoh@sekolah.id"
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
              errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-200 focus:ring-blue-500 focus:border-transparent'
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Nomor Telepon */}
        <div>
          <label htmlFor="telepon" className="block text-sm font-semibold text-gray-700 mb-2">
            Nomor Telepon <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="telepon"
            name="telepon"
            value={formData.telepon}
            onChange={handleChange}
            placeholder="081234567890"
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
              errors.telepon
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-200 focus:ring-blue-500 focus:border-transparent'
            }`}
          />
          {errors.telepon && <p className="text-red-500 text-sm mt-1">{errors.telepon}</p>}
        </div>

        {/* RFID */}
        <div>
          <label htmlFor="rfidCode" className="block text-sm font-semibold text-gray-700 mb-2">
            RFID Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="rfidCode"
            name="rfidCode"
            value={formData.rfidCode}
            onChange={handleChange}
            placeholder="Contoh: RFID001"
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
              errors.rfidCode
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-200 focus:ring-blue-500 focus:border-transparent'
            }`}
          />
          {errors.rfidCode && <p className="text-red-500 text-sm mt-1">{errors.rfidCode}</p>}
        </div>
      </div>

      {/* Alamat */}
      <div>
        <label htmlFor="alamat" className="block text-sm font-semibold text-gray-700 mb-2">
          Alamat
        </label>
        <textarea
          id="alamat"
          name="alamat"
          value={formData.alamat}
          onChange={handleChange}
          placeholder="Alamat lengkap..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-primary hover:opacity-90 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none disabled:cursor-not-allowed"
        >
          <Save className="w-5 h-5" />
          <span>
            {isSubmitting
              ? mode === 'edit'
                ? 'Memperbarui...'
                : 'Menyimpan...'
              : mode === 'edit'
              ? 'Perbarui Data Guru'
              : 'Simpan Data Guru'}
          </span>
        </button>

        <button
          type="button"
          onClick={handleCancel}
          disabled={isSubmitting}
          className="flex-1 sm:flex-initial bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-semibold border-2 border-gray-200 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <X className="w-5 h-5" />
          <span>Batal</span>
        </button>
      </div>

      <p className="text-sm text-gray-500 text-center">
        <span className="text-red-500">*</span> Wajib diisi
      </p>
    </form>
  );
}
