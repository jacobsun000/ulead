'use client';
import Image from "next/image";
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'High School', href: '/highschool' },
  { label: 'University', href: '/university' },
  { label: 'Lead Program', href: '/lead-program' },
  { label: 'Schools', href: '/schools' },
];

function NavItem({ label, href, selected, setIsMobileMenuOpen, isMobile = false }) {
  return (
    <a
      href={href}
      className={`
        ${isMobile ? 'py-2 px-4 w-full border-b-[3px]' : 'pt-2 border-b-[6px] h-full flex items-center text-lg'}
        ${isMobile ? 'lg:hidden' : 'hidden lg:flex'}
        ${selected ? 'border-primary' : 'border-transparent'}
        ${selected ? 'text-white' : 'text-faded'}
        ${!isMobile ? 'hover:border-primary hover:text-white' : ''}
        transition-colors duration-300 ease-in-out
      `}
      onClick={isMobile ? () => setIsMobileMenuOpen(false) : null}
    >
      {label}
    </a>
  );
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-secondary flex justify-between items-center w-full px-4 lg:px-20 py-1 fixed top-0 z-50">
      {/* Logo */}
      {/* <a href='/' className="flex flex-col py-2 mr-4"> */}
      {/*   <div> */}
      {/*     <span className="text-primary md:text-xl font-semibold">U</span> */}
      {/*     <span className="text-white md:text-xl font-semibold">LEAD</span> */}
      {/*   </div> */}
      {/*   <span className="text-white text-sm md:text-base md:font-semibold">合领教育</span> */}
      {/* </a> */}
      <div className="relative lg:w-32 lg:h-16 w-24 h-12 p-2">
        <Image src="/img/logo.png" alt="Ulead" fill className="object-contain" />
      </div>

      {/* Desktop Nav Items */}
      <nav className="hidden lg:flex w-full h-full justify-between items-center ml-16 space-x-6">
        {navItems.map(({ label, href }) => (
          <NavItem key={label} label={label} href={href} setIsMobileMenuOpen={setIsMobileMenuOpen} selected={pathname === href} />
        ))}
        <a href="/contacts" className="bg-primary text-white text-lg ml-4 p-1.5 rounded-[0.2rem] hover:bg-primaryLight transition duration-300">
          Contact Us
        </a>
      </nav>

      {/* Mobile View */}
      <div className="flex items-center lg:hidden">
        {/* Contact Us Button for Mobile */}
        <a href="/contacts" className="bg-primary text-white text-xs p-2 rounded-md mr-4 hover:bg-primaryLight transition duration-300">
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
        <nav className="absolute top-14 left-0 w-full bg-secondary flex flex-col items-start p-4 space-y-4 lg:hidden z-50">
          {navItems.map(({ label, href }) => (
            <NavItem setIsMobileMenuOpen={setIsMobileMenuOpen} key={label} label={label} href={href} selected={pathname === href} isMobile />
          ))}
        </nav>
      )}
    </header>
  );
}
