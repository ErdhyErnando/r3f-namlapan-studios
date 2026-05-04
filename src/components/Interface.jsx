import { forwardRef } from "react";
import { motion } from "framer-motion";
import Projects from "./Projects";
import toast from "react-hot-toast";
import { HiOutlineMailOpen } from "react-icons/hi";
import { BsWhatsapp } from "react-icons/bs";
import { FiArrowDown, FiArrowRight, FiCamera, FiFilm, FiPlay, FiSend } from "react-icons/fi";

const MotionSection = motion.section;
const MotionDiv = motion.div;
const MotionAside = motion.aside;

const studioStats = [
  { value: "30+", label: "project visual" },
  { value: "4", label: "jalur produksi" },
  { value: "1", label: "tim end-to-end" },
];

const capabilities = [
  {
    icon: FiFilm,
    title: "Film & campaign",
    copy: "Konsep, script, shooting, sampai final delivery untuk brand, komunitas, dan cerita pendek.",
  },
  {
    icon: FiCamera,
    title: "Photo & documentation",
    copy: "Momen event, portrait, product, dan behind-the-scenes yang terasa hidup, bukan sekadar arsip.",
  },
  {
    icon: FiPlay,
    title: "Editing & finishing",
    copy: "Ritme, color, sound, motion, dan versi platform supaya materi mentah punya arah yang jelas.",
  },
];

const processSteps = ["Brief", "Direction", "Shoot", "Finish"];

const Section = forwardRef((props, ref) => {
  const {
    children,
    alignItems = "items-start",
    className = "",
    sectionId,
    style = {},
    ...rest
  } = props;

  return (
    <MotionSection
      ref={ref}
      data-section-id={sectionId}
      className={`min-h-screen w-full px-5 py-16 sm:px-8 lg:px-12 max-w-screen-2xl mx-auto flex flex-col ${alignItems} justify-center ${className}`}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.85, delay: 0.15 },
      }}
      style={{ minHeight: "100svh", ...style }}
      {...rest}
    >
      {children}
    </MotionSection>
  );
});

Section.displayName = "Section";

