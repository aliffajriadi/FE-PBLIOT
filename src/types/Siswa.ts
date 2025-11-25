// types/siswa.ts
export interface Siswa {
  id: string;
  nisn: string;
  name: string;
  kelas: string[];
  rfid: { rfid: string };
  nama_orang_tua: string;
  nohp: string;
}

export interface SiswaFormData {
  
  nisn: string;
  name: string;
  kelas: string[];
  rfid?: string;
  nama_orang_tua: string;
  nohp: string;
}