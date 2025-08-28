'use client'; // <-- 1. Convert to a Client Component

import { useState } from 'react'; // <-- 2. Import useState
import Link from 'next/link';

// A simple hamburger/close icon component
const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    {isOpen ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> // X icon
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /> // Hamburger icon
    )}
  </svg>
);


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // <-- 3. Add state to track menu visibility

  const navLinks = [
    { href: "/about-us", label: "About Us" },
    { href: "/what-we-do", label: "What We Do" },
    { href: "/where-to-next", label: "Where To Next" },
    { href: "/sponsors", label: "Sponsors" },
    { href: "/ride-diary", label: "Ride Diary" },
    { href: "/photos", label: "Photos" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact-us", label: "Contact Us" },
    { href: "/disclaimer", label: "Disclaimer" },
  ];

  return (
    <header className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-yellow-400 hover:text-yellow-500" onClick={() => setIsOpen(false)}>
          Fleet Mucky Mayhem
        </Link>
        
        {/* Desktop Menu (hidden on mobile) */}
        <ul className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-yellow-400 transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button (visible on mobile) */}
        <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}> {/* <-- 4. Toggle state on click */}
                <MenuIcon isOpen={isOpen} />
            </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown (conditionally rendered) */}
      {isOpen && (
        <div className="md:hidden bg-gray-800">
            <ul className="flex flex-col items-center space-y-4 py-4">
                {navLinks.map((link) => (
                    <li key={link.href}>
                        <Link 
                          href={link.href} 
                          className="hover:text-yellow-400 transition-colors"
                          onClick={() => setIsOpen(false)} // <-- Close menu on link click
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
      )}
    </header>
  );
}