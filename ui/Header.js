'use client';
import { useState } from 'react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Highschool', href: '/highschool' },
  { label: 'University', href: '/university' },
  // { label: 'Lead Program', href: '/lead-program' },
  { label: 'Partners', href: '/partners' },
];

function NavItem({ label, href, selected, isMobile = false }) {
  return (
    <a
      href={href}
      className={`
        ${isMobile ? 'py-2 px-4 w-full border-b-[3px]' : 'pt-2 border-b-[6px] h-full flex items-center text-lg'}
        ${isMobile ? 'md:hidden' : 'hidden md:flex'}
        ${selected ? 'border-primary' : 'border-transparent'}
        ${selected ? 'text-white' : 'text-faded'}
        hover:border-primary hover:text-white transition-colors duration-300 ease-in-out
      `}
      onClick={isMobile ? () => setIsMobileMenuOpen(false) : null}
    >
      {label}
    </a>
  );
}

export default function Header({ currentPath = '/' }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-secondary flex justify-between items-center px-4 md:px-20 h-16 z-auto">
      {/* Logo */}
      <div className="flex flex-col py-2 mr-4">
        <div>
          <span className="text-primary md:text-xl font-semibold">U</span>
          <span className="text-white md:text-xl font-semibold">LEAD</span>
        </div>
        <span className="text-white text-sm md:text-base md:font-semibold">合领教育</span>
      </div>

      {/* Desktop Nav Items */}
      <nav className="hidden md:flex w-full h-full justify-between items-center ml-16 space-x-6">
        {navItems.map(({ label, href }) => (
          <NavItem key={label} label={label} href={href} selected={currentPath === href} />
        ))}
        <a href="/contacts" className="bg-primary text-white text-lg ml-4 p-1.5 rounded-[0.2rem] hover:bg-primaryLight transition duration-300">
          Contact Us
        </a>
      </nav>

      {/* Mobile View */}
      <div className="flex items-center md:hidden">
        {/* Contact Us Button for Mobile */}
        <a href="/contacts" className="bg-primary text-white p-2 rounded-md mr-4 hover:bg-primaryLight transition duration-300">
          Contact Us
        </a>

        {/* Burger Menu Button */}
        <button onClick={toggleMobileMenu} className="text-white focus:outline-none ml-4">
          <div className="space-y-1">
            <span className="block w-6 h-[2px] bg-white"></span>
            <span className="block w-6 h-[2px] bg-white"></span>
            <span className="block w-6 h-[2px] bg-white"></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-secondary flex flex-col items-start p-4 space-y-4 md:hidden z-50">
          {navItems.map(({ label, href }) => (
            <NavItem key={label} label={label} href={href} selected={currentPath === href} isMobile />
          ))}
        </nav>
      )}
    </header>
  );
}
