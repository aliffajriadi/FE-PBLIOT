export interface Teacher {
  id: string;
  nip?: string;
  nama: string;
  email: string;
  telepon: string;
  mataPelajaran: string[];
  alamat: string;
  rfidCode?: string;
  role: "guru" | "siswa" | "admin";
}

export interface TeacherFormData {
  id: string;
  role: "guru" | "siswa" | "admin";
  nip: string;
  nama: string;
  email: string;
  telepon: string;
  mataPelajaran: string[];
  alamat: string;
  rfidCode?: string;
}