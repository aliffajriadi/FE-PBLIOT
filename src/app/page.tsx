"use client"
import { useState, useEffect } from "react"
import { Menu, X, Clock, Clipboard, Bell, Users, CheckCircle, Calculator, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  const router = useRouter()

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-100"
          : "bg-gradient-to-b from-white/80 to-transparent backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo Section */}
          <Image src="/LOGO.png" alt="Logo" width={200} height={200} />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className={`font-semibold transition-all duration-300 relative group ${
                isScrolled ? "text-gray-700 hover:text-blue-600" : "text-blue-900 hover:text-blue-600"
              }`}
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-teal-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#features"
              className={`font-semibold transition-all duration-300 relative group ${
                isScrolled ? "text-gray-700 hover:text-blue-600" : "text-blue-900 hover:text-blue-600"
              }`}
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-teal-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#about"
              className={`font-semibold transition-all duration-300 relative group ${
                isScrolled ? "text-gray-700 hover:text-blue-600" : "text-blue-900 hover:text-blue-600"
              }`}
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-teal-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </nav>

          {/* Login Button */}
          <div className="hidden md:block">
            <button
              onClick={() => router.push("/login")}
              className="relative px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-bold overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Login</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2.5 rounded-xl transition-all duration-300 ${
              isScrolled ? "text-blue-900 hover:bg-blue-50" : "text-blue-900 hover:bg-white/50"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-2xl border-t border-blue-100 animate-in fade-in slide-in-from-top-2 duration-300">
            <nav className="px-4 py-6 space-y-4">
              <a
                href="#home"
                className="block px-4 py-3 text-gray-700 font-semibold rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                Home
              </a>
              <a
                href="#features"
                className="block px-4 py-3 text-gray-700 font-semibold rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                Features
              </a>
              <a
                href="#about"
                className="block px-4 py-3 text-gray-700 font-semibold rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                About
              </a>
              <button
                onClick={() => router.push("/login")}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Login
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

// Hero Section Component
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 pt-24">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left space-y-6 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight">
              <span className="italic text-blue-700">Discipline</span>
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl">with </span>
              <span className="bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                SmartPresence
              </span>
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl">everyday</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-700 font-medium">Smart System for School Attendance Needs.</p>
          </div>

          <div className="relative animate-fade-in-up animation-delay-300">
            <div className="relative z-10 bg-white/40 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/50">
              <div className="space-y-6">
                <div className="flex items-start space-x-4 bg-white/80 rounded-2xl p-6 shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-3 flex-shrink-0">
                    <Clipboard className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="h-3 bg-blue-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-blue-100 rounded w-1/2"></div>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="bg-white/80 rounded-2xl p-6 shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer flex-1">
                    <Clock className="w-10 h-10 text-blue-600 mb-2" />
                    <div className="h-2 bg-blue-100 rounded w-16"></div>
                  </div>
                  <div className="bg-white/80 rounded-2xl p-6 shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer flex-1">
                    <Calculator className="w-10 h-10 text-blue-600 mb-2" />
                    <div className="h-2 bg-blue-100 rounded w-16"></div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-lg">Attendance Rate</span>
                    <span className="text-2xl font-bold">98%</span>
                  </div>
                  <div className="h-3 bg-blue-400 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full w-[98%] animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Features Section Component
const Features = () => {
  const features = [
    {
      icon: <Users className="w-12 h-12" />,
      title: "Visi Pendidikan Cerdas",
      description: "Simbol branding produk smart presence dalam dunia pendidikan modern dan inovatif.",
    },
    {
      icon: <Clipboard className="w-12 h-12" />,
      title: "Sistem Absensi Digital Efisien",
      description: "Mengubah absensi manual menjadi sistem digital yang efisien dan terintegrasi.",
    },
    {
      icon: <Bell className="w-12 h-12" />,
      title: "Notifikasi Otomatis untuk Orang Tua",
      description: "Notifikasi otomatis kepada orang tua, memberikan ketenangan pikiran dan kenyamanan.",
    },
  ]

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
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 inline-block border border-white/20">
            <div className="flex items-center space-x-8">
              <div className="bg-white rounded-2xl p-6 shadow-2xl transform hover:scale-110 transition-transform duration-300">
                <Clipboard className="w-16 h-16 text-blue-600" />
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-1 bg-teal-400 mb-2"></div>
                <div className="w-12 h-12 bg-teal-400 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                  <div className="w-8 h-8 bg-teal-300 rounded-full"></div>
                </div>
                <div className="w-16 h-1 bg-teal-400 mt-2"></div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 shadow-2xl transform hover:scale-110 transition-transform duration-300">
                <Bell className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 animate-fade-in-up border border-white/20"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-4 inline-block mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 text-white shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// About Section Component
const About = () => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900">Apa itu SmartPresence?</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Kami menyediakan platform absensi terpadu yang fleksibel. Dengan teknologi kami, observasi siswa terekam
              dengan akurat, mempermudah monitoring untuk orang tua, dan efisiensi waktu untuk guru, agar semua pihak
              bisa aktif mendukung belajar anak.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors duration-300 cursor-pointer">
                <CheckCircle className="w-5 h-5 text-blue-700" />
                <span className="text-blue-900 font-semibold">Akurat</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors duration-300 cursor-pointer">
                <CheckCircle className="w-5 h-5 text-blue-700" />
                <span className="text-blue-900 font-semibold">Efisien</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors duration-300 cursor-pointer">
                <CheckCircle className="w-5 h-5 text-blue-700" />
                <span className="text-blue-900 font-semibold">Terintegrasi</span>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in-up animation-delay-300">
            <div className="bg-gradient-to-br from-blue-100 to-teal-100 rounded-3xl p-8 shadow-2xl border border-white/50">
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
                    <Users className="w-16 h-16 text-blue-600" />
                    <p className="text-center text-sm font-semibold text-blue-900 mt-2">Guru</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                      <div className="absolute w-8 h-8 bg-teal-400 rounded-full animate-ping"></div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
                    <Users className="w-16 h-16 text-blue-600" />
                    <p className="text-center text-sm font-semibold text-blue-900 mt-2">Orang Tua</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
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
  )
}

