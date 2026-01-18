import { motion } from 'framer-motion';

export default function About() {
  return (
    <motion.section 
      id="about"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-20 bg-slate-50 dark:bg-slate-900/20 rounded-[3rem] px-8 md:px-16 border border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-4xl mx-auto text-center md:text-left">
        <h3 className="text-orange-500 font-black uppercase tracking-[0.3em] text-sm mb-4">Our Story</h3>
        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8 leading-none">
          More Than Just <span className="text-orange-500">Protection.</span>
        </h2>
        <div className="space-y-6 text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
          <p>
            HelmetShop didirikan pada tahun 2026 dengan satu visi sederhana: Menggabungkan keamanan tingkat militer dengan estetika futuristik.
          </p>
          <p>
            Setiap helm yang kami kurasi telah melewati uji standar internasional dan dilengkapi dengan teknologi preview 3D terbaru.
          </p>
        </div>
      </div>
    </motion.section>
  );
}