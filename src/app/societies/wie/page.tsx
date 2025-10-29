"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import TeamSection from "../../../components/TeamSection";
import FloatingShapes from "../../../components/3d/FloatingShapes";

const WIEPage: React.FC = () => {
  // Navigation handler to redirect to main page sections
  const handleNavigate = (section: string) => {
    window.location.href = `/#${section}`;
  };

  return (
    <div className="bg-black text-gray-200 font-sans">
      <style jsx global>{`
        body {
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
            color: #e5e7eb;
            font-family: 'Poppins', sans-serif;
            overflow-x: hidden;
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .wie-gradient-bg {
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
        }
        .domain-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .domain-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.2), 0 10px 10px -5px rgba(59, 130, 246, 0.1);
        }
        @media (max-width: 640px) {
          .domain-card {
            margin: 0 auto;
            max-width: 100%;
          }
          .domain-card:hover {
            transform: translateY(-5px);
          }
        }
      `}</style>
      <Header onNavigate={handleNavigate} />
      
      {/* 3D Background */}
      <div className="fixed inset-0 z-0" style={{ pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.1} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <FloatingShapes />
        </Canvas>
      </div>

      <main className="relative min-h-screen wie-gradient-bg text-white pt-24 pb-10 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              <span className="text-blue-500">Women in Engineering</span>
              <br />
              <span className="text-gray-300 text-xl sm:text-2xl lg:text-3xl">(WIE)</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-3xl mx-auto px-2">
              IEEE Women in Engineering (WIE) is one of the world's largest
              international professional organizations dedicated to promoting women
              engineers and scientists, and inspiring girls around the world to
              follow their academic interests to a career in engineering.
            </p>
          </div>
          
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
            <section className="glass-card domain-card rounded-lg p-6 sm:p-8 hover:border-blue-500/30">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <h2 className="text-xl sm:text-2xl font-semibold text-blue-400">Our Mission</h2>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                To inspire, engage, and advance women in engineering and technology
                through networking, mentorship, and professional development
                opportunities.
              </p>
            </section>
            
            <section className="glass-card domain-card rounded-lg p-6 sm:p-8 hover:border-blue-500/30">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                <h2 className="text-xl sm:text-2xl font-semibold text-purple-400">
                  Activities & Initiatives
                </h2>
              </div>
              <ul className="text-gray-300 space-y-3 text-sm sm:text-base">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1 flex-shrink-0">▸</span>
                  <span>Workshops and seminars on technical and professional skills</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1 flex-shrink-0">▸</span>
                  <span>Mentorship programs connecting students with industry professionals</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1 flex-shrink-0">▸</span>
                  <span>Community outreach to encourage girls in STEM</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1 flex-shrink-0">▸</span>
                  <span>Networking events and panel discussions</span>
                </li>
              </ul>
            </section>
          </div>
        </div>
        {/* Meet the WIE Core Committee */}
        <section className="max-w-6xl mx-auto mt-16 sm:mt-20 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Meet Our <span className="text-blue-500">WIE Core Committee</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>
          <TeamSection wieCore={true} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WIEPage;