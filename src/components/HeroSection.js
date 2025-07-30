import dynamic from 'next/dynamic';
const Hero3DIcosahedron = dynamic(() => import('./3d/Hero3DIcosahedron'), { ssr: false });


const HeroSection = () => (
  <section id="hero" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
    {/* 3D Icosahedron background */}
    <div className="absolute inset-0 z-0 bg-black pointer-events-none select-none">
      <Hero3DIcosahedron />
    </div>
    <div className="relative z-10 px-4">
      <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 leading-tight">
        Innovating Tomorrow, <br /> <span className="text-[#3b82f6]">Empowering Today.</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
        The official student chapter of IEEE at VSIT, fostering technical innovation, leadership, and a vibrant community of engineers.
      </p>
      <a
        href="#about"
        className="bg-transparent border-2 border-blue-500 text-blue-500 font-bold py-3 px-8 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
        onClick={e => {
          e.preventDefault();
          const el = document.querySelector('#about');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        Discover More
      </a>
    </div>
  </section>
);

export default HeroSection;