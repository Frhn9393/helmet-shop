import { useState } from 'react';

export default function Navbar({ dark, setDark, cartCount, openCart }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Daftar menu baru Anda
  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Products', href: '#products' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-[#020617]/80 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-2xl font-black italic uppercase tracking-tighter cursor-pointer shrink-0" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          W<span className="text-orange-500">B</span>
        </h1>

        {/* Menu Tengah (Desktop Only) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-bold uppercase tracking-widest hover:text-orange-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button onClick={openCart} className="relative p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-orange-500 transition-all active:scale-90">
            <span className="text-xl">🛒</span>
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">{cartCount}</span>}
          </button>
          
          <button onClick={() => setDark(!dark)} className="p-2 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-orange-500 transition-all active:scale-90">
            <span>{dark ? '☀️' : '🌙'}</span>
          </button>

          {/* Hamburger Button (Mobile Only) */}
          <button 
            className="md:hidden p-2 text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 bg-white dark:bg-[#020617] border-b border-slate-200 dark:border-slate-800 ${isMenuOpen ? 'max-h-64' : 'max-h-0'}`}>
        <div className="flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-bold uppercase tracking-tighter hover:text-orange-500"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}