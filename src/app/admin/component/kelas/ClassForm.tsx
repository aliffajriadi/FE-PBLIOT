'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X } from 'lucide-react';
import { useCreateClass } from '@/lib/hooks/useCreateClass';

// Mock data guru
const guruList = [
  { id: 1, name: 'Dr. Sarah Johnson' },
  { id: 2, name: 'Prof. Michael Chen' },
  { id: 3, name: 'Dra. Siti Nurhaliza' },
  { id: 4, name: 'Dr. Ahmad Dhani' },
  { id: 5, name: 'Prof. Linda Wijaya' },
  { id: 6, name: 'Dr. Bambang Sutrisno' },
  { id: 7, name: 'Dra. Rina Melati' },
];

interface FormData {
  namaKelas: string;
  waliKelas: string;
  jumlahsiswa: number;
  keterangan: string;
}

interface FormErrors {
    namaKelas?: string;
    waliKelas?: string;
    jumlahsiswa?: string;
}

export default function ClassForm() {
  const router = useRouter();
  const { mutate: createClass, isPending } = useCreateClass();
  const [formData, setFormData] = useState<FormData>({
    namaKelas: '',
    waliKelas: '',
    jumlahsiswa: 0,
    keterangan: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false); //error

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.namaKelas.trim()) {
      newErrors.namaKelas = 'Nama kelas harus diisi';
    }

    if(!formData.jumlahsiswa.toString().trim() || formData.jumlahsiswa <= 0) {
      newErrors.jumlahsiswa = 'Jumlah siswa harus diisi';
    }

    if (!formData.waliKelas) {
      newErrors.waliKelas = 'Wali kelas harus dipilih';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      namaKelas: formData.namaKelas,
      waliKelas: formData.waliKelas,
      jumlahSiswa: formData.jumlahsiswa,
      keterangan: formData.keterangan,
    };

    createClass(payload,{
      onSuccess: () => {
        router.push('/admin/data-kelas');
      },
      onError: (error) => {
        console.error('Error creating class:', error);
        setIsSubmitting(false);
      }
    });

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      // TODO: Send data to API
      
      // Redirect back to classes page
      router.push('/admin/data-kelas');
    }, 1000);
  };

  const handleCancel = () => {
    router.push('/admin/data-kelas');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nama Kelas */}
      <div>
        <label htmlFor="namaKelas" className="block text-sm font-semibold text-gray-700 mb-2">
          Nama Kelas <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="namaKelas"
          name="namaKelas"
          value={formData.namaKelas}
          onChange={handleChange}
          placeholder="Contoh: X IPA 1, XI IPS 3"
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
            errors.namaKelas
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-200 focus:ring-blue-500 focus:border-transparent'
          }`}
        />
        {errors.namaKelas && (
          <p className="text-red-500 text-sm mt-1">{errors.namaKelas}</p>
        )}
      </div>

      {/* Wali Kelas */}
      <div>
        <label htmlFor="waliKelas" className="block text-sm font-semibold text-gray-700 mb-2">
          Wali Kelas <span className="text-red-500">*</span>
        </label>
        <select
          id="waliKelas"
          name="waliKelas"
          value={formData.waliKelas}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all appearance-none bg-white ${
            errors.waliKelas
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-200 focus:ring-blue-500 focus:border-transparent'
          }`}
        >
          <option value="">Pilih Wali Kelas</option>
          {guruList.map((guru) => (
            <option key={guru.id} value={guru.name}>
              {guru.name}
            </option>
          ))}
        </select>
        {errors.waliKelas && (
          <p className="text-red-500 text-sm mt-1">{errors.waliKelas}</p>
        )}
      </div>
      {/* Jumlah Siswa */}
<div>
  <label htmlFor="jumlahsiswa" className="block text-sm font-semibold text-gray-700 mb-2">
    Jumlah Siswa <span className="text-red-500">*</span>
  </label>
  <input
    type="number"
    id="jumlahsiswa"
    name="jumlahsiswa"
    value={formData.jumlahsiswa}
    onChange={handleChange}
    placeholder="Masukkan jumlah siswa"
    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
      errors.jumlahsiswa
        ? 'border-red-500 focus:ring-red-500'
        : 'border-gray-200 focus:ring-blue-500 focus:border-transparent'
    }`}
  />
  {errors.jumlahsiswa && (
    <p className="text-red-500 text-sm mt-1">{errors.jumlahsiswa}</p>
  )}
</div>  
      {/* Keterangan */}
      <div>
        <label htmlFor="keterangan" className="block text-sm font-semibold text-gray-700 mb-2">
          Keterangan (Opsional)
        </label>
        <textarea
          id="keterangan"
          name="keterangan"
          value={formData.keterangan}
          onChange={handleChange}
          placeholder="Tambahkan keterangan atau catatan untuk kelas ini..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none disabled:cursor-not-allowed"
        >
          <Save className="w-5 h-5" />
          <span>{isPending ? 'Menyimpan...' : 'Simpan Data Kelas'}</span>
        </button>
        
        <button
          type="button"
          onClick={handleCancel}
          disabled={isPending}
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