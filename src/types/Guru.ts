export interface Teacher {
  id: string;
  nip?: string;
  nama: string;
  name?: string;
  photo?: string;
  nohp: string;
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
  nohp: string;
  rfidCode?: string;
}

export interface FormErrors {
  id?: string;
  nama?: string;
  email?: string;
  nohp?: string;
  rfidCode?: string;
}