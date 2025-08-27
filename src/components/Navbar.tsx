// src/components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
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
    <header className="bg-gray-800 text-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-yellow-400 hover:text-yellow-500">
          Fleet Mucky Mayhem
        </Link>
        {/* Basic mobile menu toggle - we can add full functionality later */}
        <div className="md:hidden">
            <button>Menu</button>
        </div>
        <ul className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-yellow-400 transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}