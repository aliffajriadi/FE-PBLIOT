"use client";
import React from 'react';
import { CheckCircle, Clipboard, Bell } from 'lucide-react';

// Navbar Component
const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-50 to-blue-100 px-8 py-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <div className="text-white font-bold text-xl">SP</div>
        </div>
        <span className="text-gray-700 font-semibold text-lg">Smart Presence</span>
      </div>
      <button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg">
        Login
      </button>
    </nav>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 px-8 py-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-6xl font-bold text-blue-900 mb-4" style={{ fontFamily: 'cursive' }}>
            Discipline
          </h1>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-2xl text-gray-700">with</span>
            <div className="flex items-center space-x-1">
              <div className="w-6 h-6 bg-blue-600 rounded"></div>
              <span className="text-2xl font-bold text-blue-900">SmartPresence</span>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-blue-900 mb-6">everyday</h2>
          <p className="text-lg text-gray-700 font-medium">
            Smart System for School Attendance Needs.
          </p>
        </div>
        <div className="flex-1 flex justify-end">
          <div className="relative">
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-50"></div>
            <div className="relative bg-white p-8 rounded-2xl shadow-xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
                </div>
                <Clipboard className="w-20 h-20 text-blue-600" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <div className="h-2 w-32 bg-blue-200 rounded"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <div className="h-2 w-24 bg-blue-200 rounded"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-blue-300 rounded"></div>
                  <div className="h-2 w-28 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="absolute -right-8 bottom-10 w-24 h-24 bg-blue-100 rounded-lg flex items-center justify-center shadow-lg">
                <div className="grid grid-cols-3 gap-1">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className={`w-3 h-3 ${i === 8 ? 'bg-blue-600' : 'bg-blue-300'} rounded-sm`}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Feature Section Component
const FeatureSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-center mb-12">
          <span className="text-gray-600 text-2xl">Smart </span>
          <span className="text-blue-900 text-2xl font-bold">Presence: </span>
          <span className="text-blue-900 text-2xl font-bold">For your easier Attendance Solution.</span>
        </h2>
        
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-3xl px-8 py-12 shadow-xl">
          <div className="grid grid-cols-3 gap-8 items-start">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Clipboard className="w-24 h-24 text-orange-400" strokeWidth={1.5} />
                  <div className="absolute top-8 left-8 w-20 h-20">
                    <Clipboard className="w-full h-full text-red-500" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
              <div className="h-1 w-16 bg-white mx-auto mb-4"></div>
              <p className="text-white text-sm leading-relaxed">
                The symbol for branding this product as a solution for the world of education.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Clipboard className="w-32 h-32 text-blue-300" strokeWidth={1.5} />
              </div>
              <div className="h-1 w-16 bg-white mx-auto mb-4"></div>
              <p className="text-white text-sm leading-relaxed">
                Describing the core feature, namely the transition from manual attendance to an efficient digital system.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-32 h-32 flex items-center justify-center">
                    <Bell className="w-20 h-20 text-blue-400" strokeWidth={2} />
                    <div className="absolute top-0 right-2">
                      <div className="relative">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-8 h-8 border-2 border-blue-400 rounded-full"
                            style={{
                              right: `${i * 8}px`,
                              top: `${-i * 4}px`,
                              opacity: 1 - i * 0.3
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-1 w-16 bg-white mx-auto mb-4"></div>
              <p className="text-white text-sm leading-relaxed">
                Automatic notifications to parents, providing peace of mind and comfort.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16 px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 pr-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-6">
            Apa itu SmartPresence?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Kami menciptakan platform untuk kolaborasi pendidikan yang sukses. 
            Dengan teknologi kami, absensi siswa terekam dengan akurat, 
            memberikan rasa aman bagi orang tua, dan data yang relevan 
            untuk guru, agar semua pihak bisa aktif mendukung belajar anak.
          </p>
        </div>
        <div className="flex-1 flex justify-end">
          <div className="relative bg-white p-8 rounded-2xl shadow-xl">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Clipboard className="w-24 h-24 text-orange-400" strokeWidth={1.5} />
                <CheckCircle className="absolute bottom-2 right-2 w-8 h-8 text-green-500" />
              </div>
              <div className="flex space-x-4">
                <div className="w-20 h-28 bg-blue-200 rounded-lg flex items-center justify-center">
                  <div className="w-12 h-12 bg-blue-400 rounded-full"></div>
                </div>
                <div className="w-20 h-28 bg-blue-300 rounded-lg flex items-center justify-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full"></div>
                </div>
                <div className="w-20 h-28 bg-blue-200 rounded-lg flex items-center justify-center">
                  <div className="w-12 h-12 bg-blue-400 rounded-full"></div>
                </div>
              </div>
              <div className="relative">
                <Bell className="w-20 h-20 text-blue-600" strokeWidth={2} />
                <div className="absolute -top-2 -right-2">
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-12 h-12 border-2 border-blue-400 rounded-full"
                      style={{
                        right: `${i * 6}px`,
                        top: `${-i * 6}px`,
                        opacity: 1 - i * 0.4
                      }}
                    ></div>
                  ))}
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
const TeamSection = () => {
  return (
    <section className="bg-gradient-to-b from-blue-800 to-blue-900 py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-white text-center mb-12">
          OUR TEAM
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl h-72 shadow-lg hover:shadow-2xl transition-all hover:scale-105 cursor-pointer"
            >
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-300 rounded-full mx-auto mb-4 opacity-50"></div>
                  <div className="h-3 w-32 bg-blue-300 rounded mx-auto mb-2 opacity-50"></div>
                  <div className="h-2 w-24 bg-blue-300 rounded mx-auto opacity-50"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main App Component
export default function SmartPresenceDashboard() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <AboutSection />
      <TeamSection />
    </div>
  );
}