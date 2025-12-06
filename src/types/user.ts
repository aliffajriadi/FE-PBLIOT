export interface User {
  id: number;
  name: string;
  role: "admin" | "guru" | "siswa";
  nohp?: string;
  nip?: string;   // hanya guru
  nis?: string;   // hanya siswa
  password?: string;
}


export interface datauser {
    id: number;
    name: string;
}

export interface CreateUserPayload {
  name: string;
  role: "admin" | "guru" | "siswa";
  nohp?: string;
  nip?: string;      // hanya guru
  nisn?: string;     // hanya siswa
  password: string;
  rfidCode?: string; // wajib untuk guru/siswa
  rfid?: string;  
}

export interface SiswaProfilInfoProps {
  name: string;
  nisn: string;
  nohp?: string;
  rfid: string;
}

export interface ProfilInfoProps {
  name: string;
  nip: string;
  nohp?: string;
  uidRfid: string;
}