'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X } from 'lucide-react';
import { createUser, updateUser } from "@/lib/api/user";
import { KelasList } from '@/lib/mockData'; 
import { Siswa , SiswaFormData} from '@/types/Siswa';

interface SiswaFormProps {
  mode: 'add' | 'edit';
  initialData?: Siswa; 
}

interface FormErrors {
  nisn?: string;
  nama_lengkap?: string;
  kelas?: string;
  rfidCode?: string;
  nama_orang_tua?: string;
  nohp?: string;
}

export default function SiswaForm({ mode, initialData }: SiswaFormProps) {
  const router = useRouter();
  
  const [formData, setFormData] = useState<SiswaFormData>({
    nisn: '',
    name: '',
    kelas: [],
    rfid: '',
    nama_orang_tua: '',
    nohp: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ============================================================
  // 1. LOAD DATA SAAT EDIT
  // ============================================================
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      console.log("Data awal edit:", initialData); 

      setFormData({
        // NISN
        nisn: initialData.nisn || '',
        
        // NAMA
        name: initialData.name || '', 
        
        // KELAS
        kelas: initialData.kelas || [],
        
        // RFID (Handle nested atau flat structure)
        rfid: initialData.rfid?.rfid || '', 
        
        // NAMA ORTU
        nama_orang_tua: initialData.nama_orang_tua || '',
        
        // KONTAK ORTU (FIX: Mengambil 'nohp' dari database)
        nohp: initialData.nohp || '',
      });
    }
  }, [mode, initialData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nisn.trim()) newErrors.nisn = 'NISN harus diisi';
    if (!formData.name.trim()) newErrors.nama_lengkap = 'Nama lengkap harus diisi';
    if (!formData.nohp.trim()) newErrors.nohp = 'Kontak orang tua harus diisi';
    if (!(formData.rfid || '').trim()) newErrors.rfidCode = 'UID RFID harus diisi';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ============================================================
  // 2. SUBMIT DATA (FIX LOGIKA PASSWORD)
  // ============================================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // 1. Data dasar yang sama untuk Add maupun Edit
    const basePayload = {
      name: formData.name,
      role: 'siswa' as const,
      nisn: formData.nisn,
      rfidCode: formData.rfid ,
      nohp: formData.nohp,
    };

    console.log("Base Payload:", basePayload);

    try {
      if (mode === 'add') {
        // === MODE TAMBAH (Wajib Password) ===
        // Kita rangkai objectnya langsung di sini agar TypeScript paham ada passwordnya
        await createUser({
          ...basePayload,
          password: "siswa123" 
        });
        alert("Berhasil Menambah Siswa! 🎉");

      } else if (mode === 'edit' && initialData?.id) {
        // === MODE EDIT (Tanpa Password) ===
        // Kirim basePayload saja.
        // Note: Backend update biasanya tidak mewajibkan password
        await updateUser(Number(initialData.id), basePayload);
        alert("Berhasil Mengupdate Siswa! 🎉");
      }

      router.push('/admin/data-siswa');
    } catch (err: any) {
      console.error(err);
      const msg = err?.response?.data?.message || "Terjadi kesalahan saat menyimpan.";
      alert("Gagal: " + msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/data-siswa');
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
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* NISN */}
        <div>
          <label htmlFor="nisn" className="block text-sm font-semibold text-gray-700 mb-2">
            NISN Siswa <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nisn"
            name="nisn"
            value={formData.nisn}
            onChange={handleChange}
            disabled={mode === 'edit'}
            placeholder="Contoh: 123456"
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
              errors.nisn ? 'border-red-500' : 'border-gray-200 focus:ring-blue-500'
            }`}
          />
          {errors.nisn && <p className="text-red-500 text-sm mt-1">{errors.nisn}</p>}
        </div>

        {/* Nama Lengkap */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
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
              errors.nama_lengkap ? 'border-red-500' : 'border-gray-200 focus:ring-blue-500'
            }`}
          />
          {errors.nama_lengkap && <p className="text-red-500 text-sm mt-1">{errors.nama_lengkap}</p>}
        </div>

        {/* RFID */}
        <div>
          <label htmlFor="rfid" className="block text-sm font-semibold text-gray-700 mb-2">
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
              errors.rfidCode ? 'border-red-500' : 'border-gray-200 focus:ring-blue-500'
            }`}
          />
          {errors.rfidCode && <p className="text-red-500 text-sm mt-1">{errors.rfidCode}</p>}
        </div>
      </div>

      {/* Kelas (Opsional) */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Kelas yang Diampu <span className="text-gray-400 text-xs">(Opsional)</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {KelasList.map((kelas) => (
            <label
              key={kelas}
              className={`flex items-center gap-2 px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                formData.kelas.includes(kelas) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.kelas.includes(kelas)}
                onChange={() => handleClassChange(kelas)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-sm font-medium text-gray-700">{kelas}</span>
            </label>    
          ))}
        </div>
      </div>

      {/* Orang Tua & Kontak */}
      <div>
        <label htmlFor="nama_orang_tua" className="block text-sm font-semibold text-gray-700 mb-2">
          Nama Orang Tua
        </label>
        <input
          type="text"
          id="nama_orang_tua"
          name="nama_orang_tua"
          value={formData.nama_orang_tua}
          onChange={handleChange}
          placeholder="Nama Orang Tua..."
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="nohp" className="block text-sm font-semibold text-gray-700 mb-2">
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
            errors.nohp ? 'border-red-500' : 'border-gray-200 focus:ring-blue-500'
          }`}
        />
        {errors.nohp && <p className="text-red-500 text-sm mt-1">{errors.nohp}</p>}
      </div>

      {/* Tombol */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          <span>{isSubmitting ? 'Menyimpan...' : 'Simpan Data Siswa'}</span>
        </button>
        
        <button
          type="button"
          onClick={handleCancel}
          disabled={isSubmitting}
          className="flex-1 bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold border-2 border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50"
        >
          <X className="w-5 h-5" />
          <span>Batal</span>
        </button>
      </div>
    </form>
  );
}