import React from 'react';
import { FaInstagram, FaLinkedin, FaGithub, FaRegEnvelope, FaArrowUp } from 'react-icons/fa';

const Footer = () => (
  <footer className="relative z-10 mt-10">
    {/* Animated Gradient Border */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="w-full h-full rounded-t-3xl border-t-4 border-b-0 border-x-0 border-transparent"
        style={{
          borderImage: 'linear-gradient(90deg, #2563eb 0%, #0ea5e9 50%, #6366f1 100%) 1',
          borderTopStyle: 'solid',
        }}
      ></div>
    </div>
    {/* Glassmorphism Footer Content */}
    <div className="relative bg-gradient-to-br from-[#0a1629]/90 via-[#101c36]/90 to-[#1e293b]/90 backdrop-blur-xl rounded-t-3xl shadow-2xl border-t border-blue-900/60 px-2 sm:px-4 py-6 sm:py-7 md:py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-12 gap-6">
        {/* IEEE Logo and Name */}
        <div className="flex flex-col items-center gap-2 md:col-span-3 mb-4 md:mb-0">
          <img
            src="/ieee-emblem.png"
            alt="IEEE Emblem"
            className="h-12 w-12 sm:h-16 sm:w-16 object-contain drop-shadow-lg mx-auto"
          />
          <span className="font-extrabold text-xl sm:text-2xl md:text-3xl tracking-wider text-blue-400 drop-shadow-lg text-center">IEEE VSIT</span>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-1 text-center max-w-[180px]">
            Advancing Technology for Humanity
          </p>
        </div>
        {/* Divider for mobile */}
        <div className="block md:hidden border-t border-blue-900/40 my-2"></div>
        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start md:col-span-3 mb-4 md:mb-0">
          <h4 className="font-bold text-base sm:text-lg md:text-xl mb-2 text-blue-300 tracking-wide text-center md:text-left">Quick Links</h4>
          <ul className="space-y-1 text-gray-300 text-sm sm:text-base md:text-lg text-center md:text-left">
            <li>
              <a href="/" className="hover:text-blue-400 hover:underline transition-all duration-200 text-lg">Home</a>
            </li>
            <li>
              <a href="#events" className="hover:text-blue-400 hover:underline transition-all duration-200 text-lg">Upcoming</a>
            </li>
            <li>
              <a href="#past-events" className="hover:text-blue-400 hover:underline transition-all duration-200 text-lg">Past Events</a>
            </li>
            <li>
              <a href="#team" className="hover:text-blue-400 hover:underline transition-all duration-200 text-lg">Committee</a>
            </li>
            <li>
              <a
                href="mailto:ieeevsit2025@gmail.com"
                className="hover:text-blue-400 hover:underline transition-all duration-200 text-lg md:text-base"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        {/* Divider for mobile */}
        <div className="block md:hidden border-t border-blue-900/40 my-2"></div>
        {/* Contact Us */}
        <div className="flex flex-col items-center md:items-start md:col-span-3 mb-4 md:mb-0">
          <h4 className="font-bold text-base sm:text-lg md:text-xl mb-2 text-blue-300 tracking-wide text-center md:text-left">Contact</h4>
          <address className="not-italic text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed text-center md:text-left">
            Vidyalankar School of Information Technology<br />
            Vidyalankar College Marg,<br />
            Wadala (East)<br />
            Mumbai, Maharashtra 400037
          </address>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg mt-2 text-center md:text-left">
            <span className="font-semibold text-blue-200">+91 8692811341</span> <span className="text-gray-400">– Soham Darekar (Chairperson)</span>
          </p>
        </div>
        {/* Divider for mobile */}
        <div className="block md:hidden border-t border-blue-900/40 my-2"></div>
        {/* Social Links */}
        <div className="flex flex-col items-center md:items-start md:col-span-3">
          <h4 className="font-bold text-base sm:text-lg md:text-xl mb-2 text-blue-300 tracking-wide text-center md:text-left">Socials</h4>
          <ul className="flex flex-row md:flex-col items-center justify-center gap-3 md:justify-start md:gap-4 text-gray-300 text-sm sm:text-base md:text-lg">
            <li>
              <a href="https://instagram.com/ieee.vsit" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 group hover:text-pink-400 transition-all">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500/20 to-pink-400/10 group-hover:bg-pink-500/30 transition">
                  <FaInstagram className="text-2xl group-hover:scale-110 transition-transform" />
                </span>
                <span className="text-base sm:text-lg">ieee.vsit</span>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/ieeevsit/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 group hover:text-blue-400 transition-all">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500/20 to-blue-400/10 group-hover:bg-blue-500/30 transition">
                  <FaLinkedin className="text-2xl group-hover:scale-110 transition-transform" />
                </span>
                <span className="text-base sm:text-lg">ieeevsit</span>
              </a>
            </li>
            <li>
              <a href="https://github.com/ieeevsit" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 group hover:text-gray-100 transition-all">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-gray-500/20 to-gray-400/10 group-hover:bg-gray-500/30 transition">
                  <FaGithub className="text-2xl group-hover:scale-110 transition-transform" />
                </span>
                <span className="text-base sm:text-lg">ieeevsit</span>
              </a>
            </li>
            <li>
              <a href="mailto:ieeevsit2025@gmail.com"
                className="flex items-center gap-3 group hover:text-yellow-300 transition-all">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400/20 to-yellow-200/10 group-hover:bg-yellow-400/30 transition">
                  <FaRegEnvelope className="text-2xl group-hover:scale-110 transition-transform" />
                </span>
                <span className="text-base sm:text-lg break-all">ieeevsit2025@gmail.com</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Divider */}
      <div className="border-t border-blue-900/40 my-4 sm:my-5"></div>
      {/* Copyright & Back to Top */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="text-center text-gray-400 text-xs sm:text-sm md:text-base tracking-wide">
          © 2025 IEEE-VSIT, All Rights Reserved.
        </div>
        {/* Floating Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gradient-to-tr from-blue-700/80 to-blue-500/80 hover:from-blue-600 hover:to-blue-400 text-blue-100 hover:text-white shadow-lg transition-all ring-2 ring-blue-700/30 focus:outline-none focus:ring-4 focus:ring-blue-400/40 text-sm sm:text-base md:text-lg"
          aria-label="Back to top"
        >
          <FaArrowUp />
          <span className="hidden sm:inline">Back to Top</span>
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;

