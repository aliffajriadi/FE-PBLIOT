"use client"
import { useState, useEffect } from "react"
import { Menu, X, Clock, Clipboard, Bell, Users, CheckCircle, Calculator, MapPin, ArrowRight, Star } from "lucide-react"
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
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-gradient-to-b from-white/80 to-transparent backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo Section */}
          <Image src="/LOGO.png" alt="SmartPresence Logo" width={200} height={200} className="cursor-pointer" onClick={() => router.push("/")} />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className={`font-semibold transition-all duration-300 relative group ${
                isScrolled ? "text-foreground hover:text-primary" : "text-primary hover:text-primary"
              }`}
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#features"
              className={`font-semibold transition-all duration-300 relative group ${
                isScrolled ? "text-foreground hover:text-primary" : "text-primary hover:text-primary"
              }`}
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#about"
              className={`font-semibold transition-all duration-300 relative group ${
                isScrolled ? "text-foreground hover:text-primary" : "text-primary hover:text-primary"
              }`}
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
          </nav>

          {/* Login Button */}
          <div className="hidden md:block">
            <button
              onClick={() => router.push("/login")}
              className="relative px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300 hover:bg-opacity-90"
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
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2.5 rounded-xl transition-all duration-300 ${
              isScrolled ? "text-primary hover:bg-secondary" : "text-primary hover:bg-secondary"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-2xl border-t border-border animate-in fade-in slide-in-from-top-2 duration-300">
            <nav className="px-4 py-6 space-y-4">
              <a
                href="#home"
                className="block px-4 py-3 text-foreground font-semibold rounded-xl hover:bg-secondary hover:text-primary transition-all duration-200"
              >
                Home
              </a>
              <a
                href="#features"
                className="block px-4 py-3 text-foreground font-semibold rounded-xl hover:bg-secondary hover:text-primary transition-all duration-200"
              >
                Features
              </a>
              <a
                href="#about"
                className="block px-4 py-3 text-foreground font-semibold rounded-xl hover:bg-secondary hover:text-primary transition-all duration-200"
              >
                About
              </a>
              <button
                onClick={() => router.push("/login")}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-secondary via-white to-secondary pt-24">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-float-slow"></div>
        <div
          className="absolute top-40 right-10 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-float-medium"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/2 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-float-slow"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-tight">
              <span className="inline-block animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
                <span className="italic">Discipline</span>
              </span>
              <br />
              <span
                className="text-3xl sm:text-4xl lg:text-5xl inline-block animate-slide-in-left"
                style={{ animationDelay: "0.3s" }}
              >
                with{" "}
              </span>
              <span
                className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent inline-block animate-slide-in-left"
                style={{ animationDelay: "0.5s" }}
              >
                SmartPresence
              </span>
              <br />
              <span
                className="text-3xl sm:text-4xl lg:text-5xl inline-block animate-slide-in-left"
                style={{ animationDelay: "0.7s" }}
              >
                everyday
              </span>
            </h1>

            <p
              className="text-lg sm:text-xl text-foreground font-medium animate-fade-in-up"
              style={{ animationDelay: "0.9s" }}
            >
              Smart System for School Attendance Needs.
            </p>
          </div>

          <div className="relative animate-float-medium">
            <div className="relative z-10 bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-border animate-scale-in">
              <div className="space-y-6">
                <div
                  className="flex items-start space-x-4 bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer animate-slide-in-right"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="bg-primary rounded-xl p-3 flex-shrink-0 animate-pulse-glow">
                    <Clipboard className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="h-3 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div
                    className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer flex-1 animate-slide-in-right"
                    style={{ animationDelay: "0.4s" }}
                  >
                    <Clock className="w-10 h-10 text-primary mb-2 animate-bounce-slow" />
                    <div className="h-2 bg-muted rounded w-16"></div>
                  </div>
                  <div
                    className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer flex-1 animate-slide-in-right"
                    style={{ animationDelay: "0.6s" }}
                  >
                    <Calculator
                      className="w-10 h-10 text-primary mb-2 animate-bounce-slow"
                      style={{ animationDelay: "0.3s" }}
                    />
                    <div className="h-2 bg-muted rounded w-16"></div>
                  </div>
                </div>

                <div
                  className="bg-primary rounded-2xl p-6 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in-right"
                  style={{ animationDelay: "0.8s" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-lg">Attendance Rate</span>
                    <span className="text-2xl font-bold animate-count-up">98%</span>
                  </div>
                  <div className="h-3 bg-primary-foreground/30 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-foreground rounded-full w-[98%] animate-fill-bar"></div>
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
    <section className="py-16 sm:py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Smart Presence: <span className="text-secondary">For your easier</span>
            <br />
            <span className="text-secondary">Attendance Solution.</span>
          </h2>
        </div>

        <div className="flex justify-center mb-12 animate-fade-in-up animation-delay-300">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 inline-block border border-white/20">
            <div className="flex items-center space-x-8">
              <div className="bg-white rounded-2xl p-6 shadow-2xl transform hover:scale-110 transition-transform duration-300">
                <Clipboard className="w-16 h-16 text-primary" />
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-1 bg-secondary mb-2"></div>
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center animate-pulse shadow-lg">
                  <div className="w-8 h-8 bg-secondary/80 rounded-full"></div>
                </div>
                <div className="w-16 h-1 bg-secondary mt-2"></div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-2xl transform hover:scale-110 transition-transform duration-300">
                <Bell className="w-16 h-16 text-primary" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 animate-fade-in-up border border-border"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="bg-primary rounded-xl p-4 inline-block mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 text-primary-foreground shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
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
    <section className="py-16 sm:py-24 bg-gradient-to-b from-secondary to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">Apa itu SmartPresence?</h2>
            <p className="text-lg text-foreground leading-relaxed">
              Kami menyediakan platform absensi terpadu yang fleksibel. Dengan teknologi kami, observasi siswa terekam
              dengan akurat, mempermudah monitoring untuk orang tua, dan efisiensi waktu untuk guru, agar semua pihak
              bisa aktif mendukung belajar anak.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center space-x-2 bg-secondary px-4 py-2 rounded-full hover:bg-muted transition-colors duration-300 cursor-pointer">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold">Akurat</span>
              </div>
              <div className="flex items-center space-x-2 bg-secondary px-4 py-2 rounded-full hover:bg-muted transition-colors duration-300 cursor-pointer">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold">Efisien</span>
              </div>
              <div className="flex items-center space-x-2 bg-secondary px-4 py-2 rounded-full hover:bg-muted transition-colors duration-300 cursor-pointer">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold">Terintegrasi</span>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in-up animation-delay-300">
            <div className="bg-gradient-to-br from-secondary to-muted rounded-3xl p-8 shadow-2xl border border-border">
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
                    <Users className="w-16 h-16 text-primary" />
                    <p className="text-center text-sm font-semibold text-primary mt-2">Guru</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center animate-pulse shadow-lg">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                      <div className="absolute w-8 h-8 bg-primary/50 rounded-full animate-ping"></div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
                    <Users className="w-16 h-16 text-primary" />
                    <p className="text-center text-sm font-semibold text-primary mt-2">Orang Tua</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="inline-block bg-primary rounded-xl p-3 mb-3">
                    <CheckCircle className="w-12 h-12 text-primary-foreground" />
                  </div>
                  <p className="font-bold text-primary text-lg">Kolaborasi Aktif</p>
                  <p className="text-muted-foreground text-sm mt-2">Mendukung Pembelajaran Anak</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// HowItWorks Component
const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Daftar Sekolah",
      description: "Daftarkan sekolah Anda di platform SmartPresence dengan mudah dan cepat.",
      icon: <Users className="w-8 h-8" />,
    },
    {
      number: "02",
      title: "Setup Sistem",
      description: "Atur konfigurasi absensi sesuai kebutuhan sekolah Anda dengan panduan lengkap.",
      icon: <Clipboard className="w-8 h-8" />,
    },
    {
      number: "03",
      title: "Mulai Absensi",
      description: "Guru dapat langsung melakukan absensi digital melalui aplikasi mobile atau web.",
      icon: <CheckCircle className="w-8 h-8" />,
    },
    {
      number: "04",
      title: "Pantau & Lapor",
      description: "Orang tua menerima notifikasi real-time dan laporan absensi anak secara berkala.",
      icon: <Bell className="w-8 h-8" />,
    },
  ]

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-secondary relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Bagaimana Cara Kerja <span className="text-primary">SmartPresence?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Proses yang sederhana dan intuitif untuk memulai sistem absensi digital di sekolah Anda
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-24 -right-3 w-6 h-1 bg-gradient-to-r from-primary to-transparent"></div>
              )}

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-border h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-4xl font-bold text-primary/20">{step.number}</div>
                  <div className="bg-primary rounded-xl p-3 text-primary-foreground group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center animate-fade-in-up animation-delay-400">
          <button className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:bg-opacity-90 flex items-center space-x-2">
            <span className="relative z-10">Mulai Sekarang</span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  )
}

