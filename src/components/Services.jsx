import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Navbar,
  Footer,
  RevealText,
  Magnetic,
  CornerBracket,
  ArrowUp,
} from "./AlenJacob";

// --- Bureau Logos ---
import socialBureauLogo from "../assets/Socialbureau_logo.png";
import businessBureauLogo from "../assets/Businessbureau_logo.png";
const trillionEditionLogo =
  "https://media.licdn.com/dms/image/v2/D4D0BAQGxkR7s2uQQyQ/company-logo_200_200/B4DZdUzxzFGYAM-/0/1749474549560/trillionedition_logo?e=2147483647&v=beta&t=nXoCXkbTq8UFjUNmpm4-LRjbZmhKfYVsyrg98a2LQH8";
export const realtyBureauLogo = "https://pub-551ad76f06a94ab19c65c540e6bf9ac7.r2.dev/realtybureau.png";

// --- Bureau Imagery ---
const TRILLION_IMAGE =
  "https://res.cloudinary.com/dfwlj6k8j/image/upload/v1772277602/IMG_0534_0002_Color_Lookup_3_jiiuek.webp";
const SOCIAL_IMAGE =
  "https://res.cloudinary.com/dfwlj6k8j/image/upload/v1772275488/IMG_0543_0002_Color_Lookup_2_xqx3k7.webp";
const BUSINESS_IMAGE =
  "https://res.cloudinary.com/dfwlj6k8j/image/upload/v1772275472/WhatsApp_Image_2026-01-23_at_6.22.55_PM_1_-_Copy_vv7jfv.webp";
const REALTY_IMAGE =
  "https://res.cloudinary.com/dfwlj6k8j/image/upload/v1772274398/exterior1_i7obaw.webp";

const SERVICES_FULL = [
  {
    title: "Trillion Edition",
    category: "Elite Strategy",
    color: "emerald",
    accent: "#10b981",
    detail:
      "High-net-worth business architecture, luxury asset management, and exclusive strategic consulting. We build frameworks for the world's most valuable ventures.",
    image: trillionEditionLogo,
    features: [
      "Asset Strategy",
      "Family Office Architecture",
      "Exclusive Networking",
    ],
  },
  {
    title: "Social Bureau",
    category: "Digital Social Strategy",
    color: "indigo",
    accent: "#6366f1",
    detail:
      "Kerala's first API-driven social bureau. We engineer digital influence through data-scientific marketing and algorithmic strategy.",
    image: socialBureauLogo,
    features: [
      "API-Based Marketing",
      "Influence Engineering",
      "Digital Ecosystems",
    ],
  },
  {
    title: "Business Bureau",
    category: "Corporate Systems",
    color: "blue",
    accent: "#3b82f6",
    detail:
      "Bridging architectural visions with corporate strategy. We design and implement the internal systems that power modern enterprises.",
    image: businessBureauLogo,
    features: [
      "System Integration",
      "Governance Design",
      "Operational Excellence",
    ],
  },
  {
    title: "Realty Bureau",
    category: "Real Estate & Architecture",
    color: "neutral",
    accent: "#000000",
    detail:
      "Directing architectural excellence and managed realty assets. We create the physical manifestation of strategic vision.",
    image: realtyBureauLogo,
    features: [
      "Asset Management",
      "Architectural Design",
      "Development Strategy",
    ],
  },
];

