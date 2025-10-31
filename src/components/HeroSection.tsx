import dynamic from 'next/dynamic';
import React from 'react';

const Hero3DIcosahedron = dynamic(() => import('./3d/Hero3DIcosahedron'), { ssr: false });

const HeroSection: React.FC = () => (
  <section id="hero" className="relative min-h-[80vh] h-screen flex flex-col items-center justify-center text-center overflow-hidden px-2 sm:px-0">
    {/* 3D Icosahedron background */}
    <div className="absolute inset-0 z-0 bg-black pointer-events-none select-none">
      <Hero3DIcosahedron />
    </div>
    <div className="relative z-10 px-2 sm:px-4">
      <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold text-white mb-4 leading-tight">
        IEEE VSIT: <span className="text-[#3b82f6]">Innovating Tomorrow.</span>
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
        The official student chapter of IEEE at VSIT, fostering technical innovation, leadership, and a vibrant community of engineers.
      </p>
      <a
        href="#about"
        className="bg-transparent border-2 border-blue-500 text-blue-500 font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault();
          const el = document.querySelector('#about');
          if (el) {
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0;
            const elementTop = el.getBoundingClientRect().top + window.scrollY;
            const scrollTo = elementTop - headerHeight - 8;
            window.scrollTo({
              top: scrollTo,
              behavior: 'smooth'
            });
            history.replaceState(null, '', '#about');
          }
        }}
      >
        Discover More
      </a>
    </div>
  </section>
);

export default HeroSection;