// Testimonials Component
const Testimonials = () => {
  const testimonials = [
    {
      name: "Ibu Siti Nurhaliza",
      role: "Kepala Sekolah",
      school: "SD Negeri 01 Jakarta",
      content:
        "SmartPresence telah mengubah cara kami mengelola absensi. Sistem ini sangat efisien dan mudah digunakan oleh semua guru.",
      rating: 5,
      image: "👩‍🏫",
    },
    {
      name: "Bapak Ahmad Wijaya",
      role: "Guru Kelas",
      school: "SMP Negeri 05 Bandung",
      content:
        "Notifikasi otomatis kepada orang tua sangat membantu. Transparansi ini meningkatkan kepercayaan antara sekolah dan keluarga.",
      rating: 5,
      image: "👨‍🏫",
    },
    {
      name: "Ibu Dewi Lestari",
      role: "Orang Tua",
      school: "Pengguna dari Surabaya",
      content:
        "Saya bisa memantau kehadiran anak saya secara real-time. Sangat membantu untuk memastikan anak tidak bolos sekolah.",
      rating: 5,
      image: "👩‍💼",
    },
  ]

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-secondary to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-float-slow"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-float-medium"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">Apa Kata Pengguna Kami?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ribuan sekolah telah mempercayai SmartPresence untuk mengelola absensi mereka
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 border border-border animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Stars */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground leading-relaxed mb-6 italic">{testimonial.content}</p>

              {/* Author */}
              <div className="flex items-center space-x-4 pt-6 border-t border-border">
                <div className="text-4xl">{testimonial.image}</div>
                <div>
                  <h4 className="font-bold text-primary">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.school}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid sm:grid-cols-3 gap-8 animate-fade-in-up animation-delay-300">
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 text-primary-foreground text-center shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl sm:text-5xl font-bold mb-2">500+</div>
            <p className="text-primary-foreground/90">Sekolah Terdaftar</p>
          </div>
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 text-primary-foreground text-center shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl sm:text-5xl font-bold mb-2">50K+</div>
            <p className="text-primary-foreground/90">Siswa Terpantau</p>
          </div>
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 text-primary-foreground text-center shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl sm:text-5xl font-bold mb-2">98%</div>
            <p className="text-primary-foreground/90">Kepuasan Pengguna</p>
          </div>
        </div>
      </div>
    </section>
  )
}

