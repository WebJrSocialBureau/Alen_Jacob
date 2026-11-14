import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Navbar,
  Footer,
  RevealText,
  Magnetic,
  CornerBracket,
} from "./AlenJacob";


const JOURNEY = [
  {
    year: "2025",
    title: "Trillion Edition Established",
    description:
      "Formal establishment of Trillion Edition LLP in Ernakulam, Kerala, with Alen Jacob appointed as Designated Partner, creating a corporate foundation for the group's business vision.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    year: "2025",
    title: "Building a Multi-Venture Ecosystem",
    description:
      "Bringing together specialised business ventures spanning digital marketing, technology, commercial workspaces, and real estate under a broader business vision.",
    color: "from-indigo-600 to-purple-500",
  },
  {
    year: "Present",
    title: "Strategic Business Expansion",
    description:
      "Driving the development of independent business verticals, strengthening operational capabilities, and pursuing new opportunities across emerging markets.",
    color: "from-amber-400 to-orange-500",
  },
  {
    year: "The Vision",
    title: "Building a Lasting Legacy",
    description:
      "Creating a diversified business ecosystem focused on innovation, strategic growth, sustainable enterprise development, and long-term value creation.",
    color: "from-emerald-500 to-teal-400",
  },
];


const PRINCIPLES = [
  {
    title: "Systems First",
    text: "We don't solve problems; we architect systems that make problems irrelevant.",
    icon: "▣",
  },
  {
    title: "Infinite Legacy",
    text: "Building for the next century, not just the next fiscal quarter.",
    icon: "♾",
  },
  {
    title: "Radical Clarity",
    text: "Simplifying complexity through architectural precision and strategic insight.",
    icon: "✧",
  },
];

