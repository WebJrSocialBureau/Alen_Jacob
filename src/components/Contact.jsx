import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Navbar,
  Footer,
  RevealText,
  Magnetic,
  CornerBracket,
} from "./AlenJacob";

const CharReveal = ({ children, className = "", delay = 0 }) => {
  const content =
    typeof children === "string" ? children.split(" ") : [children];
  return (
    <div className={`flex flex-wrap ${className}`}>
      {content.map((word, i) => (
        <span key={i} className="inline-block mr-[0.2em]">
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
};

const ImageReveal = ({ src, alt, className = "", style = {} }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0 }}
    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    className={`overflow-hidden rounded-3xl ${className}`}
    style={style}
  >
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-3000 hover:scale-105"
    />
  </motion.div>
);

const ContactCard = ({ title, value, href, label }) => (
  <Magnetic strength={0.2}>
    <a
      href={href}
      className="block p-6 md:p-8 bg-white border border-neutral-100 rounded-2xl hover:border-black transition-colors group"
    >
      <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-4 group-hover:text-black transition-colors">
        {label}
      </span>
      <h3 className="text-xl font-black font-condensed uppercase mb-2 text-black">
        {title}
      </h3>
      <p className="text-neutral-500 group-hover:text-indigo-600 transition-colors">
        {value}
      </p>
    </a>
  </Magnetic>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-neutral-100 selection:bg-black selection:text-white">
      <Navbar />

      <main className="relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-indigo-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

        <section className="pt-20 md:pt-32 pb-12 px-6 md:px-12 relative z-10">
          <div className="max-w-7xl mx-auto">
            <RevealText className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 mb-8 block">
              Inquiry Bureau
            </RevealText>
            <CharReveal className="text-5xl sm:text-6xl md:text-9xl font-black font-condensed tracking-tighter text-black uppercase leading-tight mb-16 md:mb-24">
              LET'S <span className="text-indigo-600">CONNECT.</span>
            </CharReveal>
          </div>
        </section>

        <section className="pb-24 px-6 md:px-12 relative z-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-4 space-y-8">
              <p className="text-xl md:text-2xl font-serif italic text-neutral-800 leading-relaxed mb-16">
                "Every strategic breakthrough begins with a single point of
                interaction."
              </p>

              <div className="grid grid-cols-1 gap-6">
                <ContactCard
                  label="Direct Email"
                  title="Inquiry Bureau"
                  value="inquiry@alenjacob.com"
                  href="mailto:inquiry@alenjacob.com"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <ContactCard
                    label="Social"
                    title="LinkedIn"
                    value="@alenjacob"
                    href="#"
                  />
                  <ContactCard
                    label="Social"
                    title="Instagram"
                    value="@alenjacob"
                    href="#"
                  />
                </div>
              </div>

              <div className="pt-8">
                <ImageReveal
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000"
                  alt="Architecture Bureau"
                  className="aspect-square shadow-2xl"
                />
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="bg-white p-6 md:p-12 shadow-2xl relative rounded-3xl md:rounded-4xl overflow-hidden">
                <CornerBracket className="top-8 left-8 w-12 h-12 opacity-10" />
                <CornerBracket className="bottom-8 right-8 w-12 h-12 rotate-180 opacity-10" />

                <div className="mb-8 md:mb-12">
                  <h2 className="text-3xl md:text-5xl font-black font-condensed uppercase mb-4 text-black">
                    Send a Message
                  </h2>
                  <p className="text-neutral-500 max-w-md">
                    Initiate the framework for our next collaboration. Describe
                    your vision below.
                  </p>
                </div>

                <form className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="relative group">
                      <label
                        htmlFor="name"
                        className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4 block group-focus-within:text-black transition-colors"
                      >
                        The Architect (Your Name)
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Julian Vercetti"
                        className="w-full bg-transparent border-b border-neutral-200 py-4 focus:border-black outline-none transition-colors font-medium text-lg placeholder:text-neutral-300"
                      />
                    </div>
                    <div className="relative group">
                      <label
                        htmlFor="email"
                        className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4 block group-focus-within:text-black transition-colors"
                      >
                        Communication Bridge (Email)
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="julian@example.com"
                        className="w-full bg-transparent border-b border-neutral-200 py-4 focus:border-black outline-none transition-colors font-medium text-lg placeholder:text-neutral-300"
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <label
                      htmlFor="subject"
                      className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4 block group-focus-within:text-black transition-colors"
                    >
                      Area of Strategic Interest
                    </label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-neutral-200 py-4 focus:border-black outline-none transition-colors font-medium text-lg appearance-none cursor-pointer"
                    >
                      <option value="">Select Bureau / Interest</option>
                      <option value="trillion">
                        Trillion Edition (Consultancy)
                      </option>
                      <option value="social">Social Bureau (Marketing)</option>
                      <option value="venture">VentureX (Investments)</option>
                      <option value="other">General Inquiry</option>
                    </select>
                  </div>

                  <div className="relative group">
                    <label
                      htmlFor="message"
                      className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4 block group-focus-within:text-black transition-colors"
                    >
                      Strategic Vision (Message)
                    </label>
                    <textarea
                      id="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share the details of your vision or proposal..."
                      className="w-full bg-transparent border-b border-neutral-200 py-4 focus:border-black outline-none transition-colors font-medium text-lg resize-none placeholder:text-neutral-300"
                    ></textarea>
                  </div>

                  <Magnetic strength={0.1}>
                    <button className="w-full md:w-auto px-12 md:px-20 py-6 md:py-8 bg-black text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-neutral-900 transition-all group flex items-center justify-center gap-6 relative overflow-hidden border border-white/10">
                      <span className="relative z-10">Send Inquiry</span>
                      <div className="w-8 h-px bg-white/30 group-hover:w-16 group-hover:bg-white transition-all relative z-10"></div>
                      <motion.div
                        initial={{ y: "100%" }}
                        whileHover={{ y: 0 }}
                        className="absolute inset-0 bg-indigo-600 z-0"
                      />
                    </button>
                  </Magnetic>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
