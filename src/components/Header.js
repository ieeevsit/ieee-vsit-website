"use client";
import React, { useState, useEffect, useRef } from 'react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [societiesOpen, setSocietiesOpen] = useState(false); // For desktop dropdown
  const [mobileSocietiesOpen, setMobileSocietiesOpen] = useState(false); // For mobile dropdown

  const societiesRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Set smooth scroll behavior globally
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close societies dropdown on outside click (desktop)
    function handleClickOutside(event) {
      if (
        societiesRef.current &&
        !societiesRef.current.contains(event.target)
      ) {
        setSocietiesOpen(false);
      }
    }
    if (societiesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [societiesOpen]);

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
            // Calculate offset for fixed header
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0;
            const elementTop = el.getBoundingClientRect().top + window.scrollY;
            const scrollTo = elementTop - headerHeight - 8; // 8px extra spacing

            window.scrollTo({
                top: scrollTo,
                behavior: 'smooth'
            });
            setMenuOpen(false);
            // Update hash in URL without jumping
            history.replaceState(null, '', href);
        }
    }
  };

  return (
    <header className={`md:fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/70 backdrop-blur-sm' : ''}`}>
      {/* Mobile Header: logo left, burger right */}
      <div className="flex items-center justify-between md:hidden container mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <a href="/" className="text-2xl sm:text-3xl font-bold text-white tracking-wider flex items-center gap-3 sm:gap-4">
          <img
            src="/ieee-emblem.png"
            alt="IEEE Emblem"
            className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
          />
          <span className="leading-none flex items-center sm:flex-col">
            <span className="text-blue-500">IEEE</span>
            <span className="ml-2 sm:ml-0">-VSIT</span>
          </span>
        </a>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </div>
      {/* Desktop Header */}
      <nav className="hidden md:flex container mx-auto px-3 sm:px-6 py-4 sm:py-6 justify-between items-center">
        <a href="/" className="text-2xl sm:text-3xl font-bold text-white tracking-wider flex items-center gap-3 sm:gap-4">
          <img
            src="/ieee-emblem.png"
            alt="IEEE Emblem"
            className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
          />
          <span className="leading-none flex items-center">
            <span className="text-blue-500">IEEE</span>
            <span className="ml-2">-VSIT</span>
          </span>
        </a>
        <div className="flex items-center space-x-6 sm:space-x-10">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-base sm:text-lg text-gray-300 hover:text-blue-500 transition-colors relative px-2 py-1"
              onClick={e => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          {/* Our Societies Dropdown (Desktop) */}
          <div className="relative" ref={societiesRef}>
            <span
              className="nav-link text-base sm:text-lg text-gray-300 hover:text-blue-500 transition-colors relative px-2 py-1 flex items-center cursor-pointer select-none"
              role="button"
              aria-haspopup="true"
              aria-expanded={societiesOpen}
              tabIndex={0}
              onClick={() => setSocietiesOpen(open => !open)}
            >
              Our Societies
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
            {societiesOpen && (
              <div
                className="absolute left-0 mt-2 w-56 bg-black border border-gray-700 rounded-lg shadow-lg z-50"
              >
                <a
                  href="/societies/wie"
                  className="block px-5 py-3 text-gray-200 hover:bg-blue-600 hover:text-white rounded-t-lg transition-colors"
                >
                  Women in Engineering (WIE)
                </a>
                {/* Add more societies here if needed */}
              </div>
            )}
          </div>
        </div>
        <a href="#" className="bg-blue-600 hover:bg-blue-700 text-base sm:text-lg font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors duration-300">Join IEEE</a>
      </nav>
      {/* Mobile Menu Dropdown */}
      <div className={`${menuOpen ? 'block' : 'hidden'} md:hidden bg-black/90`}>
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            onClick={e => handleNavClick(e, link.href)}
            className="block py-3 px-6 text-base hover:bg-gray-800"
            style={{ fontSize: '1.1rem', letterSpacing: '0.01em' }}
          >
            {link.label}
          </a>
        ))}
        {/* Our Societies Dropdown (Mobile) */}
        <div>
          <span
            className="w-full text-left block py-3 px-6 text-base hover:bg-gray-800 flex items-center justify-between cursor-pointer select-none"
            style={{ fontSize: '1.1rem', letterSpacing: '0.01em' }}
            onClick={() => setMobileSocietiesOpen(open => !open)}
            tabIndex={0}
            role="button"
            aria-haspopup="true"
            aria-expanded={mobileSocietiesOpen}
          >
            Our Societies
            <svg className={`ml-2 w-4 h-4 transform transition-transform ${mobileSocietiesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
          {mobileSocietiesOpen && (
            <div className="bg-black/95">
              <a
                href="/societies/wie"
                className="block py-3 px-10 text-base hover:bg-blue-600 hover:text-white"
                style={{ fontSize: '1.05rem' }}
                onClick={() => setMenuOpen(false)}
              >
                Women in Engineering (WIE)
              </a>
              {/* Add more societies here if needed */}
            </div>
          )}
        </div>
        <a href="#" className="block py-3 px-6 text-base hover:bg-gray-800">Join IEEE</a>
      </div>
    </header>
  );
};

export default Header;
