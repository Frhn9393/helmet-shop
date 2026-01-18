import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-8 right-8 z-90 p-4 rounded-full bg-orange-500 text-white shadow-2xl transition-all duration-300 active:scale-90 ${show ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
    >
      <span className="text-xl font-bold">↑</span>
    </button>
  );
}