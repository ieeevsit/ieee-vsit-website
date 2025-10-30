"use client";
import React, { useState, useEffect, useRef } from 'react';

interface NavLink {
  href: string;
  label: string;
}

interface HeaderProps {
  onNavigate?: (href: string) => void;
  hideJoinButton?: boolean;
  customButton?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, hideJoinButton = false, customButton = null }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [societiesOpen, setSocietiesOpen] = useState<boolean>(false); // For desktop dropdown
  const [mobileSocietiesOpen, setMobileSocietiesOpen] = useState<boolean>(false); // For mobile dropdown

  const societiesRef = useRef<HTMLDivElement>(null);

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
    function handleClickOutside(event: MouseEvent) {
      if (
        societiesRef.current &&
        !societiesRef.current.contains(event.target as Node)
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

  const navLinks: NavLink[] = [
    { href: '#about', label: 'About' },
    { href: '#events', label: 'Upcoming Events' },
    { href: '#past-events', label: 'Event Rewind' },
    { href: '#domains', label: 'Domains' },
    { href: '#team', label: 'Team' },
    { href: '/certificates', label: 'Certificates' },
  ];

  // Helper for smooth scroll
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
        e.preventDefault();
        
        // Close mobile menu first (always)
        setMenuOpen(false);
        
        // If onNavigate prop is provided (for external pages), use it
        if (onNavigate) {
          onNavigate(href.substring(1)); // Remove # from href
          return;
        }
        
        // Check if we're on the main page (home page)
        const currentPath = window.location.pathname;
        const isOnMainPage = currentPath === '/';
        
        if (!isOnMainPage) {
          // If not on main page, navigate to main page with the hash
          window.location.href = '/' + href;
          return;
        }
        
        // If on main page, use normal scroll behavior
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
            // Update hash in URL without jumping
            history.replaceState(null, '', href);
        }
    } else if (href.startsWith('/')) {
        // Handle internal page navigation
        setMenuOpen(false);
        window.location.href = href;
    }
  };

  const handleSocietiesClick = () => {
    setSocietiesOpen(open => !open);
  };

  const handleMobileSocietiesClick = () => {
    setMobileSocietiesOpen(open => !open);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${scrolled ? 'bg-black/85 backdrop-blur-md' : 'bg-black/20 backdrop-blur-sm'}`}>
      {/* Mobile Header: logo left, burger right */}
      <div className="flex items-center justify-between lg:hidden container mx-auto px-4 sm:px-6 py-4 sm:py-5 min-h-[60px] sm:min-h-[70px]">
        <a href="/" className="text-xl sm:text-2xl font-bold text-white tracking-wider flex items-center gap-2 sm:gap-3">
          <img
            src="/ieee-emblem.png"
            alt="IEEE Emblem"
            className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
          />
          <span className="leading-none flex items-center">
            <span className="text-blue-500">IEEE</span>
            <span className="ml-1">-VSIT</span>
          </span>
        </a>
        <button 
          onClick={handleMenuClick} 
          className="text-white focus:outline-none z-[1001] relative p-3 touch-manipulation bg-black/30 rounded-lg hover:bg-black/50 transition-colors"
          aria-label="Toggle mobile menu"
          type="button"
        >
          <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      
      {/* Tablet Header (Medium Screens) */}
      <nav className="hidden md:flex lg:hidden container mx-auto px-3 sm:px-6 py-4 sm:py-6 justify-between items-center">
        <a href="/" className="text-xl font-bold text-white tracking-wider flex items-center gap-2">
          <img
            src="/ieee-emblem.png"
            alt="IEEE Emblem"
            className="h-8 w-8 object-contain"
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
          />
          <span className="leading-none flex items-center">
            <span className="text-blue-500">IEEE</span>
            <span className="ml-1">-VSIT</span>
          </span>
        </a>
        <div className="flex items-center space-x-2">
          <a href="/certificates" className="text-xs text-gray-300 hover:text-blue-500 transition-colors px-1 py-1">Certificates</a>
          <div className="relative" ref={societiesRef}>
            <span
              className="text-xs text-gray-300 hover:text-blue-500 transition-colors px-1 py-1 flex items-center cursor-pointer select-none"
              onClick={handleSocietiesClick}
            >
              Societies
              <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
            {societiesOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded-lg shadow-lg z-50">
                <a href="/societies/wie" className="block px-4 py-2 text-gray-200 hover:bg-blue-600 hover:text-white rounded-t-lg transition-colors text-sm">
                  Women in Engineering (WIE)
                </a>
              </div>
            )}
          </div>
        </div>
        <a href="/join-ieee" className="bg-blue-600 hover:bg-blue-700 text-xs font-bold py-2 px-3 rounded-lg transition-colors duration-300">Join IEEE</a>
      </nav>
      
      {/* Desktop Header */}
      <nav className="hidden lg:flex container mx-auto px-3 sm:px-6 py-4 sm:py-6 justify-between items-center">
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
        <div className="flex items-center space-x-3 lg:space-x-6">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-sm lg:text-base text-gray-300 hover:text-blue-500 transition-colors relative px-1 lg:px-2 py-1 whitespace-nowrap"
              onClick={e => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          {/* Our Societies Dropdown (Desktop) */}
          <div className="relative" ref={societiesRef}>
            <span
              className="nav-link text-sm lg:text-base text-gray-300 hover:text-blue-500 transition-colors relative px-1 lg:px-2 py-1 flex items-center cursor-pointer select-none whitespace-nowrap"
              role="button"
              aria-haspopup="true"
              aria-expanded={societiesOpen}
              tabIndex={0}
              onClick={handleSocietiesClick}
            >
              Our Societies
              <svg className="ml-1 w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
        {hideJoinButton ? (
          customButton || <div className="w-24 lg:w-32"></div>
        ) : (
          <a href="/join-ieee" className="bg-blue-600 hover:bg-blue-700 text-sm lg:text-base font-bold py-2 lg:py-3 px-3 lg:px-6 rounded-lg transition-colors duration-300 whitespace-nowrap">Join IEEE</a>
        )}
      </nav>
      {/* Mobile Menu Dropdown */}
      <div className={`${menuOpen ? 'block' : 'hidden'} lg:hidden bg-black/95 backdrop-blur-md relative z-[1000] w-full border-t border-gray-700/30`}>
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            onClick={e => handleNavClick(e, link.href)}
            className="block py-4 px-6 text-lg hover:bg-gray-800/80 text-white border-b border-gray-700/30 transition-colors touch-manipulation"
            style={{ fontSize: '1.125rem', letterSpacing: '0.01em', minHeight: '56px', display: 'flex', alignItems: 'center' }}
          >
            {link.label}
          </a>
        ))}
        {/* Our Societies Dropdown (Mobile) */}
        <div className="border-b border-gray-700/30">
          <span
            className="block w-full text-left py-4 px-6 text-lg hover:bg-gray-800/80 cursor-pointer select-none text-white transition-colors touch-manipulation"
            style={{ fontSize: '1.125rem', letterSpacing: '0.01em', minHeight: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            onClick={handleMobileSocietiesClick}
            tabIndex={0}
            role="button"
            aria-haspopup="true"
            aria-expanded={mobileSocietiesOpen}
          >
            <span>Our Societies</span>
            <svg className={`w-5 h-5 transform transition-transform ${mobileSocietiesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
          {mobileSocietiesOpen && (
            <div className="bg-black/95">
              <a
                href="/societies/wie"
                className="block py-4 px-10 text-lg hover:bg-blue-600 hover:text-white text-gray-300 transition-colors touch-manipulation"
                style={{ fontSize: '1.05rem', minHeight: '52px', display: 'flex', alignItems: 'center' }}
                onClick={() => setMenuOpen(false)}
              >
                Women in Engineering (WIE)
              </a>
              {/* Add more societies here if needed */}
            </div>
          )}
        </div>
        {hideJoinButton ? (
          customButton ? (
            <div className="block py-4 px-6 text-lg hover:bg-gray-800/80 border-b border-gray-700/30 touch-manipulation" style={{ minHeight: '56px', display: 'flex', alignItems: 'center' }}>
              {customButton}
            </div>
          ) : null
        ) : (
          <a href="/join-ieee" className="block py-4 px-6 text-lg hover:bg-gray-800/80 text-white border-b border-gray-700/30 transition-colors touch-manipulation" style={{ minHeight: '56px', display: 'flex', alignItems: 'center' }}>Join IEEE</a>
        )}
      </div>
    </header>
  );
};

export default Header;