// Interactive Map Footer Component
const MapFooter = () => {
  const [mapCenter, setMapCenter] = useState({ lat: -6.2088, lng: 106.8456 })

  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Footer Info */}
          <div className="space-y-6 animate-fade-in-up">
            <Image src="/logo_darkmode.png" alt="Logo" width={200} height={200} />
            <p className="text-blue-300 text-lg">Smart System for School Attendance Needs</p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-blue-200 hover:text-white transition-colors duration-300 cursor-pointer">
                <MapPin className="w-5 h-5" />
                <span>Jakarta, Indonesia</span>
              </div>
              <div className="flex items-center space-x-3 text-blue-200 hover:text-white transition-colors duration-300 cursor-pointer">
                <span>📧 info@smartpresence.id</span>
              </div>
              <div className="flex items-center space-x-3 text-blue-200 hover:text-white transition-colors duration-300 cursor-pointer">
                <span>📱 +62 812 3456 7890</span>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up animation-delay-300">
            <h3 className="text-xl font-bold mb-4">Lokasi Kami</h3>
            <div className="relative w-full h-64 bg-white/10 rounded-2xl overflow-hidden border border-white/20 shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.0577989797284!2d104.04588167319703!3d1.1187258622788472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d98921856ddfab%3A0xf9d9fc65ca00c9d!2sPoliteknik%20Negeri%20Batam!5e0!3m2!1sid!2sid!4v1761019956028!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="hover:opacity-90 transition-opacity duration-300"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/20 pt-8">
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4 text-white">Produk</h4>
              <ul className="space-y-2 text-blue-300">
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">Fitur Absensi</li>
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">Notifikasi</li>
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">Laporan</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Perusahaan</h4>
              <ul className="space-y-2 text-blue-300">
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">Tentang Kami</li>
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">Blog</li>
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">Karir</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-blue-300">
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">Privasi</li>
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">Syarat & Ketentuan</li>
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">Kontak</li>
              </ul>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-white/20">
            <p className="text-sm text-blue-400">© 2025 SmartPresence. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

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
          0%,
          100% {
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
          opacity: 0;
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

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>

      <Header />
      <Hero />
      <Features />
      <About />
      <MapFooter />
    </div>
  )
}
