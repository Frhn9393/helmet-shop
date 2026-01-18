// Pastikan updateQuantity diterima sebagai prop
export default function CartDrawer({
  isOpen,
  setIsOpen,
  items,
  removeItem,
  clearCart,
  updateQuantity, // Prop baru untuk kontrol jumlah
  formatRupiah,
  onOpenCheckout,
}) {
  // Hitung total harga berdasarkan (harga * jumlah)
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div
      className={`fixed inset-0 z-[250] transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      ></div>

      <aside
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl transition-transform duration-500 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } p-8 flex flex-col z-[250]`}
      >
        {/* Header dengan tombol Clear All */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex flex-col">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter">
              Your <span className="text-orange-500">Cart.</span>
            </h3>
            {items.length > 0 && (
              <button 
                onClick={clearCart}
                className="text-[10px] font-bold text-red-500 uppercase tracking-widest hover:underline text-left mt-1 transition-all"
              >
                Clear All Items
              </button>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:text-orange-500 transition-all"
          >
            ✕
          </button>
        </div>

        {/* List Items */}
        <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 transition-all hover:border-orange-500/50"
              >
                <div className="w-20 h-20 bg-black rounded-2xl overflow-hidden shrink-0">
                   <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                   />
                </div>

                <div className="flex-1 text-left">
                  <h4 className="font-bold text-xs leading-tight uppercase tracking-tight truncate w-32">
                    {item.name}
                  </h4>
                  <p className="text-orange-500 font-black text-sm mb-2">
                    {formatRupiah(item.price)}
                  </p>
                  
                  {/* KONTROL KUANTITAS (+/-) */}
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold hover:bg-orange-500 hover:text-white transition-all"
                    >
                      -
                    </button>
                    <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold hover:bg-orange-500 hover:text-white transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                >
                  🗑️
                </button>
              </div>
            ))
          ) : (
            <div className="text-center mt-32">
              <span className="text-6xl block mb-4 opacity-20">🛒</span>
              <p className="opacity-40 italic font-medium">Keranjang Anda masih kosong.</p>
            </div>
          )}
        </div>

        {/* Footer & Total */}
        {items.length > 0 && (
          <div className="border-t border-slate-200 dark:border-slate-800 pt-6 mt-6 space-y-6">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                  Total Bayar
                </span>
                <span className="text-3xl font-black text-orange-500 italic tracking-tighter">
                  {formatRupiah(totalPrice)}
                </span>
              </div>
              <span className="text-[10px] font-bold opacity-30 uppercase tracking-widest">
                {items.reduce((sum, i) => sum + i.quantity, 0)} Items
              </span>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenCheckout();
              }}
              className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-5 rounded-2xl font-black uppercase italic tracking-tighter hover:bg-orange-500 dark:hover:bg-orange-500 dark:hover:text-white transition-all shadow-xl shadow-orange-500/20 active:scale-95"
            >
              Checkout Now
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}