export interface Teacher {
  id: string;
  nip?: string;
  nama: string;
  name?: string;
  telepon: string;
  rfid? : {
    rfid: string;
  }
  role: "guru" | "siswa" | "admin";
}

export interface TeacherFormData {
  id: string;
  role: "guru" | "siswa" | "admin";
  nip: string;
  nama: string;
  telepon: string;
  rfidCode?: string;
}