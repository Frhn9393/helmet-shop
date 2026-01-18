export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Identity */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter">
              W<span className="text-orange-500">B</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Penyedia helm premium dengan teknologi 3D preview pertama di Indonesia. Keamanan Anda adalah prioritas utama kami dengan gaya yang tetap futuristik.
            </p>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all">FB</button>
              <button className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all">IG</button>
              <button className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all">YT</button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black uppercase text-xs tracking-[0.2em] mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500 dark:text-slate-400">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Home</a></li>
              <li><a href="#products" className="hover:text-orange-500 transition-colors">Products</a></li>
              <li><a href="#about" className="hover:text-orange-500 transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-orange-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-black uppercase text-xs tracking-[0.2em] mb-6">Support</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500 dark:text-slate-400">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Warranty Info</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Return Policy</a></li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="font-black uppercase text-xs tracking-[0.2em] mb-6">Accepted Payments</h4>
            <div className="grid grid-cols-3 gap-2 grayscale opacity-50 dark:invert">
              <div className="h-10 bg-slate-200 rounded flex items-center justify-center text-[8px] font-bold">VISA</div>
              <div className="h-10 bg-slate-200 rounded flex items-center justify-center text-[8px] font-bold">MASTER</div>
              <div className="h-10 bg-slate-200 rounded flex items-center justify-center text-[8px] font-bold">BCA</div>
              <div className="h-10 bg-slate-200 rounded flex items-center justify-center text-[8px] font-bold">GOPAY</div>
              <div className="h-10 bg-slate-200 rounded flex items-center justify-center text-[8px] font-bold">OVO</div>
              <div className="h-10 bg-slate-200 rounded flex items-center justify-center text-[8px] font-bold">DANA</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <p>© {currentYear} HelmetShop (WhiteBath). All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-orange-500">Privacy Policy</a>
            <a href="#" className="hover:text-orange-500">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}