const ScrollRow = ({
  items,
  direction,
  textColor,
  isOutlined,
  scrollProgress,
  rotation = 0,
}) => {
  const content = [...items, ...items, ...items, ...items];
  const speed = 0.6;
  const movement =
    direction === "left" ? -(scrollProgress * speed) : scrollProgress * speed;
  const initialOffset = direction === "left" ? 0 : -2000;

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
            {item.img && (
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
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

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

const ImageReveal = ({
  src,
  alt,
  className = "",
  style = {},
  objectFit = "object-cover",
}) => (
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
      className={`w-full h-full ${objectFit} transition-transform duration-3000 hover:scale-105`}
    />
  </motion.div>
);

const ServiceCard = ({ service, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.8, delay: index * 0.1 }}
    className="group relative border-t border-neutral-100 py-12 md:py-24 transition-colors hover:bg-neutral-50 overflow-hidden"
  >
    <div className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
      <div className="lg:col-span-1 text-[10px] font-bold text-neutral-300 font-condensed pt-4">
        (0{index + 1})
      </div>

      <div className="lg:col-span-11 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4 block group-hover:text-black transition-colors">
            {service.category}
          </span>
          <h2 className="text-5xl sm:text-6xl md:text-8xl font-black font-condensed uppercase mb-8 leading-tight group-hover:text-indigo-600 transition-colors">
            {service.title}
          </h2>
          <p className="text-base md:text-xl text-neutral-600 leading-relaxed mb-12 max-w-lg">
            {service.detail}
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            {service.features.map((feature, fIdx) => (
              <span
                key={fIdx}
                className="px-4 py-1 border border-neutral-200 text-[10px] font-bold uppercase tracking-widest text-neutral-500 rounded-full group-hover:border-black group-hover:text-black transition-colors"
              >
                {feature}
              </span>
            ))}
          </div>

          <Magnetic strength={0.2}>
            <button className="flex items-center gap-6 group/btn">
              <span className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center transition-all group-hover/btn:rotate-45 group-hover/btn:scale-110">
                <ArrowUp size={24} />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] border-b border-black pb-1">
                Initiate Venture Bridge
              </span>
            </button>
          </Magnetic>
        </div>

        <div className="relative">
          <ImageReveal
            src={service.image}
            alt={service.title}
            objectFit="object-contain"
            className="aspect-[4/5] md:aspect-square shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transition-shadow group-hover:shadow-indigo-500/10 bg-black flex items-center justify-center p-8 md:p-12 lg:p-16"
          />
          <div
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-[80px] opacity-10 pointer-events-none transition-opacity group-hover:opacity-30"
            style={{ backgroundColor: service.accent }}
          />
        </div>
      </div>
    </div>
  </motion.div>
);

const ProcessStep = ({ number, title, detail }) => (
  <div className="relative pl-12 border-l-2 border-neutral-100 py-8 group">
    <div className="absolute top-12 -left-[9px] w-4 h-4 bg-white border-2 border-indigo-600 rounded-full group-hover:scale-150 transition-all duration-500 group-hover:bg-indigo-600" />
    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2 block group-hover:text-indigo-600 transition-colors">
      Phase {number}
    </span>
    <h3 className="text-2xl font-black font-condensed uppercase mb-4 text-black group-hover:translate-x-2 transition-transform">
      {title}
    </h3>
    <p className="text-neutral-500 max-w-xs leading-relaxed group-hover:text-neutral-800 transition-colors">
      {detail}
    </p>
  </div>
);

const Services = () => {
  const [scrollPosition, setScrollPosition] = React.useState(0);

  React.useEffect(() => {
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

  const bureautexts = [
    { text: "BUREAUS", img: TRILLION_IMAGE },
    { text: "STRATEGY", img: SOCIAL_IMAGE },
    { text: "SYSTEMS", img: BUSINESS_IMAGE },
    { text: "VENTURES", img: REALTY_IMAGE },
  ];

  return (
    <div className="min-h-screen bg-neutral-100 selection:bg-black selection:text-white">
      <style>{`
        .text-outline {
            -webkit-text-stroke: 1.5px currentColor;
            -webkit-text-fill-color: transparent;
        }
        .font-condensed {
            font-family: 'Antonio', sans-serif;
            letter-spacing: -0.02em;
        }
        .font-serif {
            font-family: 'Playfair Display', serif;
        }
      `}</style>
      <Navbar />

      <main className="relative">
        {/* Redesigned Services Hero */}
        <section className="relative w-full h-[90vh] overflow-hidden bg-black flex flex-col justify-end">
          {/* Main Background Image - High Contrast Architectural */}
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-0"
          >
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2560"
              alt="Architectural Excellence"
              className="w-full h-full object-cover grayscale brightness-110 contrast-125"
            />
          </motion.div>

          {/* Gradients for depth */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent z-10" />
          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-black/60 z-10" />

          {/* Floating Geometric Accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vh] h-[120vh] border border-white/5 rounded-full z-10 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] border border-white/10 rounded-full z-10 pointer-events-none" />

          <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full pb-20 md:pb-32 text-center">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="inline-flex items-center justify-center gap-4 mb-8 mx-auto"
            >
              <div className="w-12 h-px bg-indigo-500" />
              <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.8em]">
                The Strategic Portfolio
              </span>
              <div className="w-12 h-px bg-indigo-500" />
            </motion.div>

            <h1 className="text-white flex flex-col items-center font-black font-condensed uppercase leading-[0.85] tracking-tighter">
              <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-7xl sm:text-8xl md:text-[12vw] block"
              >
                EXECUTIVE
              </motion.span>
              <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-7xl sm:text-8xl md:text-[14vw] italic font-serif text-indigo-500 lowercase tracking-normal -mt-4"
              >
                bureaus.
              </motion.span>
            </h1>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-12 left-6 md:left-12 z-20 flex flex-col items-center gap-4"
          >
            <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
          </motion.div>
        </section>

        {/* Bureau Showcase */}
        <section className="relative z-10 bg-white">
          <div className="px-6 md:px-12 max-w-7xl mx-auto pt-20 pb-12">
            <RevealText className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 mb-8 block">
              Core Ecosystem
            </RevealText>
            <h2 className="text-5xl md:text-8xl font-black font-condensed tracking-tighter text-black uppercase leading-[0.85] mb-16">
              THE <br /> <span className="text-neutral-500">PILLARS.</span>
            </h2>
          </div>

          {SERVICES_FULL.map((service, idx) => (
            <ServiceCard key={idx} service={service} index={idx} />
          ))}
        </section>

        {/* Process Section - Home Matching Style */}
        <section className="py-24 px-6 md:px-12 relative z-10 bg-neutral-50/50 overflow-hidden border-y border-neutral-100">
          {/* Decorative Background Node */}
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-indigo-500/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              <div className="lg:col-span-5">
                <RevealText className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 mb-8 block">
                  Workflow
                </RevealText>
                <h2 className="text-5xl md:text-8xl font-black font-condensed uppercase mb-12 leading-tight">
                  STRATEGIC <br />{" "}
                  <span className="text-indigo-600">PIPELINE.</span>
                </h2>
                <div className="hidden lg:block pt-12 pr-12">
                  <p className="text-lg text-neutral-500 font-medium leading-relaxed italic border-l-4 border-indigo-600 pl-8">
                    "We build legacy-grade systems through a rigorous,
                    architectural engineering process."
                  </p>
                </div>
              </div>
              <div className="lg:col-span-7 pt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                  <ProcessStep
                    number="01"
                    title="Audit Bureau"
                    detail="Deep-level dissection of current assets, structures, and market positioning."
                  />
                  <ProcessStep
                    number="02"
                    title="Architecture"
                    detail="Engineering the blueprint for resilient, scalable business and social systems."
                  />
                  <ProcessStep
                    number="03"
                    title="Integration"
                    detail="Global deployment via API bridges and high-impact social engineering."
                  />
                  <ProcessStep
                    number="04"
                    title="Governance"
                    detail="Executive-level oversight and continuous strategic evolution."
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Home Impact Style */}
        <section className="py-24 px-6 md:px-12 relative z-10 bg-black text-white overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <img
              src={REALTY_IMAGE}
              className="w-full h-full object-cover grayscale"
              alt=""
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <RevealText className="text-[10px] font-bold uppercase tracking-[0.6em] text-indigo-400 mb-12 block text-center">
              Global Boardroom
            </RevealText>
            <h2 className="text-6xl md:text-[12vw] font-black font-condensed uppercase mb-16 leading-[0.8] tracking-tighter">
              BEYOND <br />{" "}
              <span className="text-indigo-500 italic font-serif lowercase tracking-normal">
                limits.
              </span>
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-16 mt-20">
              <Magnetic strength={0.3}>
                <button className="px-16 py-8 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all rounded-full flex items-center justify-center gap-6 group">
                  Initiate Inquiry
                  <span className="w-10 h-px bg-white/40 group-hover:bg-black/20 group-hover:w-16 transition-all" />
                </button>
              </Magnetic>
              <Link
                to="/contact"
                className="text-[10px] font-bold uppercase tracking-[0.4em] border-b-2 border-indigo-500/20 pb-2 hover:border-indigo-500 transition-all"
              >
                The Executive Bureau
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
