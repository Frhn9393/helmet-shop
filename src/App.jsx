import { useState, useEffect } from "react";
import helmetData from "./data/helmets.json";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FilterBar from "./components/FilterBar";
import HelmetCard from "./components/HelmetCard";
import CartDrawer from "./components/CartDrawer";
import BackToTop from "./components/BackToTop";
import ImageCarousel from "./components/ImageCarousel";
import About from "./components/about"; 
import Contact from "./components/Contact";
import SkeletonCard from "./components/SkeletonCard";
import Footer from "./components/Footer"; 
import Checkout from "./components/Checkout";

function App() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark" || true
  );

  const [toast, setToast] = useState({ show: false, message: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  // Perbaikan: Hitung total harga berdasarkan (harga * kuantitas)
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const clearCart = () => {
    setCartItems([]);
    setToast({ show: true, message: "Keranjang telah dikosongkan!" });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    dark ? root.classList.add("dark") : root.classList.remove("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    setIsLoading(true);
    setVisibleCount(3);
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [selectedBrand, searchTerm]);

  // Perbaikan: Fungsi tambah ke keranjang dengan logika Quantity
  const addToCart = (item) => {
    const audio = new Audio("/sounds/y6nvvraxnb-purchase-sfx-7.mp3");
    audio.play().catch((err) => console.log("Audio Play blocked"));

    setCartItems((prev) => {
      const isExist = prev.find((cartItem) => cartItem.id === item.id);
      if (isExist) {
        return prev.map((cartItem) =>
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });

    setToast({ show: true, message: `${item.name} ditambahkan!` });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  // Fungsi Baru: Update Kuantitas (+ / -)
  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const brands = ["All", ...new Set(helmetData.map((h) => h.brand))];

  const filteredHelmets = helmetData.filter(
    (h) =>
      h.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedBrand === "All" || h.brand === selectedBrand)
  );

  const itemsToShow = filteredHelmets.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-500 font-sans relative overflow-x-hidden">
      <Navbar
        dark={dark}
        setDark={setDark}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} // Total fisik barang
        openCart={() => setIsCartOpen(true)}
      />

      <div className="pt-20">
        <Hero
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          helmetData={helmetData}
        />

        <main className="px-6 max-w-7xl mx-auto space-y-32 pb-24">
          <ImageCarousel images={helmetData} formatRupiah={formatRupiah} />
          
          <section id="products">
            <FilterBar
              brands={brands}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
              {isLoading ? (
                [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
              ) : itemsToShow.length > 0 ? (
                itemsToShow.map((item) => (
                  <HelmetCard
                    key={item.id}
                    item={item}
                    onAdd={() => addToCart(item)}
                    formatRupiah={formatRupiah}
                  />
                ))
              ) : (
                <div className="col-span-full py-20 text-center opacity-50 italic">
                  Produk tidak ditemukan...
                </div>
              )}
            </div>

            {!isLoading && visibleCount < filteredHelmets.length && (
              <div className="mt-16 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 3)}
                  className="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase italic tracking-tighter rounded-2xl hover:bg-orange-500 dark:hover:bg-orange-500 dark:hover:text-white transition-all active:scale-95 shadow-xl shadow-orange-500/10"
                >
                  Load More Products
                </button>
              </div>
            )}
          </section>

          <About />
          <Contact />
        </main>

        <Footer /> 
      </div>

      <CartDrawer
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
        items={cartItems}
        removeItem={(id) => setCartItems(cartItems.filter((item) => item.id !== id))}
        updateQuantity={updateQuantity} // Kirim fungsi update kuantitas
        clearCart={clearCart}
        formatRupiah={formatRupiah}
        onOpenCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <Checkout 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        total={totalPrice}
        formatRupiah={formatRupiah}
      />

      <BackToTop />

      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-200 transition-all duration-500 transform ${toast.show ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0 pointer-events-none"}`}>
        <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-2xl shadow-2xl font-bold flex items-center gap-3 border border-orange-500/50">
          <span className="bg-orange-500 rounded-full p-1 text-xs">✔</span>
          {toast.message}
        </div>
      </div>
    </div>
  );
}

export default App;