const CharReveal = ({ children, className = "", delay = 0 }) => {
  const content =
    typeof children === "string" ? children.split(" ") : [children];
  return (
    <div className={`flex flex-wrap justify-center ${className}`}>
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

const SectionHeading = ({ children, subtitle }) => (
  <div className="mb-12 md:mb-24">
    {subtitle && (
      <RevealText className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 mb-6 md:mb-8 block">
        {subtitle}
      </RevealText>
    )}
    <h2 className="text-4xl sm:text-5xl md:text-8xl font-black font-condensed tracking-tighter text-black uppercase leading-tight py-2">
      {children}
    </h2>
  </div>
);

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

const About = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="min-h-screen bg-neutral-100 selection:bg-black selection:text-white overflow-x-hidden">
      <Navbar />

      <main className="relative">
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <motion.img
              initial={{ scale: 1.2, filter: "blur(20px)" }}
              animate={{ scale: 1, filter: "blur(4px)" }}
              transition={{ duration: 2, ease: "easeOut" }}
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920"
              alt="Office background"
              className="w-full h-full object-cover brightness-50"
            />
            <div className="absolute inset-0 bg-linear-to-br from-indigo-500/30 via-transparent to-emerald-500/30"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
            <RevealText className="text-[10px] font-bold uppercase tracking-[0.8em] text-white/60 mb-8 block">
              Strategic Visionary
            </RevealText>
            <CharReveal className="text-4xl sm:text-6xl md:text-[14vw] font-black font-condensed tracking-tighter text-white uppercase leading-tight mb-8 md:mb-12 mix-blend-difference">
              THE <span className="text-emerald-400">ARCHITECT.</span>
            </CharReveal>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-1 bg-emerald-500 mx-auto"
            ></motion.div>
          </div>
        </section>

        <section className="py-16 md:py-32 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 items-center">
              <div className="lg:col-span-6">
                <SectionHeading subtitle="Introduction">
                  ALEN <br />
                  <span className="text-indigo-600">JACOB.</span>
                </SectionHeading>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-xl md:text-2xl font-serif italic text-neutral-800 leading-relaxed mb-12"
                >
                  "I build the frameworks that allow social concepts to manifest
                  as physical reality."
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg text-neutral-600 leading-relaxed mb-12"
                >
                  Alen Jacob specializes in bridging the gap between social
                  structures, business systems, and tangible reality. Each
                  bureau represents a pillar of modern existence, meticulously
                  designed for scalability and legacy.
                </motion.p>
                <Magnetic strength={0.2}>
                  <button className="px-12 py-5 bg-black text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-neutral-800 transition-all">
                    View Manifesto
                  </button>
                </Magnetic>
              </div>

              <div className="lg:col-span-6 relative">
                <ImageReveal
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1000"
                  alt="Strategic Meeting"
                  className="aspect-4/5 shadow-2xl relative group"
                  style={{ y: y1 }}
                />
                <motion.div
                  style={{ y: y2 }}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute -bottom-24 -left-12 hidden lg:block w-64 aspect-square shadow-2xl border-8 border-white rounded-3xl overflow-hidden"
                >
                  <img
                    src="/src/assets/alenjacob.webp"
                    alt="Vibrant Gradient"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-32 px-6 md:px-12 bg-neutral-100">
          <div className="max-w-7xl mx-auto">
            <SectionHeading subtitle="The Journey">
              MILESTONES OF <br />{" "}
              <span className="text-neutral-500">PROGRESS.</span>
            </SectionHeading>

            <div className="relative border-l-2 border-neutral-200 ml-4 md:ml-12 space-y-24 py-8">
              {JOURNEY.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className="relative pl-12 group"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: idx * 0.1,
                    }}
                    className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-linear-to-r ${item.color} shadow-lg ring-4 ring-neutral-100 group-hover:scale-150 transition-transform`}
                  ></motion.div>
                  <div className="max-w-2xl">
                    <span
                      className={`text-4xl md:text-6xl font-black font-condensed mb-4 block bg-linear-to-r ${item.color} bg-clip-text text-transparent`}
                    >
                      {item.year}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-black font-condensed uppercase mb-6 text-black">
                      {item.title}
                    </h3>
                    <p className="text-lg text-neutral-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-32 px-6 md:px-12 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto relative">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-purple-500 rounded-full blur-[100px]"
            ></motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 items-end mb-24">
              <div className="lg:col-span-8">
                <SectionHeading subtitle="Our Ethos">
                  THE CORE <br />{" "}
                  <span className="text-indigo-600">PRINCIPLES.</span>
                </SectionHeading>
              </div>
              <div className="lg:col-span-4">
                <motion.p
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-lg text-neutral-500 font-medium"
                >
                  Guided by architectural precision and a commitment to
                  long-term impact, our principles define every strategic
                  decision.
                </motion.p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PRINCIPLES.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  whileHover={{
                    y: -20,
                    backgroundColor: "rgba(255,255,255,1)",
                    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
                  }}
                  className="p-8 md:p-12 bg-neutral-50 border border-neutral-100 rounded-3xl transition-all group"
                >
                  <div className="text-5xl mb-12 text-indigo-600 group-hover:scale-125 transition-transform duration-500">
                    {p.icon}
                  </div>
                  <h3 className="text-3xl font-black font-condensed uppercase mb-6">
                    {p.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed font-medium">
                    {p.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-32 px-6 md:px-12 bg-indigo-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <motion.img
              initial={{ scale: 1.2, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.2 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1920"
              alt="Technology"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.4),transparent)]"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <SectionHeading subtitle="Total Impact">
                STRATEGIC <br />{" "}
                <span className="text-emerald-400">AMPLITUDE.</span>
              </SectionHeading>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white/60 leading-relaxed text-lg mb-12 max-w-lg"
              >
                Our systems are currently operational across multiple global
                markets, driving growth and creating sustainable value for
                billions in assets.
              </motion.p>
              <div className="flex gap-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="text-4xl md:text-6xl font-black font-condensed mb-2 text-white">
                    2.4B+
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40">
                    Assets Strategy
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <div className="text-4xl md:text-6xl font-black font-condensed mb-2 text-white">
                    18
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40">
                    Active Bureaus
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="relative group">
              <ImageReveal
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200"
                alt="Strategic Operations"
                className="aspect-video"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
