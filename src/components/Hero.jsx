import { useState } from "react";

export default function Hero({ searchTerm, setSearchTerm, helmetData }) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Mengambil maksimal 5 saran berdasarkan input user
  const suggestions = helmetData
    .filter((h) => 
      searchTerm && 
      h.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      h.name.toLowerCase() !== searchTerm.toLowerCase()
    )
    .slice(0, 5);

  return (
    <header className="px-6 py-12 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div className="text-left">
        <h2 className="text-5xl md:text-8xl font-black uppercase italic leading-[0.85] tracking-tighter">
          Ride <span className="text-orange-500">Safe.</span> <br /> 
          Look <span className="text-orange-500">Cool.</span>
        </h2>
        <p className="mt-6 text-slate-500 dark:text-slate-400 font-medium max-w-md">
          Premium protection with futuristic style and 3D preview technology.
        </p>
      </div>
      
      <div className="relative w-full md:w-80">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search helmets..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            // Menutup sugesti saat input kehilangan fokus (dengan delay agar klik saran terdaftar)
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl focus:border-orange-500 outline-none transition-all pl-12 font-medium"
          />
          <span className="absolute left-4 top-4 opacity-40">🔍</span>
          
          {/* Tombol Clear (X) jika ada teks */}
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-4 text-slate-400 hover:text-orange-500 transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        {/* Panel Sugesti */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-[160] overflow-hidden">
            {suggestions.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setSearchTerm(s.name);
                  setShowSuggestions(false);
                }}
                className="w-full text-left px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-none"
              >
                <img src={s.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover bg-black" />
                <div className="overflow-hidden">
                  <p className="text-sm font-bold truncate">{s.name}</p>
                  <p className="text-[10px] text-orange-500 font-black uppercase tracking-widest">{s.brand}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}