const ButtonUp = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
      >
        <ArrowRight className="w-6 h-6 rotate-270" />
      </button>
    )
  )
}

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Footer Info */}
          <div className="space-y-6 animate-fade-in-up">
            <Image src="/logo_darkmode.png" alt="SmartPresence Logo" width={200} height={200} />
            <p className="text-primary-foreground/80 text-lg">Smart System for School Attendance Needs</p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300 cursor-pointer">
                <MapPin className="w-5 h-5" />
                <span>Jakarta, Indonesia</span>
              </div>
              <div className="flex items-center space-x-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300 cursor-pointer">
                <span>📧 info@smartpresence.id</span>
              </div>
              <div className="flex items-center space-x-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300 cursor-pointer">
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
              <h4 className="font-bold mb-4 text-primary-foreground">Produk</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li className="hover:text-primary-foreground transition-colors duration-300 cursor-pointer">
                  Fitur Absensi
                </li>
                <li className="hover:text-primary-foreground transition-colors duration-300 cursor-pointer">
                  Notifikasi
                </li>
                <li className="hover:text-primary-foreground transition-colors duration-300 cursor-pointer">Laporan</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-primary-foreground">Perusahaan</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li className="hover:text-primary-foreground transition-colors duration-300 cursor-pointer">
                  Tentang Kami
                </li>
                <li className="hover:text-primary-foreground transition-colors duration-300 cursor-pointer">Blog</li>
                <li className="hover:text-primary-foreground transition-colors duration-300 cursor-pointer">Karir</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-primary-foreground">Legal</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li className="hover:text-primary-foreground transition-colors duration-300 cursor-pointer">Privasi</li>
                <li className="hover:text-primary-foreground transition-colors duration-300 cursor-pointer">
                  Syarat & Ketentuan
                </li>
                <li className="hover:text-primary-foreground transition-colors duration-300 cursor-pointer">Kontak</li>
              </ul>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-white/20">
            <p className="text-sm text-primary-foreground/80">© 2025 SmartPresence. All rights reserved.</p>
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
        /* Floating animations */
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-30px) translateX(15px);
          }
          50% {
            transform: translateY(-60px) translateX(-15px);
          }
          75% {
            transform: translateY(-30px) translateX(15px);
          }
        }

        @keyframes float-medium {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        /* Slide in animations */
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Scale in animation */
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Fade in up animation */
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

        /* Bounce slow animation */
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        /* Pulse glow animation */
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(41, 67, 124, 0.7);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(41, 67, 124, 0);
          }
        }

        /* Fill bar animation */
        @keyframes fill-bar {
          from {
            width: 0%;
          }
          to {
            width: 98%;
          }
        }

        /* Count up animation */
        @keyframes count-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Apply animations */
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-scale-in {
          animation: scale-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }

        .animate-fill-bar {
          animation: fill-bar 1.5s ease-out forwards;
        }

        .animate-count-up {
          animation: count-up 0.8s ease-out forwards;
        }

        /* Existing animations */
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

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
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
      <HowItWorks />
      <Testimonials />
      <Footer />
      <ButtonUp />
    </div>
  )
}