export const Interface = (props) => {
  const { sectionRefs, scrollToSection, isExploring, setIsExploring } = props;

  return (
    <div
      className="flex w-screen flex-col items-center text-stone-50"
      style={{
        pointerEvents: isExploring ? "none" : "auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      <HeroSection
        scrollToSection={scrollToSection}
        isExploring={isExploring}
        setIsExploring={setIsExploring}
        sectionRef={sectionRefs.hero}
      />
      <Section
        ref={sectionRefs.projects}
        sectionId="projects"
        className="bg-[#0f1115]/92"
      >
        <Projects />
      </Section>
      <AboutSection sectionRef={sectionRefs.about} />
      <ContactSection sectionRef={sectionRefs.contact} />
    </div>
  );
};

const HeroSection = (props) => {
  const { scrollToSection, isExploring, setIsExploring, sectionRef } = props;

  return (
    <Section ref={sectionRef} sectionId="hero" className="relative max-w-none overflow-hidden text-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(255,255,255,0.14),rgba(255,255,255,0)_34%)]" />

      <div className="relative grid w-full items-end gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.55fr)]">
        <MotionDiv
          className="max-w-5xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.15 } }}
        >
          <div className="mb-6 inline-flex items-center gap-3 border border-black bg-black px-4 py-2 text-xs uppercase tracking-[0.32em] text-[#f5f21f] shadow-xl shadow-black/18">
            <span className="h-2 w-2 bg-[#f5f21f]" />
            We are Jakarta and Melbourne based
          </div>
          <div className="relative w-fit max-w-4xl">
            <div className="absolute inset-[-0.08em] bg-[#f5f21f]/88 blur-sm" />
            <h1
              className="relative font-dm-serif text-[clamp(3rem,9vw,8.4rem)] leading-[0.86] text-black"
              style={{
                WebkitTextStroke: "0.015em #f5f21f",
                textShadow: "0.035em 0.035em 0 #f5f21f, -0.018em 0.018em 0 #f5f21f",
              }}
            >
              Namlapan Studios
            </h1>
          </div>
          <p className="mt-6 max-w-2xl bg-[#f5f21f]/82 px-1 font-cal-sans text-lg leading-8 text-black/72 sm:text-xl">
            Kami membentuk ide liar menjadi film, konten, dokumentasi, dan visual campaign yang punya rasa, ritme, dan alasan untuk diingat.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row" style={{ pointerEvents: "auto" }}>
            <button
              className="group inline-flex items-center justify-center gap-3 bg-black px-6 py-3 font-cal-sans text-sm uppercase tracking-[0.18em] text-[#f5f21f] transition hover:bg-white hover:text-black"
              onClick={() => scrollToSection("contact")}
            >
              Mulai project
              <FiArrowRight className="transition group-hover:translate-x-1" />
            </button>
            <button
              className="inline-flex items-center justify-center gap-3 border border-black/24 bg-black/8 px-6 py-3 font-cal-sans text-sm uppercase tracking-[0.18em] text-black backdrop-blur-md transition hover:border-black/60 hover:bg-white/20"
              onClick={() => setIsExploring(!isExploring)}
            >
              {isExploring ? "Kembali" : "Jelajahi studio"}
              <FiPlay />
            </button>
          </div>
        </MotionDiv>

        <MotionAside
          className="hidden border border-black/16 bg-black/86 p-5 text-white shadow-2xl shadow-black/20 backdrop-blur-md lg:block"
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.35 } }}
        >
          <p className="font-cal-sans text-sm uppercase tracking-[0.28em] text-[#f5f21f]">Current scope</p>
          <div className="mt-6 grid gap-5">
            {studioStats.map((stat) => (
              <div key={stat.label} className="border-t border-white/12 pt-4">
                <div className="font-dm-serif text-5xl leading-none text-white">{stat.value}</div>
                <div className="mt-1 font-cal-sans text-sm uppercase tracking-[0.2em] text-white/58">{stat.label}</div>
              </div>
            ))}
          </div>
        </MotionAside>
      </div>

      <button
        className="absolute bottom-7 left-5 hidden items-center gap-3 bg-black px-4 py-3 font-cal-sans text-xs uppercase tracking-[0.24em] text-[#f5f21f] shadow-xl shadow-black/18 transition hover:bg-white hover:text-black sm:left-8 lg:left-12 lg:flex"
        onClick={() => scrollToSection("projects")}
        style={{ pointerEvents: "auto" }}
      >
        Lihat karya
        <FiArrowDown />
      </button>
    </Section>
  );
};

const AboutSection = ({ sectionRef }) => {
  return (
    <Section
      ref={sectionRef}
      sectionId="about"
      alignItems="items-center"
      className="bg-[#f4efe6] text-[#151515]"
    >
      <div className="grid w-full gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
        >
          <p className="font-cal-sans text-sm uppercase tracking-[0.3em] text-[#8f2f22]">Studio manifesto</p>
          <h2 className="mt-5 max-w-xl font-dm-serif text-[clamp(2.5rem,5.5vw,5.8rem)] leading-[0.9]">
            Bukan kru video biasa.
          </h2>
          <p className="mt-6 max-w-lg font-cal-sans text-lg leading-8 text-black/66">
            Di balik setiap karya Namlapan, ada pikiran yang kacau-liar, jujur, dan belum tersampaikan. Kami mengambil energi itu lalu merapikannya menjadi gambar yang punya arah.
          </p>
        </MotionDiv>

        <div className="grid gap-4">
          {capabilities.map((item, index) => {
            const Icon = item.icon;

            return (
              <MotionDiv
                key={item.title}
                className="grid gap-5 border border-black/12 bg-white/64 p-5 sm:grid-cols-[52px_1fr]"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.65, delay: index * 0.08 },
                }}
              >
                <div className="flex h-12 w-12 items-center justify-center bg-[#151515] text-[#e9ff5f]">
                  <Icon className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-cal-sans text-xl text-black">{item.title}</h3>
                  <p className="mt-2 max-w-2xl text-base leading-7 text-black/64">{item.copy}</p>
                </div>
              </MotionDiv>
            );
          })}

          <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden border border-black/12 bg-black/12 sm:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step} className="bg-[#f4efe6] p-4">
                <span className="font-cal-sans text-xs uppercase tracking-[0.24em] text-black/42">
                  0{index + 1}
                </span>
                <p className="mt-3 font-dm-serif text-2xl">{step}</p>
              </div>
            ))}
          </div>

          <a
            href="/pricing"
            className="mt-2 inline-flex w-full items-center justify-center gap-3 bg-[#151515] px-6 py-4 font-cal-sans text-sm uppercase tracking-[0.18em] text-white transition hover:bg-[#8f2f22] sm:w-fit"
          >
            Lihat paket
            <FiArrowRight />
          </a>
        </div>
      </div>
    </Section>
  );
};

