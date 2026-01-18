export default function FilterBar({ brands, selectedBrand, setSelectedBrand }) {
  return (
    <div className="relative overflow-hidden">
      {/* Container utama dengan negative margin untuk menyembunyikan scrollbar yang mungkin masih muncul */}
      <div 
        className="flex gap-3 overflow-x-auto pb-6 -mb-6 no-scrollbar touch-pan-x"
        style={{ 
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none' 
        }}
      >
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            // Menambahkan whitespace-nowrap agar teks brand tidak terpotong ke bawah
            className={`px-6 py-2.5 rounded-full text-[10px] md:text-xs font-bold border transition-all uppercase tracking-widest whitespace-nowrap shrink-0 ${
              selectedBrand === brand
                ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-orange-500 text-slate-600 dark:text-slate-400"
            }`}
          >
            {brand}
          </button>
        ))}
      </div>
    </div>
  );
}