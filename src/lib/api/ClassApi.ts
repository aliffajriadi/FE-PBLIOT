import { api } from '@/lib/axios';
import { Class, ClassFormData } from '@/types/Kelas';

// GET semua kelas
export const getClasses = async (): Promise<Class[]> => {
  const res = await api.get('/kelas');
  return res.data;
};

// GET detail kelas berdasarkan id
export const getClassById = async (id: number): Promise<Class> => {
  const res = await api.get(`/kelas/${id}`);
  return res.data;
};

// POST membuat kelas baru
export const createClass = async (data: ClassFormData) => {
  const res = await api.post('/kelas', data);
  return res.data;
};

// PUT update kelas
export const updateClass = async (id: number, data: ClassFormData) => {
  const res = await api.put(`/kelas/${id}`, data);
  return res.data;
};

// DELETE kelas
export const deleteClass = async (id: number) => {
  const res = await api.delete(`/kelas/${id}`);
  return res.data;
};


export const getDetailClassAbsensi = async (id: number) => {
  const res = await api.get(`/absensi/detail-absensi/kelas/${id}`, { withCredentials: true });
  return res.data.data;
}