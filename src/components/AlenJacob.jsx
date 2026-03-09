import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";

// --- Bureau Logos ---
import socialBureauLogo from "../assets/Socialbureau_logo.png";
import businessBureauLogo from "../assets/Businessbureau_logo.png";
const trillionEditionLogo =
  "https://media.licdn.com/dms/image/v2/D4D0BAQGxkR7s2uQQyQ/company-logo_200_200/B4DZdUzxzFGYAM-/0/1749474549560/trillionedition_logo?e=2147483647&v=beta&t=nXoCXkbTq8UFjUNmpm4-LRjbZmhKfYVsyrg98a2LQH8";
const realtyBureauLogo =
  "https://res.cloudinary.com/dtwcgfmar/image/upload/v1770275984/RB_Logo_eqqi7q.png";

// --- Bureau Imagery ---
const TRILLION_IMAGE =
  "https://res.cloudinary.com/dfwlj6k8j/image/upload/v1772277602/IMG_0534_0002_Color_Lookup_3_jiiuek.webp";
const SOCIAL_IMAGE =
  "https://res.cloudinary.com/dfwlj6k8j/image/upload/v1772275488/IMG_0543_0002_Color_Lookup_2_xqx3k7.webp";
const BUSINESS_IMAGE =
  "https://res.cloudinary.com/dfwlj6k8j/image/upload/v1772275472/WhatsApp_Image_2026-01-23_at_6.22.55_PM_1_-_Copy_vv7jfv.webp";
const REALTY_IMAGE =
  "https://res.cloudinary.com/dfwlj6k8j/image/upload/v1772274398/exterior1_i7obaw.webp";

// --- Utility Components ---

export const RevealText = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      className={className}
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false, amount: 0 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export const Magnetic = ({ children, strength = 0.5 }) => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    if (!ref.current || isMobile) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const quickX = useSpring(x, springConfig);
  const quickY = useSpring(y, springConfig);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: quickX, y: quickY }}
    >
      {children}
    </motion.div>
  );
};

