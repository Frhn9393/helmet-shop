import { motion } from "framer-motion";

export default function Contact() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="py-20"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-orange-500 font-black uppercase tracking-[0.3em] text-sm mb-4">
            Get In Touch
          </h3>
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8 leading-none text-slate-900 dark:text-white">
            Let's <span className="text-orange-500">Connect.</span>
          </h2>
          <div className="space-y-8">
            {/* Store Location */}
            <div className="flex items-start gap-4">
              <span className="text-2xl">📍</span>
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest text-slate-900 dark:text-white">
                  Store Location
                </h4>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  Jl. Panglima Polem No.88, Gampong Jawa, Kota Langsa, Aceh
                  24354
                </p>
              </div>
            </div>

            {/* Email Support */}
            <div className="flex items-start gap-4">
              <span className="text-2xl">📧</span>
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest text-slate-900 dark:text-white">
                  Email Support
                </h4>
                <p className="text-slate-500 dark:text-slate-400">
                  whitebath2000@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Real Maps Integration */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] h-96 flex items-center justify-center relative overflow-hidden group shadow-xl shadow-black/5"
        >
          {/* PERBAIKAN: Menggunakan sintaks JSX yang benar untuk iframe */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.134567!2d97.9734651!3d4.4716768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMjgnMTguMCJOIDk3wrA1OCcyNC41IkU!5e0!3m2!1sid!2sid!4v123456789"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Store Location"
            className="grayscale invert dark:invert-0 dark:grayscale-0 opacity-80 group-hover:opacity-100 transition-all duration-500"
          ></iframe>
        </motion.div>
      </div>
    </motion.section>
  );
}
