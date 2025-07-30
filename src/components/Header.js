"use client";
import React, { useState, useEffect } from 'react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Set smooth scroll behavior globally
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Optionally reset scroll behavior if needed
      // document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#events', label: 'Upcoming Events' },
    { href: '#past-events', label: 'Event Rewind' },
    { href: '#domains', label: 'Domains' },
    { href: '#team', label: 'Team' },
  ];

  // Helper for smooth scroll
  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
      }
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/70 backdrop-blur-sm' : ''}`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-white tracking-wider">
          <span className="text-blue-500">IEEE</span>-VSIT
        </a>
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-gray-300 hover:text-blue-500 transition-colors relative"
              onClick={e => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>
        <a href="#" className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">Join IEEE</a>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </nav>
      <div className={`${menuOpen ? 'block' : 'hidden'} md:hidden bg-black/90`}>
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            onClick={e => handleNavClick(e, link.href)}
            className="block py-2 px-4 text-sm hover:bg-gray-800"
          >
            {link.label}
          </a>
        ))}
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-800">Join IEEE</a>
      </div>
    </header>
  );
};

export default Header;