const ContactSection = ({ sectionRef }) => {
  const onSubmit = async (event) => {
    event.preventDefault();
    toast("Mengirim...", {
      style: {
        background: "#fff",
        color: "#000",
      },
    });
    const formData = new FormData(event.target);

    formData.append("access_key", import.meta.env.VITE_WEB_ACCESS_TOKEN);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      toast("Pesan Anda telah kami terima!", {
        icon: "OK",
        style: {
          borderRadius: "8px",
          background: "#fff",
          color: "#000",
        },
      });
      event.target.reset();
    } else {
      console.log("Error:", data);
      toast.error("Gagal mengirim pesan. Silakan coba lagi nanti.", {
        style: {
          borderRadius: "8px",
          background: "#fff",
          color: "#000",
        },
      });
    }
  };

  return (
    <Section
      ref={sectionRef}
      sectionId="contact"
      alignItems="items-center"
      className="bg-[#151515] pb-20 text-white"
    >
      <div className="grid w-full gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="font-cal-sans text-sm uppercase tracking-[0.3em] text-[#e9ff5f]">Start a production</p>
          <h2 className="mt-5 max-w-xl font-dm-serif text-[clamp(2.7rem,6vw,6rem)] leading-[0.88]">
            Siap bikin gebrakan?
          </h2>
          <p className="mt-6 max-w-md font-cal-sans text-lg leading-8 text-white/64">
            Ceritakan idenya seberantakan apa pun. Kami bantu cari bentuk visual, timeline, dan paket produksi yang paling masuk akal.
          </p>

          <div className="mt-8 flex gap-3">
            <a
              href="mailto:namlapanstudios@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
              className="flex h-12 w-12 items-center justify-center border border-white/18 text-2xl transition hover:border-[#e9ff5f] hover:text-[#e9ff5f]"
            >
              <HiOutlineMailOpen />
            </a>
            <a
              href="https://wa.me/+628568991707"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-12 w-12 items-center justify-center border border-white/18 text-2xl transition hover:border-[#e9ff5f] hover:text-[#e9ff5f]"
            >
              <BsWhatsapp />
            </a>
          </div>
        </div>

        <form className="grid w-full gap-4 border border-white/12 bg-white/[0.04] p-4 backdrop-blur-md sm:p-6" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Nama" id="name">
              <input type="text" id="name" name="name" placeholder="Nama Anda" required className="form-control" />
            </Field>
            <Field label="Nomor telepon" id="phone">
              <input type="tel" id="phone" name="phone" placeholder="Nomor Anda" className="form-control" />
            </Field>
            <Field label="Email" id="email">
              <input type="email" id="email" name="email" placeholder="Alamat email Anda" className="form-control" />
            </Field>
            <Field label="Tahu kami dari mana?" id="source">
              <select id="source" name="source" className="form-control">
                <option value="">Pilih salah satu</option>
                <option value="social_media">Media sosial</option>
                <option value="referral">Rekomendasi</option>
                <option value="search_engine">Mesin pencari</option>
                <option value="advertisement">Iklan</option>
                <option value="other">Lainnya</option>
              </select>
            </Field>
          </div>

          <Field label="Pesan" id="message">
            <textarea
              id="message"
              name="message"
              placeholder="Ceritakan kisah apa yang ingin Anda sampaikan."
              rows="5"
              className="form-control resize-none"
              required
            />
          </Field>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-3 bg-[#e9ff5f] px-6 py-4 font-cal-sans text-sm uppercase tracking-[0.18em] text-black transition hover:bg-white"
          >
            Kirim brief
            <FiSend />
          </button>
        </form>
      </div>
    </Section>
  );
};

const Field = ({ label, id, children }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-cal-sans text-xs uppercase tracking-[0.2em] text-white/58">
        {label}
      </label>
      {children}
    </div>
  );
};
