'use client';

import { useState } from 'react';
import LaporanGeneratorForm from '../component/laporan/LaporanGeneratorForm';
import LaporanSummaryCards from '../component/laporan/LaporanSummaryCard';
import LaporanDetailTable from '../component/laporan/LaporanDetailTable';
import { LaporanData, LaporanFormData, DetailAbsensi } from '@/types/laporan';
import AdminLayout from '../component/layout/Layout';
// Data dummy untuk simulasi
const generateDummyData = (formData: LaporanFormData): LaporanData => {
  // Simulasi data berdasarkan form input
  const siswaCount = formData.kelas === 'Semua Kelas' ? 156 : 32;
  const _hadir = Math.floor(siswaCount * 0.92);
  const terlambat = 15;
  const alfa = 8;

  // Generate detail dummy
  const details: DetailAbsensi[] = [];
  const kelasFilter = formData.kelas === 'Semua Kelas' ? ['X IPA 1', 'X IPA 2', 'XI IPA 1'] : [formData.kelas];
  
  for (let i = 1; i <= Math.min(siswaCount, 20); i++) {
    const kelas = kelasFilter[i % kelasFilter.length];
    details.push({
      nis: `202300${i.toString().padStart(2, '0')}`,
      namaSiswa: [
        'Ahmad Fauzi', 'Siti Nurhaliza', 'Budi Setiawan', 'Dewi Lestari',
        'Rudi Hermawan', 'Maya Kusuma', 'Andi Pratama', 'Rina Wulandari',
        'Doni Saputra', 'Lina Marlina', 'Eko Prasetyo', 'Sari Rahayu',
        'Yudi Santoso', 'Fitri Handayani', 'Agus Susanto', 'Ratna Dewi',
        'Bambang Wijaya', 'Indah Permata', 'Hadi Kusuma', 'Nina Sari'
      ][i - 1] || `Siswa ${i}`,
      kelas: kelas,
      jumlahHadir: Math.floor(Math.random() * 5) + 18,
      jumlahTerlambat: Math.floor(Math.random() * 4),
      jumlahAlfa: Math.floor(Math.random() * 3),
    });
  }

  return {
    summary: {
      rataRataKehadiran: '92%',
      totalKeterlambatan: terlambat,
      jumlahAlfa: alfa,
      totalSiswa: siswaCount,
    },
    details,
  };
};

export default function LaporanAbsensiPage() {
  const [laporanData, setLaporanData] = useState<LaporanData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateLaporan = async (formData: LaporanFormData) => {
    setIsLoading(true);
    
    // Simulasi API call dengan delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate data dummy
    const data = generateDummyData(formData);
    setLaporanData(data);
    
    setIsLoading(false);
    
    // Scroll ke hasil
    setTimeout(() => {
      const hasilElement = document.getElementById('hasil-laporan');
      if (hasilElement) {
        hasilElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleExportPDF = () => {
    // TODO: Implementasi export ke PDF
    console.log('Exporting to PDF...');
    alert('Fitur export PDF akan segera tersedia!');
  };

  return (
    <AdminLayout>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Laporan Absensi</h1>
          <p className="mt-2 text-gray-600">
            Generate dan kelola laporan absensi siswa berdasarkan periode dan kelas
          </p>
        </div>

        {/* Generator Form */}
        <div className="mb-8">
          <LaporanGeneratorForm 
            onGenerate={handleGenerateLaporan}
            isLoading={isLoading}
          />
        </div>

        {/* Hasil Laporan */}
        {laporanData && (
          <div id="hasil-laporan" className="space-y-6">
            {/* Summary Cards */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Hasil Laporan:</h2>
              <LaporanSummaryCards summary={laporanData.summary} />
              
              {/* Detail Table */}
              <LaporanDetailTable 
                details={laporanData.details}
                onExportPDF={handleExportPDF}
              />
            </div>
          </div>
        )}

        {/* Empty State - hanya tampil jika belum ada laporan */}
        {!laporanData && !isLoading && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12">
            <div className="text-center text-gray-500">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <svg 
                  className="w-10 h-10 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Belum Ada Laporan
              </h3>
              <p className="text-gray-600">
                Isi form di atas dan klik Generate Laporan untuk melihat hasil
              </p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600 mb-4"></div>
              <p className="text-gray-600 font-medium">Memproses laporan...</p>
            </div>
          </div>
        )}
      </div>
    </div>
    </AdminLayout>
  );
}