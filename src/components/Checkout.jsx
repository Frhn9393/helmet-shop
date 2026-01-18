import { useState, useEffect } from "react";

export default function Checkout({ isOpen, onClose, items, total, formatRupiah }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "WhatsApp Transfer",
  });

  // State untuk menyimpan koordinat lokasi user
  const [location, setLocation] = useState({ lat: null, lng: null });

  // Mengambil lokasi realtime saat modal dibuka
  useEffect(() => {
    if (isOpen && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Error fetching location:", error)
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = (e) => {
    e.preventDefault();
    const itemDetails = items
      .map((item, index) => `${index + 1}. ${item.name} [x${item.quantity}] - (${formatRupiah(item.price * item.quantity)})`)
      .join("\n");

    // Menambahkan link maps ke dalam pesan WhatsApp
    const locationLink = location.lat ? `\n📍 Lokasi Saya: https://www.google.com/maps?q=${location.lat},${location.lng}` : "";
    
    const message = `Halo Admin HelmetShop! Saya ingin pesan:\n\n${itemDetails}\n\n*Total Tagihan: ${formatRupiah(total)}*\n\n*Data Pengiriman:*\nNama: ${formData.name}\nHP: ${formData.phone}\nAlamat: ${formData.address}${locationLink}`;
    
    const whatsappUrl = `https://wa.me/6285184162959?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // URL Peta Embed Google Maps berdasarkan koordinat user
  const mapSrc = location.lat 
    ? `https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`
    : "";

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose}></div>

      <div className="bg-white dark:bg-[#020617] w-full max-w-4xl rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[95vh] border border-slate-200 dark:border-slate-800">
        <div className="p-8 overflow-y-auto no-scrollbar">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter">
              Final <span className="text-orange-500">Checkout.</span>
            </h2>
            <button onClick={onClose} className="text-2xl hover:text-orange-500 transition-colors">✕</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Form & Map Section */}
            <div className="space-y-6">
              <form id="checkout-form" onSubmit={handleConfirm} className="space-y-4">
                <h4 className="font-black uppercase text-xs tracking-widest text-orange-500">Shipping Info</h4>
                <input required type="text" placeholder="Full Name" className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl outline-none focus:border-orange-500" onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input required type="tel" placeholder="Phone Number (WhatsApp)" className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl outline-none focus:border-orange-500" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                <textarea required placeholder="Full Address" className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl outline-none focus:border-orange-500 h-24" onChange={(e) => setFormData({...formData, address: e.target.value})}></textarea>
              </form>

              {/* Tampilan Peta Realtime */}
              <div className="space-y-2">
                <h4 className="font-black uppercase text-[10px] tracking-widest text-orange-500">Live Location Preview</h4>
                <div className="w-full h-40 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  {location.lat ? (
                    <iframe title="User Location" src={mapSrc} width="100%" height="100%" frameBorder="0" style={{ border: 0 }} allowFullScreen></iframe>
                  ) : (
                    <p className="text-[10px] opacity-50 italic">Fetching your location...</p>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="space-y-6">
              <h4 className="font-black uppercase text-xs tracking-widest text-orange-500">Order Summary</h4>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl space-y-4 border border-slate-200 dark:border-slate-800">
                {items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start text-sm">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 dark:text-white leading-tight">{item.name}</span>
                      <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Qty: {item.quantity}</span>
                    </div>
                    <span className="font-black shrink-0 ml-2">{formatRupiah(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-4 flex justify-between items-center">
                  <span className="font-black uppercase text-xs">Total Amount</span>
                  <span className="text-xl font-black text-orange-500">{formatRupiah(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800">
          <button type="submit" form="checkout-form" className="w-full bg-slate-900 dark:bg-white text-white dark:text-[#020617] py-5 rounded-2xl font-black uppercase italic tracking-tighter hover:bg-orange-500 transition-all shadow-xl active:scale-95">
            Confirm & Order via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}