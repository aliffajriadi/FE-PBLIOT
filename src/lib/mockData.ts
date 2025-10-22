import { Teacher } from '../types/Guru';

export const teachersData: Teacher[] = [
  {
    id: 'G001',
    nama: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@sekolah.id',
    telepon: '081234567890',
    mataPelajaran: ['Matematika', 'Fisika'],
    alamat: 'Jl. Pendidikan No. 123, Jakarta'
  },
  {
    id: 'G002',
    nama: 'Prof. Michael Chen',
    email: 'michael.chen@sekolah.id',
    telepon: '081234567891',
    mataPelajaran: ['Kimia', 'Biologi'],
    alamat: 'Jl. Ilmu No. 45, Jakarta'
  },
  {
    id: 'G003',
    nama: 'Dra. Siti Nurhaliza',
    email: 'siti.nurhaliza@sekolah.id',
    telepon: '081234567892',
    mataPelajaran: ['Bahasa Indonesia'],
    alamat: 'Jl. Budaya No. 78, Jakarta'
  },
  {
    id: 'G004',
    nama: 'Dr. Ahmad Dhani',
    email: 'ahmad.dhani@sekolah.id',
    telepon: '081234567893',
    mataPelajaran: ['Sejarah', 'Geografi'],
    alamat: 'Jl. Nusantara No. 90, Jakarta'
  },
  {
    id: 'G005',
    nama: 'Prof. Linda Wijaya',
    email: 'linda.wijaya@sekolah.id',
    telepon: '081234567894',
    mataPelajaran: ['Bahasa Inggris'],
    alamat: 'Jl. Global No. 12, Jakarta'
  },
];

export const mataPelajaranList = [
  'Matematika',
  'Fisika',
  'Kimia',
  'Biologi',
  'Bahasa Indonesia',
  'Bahasa Inggris',
  'Sejarah',
  'Geografi',
  'Ekonomi',
  'Sosiologi',
  'Seni Budaya',
  'Pendidikan Jasmani',
];

// Helper function to get teacher by ID
export const getTeacherById = (id: string): Teacher | undefined => {
  return teachersData.find(teacher => teacher.id === id);
};
