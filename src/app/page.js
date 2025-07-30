"use client";
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import EventsSection from '../components/EventsSection';
import PastEventsSection from '../components/PastEventsSection';
import DomainsSection from '../components/DomainsSection';
import TeamSection from '../components/TeamSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="bg-black text-gray-200 font-sans">
      <style jsx global>{`
        body {
            background-color: #0a0a0a;
            color: #e5e7eb;
            font-family: 'Poppins', sans-serif;
            overflow-x: hidden;
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .domain-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .domain-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.2), 0 10px 10px -5px rgba(59, 130, 246, 0.1);
        }
        .nav-link::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #3b82f6;
            transition: width 0.3s ease;
        }
        .nav-link:hover::after {
            width: 100%;
        }
        .horizontal-scroll-container {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .horizontal-scroll-container::-webkit-scrollbar {
            display: none;
        }
      `}</style>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <EventsSection />
        <PastEventsSection />
        <DomainsSection />
        {/* <AiQuerySection /> */}
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
}
