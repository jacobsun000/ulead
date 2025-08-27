'use client';
import Image from "next/image";
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: '主页', href: '/zh' },
  { label: '美国大学', href: '/zh/university' },
  { label: '美国高中', href: '/zh/highschool' },
  { label: '领航计划', href: '/zh/lead-program' },
  { label: '夏校', href: '/zh/summer-school' },
];

function NavItem({ label, href, selected, setIsMobileMenuOpen, isMobile = false }) {
  return (
    <a
      href={href}
      className={`
        ${isMobile ? 'py-2 px-4 w-full border-b-[3px]' : 'p-2 border-b-[6px] h-full flex items-center text-lg'}
        ${isMobile ? 'lg:hidden' : 'hidden lg:flex'}
        ${selected ? 'border-white' : 'border-transparent'}
        ${selected ? 'text-white font-semibold' : 'text-white/80'}
        ${!isMobile ? 'hover:border-white hover:text-white hover:drop-shadow-[0_0_8px_#6E4AC8] hover:filter hover:brightness-110' : ''}
        transition-all duration-300 ease-in-out
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
    <header className={'bg-ulead-gradient flex justify-between items-center w-full px-4 lg:px-16 xl:px-20 py-1 fixed top-0 z-50'
    }>
      {/* Logo */}
      <div className="relative lg:w-32 lg:h-16 w-24 h-12 p-2">
        <Image src="/img/logo.png" alt="Ulead" fill className="object-contain" />
      </div>

      {/* Desktop Nav Items */}
      <nav className="hidden lg:flex w-full h-full justify-between items-center ml-16 space-x-6">
        {navItems.map(({ label, href }) => (
          <NavItem key={label} label={label} href={href} setIsMobileMenuOpen={setIsMobileMenuOpen} selected={href === "/zh" ? pathname === href : pathname.startsWith(href)} />
        ))}
        <a href="/zh/contacts" className="bg-white text-lg ml-4 px-6 py-2 rounded-full hover:bg-gray-100 transition duration-300 font-medium">
          <span className="bg-ulead-gradient bg-clip-text text-transparent font-semibold">
            联系我们
          </span>
        </a>
      </nav>

      {/* Mobile View */}
      <div className="flex items-center lg:hidden">
        {/* Contact Us Button for Mobile */}
        <a href="/zh/contacts" className="bg-white text-xs px-4 py-2 rounded-full mr-4 hover:bg-gray-100 transition duration-300 font-medium">
          <span className="bg-ulead-gradient bg-clip-text text-transparent font-semibold">
            联系我们
          </span>
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
        <nav className={`
          absolute top-14 left-0 w-full 
          ${transparent ? 'bg-black/80 backdrop-blur-sm' : 'bg-secondary'} 
          flex flex-col items-start p-4 space-y-4 lg:hidden z-50
        `}>
          {navItems.map(({ label, href }) => (
            <NavItem setIsMobileMenuOpen={setIsMobileMenuOpen} key={label} label={label} href={href} selected={pathname === href} isMobile />
          ))}
        </nav>
      )}
    </header>
  );
}
