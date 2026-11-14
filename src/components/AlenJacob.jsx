import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import TRILLION_IMAGE from "../assets/trillionedition.webp";
import SOCIAL_IMAGE from "../assets/Socialbureau_logo.png";
import BUSINESS_IMAGE from "../assets/Businessbureau_logo.png";
import alen from "../assets/Alen_Jacob.webp";
// import REALTY_IMAGE from "../assets/realty_image.webp";

// --- Bureau Logos (Inlined for high-fidelity vector rendering and zero physical file dependencies) ---
import trillionEditionLogo from "../assets/trillionedition.webp";
import socialBureauLogo from "../assets/Socialbureau_logo.png";

import businessBureauLogo from "../assets/Businessbureau_logo.png";

export const realtyBureauLogo = "https://pub-551ad76f06a94ab19c65c540e6bf9ac7.r2.dev/realtybureau.png";

// export const trillionEditionLogo =
//   "https://media.licdn.com/dms/image/v2/D4D0BAQGxkR7s2uQQyQ/company-logo_200_200/B4DZdUzxzFGYAM-/0/1749474549560/trillionedition_logo?e=2147483647&v=beta&t=nXoCXkbTq8UFjUNmpm4-LRjbZmhKfYVsyrg98a2LQH8";


// --- Bureau Imagery ---
// export const TRILLION_IMAGE =
//   "https://res.cloudinary.com/dfwlj6k8j/image/upload/v1772277602/IMG_0534_0002_Color_Lookup_3_jiiuek.webp";
// export const SOCIAL_IMAGE =
//   "https://res.cloudinary.com/dfwlj6k8j/image/upload/v1772275488/IMG_0543_0002_Color_Lookup_2_xqx3k7.webp";
// export const BUSINESS_IMAGE =
//   "https://res.cloudinary.com/dfwlj6k8j/image/upload/v1772275472/WhatsApp_Image_2026-01-23_at_6.22.55_PM_1_-_Copy_vv7jfv.webp";
export const REALTY_IMAGE =
  "https://pub-551ad76f06a94ab19c65c540e6bf9ac7.r2.dev/realtybureau.png";

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
          className="fixed inset-0 z-[1100] bg-black text-white flex flex-col p-6 md:p-12 shadow-2xl"
        >
          <div className="flex justify-between items-center mb-12 md:mb-24 gap-4">
            <span className="text-lg md:text-xl font-black tracking-widest uppercase font-condensed shrink-0">
              ALEN JACOB
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
              <a href="#" className="text-sm hover:text-emerald-400 transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-sm hover:text-emerald-400 transition-colors">
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
        className={`fixed top-0 left-0 w-full z-[1000] border-b transition-all duration-500 ${scrolled
            ? "bg-white/85 backdrop-blur-md border-neutral-200 py-4 shadow-sm"
            : "bg-transparent border-transparent py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link
            to="/"
            className={`text-xl md:text-2xl font-black tracking-widest uppercase font-condensed transition-colors duration-500 ${scrolled ? "text-black" : "text-white"
              }`}
          >
            ALEN JACOB
          </Link>
          <div className="hidden md:flex gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${scrolled
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
            className="md:hidden group flex flex-col items-end gap-1.5 p-2 bg-black/10 rounded-lg backdrop-blur-sm border border-white/15"
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
    category: "Global Luxury Strategy & Asset Management",
    color: "emerald",
    accent: "#10b981",
    description:
      "A global business and asset strategy group focused on premium brand positioning, strategic investments, luxury real estate, and building high-value business ecosystems across international markets.",
    image: trillionEditionLogo,
    url: "https://www.trillionedition.com/",
    metrics: [
      { label: "Global Jurisdictions", value: "12+" },
      { label: "Managed Portfolio", value: "$4B+" },
    ],
    features: [
      "Strategic Business Advisory",
      "Global Asset Strategy",
      "Premium Brand Positioning",
    ],
  },
  {
    title: "Social Bureau",
    category: "Digital Marketing & Technology",
    color: "indigo",
    accent: "#6366f1",
    description:
      "A data-driven digital marketing and technology brand focused on social media growth, API-driven marketing solutions, digital campaigns, brand visibility, and performance-oriented marketing ecosystems.",
    image: socialBureauLogo,
    url: "https://www.socialbureau.in/",
    metrics: [
      { label: "Core Approach", value: "Data-Driven" },
      { label: "Marketing Focus", value: "API-Powered" },
    ],
    features: [
      "Social Media Marketing",
      "API-Driven Marketing Solutions",
      "Digital Campaign Management",
    ],
  },
  {
    title: "Business Bureau",
    category: "Coworking & Managed Workspaces",
    color: "blue",
    accent: "#3b82f6",
    description:
      "A professionally managed coworking and flexible workspace brand in Kerala, providing modern work environments for freelancers, entrepreneurs, startups, and established teams through shared workspaces, private offices, and meeting facilities.",
    image: businessBureauLogo,
    url: "https://www.businessbureau.in/",
    metrics: [
      { label: "Workspace Locations", value: "2" },
      { label: "Primary Market", value: "Kochi, Kerala" },
    ],
    features: [
      "Coworking & Shared Offices",
      "Private Office Cabins",
      "Meeting Rooms & Day Passes",
    ],
  },
  {
    title: "Realty Bureau",
    category: "Luxury Real Estate & Asset Development",
    color: "neutral",
    accent: "#000000",
    description:
      "A specialized real estate division focused on identifying, acquiring, and developing premium and trophy real estate assets across sought-after global markets, with an emphasis on strategic property opportunities and long-term asset value.",
    image: realtyBureauLogo,
    url: "https://www.realtybureau.in/",
    metrics: [
      { label: "Primary Focus", value: "Trophy Assets" },
      { label: "Market Orientation", value: "Global" },
    ],
    features: [
      "Premium Property Acquisition",
      "Trophy Asset Development",
      "Strategic Real Estate Advisory",
    ],
  },
];



const RECOGNITION = [
  {
    company: "Trillion Edition",
    year: "2025 – Present",
    title: "Founder & Designated Partner",
    description:
      "Leading the group's strategic vision, business development, and multi-vertical venture ecosystem.",
  },
  {
    company: "Social Bureau",
    year: "Present",
    title: "Director",
    description:
      "Driving digital innovation, technology development, marketing solutions, and business growth.",
  },
  {
    company: "Business Bureau",
    year: "Present",
    title: "Director",
    description:
      "Overseeing workspace strategy, business operations, and the development of professional work environments.",
  },
  {
    company: "Realty Bureau",
    year: "Present",
    title: "Director",
    description:
      "Leading real estate strategy, property development initiatives, and premium asset opportunities.",
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

export const PremiumCard3D = ({ children, className = "", accent, style = {} }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springConfig = { stiffness: 80, damping: 20, mass: 0.15 };
  const sX = useSpring(x, springConfig);
  const sY = useSpring(y, springConfig);

  const rotateX = useTransform(sY, [0, 1], [10, -10]);
  const rotateY = useTransform(sX, [0, 1], [-10, 10]);
  const spotX = useTransform(sX, [0, 1], ["0%", "100%"]);
  const spotY = useTransform(sY, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - left) / width);
    y.set((e.clientY - top) / height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        ...style,
      }}
      className={`relative will-change-transform ${className}`}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 rounded-[32px]"
        style={{
          background: `radial-gradient(400px circle at ${spotX} ${spotY}, ${accent}15, transparent 80%)`,
        }}
      />
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row gap-6 md:gap-8" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
};

export const PremiumCustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hidden, setHidden] = useState(true);
  const [hoveredType, setHoveredType] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (hidden) setHidden(false);
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    const handleHoverStart = (e) => {
      const target = e.target;
      if (target.closest("a") || target.closest("button") || target.closest("[role='button']")) {
        setHoveredType("link");
      } else if (target.closest("[data-cursor='view']")) {
        setHoveredType("view");
      } else {
        setHoveredType(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleHoverStart);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleHoverStart);
    };
  }, [hidden]);

  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  if (isTouch || hidden) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-neutral-900 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{
        x: position.x - 16,
        y: position.y - 16,
      }}
      animate={{
        scale: hoveredType === "link" ? 1.6 : hoveredType === "view" ? 2.5 : 1,
        backgroundColor: hoveredType === "link" ? "rgba(255, 255, 255, 0.95)" : hoveredType === "view" ? "rgba(255, 255, 255, 0.95)" : "transparent",
        borderColor: hoveredType === "view" ? "transparent" : hoveredType === "link" ? "transparent" : "rgba(255, 255, 255, 0.85)",
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.1 }}
    >
      {hoveredType === "view" && (
        <span className="text-[7px] font-black uppercase tracking-widest text-black flex items-center justify-center h-full w-full">
          Click
        </span>
      )}
    </motion.div>
  );
};

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
            <span className="text-purple-500">VIEWS.</span>
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

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-neutral-100 flex flex-col"
    >
      <div className="relative flex-grow flex items-center justify-center">
        <img
          src={alen}
          alt="Architectural portrait"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.9] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-indigo-500/20"></div>

        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <div className="w-[85vh] h-[85vh] border border-white/40 rounded-full"></div>
        </div>

        <div className="relative z-10 w-full h-[85vh] flex flex-col justify-between max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-6 text-left">
          {/* Top Row: Subtitle and ALEN */}
          <div className="flex flex-col items-start text-left max-w-xl">
            <p className="text-white/80 text-[10px] font-bold uppercase tracking-[0.4em] mb-6 animate-pulse">
              Pioneering Elite Land & Real Estate Portfolios
            </p>
          </div>

          {/* Bottom Row: Description and JACOB. */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 w-full mt-auto">
            {/* Description (Left Side) */}
            <div className="max-w-sm text-left pb-4">
              <p className="text-white/70 text-xs md:text-sm font-medium leading-relaxed tracking-wider">
                Alen Jacob is a preeminent real estate business leader, specializing in premium land acquisitions, ultra-luxury residential developments, and strategic institutional property holdings.
              </p>
              <div className="w-16 h-[2px] bg-gradient-to-r from-emerald-400 to-transparent mt-6"></div>
            </div>
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
              ${isOutlined ? "text-outline opacity-40 hover:opacity-100" : "opacity-100 hover:text-neutral-400 text-neutral-900"}
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
                referrerPolicy="no-referrer"
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
    { text: "Trillion Edition", img: TRILLION_IMAGE },
    { text: "Social Bureau", img: SOCIAL_IMAGE },
    { text: "Business Bureau", img: BUSINESS_IMAGE },
    { text: "Realty Bureau", img: REALTY_IMAGE },
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
    label: "Business Verticals",
    value: "Multi-Vertical",
    detail: "A parent company building and developing specialised business brands",
  },
  {
    label: "Venture Ecosystem",
    value: "SocialBureau & RevoBureau",
    detail: "Building independent brands across specialised business sectors",
  },
  {
    label: "Corporate Headquarters",
    value: "Kerala, India",
    detail: "Strategic business operations based in Ernakulam",
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
            <span className="text-neutral-500">IMPACT.</span>
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
              <div className="text-2xl md:text-4xl font-black font-condensed mb-2 text-black">
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

const VentureCard = ({ v, i }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-full"
    >
      <PremiumCard3D
        accent={v.accent}
        className="group bg-white border rounded-[32px] p-6 md:p-8 hover:shadow-[0_40px_120px_-20px_rgba(0,0,0,0.08)] transition-all duration-700 overflow-hidden h-full flex flex-col md:flex-row gap-6 md:gap-8 cursor-pointer"
        style={{
          borderColor: isHovered ? `${v.accent}60` : "#e5e7eb",
          boxShadow: isHovered
            ? `0 30px 100px -20px rgba(0,0,0,0.05), 0 20px 50px -15px ${v.accent}1b`
            : "none",
        }}
      >
        <motion.div
          animate={{
            x: isHovered ? -3 : 0,
            y: isHovered ? -3 : 0,
            scale: isHovered ? 1.12 : 1,
            opacity: isHovered ? 1 : 0.3,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute top-4 left-4 w-6 h-6 pointer-events-none"
        >
          <CornerBracket className="w-full h-full" />
        </motion.div>

        <motion.div
          animate={{
            x: isHovered ? 3 : 0,
            y: isHovered ? 3 : 0,
            scale: isHovered ? 1.12 : 1,
            opacity: isHovered ? 1 : 0.3,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute bottom-4 right-4 w-6 h-6 pointer-events-none rotate-180"
        >
          <CornerBracket className="w-full h-full" />
        </motion.div>

        <div
          className="flex-grow flex flex-col justify-between text-left md:w-3/5 relative z-10 transition-transform duration-700"
          style={{
            transform: isHovered ? "translateZ(15px) translateX(4px)" : "translateZ(15px)",
          }}
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <motion.span
                animate={{
                  scale: isHovered ? [1, 1.4, 1] : 1,
                  boxShadow: isHovered ? `0 0 12px ${v.accent}` : "none",
                }}
                transition={{ duration: 1.2, repeat: isHovered ? Infinity : 0, repeatType: "reverse" }}
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: v.accent }}
              />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 transition-colors group-hover:text-black">
                {v.category}
              </span>
            </div>

            <h3 className="text-3xl md:text-4xl font-extrabold font-condensed uppercase tracking-tight text-neutral-900 group-hover:text-black transition-colors mb-4">
              {v.title}
            </h3>

            <p className="text-neutral-500 text-xs md:text-sm leading-relaxed mb-6">
              {v.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {v.features?.map((feat, fIdx) => (
                <motion.span
                  key={fIdx}
                  animate={{
                    y: isHovered ? -3 : 0,
                    borderColor: isHovered ? `${v.accent}30` : "rgba(229,231,235,0.4)",
                    backgroundColor: isHovered ? `${v.accent}0a` : "rgba(249,250,251,1)",
                    color: isHovered ? "#111827" : "#6b7280",
                  }}
                  transition={{ delay: fIdx * 0.05, type: "spring", stiffness: 260, damping: 15 }}
                  className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 text-neutral-500 rounded-md border"
                >
                  {feat}
                </motion.span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dashed border-neutral-100 mb-6 font-sans">
              {v.metrics?.map((m, mIdx) => (
                <div key={mIdx} className="text-left">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-1">
                    {m.label}
                  </div>
                  <motion.div
                    animate={{
                      scale: isHovered ? 1.05 : 1,
                      x: isHovered ? 2 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="text-base md:text-lg font-extrabold font-condensed tracking-tight"
                    style={{ color: v.accent }}
                  >
                    {m.value}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <a
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] py-3.5 px-6 rounded-full border bg-neutral-900 text-white relative overflow-hidden transition-all hover:bg-black hover:scale-[1.03] shadow-sm active:scale-95 group/btn"
              style={{ borderColor: "transparent" }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Entity
                <motion.span
                  animate={{
                    x: isHovered ? 3 : 0,
                    y: isHovered ? -3 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 12 }}
                >
                  <ArrowUpRight size={14} className="stroke-[3]" />
                </motion.span>
              </span>
            </a>
          </div>
        </div>

        <div
          className="w-full md:w-2/5 aspect-[4/3] md:aspect-auto md:min-h-[280px] rounded-2xl overflow-hidden relative group-hover:shadow-md transition-shadow duration-500 bg-neutral-950 shrink-0 select-none cursor-pointer"
          style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
          data-cursor="view"
        >
          {v.bgImage && (
            <img
              src={v.bgImage}
              alt={v.title}
              className="w-full h-full object-cover opacity-65 group-hover:opacity-40 transition-all duration-1000 scale-100 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-700 group-hover:opacity-85" />

          <div className="absolute inset-0 flex items-center justify-center p-6 z-10" style={{ transform: "translateZ(20px)" }}>
            <motion.div
              animate={{
                scale: isHovered ? 1.08 : 1,
                rotate: isHovered ? -4 : 0,
              }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
              className="w-32 h-32 md:w-34 md:h-34 bg-transparent rounded-2xl flex items-center justify-center p-4 relative overflow-hidden"
            >
              <img
                src={v.image}
                alt={`${v.title} Logo`}
                className="w-full h-full object-contain pointer-events-none"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          <div className="absolute bottom-4 left-4 z-10 text-[9px] font-bold font-mono tracking-widest text-white/50 bg-black/40 backdrop-blur-sm py-1 px-2.5 rounded-full uppercase">
            SYS // 0{i + 1}
          </div>
        </div>
      </PremiumCard3D>
    </div>
  );
};

const VenturesSection = () => {
  return (
    <section
      id="ventures"
      className="py-16 md:py-28 px-[5%] bg-neutral-50 relative overflow-hidden text-left"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6">
          <div>
            <RevealText className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 mb-6 block">
              01 Portfolio
            </RevealText>
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-black font-condensed tracking-tighter text-black uppercase leading-[0.85]">
              THE <br />
              <span className="text-neutral-500">VENTURES.</span>
            </h2>
          </div>
          <div className="max-w-md text-left">
            <p className="text-neutral-500 font-medium text-sm md:text-base leading-relaxed">
              Meticulously designed luxury property development, smart listing portal technology, institutional commercial holdings, and regional land banking units. Each venture is built for prime real estate superiority.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {VENTURES.map((v, i) => (
            <VentureCard key={i} v={v} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PhilosophySection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 30,
    restDelta: 0.001,
  });

  const glowOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.2, 0.65, 0.3]);
  const glowScale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.3, 0.9]);
  const bgScale = useTransform(smoothProgress, [0, 0.5, 1], [0.96, 1, 0.96]);

  const words = [
    "\"Land", "is", "not", "merely", "an", "asset", "class", "it", "is", "the", "physical", "canvas", "of", "civilization.", "We",
    "curate,", "develop,", "and", "strategic", "bank", "assets",
    "to", "stand", "as", "landmark", "legacies", "for", "generations.\""
  ];

  const scrollStart = 0.15;
  const scrollEnd = 0.65;
  const range = scrollEnd - scrollStart;

  return (
    <section
      ref={containerRef}
      id="philosophy"
      className="py-16 md:py-32 px-[5%] bg-emerald-950 text-white relative flex flex-col items-center justify-center text-center overflow-hidden min-h-[70vh]"
    >
      <motion.div
        style={{
          opacity: glowOpacity,
          scale: glowScale,
        }}
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#10b981_0%,transparent_75%)]"
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      <motion.div
        style={{ scale: bgScale }}
        className="max-w-5xl relative z-10 w-full"
      >
        <RevealText className="text-[10px] font-bold uppercase tracking-[0.6em] text-emerald-400 mb-12 block">
          Executive Philosophy
        </RevealText>
        <h2 className="text-3xl sm:text-4xl md:text-[3.5rem] font-serif italic leading-[1.4] mb-4 font-medium flex flex-wrap justify-center">
          {words.map((word, idx) => {
            const wordStart = scrollStart + (idx / words.length) * range;
            const wordEnd = Math.min(scrollEnd, wordStart + 0.1);
            
            const opacity = useTransform(smoothProgress, [wordStart, wordEnd], [0.12, 1]);
            
            const isHighlight = ["curate,", "develop,", "strategic", "bank", "assets"].includes(word);
            const color = useTransform(
              smoothProgress,
              [wordStart, wordEnd],
              ["rgba(255, 255, 255, 0.12)", isHighlight ? "#34d399" : "#ffffff"]
            );

            return (
              <motion.span
                key={idx}
                style={{ opacity, color }}
                className="inline-block mr-[0.28em] transition-transform duration-300 hover:scale-[1.08] cursor-default font-serif"
              >
                {word}
              </motion.span>
            );
          })}
        </h2>
      </motion.div>
    </section>
  );
};

export const AlenJacob = () => {
  return (
    <div className="min-h-screen bg-neutral-100 selection:bg-black selection:text-white">
      <PremiumCustomCursor />
      <Navbar />

      <main>
        <Hero />
        <ScrollingSection />
        <VenturesSection />
        <PhilosophySection />
        <GlobalImpactSection />
        <RecognitionSection />
        <BackToTop />

        <section id="inquiry" className="bg-white py-12 md:py-24 px-6 md:px-12 border-t border-neutral-150">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-end">
            <div className="text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 mb-6 md:mb-8 block">
                Inquiry
              </span>
              <h2 className="text-5xl md:text-8xl font-black font-condensed tracking-tighter text-black uppercase leading-[0.85]">
                Bridging the <br />
                <span className="text-emerald-500 opacity-60">Intangible.</span>
              </h2>
            </div>
            <div className="flex flex-col gap-6 md:gap-8 text-left">
              <p className="text-base md:text-lg text-neutral-600 font-medium leading-relaxed">
                I structure premium real estate partnerships and high-leverage land banking strategies that transform geographical tracts into world-class landmarks. Each project operates with absolute aesthetic and legal authority.
              </p>
              <Link to="/contact" className="self-start text-[10px] font-bold uppercase tracking-[0.2em] border-b-2 border-black pb-2 hover:text-neutral-450 hover:border-neutral-450 transition-all text-black decoration-none">
                Send Inquiry
              </Link>
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
          <div className="text-3xl md:text-6xl font-black tracking-widest uppercase font-condensed text-left">
            ALEN.JACOB
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 text-left">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                Navigation
              </span>
              <Link to="/" className="text-sm text-white/70 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-sm text-white/70 hover:text-white transition-colors">
                About
              </Link>
              <Link to="/services" className="text-sm text-white/70 hover:text-white transition-colors">
                Services
              </Link>
              <Link to="/contact" className="text-sm text-white/70 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                Connect
              </span>
              <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                X.com
              </a>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                Network
              </span>
              <div className="grid grid-cols-1 gap-2">
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
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-sm text-white/60 group-hover/link:text-white transition-colors">
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
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-sm text-white/60 group-hover/link:text-white transition-colors">
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
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-sm text-white/60 group-hover/link:text-white transition-colors">
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
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-sm text-white/60 group-hover/link:text-white transition-colors">
                    Realty Bureau
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 md:pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-white/20">
          <span>© 2026 Alen Jacob. All rights reserved.</span>
          <span>Designed for the Future.</span>
        </div>
      </div>
    </footer>
  );
};

export default AlenJacob;