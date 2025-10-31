'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X } from 'lucide-react';
import { Siswa, SiswaFormData } from '@/types/Siswa';
import { KelasList } from '@/lib/mockData';

interface SiswaFormProps {
  mode: 'add' | 'edit';
  initialData?: Siswa;
}

interface FormErrors {
  nisn?: string;
  nama_lengkap?: string;
  kelas?: string;
  uid_rfid?: string;
  nama_orang_tua?: string;
  kontak_orang_tua?: string;
}

export default function SiswaForm({ mode, initialData }: SiswaFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<SiswaFormData>({
    nisn: '',
    nama_lengkap: '',
    kelas: [],
    uid_rfid: '',
    nama_orang_tua: '',
    kontak_orang_tua: '',
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

    if (!formData.nisn.trim()) {
      newErrors.nisn = 'NISN harus diisi';
    }

    if (!formData.nama_lengkap.trim()) {
      newErrors.nama_lengkap = 'Nama lengkap harus diisi';
    }

    if (!formData.nama_orang_tua.trim()) {
      newErrors.kelas = 'nama Orang Tua harus diisi';
    }

    if (!formData.kontak_orang_tua.trim()) {
      newErrors.kelas = 'kontak orang tua  harus diisi';
    }

    if (formData.uid_rfid.length === 0) {
      newErrors.uid_rfid = 'UID RFID harus diisi';
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
      
      // Redirect back to siswa page
      router.push('/admin/data-siswa');
    }, 1000);
  };

  const handleCancel = () => {
    router.push('/admin/data-siswa');
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

  const handleClassChange = (kelas: string) => {
    setFormData((prev) => {
      const isSelected = prev.kelas.includes(kelas);
      return {
        ...prev,
        kelas: isSelected
          ? prev.kelas.filter((m) => m !== kelas)
          : [...prev.kelas, kelas],
      };
    });

    // Clear error
    if (errors.kelas) {
      setErrors((prev) => ({
        ...prev,
        kelas: undefined,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Grid Layout for Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* NISN Siswa   */}
        <div>
          <label htmlFor="id" className="block text-sm font-semibold text-gray-700 mb-2">
            NISN Siswa <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nisn"
            name="nisn"
            value={formData.nisn}
            onChange={handleChange}
            disabled={mode === 'edit'}
            placeholder="Contoh: 123456, 654321"
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
              mode === 'edit' ? 'bg-gray-100 cursor-not-allowed' : ''
            } ${
              errors.nisn
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-200 focus:ring-blue-500 focus:border-transparent'
            }`}
          />
          {errors.nisn && (
            <p className="text-red-500 text-sm mt-1">{errors.nisn}</p>
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
            value={formData.nama_lengkap}
            onChange={handleChange}
            placeholder="Contoh: Budi Santoso"
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
              errors.nama_lengkap
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-200 focus:ring-blue-500 focus:border-transparent'
            }`}
          />
          {errors.nama_lengkap && (
            <p className="text-red-500 text-sm mt-1">{errors.nama_lengkap}</p>
          )}
        </div>

        {/* uid_rfid */}
        <div>
          <label htmlFor="uid_rfid" className="block text-sm font-semibold text-gray-700 mb-2">
            UID Rfid <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="uid_rfid"
            name="uid_rfid"
            value={formData.uid_rfid}
            onChange={handleChange}
            placeholder="081234567890"
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
              errors.uid_rfid
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-200 focus:ring-blue-500 focus:border-transparent'
            }`}
          />
          {errors.uid_rfid && (
            <p className="text-red-500 text-sm mt-1">{errors.uid_rfid}</p>
          )}
        </div>
      </div>

      {/* Kelas (Full Width) */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Kelas yang Diampu <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {KelasList.map((kelas) => (
            <label
              key={kelas}
              className={`flex items-center gap-2 px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                formData.kelas.includes(kelas)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.kelas.includes(kelas)}
                onChange={() => handleClassChange(kelas)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">{kelas}</span>
            </label>
          ))}
        </div>
        {errors.kelas && (
          <p className="text-red-500 text-sm mt-2">{errors.kelas}</p>
        )}
      </div>

      {/* Nama Orang Tua (Full Width) */}
      <div>
        <label htmlFor="nama_orang_tua" className="block text-sm font-semibold text-gray-700 mb-2">
          Nama Orang Tua
        </label>
        <textarea
          id="nama_orang_tua"
          name="nama_orang_tua"
          value={formData.nama_orang_tua}
          onChange={handleChange}
          placeholder="Nama Orang Tua..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
        />
      </div>
        {/* Kontak Orang Tua (Full Width) */}
      <div>
        <label htmlFor="nama_orang_tua" className="block text-sm font-semibold text-gray-700 mb-2">
          Kontak Orang Tua
        </label>
        <textarea
          id="kontak_orang_tua"
          name="kontak_orang_tua"
          value={formData.kontak_orang_tua}
          onChange={handleChange}
          placeholder="Kontak Orang Tua..."
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