import React from 'react';

const Footer = () => (
  <footer className="bg-gray-900/50 border-t border-gray-800">
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3 className="text-xl font-bold"><span className="text-blue-500">IEEE</span>-VSIT</h3>
          <p className="text-gray-400 text-sm">Vidyalankar School Of Information Technology</p>
          <p className="text-gray-400 text-sm">Wadala, Mumbai, Maharashtra 400037</p>
        </div>
        <div className="flex space-x-4">
          {/* Social Icons can be added here */}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

