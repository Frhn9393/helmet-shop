import { useState, useRef, useEffect } from 'react';

// Menambahkan formatRupiah ke dalam props
export function ImageCarousel({ images = [], formatRupiah }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Otomatis geser slide setiap 5 detik
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [images.length, currentIndex]); // Ditambahkan currentIndex agar timer reset saat diklik manual

  // Menggeser secara visual saat currentIndex berubah
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  if (images.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-[2.5rem] shadow-xl shadow-slate-900/10 dark:shadow-slate-900/30">
      {/* Wrapper untuk Slides */}
      <div 
        ref={carouselRef} 
        className="flex w-full h-80 md:h-128 transition-transform duration-700 ease-in-out"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {images.map((image, index) => (
          <div key={index} className="shrink-0 w-full h-full snap-center relative group">
            <img 
              src={image.imageUrl} 
              alt={image.name} 
              className="w-full h-full object-cover" 
              loading="lazy"
            />
            {/* Overlay Info dengan Gradasi yang diperbaiki */}
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/40 to-transparent p-8 md:p-12 text-white">
              <p className="text-orange-500 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-2">
                Featured Product
              </p>
              <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none mb-3">
                {image.name}
              </h3>
              
              {/* Penggunaan formatRupiah untuk harga */}
              <p className="text-sm md:text-lg font-medium opacity-90 italic">
                {image.brand} — <span className="text-orange-400 font-bold">{formatRupiah ? formatRupiah(image.price) : `Rp ${image.price}`}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Tombol Navigasi (Desktop) */}
      <button 
        onClick={goToPrev} 
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white hidden md:flex items-center justify-center backdrop-blur-md border border-white/20 hover:bg-orange-500 hover:border-orange-500 transition-all active:scale-90 z-10"
      >
        &#10094;
      </button>
      <button 
        onClick={goToNext} 
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white hidden md:flex items-center justify-center backdrop-blur-md border border-white/20 hover:bg-orange-500 hover:border-orange-500 transition-all active:scale-90 z-10"
      >
        &#10095;
      </button>

      {/* Indikator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              currentIndex === index ? 'bg-orange-500 w-8' : 'bg-white/40 w-1.5'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;