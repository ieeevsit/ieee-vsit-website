import React from 'react';

const AboutSection: React.FC = () => (
  <section id="about" className="py-12 sm:py-16 lg:py-20 bg-[#0A0F1A]">
    <div className="container mx-auto px-4 sm:px-6 text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Who We Are</h2>
      <div className="w-16 sm:w-20 md:w-24 h-1 bg-blue-500 mx-auto mb-8 sm:mb-10 lg:mb-12"></div>
      <p className="max-w-4xl mx-auto text-gray-300 text-base sm:text-lg mb-8 sm:mb-10 lg:mb-12 leading-relaxed px-2">
        IEEE-VSIT is more than just a student committee; it's a dynamic community dedicated to advancing technology for humanity. We provide a platform for students to explore their passions, develop professional skills, and connect with a global network of experts and peers. Our mission is to inspire innovation and cultivate the next generation of engineering leaders.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <div className="glass-card p-4 sm:p-6 lg:p-8 rounded-xl">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-400 mb-2 sm:mb-3">Learn</h3>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">Engage in cutting-edge workshops and seminars on the most in-demand technologies.</p>
        </div>
        <div className="glass-card p-4 sm:p-6 lg:p-8 rounded-xl">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-400 mb-2 sm:mb-3">Build</h3>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">Collaborate on impactful projects, turning theoretical knowledge into practical solutions.</p>
        </div>
        <div className="glass-card p-4 sm:p-6 lg:p-8 rounded-xl sm:col-span-2 md:col-span-1">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-400 mb-2 sm:mb-3">Grow</h3>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">Develop leadership and communication skills in a supportive and professional environment.</p>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;