'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X } from 'lucide-react';
import { Teacher, TeacherFormData } from '@/types/Guru';
import { mataPelajaranList } from '@/lib/mockData';

interface TeacherFormProps {
  mode: 'add' | 'edit';
  initialData?: Teacher;
}

interface FormErrors {
  id?: string;
  nama?: string;
  email?: string;
  telepon?: string;
  mataPelajaran?: string;
}

export default function TeacherForm({ mode, initialData }: TeacherFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<TeacherFormData>({
    id: '',
    nama: '',
    email: '',
    telepon: '',
    mataPelajaran: [],
    alamat: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form with initial data in edit mode
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData(initialData);
    }
  }, [mode, initialData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.id.trim()) {
      newErrors.id = 'ID Guru harus diisi';
    }

    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama lengkap harus diisi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email harus diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.telepon.trim()) {
      newErrors.telepon = 'Nomor telepon harus diisi';
    }

    if (formData.mataPelajaran.length === 0) {
      newErrors.mataPelajaran = 'Pilih minimal satu mata pelajaran';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      // TODO: Send data to API
      
      // Redirect back to teachers page
      router.push('/admin/data-guru');
    }, 1000);
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
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleMataPelajaranChange = (mapel: string) => {
    setFormData((prev) => {
      const isSelected = prev.mataPelajaran.includes(mapel);
      return {
        ...prev,
        mataPelajaran: isSelected
          ? prev.mataPelajaran.filter((m) => m !== mapel)
          : [...prev.mataPelajaran, mapel],
      };
    });

    // Clear error
    if (errors.mataPelajaran) {
      setErrors((prev) => ({
        ...prev,
        mataPelajaran: undefined,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Grid Layout for Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ID Guru */}
        <div>
          <label htmlFor="id" className="block text-sm font-semibold text-gray-700 mb-2">
            ID Guru <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            disabled={mode === 'edit'}
            placeholder="Contoh: G001, G002"
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
              mode === 'edit' ? 'bg-gray-100 cursor-not-allowed' : ''
            } ${
              errors.id
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-200 focus:ring-blue-500 focus:border-transparent'
            }`}
          />
          {errors.id && (
            <p className="text-red-500 text-sm mt-1">{errors.id}</p>
          )}
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
          {errors.nama && (
            <p className="text-red-500 text-sm mt-1">{errors.nama}</p>
          )}
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
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
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
          {errors.telepon && (
            <p className="text-red-500 text-sm mt-1">{errors.telepon}</p>
          )}
        </div>
      </div>

      {/* Mata Pelajaran (Full Width) */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Mata Pelajaran yang Diampu <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {mataPelajaranList.map((mapel) => (
            <label
              key={mapel}
              className={`flex items-center gap-2 px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                formData.mataPelajaran.includes(mapel)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.mataPelajaran.includes(mapel)}
                onChange={() => handleMataPelajaranChange(mapel)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">{mapel}</span>
            </label>
          ))}
        </div>
        {errors.mataPelajaran && (
          <p className="text-red-500 text-sm mt-2">{errors.mataPelajaran}</p>
        )}
      </div>

      {/* Alamat (Full Width) */}
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

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none disabled:cursor-not-allowed"
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