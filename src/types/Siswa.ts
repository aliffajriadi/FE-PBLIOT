// types/siswa.ts
export interface Siswa {
  id: string;
  nisn: string;
  nama_lengkap: string;
  kelas: string[];
  uid_rfid: string;
  nama_orang_tua: string;
  kontak_orang_tua: string;
}

export interface SiswaFormData {
  nisn: string;
  nama_lengkap: string;
  kelas: string[];
  uid_rfid: string;
  nama_orang_tua: string;
  kontak_orang_tua: string;
}