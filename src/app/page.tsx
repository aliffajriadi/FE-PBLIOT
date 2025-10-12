"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Clock, Clipboard, Bell, Users, CheckCircle, Calculator } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const router = useRouter(); 

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
              SmartPresence
            </span>
          </div>

          <div className="hidden md:block">
            <button onClick={() => router.push('/login')}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Login
            </button>
          </div>

          <button 
            className="md:hidden p-2 text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t animate-fade-in">
            <div className="px-4 py-4">
              <button onClick={() => router.push('/login')} className="w-full px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200">
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// Hero Section Component
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left space-y-6 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight">
              <span className=" italic text-blue-700">Discipline</span>
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl">with </span>
              <span className="bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                SmartPresence
              </span>
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl">everyday</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-700 font-medium">
              Smart System for School Attendance Needs.
            </p>

            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-lg font-bold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                Start Your Free Trial
              </button>
              <button className="px-8 py-4 bg-white text-blue-900 border-2 border-blue-900 rounded-lg font-bold text-lg hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300">
                Request a Demo
              </button>
            </div> */}
          </div>

          <div className="relative animate-fade-in-up animation-delay-300">
            <div className="relative z-10 bg-white/40 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-start space-x-4 bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-3">
                    <Clipboard className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="h-3 bg-blue-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-blue-100 rounded w-1/2"></div>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <Clock className="w-10 h-10 text-blue-600 mb-2" />
                    <div className="h-2 bg-blue-100 rounded w-16"></div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <Calculator className="w-10 h-10 text-blue-600 mb-2" />
                    <div className="h-2 bg-blue-100 rounded w-16"></div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-lg">Attendance Rate</span>
                    <span className="text-2xl font-bold">98%</span>
                  </div>
                  <div className="h-3 bg-blue-400 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full w-[98%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Features Section Component
const Features = () => {
  const features = [
    {
      icon: <Users className="w-12 h-12" />,
      title: "Visi Pendidikan Cerdas",
      description: "Simbol branding produk smart presence dalam dunia pendidikan modern dan inovatif."
    },
    {
      icon: <Clipboard className="w-12 h-12" />,
      title: "Sistem Absensi Digital Efisien",
      description: "Mengubah absensi manual menjadi sistem digital yang efisien dan terintegrasi."
    },
    {
      icon: <Bell className="w-12 h-12" />,
      title: "Notifikasi Otomatis untuk Orang Tua",
      description: "Notifikasi otomatis kepada orang tua, memberikan ketenangan pikiran dan kenyamanan."
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-blue-900 to-blue-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Smart Presence: <span className="text-teal-300">For your easier</span>
            <br />
            <span className="text-teal-300">Attendance Solution.</span>
          </h2>
        </div>

        <div className="flex justify-center mb-12 animate-fade-in-up animation-delay-300">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 inline-block">
            <div className="flex items-center space-x-8">
              <div className="bg-white rounded-2xl p-6 shadow-2xl">
                <Clipboard className="w-16 h-16 text-blue-600" />
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-1 bg-teal-400 mb-2"></div>
                <div className="w-12 h-12 bg-teal-400 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-8 h-8 bg-teal-300 rounded-full"></div>
                </div>
                <div className="w-16 h-1 bg-teal-400 mt-2"></div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 shadow-2xl">
                <Bell className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-4 inline-block mb-6 group-hover:scale-110 transition-transform duration-300 text-white">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Section Component
const About = () => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900">
              Apa itu SmartPresence?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Kami menyediakan platform absensi terpadu yang fleksibel. Dengan teknologi kami, observasi siswa terekam dengan akurat, mempermudah monitoring untuk orang tua, dan efisiensi waktu untuk guru, agar semua pihak bisa aktif mendukung belajar anak.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-blue-700" />
                <span className="text-blue-900 font-semibold">Akurat</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-blue-700" />
                <span className="text-blue-900 font-semibold">Efisien</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-blue-700" />
                <span className="text-blue-900 font-semibold">Terintegrasi</span>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in-up animation-delay-300">
            <div className="bg-gradient-to-br from-blue-100 to-teal-100 rounded-3xl p-8 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <Users className="w-16 h-16 text-blue-600" />
                    <p className="text-center text-sm font-semibold text-blue-900 mt-2">Guru</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                      <div className="absolute w-8 h-8 bg-teal-400 rounded-full animate-ping"></div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <Users className="w-16 h-16 text-blue-600" />
                    <p className="text-center text-sm font-semibold text-blue-900 mt-2">Orang Tua</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                  <div className="inline-block bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-3 mb-3">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <p className="font-bold text-blue-900 text-lg">Kolaborasi Aktif</p>
                  <p className="text-gray-600 text-sm mt-2">Mendukung Pembelajaran Anak</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Team Section Component
const Team = () => {
  const teamMembers = [1, 2, 3, 4];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-blue-900 to-blue-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            OUR TEAM
          </h2>
          <div className="w-24 h-1 bg-teal-400 mx-auto"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-8 aspect-[3/4] flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="text-center z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <div className="h-4 bg-blue-200 rounded w-32 mx-auto mb-2"></div>
                  <div className="h-3 bg-blue-100 rounded w-24 mx-auto"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">SmartPresence</span>
          </div>
          <p className="text-blue-300 mb-6">Smart System for School Attendance Needs</p>
          <p className="text-sm text-blue-400">© 2024 SmartPresence. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
export default function SmartPresenceHomepage() {
  return (
    <div className="min-h-screen">
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
      
      <Header />
      <Hero />
      <Features />
      <About />
      <Team />
      <Footer />
    </div>
  );
}