export default function HelmetCard({ item, onAdd, formatRupiah }) {
  return (
    <div className="group bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-6 hover:border-orange-500 transition-all flex flex-col hover:shadow-2xl hover:shadow-orange-500/10">
      
      {/* AREA GAMBAR: Menggunakan tag img untuk menampilkan gambar dari JSON */}
      <div className="h-64 bg-slate-100 dark:bg-black rounded-3xl mb-6 relative overflow-hidden group/img">
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x400?text=No+Image";
          }}
        />
        {/* Overlay teks saat hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
          <span className="italic text-white text-[10px] font-black uppercase tracking-widest">
            3D Preview Ready
          </span>
        </div>
      </div>

      {/* Area Informasi Produk */}
      <div className="flex flex-col mb-6">
        <h4 className="text-2xl font-bold tracking-tighter mb-1">{item.name}</h4>
        
        <div className="flex items-center gap-3 overflow-hidden">
          <p className="text-orange-500 text-[10px] font-black uppercase tracking-widest shrink-0">
            {item.brand}
          </p>
          
          {/* <div className="flex gap-1.5 py-1">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all ${i === 3 ? 'w-4 bg-orange-500' : 'w-1.5 bg-slate-300 dark:bg-slate-700'}`}
              />
            ))}
          </div> */}
        </div>
      </div>

      {/* Area Harga dan Tombol */}
      <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800/50">
        <span className="text-xl font-black italic tracking-tighter">
          {formatRupiah(item.price)}
        </span>
        <button 
          onClick={onAdd} 
          className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-2xl font-black uppercase italic tracking-tighter hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transition-all active:scale-90"
        >
          + Add
        </button>
      </div>
    </div>
  );
}