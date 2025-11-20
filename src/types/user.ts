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
}