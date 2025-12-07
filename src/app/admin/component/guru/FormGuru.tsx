'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X } from 'lucide-react';
import { Teacher, TeacherFormData, FormErrors } from '@/types/Guru';
import { useCreateUser,useUpdateUser } from '@/lib/hooks/useUser';
import { toast } from "sonner";
import { useQueryClient } from '@tanstack/react-query';

interface TeacherFormProps {  
  mode: 'add' | 'edit';
  initialData?: Teacher;
}

export default function TeacherForm({ mode, initialData }: TeacherFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync: mutateCreate, isPending: isCreating } = useCreateUser();
  const { mutateAsync: mutateUpdate, isPending: isUpdating } = useUpdateUser();
  const isSubmitting = isCreating || isUpdating;
  const [formData, setFormData] = useState<TeacherFormData>({
    id: '',
    nama: '',
    nip: '',
    nohp: '',
    rfidCode: '',
    role: 'guru', // default literal type
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        id: initialData.id?.toString() ?? "",
        nama: initialData.nama ?? "",
        nip: initialData.nip ?? "",
        nohp: initialData.nohp ?? "",
        rfidCode: initialData.rfid?. rfid ?? "",
        role: initialData.role as 'guru' | 'admin' | 'siswa',
      });
    }
  }, [mode, initialData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nip.trim()) newErrors.id = 'NIP Guru harus diisi';
    if (!formData.nama.trim()) newErrors.nama = 'Nama lengkap harus diisi';
    if (!formData.nohp.trim()) newErrors.nohp = 'Nomor telepon harus diisi';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;

  const payload = {
    name: formData.nama,
    role: formData.role,
    nip: formData.nip,
    rfidCode: formData.rfidCode,
    nohp: formData.nohp,
    password: "guru123",
  };
  
    const Updatepayload = {
    name: formData.nama,
    role: formData.role,
    nip: formData.nip,
    rfidCode: formData.rfidCode,
    nohp: formData.nohp,
  };

  try {
    if (mode === 'add') {
      await mutateCreate(payload);
      toast.success("Data guru berhasil dibuat!");
    } else if (mode === 'edit' && initialData?.id) {
      await mutateUpdate({ 
          id: Number(initialData.id), // ID yang dibutuhkan oleh useUpdateUser
          data: Updatepayload 
        });
      toast.success("Data guru berhasil diperbarui!");
    }
    router.push("/admin/data-guru");
    } catch (err: unknown) {
      console.error(err);
      toast.error("Gagal menambahkan data guru");
    } finally {
      queryClient.invalidateQueries({ queryKey: ['userParams'] });
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

        {/* Nomor Telepon */}
        <div>
          <label htmlFor="telepon" className="block text-sm font-semibold text-gray-700 mb-2">
            Nomor Telepon <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="nohp"
            name="nohp"
            value={formData.nohp}
            onChange={handleChange}
            placeholder="081234567890"
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
              errors.nohp
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-200 focus:ring-blue-500 focus:border-transparent'
            }`}
          />
          {errors.nohp && <p className="text-red-500 text-sm mt-1">{errors.nohp}</p>}
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