const MobileMenu = ({ isOpen, setIsOpen, navLinks }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-1100 bg-black text-white flex flex-col p-6 md:p-12"
        >
          <div className="flex justify-between items-center mb-12 md:mb-24 gap-4">
            <span className="text-lg md:text-xl font-black tracking-widest uppercase font-condensed shrink-0">
              ALEN.JACOB
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="group relative flex items-center gap-3 bg-white text-black pl-4 pr-2 py-2 md:px-6 md:py-3 rounded-full md:rounded-[20px] overflow-hidden transition-all hover:scale-105 shrink-0"
            >
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] relative z-10">
                Close
              </span>
              <div className="relative w-8 h-8 z-10 flex items-center justify-center bg-black rounded-full transition-transform group-hover:rotate-90 duration-500">
                <span className="absolute w-3 h-0.5 bg-white rotate-45" />
                <span className="absolute w-3 h-0.5 bg-white -rotate-45" />
              </div>
              <motion.div
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                className="absolute inset-0 bg-emerald-400 z-0"
              />
            </button>
          </div>
          <div className="flex flex-col gap-8">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <Link
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl sm:text-5xl md:text-7xl font-black font-condensed uppercase tracking-tighter hover:text-emerald-400 transition-colors block"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-auto pt-12 border-t border-white/10 flex flex-col gap-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
              Social Bureau
            </span>
            <div className="flex gap-8">
              <a href="#" className="text-sm hover:text-emerald-400">
                LinkedIn
              </a>
              <a href="#" className="text-sm hover:text-emerald-400">
                Instagram
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 w-full z-[1000] border-b transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md border-neutral-200 py-4"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link
            to="/"
            className={`text-xl md:text-2xl font-black tracking-widest uppercase font-condensed transition-colors duration-500 ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            ALEN.JACOB
          </Link>
          <div className="hidden md:flex gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
                  scrolled
                    ? "text-black/60 hover:text-black"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden group flex flex-col items-end gap-1.5 p-2"
          >
            <div
              className={`h-0.5 transition-all duration-300 ${scrolled ? "bg-black" : "bg-white"} ${mobileMenuOpen ? "w-0" : "w-8"}`}
            />
            <div
              className={`h-0.5 transition-all duration-300 ${scrolled ? "bg-black" : "bg-white"} ${mobileMenuOpen ? "w-0" : "w-6"}`}
            />
            <div
              className={`h-0.5 transition-all duration-300 ${scrolled ? "bg-black" : "bg-white"} ${mobileMenuOpen ? "w-0" : "w-4"}`}
            />
          </button>
        </div>
      </motion.nav>
      <MobileMenu
        isOpen={mobileMenuOpen}
        setIsOpen={setMobileMenuOpen}
        navLinks={navLinks}
      />
    </>
  );
};

const VENTURES = [
  {
    title: "Trillion Edition",
    category: "Luxury Assets & Strategy",
    color: "emerald",
    accent: "#10b981",
    description:
      "Architecting exclusive business frameworks for elite ventures.",
    image: trillionEditionLogo,
    url: "https://www.trillionedition.com/",
  },
  {
    title: "Social Bureau",
    category: "Data-Driven Marketing",
    color: "indigo",
    accent: "#6366f1",
    description:
      "Kerala's first API-based advertising and social strategy agency.",
    image: socialBureauLogo,
    url: "https://www.socialbureau.in/",
  },
  {
    title: "Business Bureau",
    category: "Corporate Systems",
    color: "blue",
    accent: "#3b82f6",
    description:
      "Bridging architectural visions with corporate strategy and systems.",
    image: businessBureauLogo,
    url: "https://www.businessbureau.in/",
  },
  {
    title: "Realty Bureau",
    category: "Real Estate & Architecture",
    color: "neutral",
    accent: "#000000",
    description:
      "Directing architectural excellence and managed realty assets.",
    image: realtyBureauLogo,
    url: "https://www.realtybureau.in/",
  },
];

const RECOGNITION = [
  {
    company: "Forbes Insight",
    year: "2023",
    title: "Visionary Business Systems Architect",
  },
  {
    company: "Business World",
    year: "2022",
    title: "Top 40 Under 40 Business Leaders",
  },
  {
    company: "Digital Global",
    year: "2024",
    title: "Innovation Excellence Award",
  },
  {
    company: "The Hindu",
    year: "2021",
    title: "Expanding Strategic Horizons in India",
  },
];

export const CornerBracket = ({ className = "" }) => (
  <div className={`absolute pointer-events-none ${className}`}>
    <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-black/40" />
    <div className="absolute -top-1 -right-1 w-4 h-4 border-t border-r border-black/40" />
    <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b border-l border-black/40" />
    <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-black/40" />
  </div>
);

export const ArrowUp = ({ size = 18, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </svg>
);

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20,
      }}
      className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-50 pointer-events-none"
    >
      <div className="pointer-events-auto">
        <Magnetic strength={0.3}>
          <button
            onClick={scrollToTop}
            className="group relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-black/10 backdrop-blur-xl border border-white/20 text-black rounded-full shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 hover:bg-black hover:text-white"
          >
            {/* Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="opacity-10"
              />
              <motion.circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                style={{
                  pathLength: scrollYProgress,
                  pathSpacing: 0,
                }}
              />
            </svg>
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowUp
                size={24}
                className="relative z-10 group-hover:-translate-y-1 transition-transform duration-300"
              />
            </motion.div>
          </button>
        </Magnetic>
      </div>
    </motion.div>
  );
};

const RecognitionSection = () => {
  return (
    <section
      id="recognition"
      className="py-12 md:py-24 px-[5%] bg-purple-50/30 border-t border-purple-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-12 gap-12 md:gap-20">
        <div className="md:col-span-4">
          <RevealText className="text-[10px] font-bold uppercase tracking-[0.4em] text-purple-400 mb-8 block">
            03 Recognition
          </RevealText>
          <h2 className="text-5xl md:text-7xl font-black font-condensed tracking-tighter text-black uppercase leading-[0.9]">
            WORLD <br />
            <span className="text-purple-300">VIEWS.</span>
          </h2>
        </div>

        <div className="md:col-span-8">
          <div className="divide-y divide-purple-100 border-y border-purple-100">
            {RECOGNITION.map((r, i) => (
              <div
                key={i}
                className="group py-6 md:py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:bg-white hover:px-8"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-purple-500">
                    {r.company} — {r.year}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black font-condensed uppercase transition-colors group-hover:text-purple-600">
                    {r.title}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full border border-purple-200 flex items-center justify-center transition-all group-hover:bg-purple-600 group-hover:text-white group-hover:rotate-45">
                  <ArrowUp size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Utility Components ---

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-neutral-100 flex flex-col"
    >
      <div className="relative flex-grow flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=1920"
          alt="Architectural portrait"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.9] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-indigo-500/20"></div>

        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <div className="w-[85vh] h-[85vh] border border-white/40 rounded-full"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
          <p className="text-white/80 text-[10px] font-bold uppercase tracking-[0.4em] md:tracking-[0.8em] mb-8 md:mb-12 animate-pulse">
            Defining Contemporary Bureaucracy
          </p>
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-white flex flex-col items-center mix-blend-difference"
          >
            <span className="text-7xl sm:text-8xl md:text-[14vw] font-black tracking-tighter leading-none mb-[-0.2em] relative z-20">
              ALEN
            </span>
            <span className="text-7xl sm:text-8xl md:text-[16vw] italic font-serif leading-none relative z-10 block pr-[0.1em]">
              JACOB.
            </span>
          </motion.h1>

          <div className="mt-16 md:mt-24 max-w-md mx-auto relative group">
            <p className="text-white/60 text-center text-xs md:text-sm font-medium leading-relaxed tracking-[0.05em] md:tracking-widest px-4">
              Alen Jacob specializes in bridging the gap between social
              structures, business systems, and tangible reality.
            </p>
            <div className="w-px h-16 md:h-24 bg-gradient-to-b from-white/40 to-transparent mx-auto mt-12"></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-12 bg-black"
        ></motion.div>
      </div>
    </section>
  );
};

const ScrollRow = ({
  items,
  direction,
  textColor,
  isOutlined,
  scrollProgress,
  rotation = 0,
}) => {
  const content = [
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
  ];
  const speed = 0.6;
  const movement =
    direction === "left" ? -(scrollProgress * speed) : scrollProgress * speed;
  const initialOffset = direction === "left" ? 0 : -3000;

  return (
    <div className="py-2 md:py-4 overflow-hidden whitespace-nowrap select-none">
      <div
        className="flex items-center gap-10 md:gap-20 transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: `translateX(${initialOffset + movement}px)` }}
      >
        {content.map((item, idx) => (
          <React.Fragment key={idx}>
            <span
              className={`
              text-[9vw] md:text-[11vw] font-black font-condensed uppercase tracking-tighter leading-none transition-colors duration-500
              ${isOutlined ? "text-outline opacity-40 hover:opacity-100" : "opacity-100 hover:text-neutral-400"}
              ${textColor}
            `}
            >
              {item.text}
            </span>
            <div
              className="w-[16vw] h-[16vw] md:w-[13vw] md:h-[13vw] shrink-0 overflow-hidden shadow-2xl border-[12px] border-white bg-black"
              style={{
                borderRadius: "0px",
                transform: `rotate(${idx % 2 === 0 ? rotation : -rotation}deg)`,
              }}
            >
              <img
                src={item.img}
                alt=""
                className="w-full h-full object-cover transition-all duration-700"
                loading="lazy"
              />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const ScrollingSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    let requestRef;
    const handleScroll = () => {
      requestRef = requestAnimationFrame(() => {
        setScrollPosition(window.scrollY);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(requestRef);
    };
  }, []);

  const bureaus = [
    {
      text: "Trillion Edition",
      img: TRILLION_IMAGE,
    },
    {
      text: "Social Bureau",
      img: SOCIAL_IMAGE,
    },
    {
      text: "Business Bureau",
      img: BUSINESS_IMAGE,
    },
    {
      text: "Realty Bureau",
      img: REALTY_IMAGE,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="bg-white py-12 md:py-20 relative overflow-hidden border-y border-neutral-100"
    >
      <div className="flex flex-col gap-0 md:gap-4">
        <ScrollRow
          items={bureaus}
          direction="left"
          textColor="text-black"
          isOutlined={false}
          scrollProgress={scrollPosition}
          rotation={4}
        />
        <ScrollRow
          items={[...bureaus].reverse()}
          direction="right"
          textColor="text-black"
          isOutlined={true}
          scrollProgress={scrollPosition}
          rotation={-2}
        />
        <ScrollRow
          items={[bureaus[2], bureaus[0], bureaus[1]]}
          direction="left"
          textColor="text-black"
          isOutlined={false}
          scrollProgress={scrollPosition * 1.2}
          rotation={6}
        />
        <ScrollRow
          items={bureaus}
          direction="right"
          textColor="text-black"
          isOutlined={true}
          scrollProgress={scrollPosition}
          rotation={-5}
        />
      </div>
    </div>
  );
};

const GlobalImpactSection = () => {
  const stats = [
    {
      label: "Assets Under Strategy",
      value: "$2.4B+",
      detail: "Across 12 global markets",
    },
    {
      label: "Ventures Architected",
      value: "18",
      detail: "From seed to enterprise scale",
    },
    {
      label: "Direct Impact",
      value: "5.2M+",
      detail: "Users engaged through bureau systems",
    },
  ];

  return (
    <section
      id="impact"
      className="py-12 md:py-24 px-[5%] bg-neutral-50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
        <div className="lg:col-span-4">
          <RevealText className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 mb-8 block">
            02 Scale
          </RevealText>
          <h2 className="text-5xl md:text-7xl font-black font-condensed tracking-tighter text-black uppercase leading-[0.9]">
            STRATEGIC <br />
            <span className="text-neutral-300">IMPACT.</span>
          </h2>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`p-8 md:p-12 bg-white border-l-4 border-emerald-500 shadow-sm ${i === 0 ? "md:col-span-2" : ""}`}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-4 block">
                {s.label}
              </span>
              <div className="text-4xl md:text-8xl font-black font-condensed mb-2 text-black">
                {s.value}
              </div>
              <p className="text-neutral-500 font-medium">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const VenturesSection = () => {
  return (
    <section
      id="ventures"
      className="py-10 md:py-20 px-[5%] bg-white border-b border-neutral-100"
    >
      <div className="max-w-7xl mx-auto">
        <RevealText className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 mb-8 block">
          01 Portfolio
        </RevealText>
        <h2 className="text-5xl md:text-8xl font-black font-condensed tracking-tighter text-black uppercase leading-[0.85] mb-16 md:mb-32">
          THE <br />
          <span className="text-neutral-300">VENTURES.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-100 border border-neutral-100">
          {VENTURES.map((v, i) => (
            <div
              key={i}
              className={`group relative bg-white p-8 md:p-12 overflow-hidden transition-all duration-700 hover:bg-${v.color}-50`}
            >
              <div className="relative z-10">
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest text-${v.color}-600 mb-4 block`}
                >
                  {v.category}
                </span>
                <h3 className="text-3xl md:text-5xl font-black font-condensed uppercase mb-6 transition-colors group-hover:text-black">
                  {v.title}
                </h3>
                <p className="text-neutral-500 max-w-sm leading-relaxed mb-8">
                  {v.description}
                </p>
                <a
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-[10px] font-bold uppercase tracking-widest border-b-2 transition-all`}
                  style={{ borderColor: v.accent, color: v.accent }}
                >
                  Explore Entity
                </a>
              </div>
              <div className="absolute right-0 bottom-0 w-1/2 h-1/2 md:w-2/3 md:h-2/3 translate-x-1/4 translate-y-1/4 opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:translate-x-0 group-hover:translate-y-0 flex items-center justify-center bg-black p-12 md:p-20 rounded-3xl shadow-2xl">
                <img
                  src={v.image}
                  alt={v.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PhilosophySection = () => {
  return (
    <section
      id="philosophy"
      className="py-12 md:py-20 px-[5%] bg-emerald-950 text-white relative flex flex-col items-center text-center overflow-hidden"
    >
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_50%,#10b981_0%,transparent_70%)]"></div>

      <div className="max-w-4xl relative z-10 py-12 md:py-24">
        <RevealText className="text-[10px] font-bold uppercase tracking-[0.6em] text-emerald-400 mb-12 block">
          Executive Philosophy
        </RevealText>
        <h2 className="text-3xl md:text-6xl font-serif italic leading-[1.3] mb-16">
          "Systems are not merely structures of business; they are the
          <span className="text-emerald-400">
            {" "}
            architecture of human progress.{" "}
          </span>
          We build for the legacy, not just the quarter."
        </h2>
        <div className="w-px h-24 bg-gradient-to-b from-emerald-500/40 to-transparent mx-auto"></div>
      </div>
    </section>
  );
};

const AlenJacob = () => {
  return (
    <div className="min-h-screen bg-neutral-100 selection:bg-black selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Antonio:wght@400;700&family=Inter:wght@400;700;900&family=Playfair+Display:ital,wght@0,900;1,900&display=swap');
        
        .font-condensed {
            font-family: 'Antonio', sans-serif;
            letter-spacing: -0.02em;
        }
        .font-serif {
            font-family: 'Playfair Display', serif;
        }
        .text-outline {
            -webkit-text-stroke: 1.5px currentColor;
            -webkit-text-fill-color: transparent;
        }
      `}</style>

      <Navbar />

      <main>
        <Hero />
        <ScrollingSection />
        <VenturesSection />
        <PhilosophySection />
        <GlobalImpactSection />
        <RecognitionSection />
        <BackToTop />

        <section id="inquiry" className="bg-white py-12 md:py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-end">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 mb-6 md:mb-8 block">
                Inquiry
              </span>
              <h2 className="text-5xl md:text-8xl font-black font-condensed tracking-tighter text-black uppercase leading-[0.85]">
                Bridging the <br />
                <span className="text-emerald-500 opacity-60">Intangible.</span>
              </h2>
            </div>
            <div className="flex flex-col gap-6 md:gap-8">
              <p className="text-base md:text-lg text-neutral-600 font-medium leading-relaxed">
                I create systems that allow social concepts to thrive within
                business frameworks, ultimately manifesting in physical reality.
                Each bureau represents a pillar of modern existence.
              </p>
              <button className="self-start text-[10px] font-bold uppercase tracking-[0.2em] border-b-2 border-black pb-2 hover:text-neutral-400 hover:border-neutral-400 transition-all">
                View Manifesto
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 md:py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-20">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="text-3xl md:text-6xl font-black tracking-widest uppercase font-condensed">
            ALEN.JACOB
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                Navigation
              </span>
              <Link to="/about" className="text-sm hover:text-white/60">
                About
              </Link>
              <Link to="/services" className="text-sm hover:text-white/60">
                Services
              </Link>
              <Link to="/contact" className="text-sm hover:text-white/60">
                Contact
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                Connect
              </span>
              <a href="#" className="text-sm hover:text-white/60">
                Instagram
              </a>
              <a href="#" className="text-sm hover:text-white/60">
                LinkedIn
              </a>
              <a href="#" className="text-sm hover:text-white/60">
                X.com
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                Network
              </span>
              <a
                href="https://www.trillionedition.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group/link"
              >
                <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center transition-colors group-hover/link:bg-white/10">
                  <img
                    src={trillionEditionLogo}
                    alt="Trillion Edition"
                    className="w-5 h-5 object-contain opacity-70 group-hover/link:opacity-100 transition-opacity"
                  />
                </div>
                <span className="text-sm text-white/60 group-hover/link:text-white">
                  Trillion Edition
                </span>
              </a>
              <a
                href="https://www.socialbureau.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group/link"
              >
                <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center transition-colors group-hover/link:bg-white/10">
                  <img
                    src={socialBureauLogo}
                    alt="Social Bureau"
                    className="w-5 h-5 object-contain opacity-70 group-hover/link:opacity-100 transition-opacity"
                  />
                </div>
                <span className="text-sm text-white/60 group-hover/link:text-white">
                  Social Bureau
                </span>
              </a>
              <a
                href="https://www.businessbureau.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group/link"
              >
                <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center transition-colors group-hover/link:bg-white/10">
                  <img
                    src={businessBureauLogo}
                    alt="Business Bureau"
                    className="w-5 h-5 object-contain opacity-70 group-hover/link:opacity-100 transition-opacity"
                  />
                </div>
                <span className="text-sm text-white/60 group-hover/link:text-white">
                  Business Bureau
                </span>
              </a>
              <a
                href="https://www.realtybureau.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group/link"
              >
                <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center transition-colors group-hover/link:bg-white/10">
                  <img
                    src={realtyBureauLogo}
                    alt="Realty Bureau"
                    className="w-5 h-5 object-contain opacity-70 group-hover/link:opacity-100 transition-opacity"
                  />
                </div>
                <span className="text-sm text-white/60 group-hover/link:text-white">
                  Realty Bureau
                </span>
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                Legal
              </span>
              <a href="#" className="text-sm hover:text-white/60">
                Privacy
              </a>
              <a href="#" className="text-sm hover:text-white/60">
                Terms
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 md:pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-white/20">
          <span>© 2024 Alen Jacob. All rights reserved.</span>
          <span>Designed for the Future.</span>
        </div>
      </div>
    </footer>
  );
};

export default AlenJacob;
