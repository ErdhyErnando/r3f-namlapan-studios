import { motion } from 'framer-motion';
import Projects from './Projects';
import toast from 'react-hot-toast';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { BsWhatsapp } from 'react-icons/bs';

const Section = (props) => {
  const { children, alignItems = 'items-start' } = props

  return (
    <motion.section className={`h-screen w-screen p-8 max-w-screen-2xl mx-auto flex flex-col ${alignItems} justify-center`}
      initial={{ opacity: 0, y: 50, }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.6, } }}
    >
      {children}
    </motion.section>

  )
}

export const Interface = (props) => {
  const { onSectionChange, isExploring, setIsExploring } = props;
  return <div className="flex flex-col items-center w-screen">
    <HeroSection onSectionChange={onSectionChange} isExploring={isExploring} setIsExploring={setIsExploring} />
    <Section className="bg-gray-950/70 mt-20">
      <Projects />
    </Section>
    <AboutSection />
    <ContactSection />
  </div>
}

// Hero Section
const HeroSection = (props) => {
  const { onSectionChange, isExploring, setIsExploring } = props;

  return (
    <Section className="px-12 ">
      <motion.h1
        className="text-[1.5rem] text-white text-shadow-md md:text-5xl font-cal-sans leading-snug"
        initial={{ opacity: 0, y: -15, }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.3, } }}
      >Bantu Ubah Ide <span className='italic'>'Gila-mu'</span></motion.h1>
      <motion.h1
        className="text-3xl md:text-6xl text-white text-shadow-md font-cal-sans mx-0 md:-mt-3"
        initial={{ opacity: 0, y: -15, }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.7, } }}
      > Jadi Realitas Sinematik</motion.h1>
      <motion.div className="flex items-start flex-row md:flex-row gap-4 -mt-1">

        <motion.button
          className="bg-yellow-500 text-white text-shadow-xs px-5 py-2 rounded-full mt-4 hover:bg-yellow-600 tracking-normal hover:cursor-pointer"
          initial={{ opacity: 0, y: -15, }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 1, delay: 1.2, } }}
          onClick={() => onSectionChange(3)}
        >Hubungi Kami</motion.button>
        <motion.button
          className="bg-white/80 text-black px-5 py-2 rounded-full mt-4 hover:bg-white tracking-normal hover:cursor-pointer"
          initial={{ opacity: 0, y: -15, }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 1, delay: 1.3, } }}
          onClick={() => setIsExploring(!isExploring)}
        >
          {isExploring ? "Kembali ke Halaman" : "Jelajahi Studio"}
        </motion.button>
      </motion.div>
    </Section>
  )
}


// About Section
const AboutSection = () => {

  return (
    <Section alignItems="items-center" className="text-justify">
      <motion.h1 className="text-5xl font-medium text-center my-6 font-dm-serif"
        initial={{ opacity: 0, x: -15, }}
        whileInView={{ opacity: 1, x: 0, transition: { duration: 1, delay: 0.7, } }}
      >Kami Bukan Kru Video Biasa</motion.h1>
      <div className="rounded-lg outline outline-white/5 bg-gray-950/70 p-4">
        <motion.p className="text-xl/loose text-white mb-8 font-cal-sans"
          initial={{ opacity: 0, x: -15, }}
          whileInView={{ opacity: 1, x: 0, transition: { duration: 1, delay: 0.9, } }}
        >
          Namlapan Studios adalah tempat kreativitas bertemu dengan eksekusi tanpa rasa takut. Lahir dari kecintaan pada penceritaan dan kebencian pada hal yang membosankan,
          <br />kami adalah tim yang hidup untuk membuat video yang memicu percakapan.
        </motion.p>
        <motion.p className="text-xl/loose text-white mb-4 font-cal-sans"
          initial={{ opacity: 0, x: -15, }}
          whileInView={{ opacity: 1, x: 0, transition: { duration: 1, delay: 1, } }}
        >
          Berbasis di Jabodetabek, kami memadukan semangat, jiwa, dan sentuhan unik untuk membuat setiap proyek menjadi istimewa.
          <br />Tidak ada yang biasa-biasa saja di sini—hanya karya yang nyata, berani, dan sedikit out-of-the-box.
        </motion.p>
      </div>
    </Section>
  )
}

// Contact Section
const ContactSection = () => {

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
        icon: "🥳",
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "#000",
        },
      });
      event.target.reset();
    } else {
      console.log("Error:", data);
      toast.error("Gagal mengirim pesan. Silakan coba lagi nanti.", {
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "#000",
        },
      });
    }
  }

  return (
    <Section alignItems="items-center">
      <div className="flex flex-col items-center text-center mt-8">
        <h2 className="text-4xl font-dm-serif">Siap Membuat Gebrakan?</h2>
        <p className="font-cal-sans text-lg max-w-lg">Hubungi kami, dan mari kita mulai mengubah ide-ide Anda menjadi sesuatu yang luar biasa.</p>
      </div>
      <form className="w-full max-w-2xl" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-cal-sans">Nama:</label>
            <input type="text" id="name" name="name" placeholder="Nama Anda" className="p-2 rounded-md outline outline-white/5 bg-stone-200/70 text-black placeholder:text-gray-500" required />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-1 font-cal-sans">Nomor Telepon:</label>
            <input type="tel" id="phone" name="phone" placeholder="Nomor Anda" className="p-2 rounded-lg outline outline-white/5 bg-stone-200/70 text-black placeholder:text-gray-500" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-cal-sans" required>Email:</label>
            <input type="email" id="email" name="email" placeholder="Alamat email Anda" className="p-2 rounded-lg outline outline-white/5 bg-stone-200/70 text-black placeholder:text-gray-500" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="source" className="mb-1 font-cal-sans">Dari mana Anda mendengar tentang kami?</label>
            <select id="source" name="source" className="p-2 rounded-lg outline outline-white/5 bg-stone-200/70 text-black">
              <option value="">Pilih salah satu</option>
              <option value="social_media">Media Sosial</option>
              <option value="referral">Rekomendasi</option>
              <option value="search_engine">Mesin Pencari</option>
              <option value="advertisement">Iklan</option>
              <option value="other">Lainnya</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="message" className="mb-1 font-cal-sans">Pesan Anda:</label>
          <textarea id="message" name="message"
            placeholder="Ceritakan kepada kami, kisah apa yang ingin Anda sampaikan?"
            rows="4"
            className="p-2 rounded-lg outline outline-white/5 bg-stone-200/70 text-black placeholder:text-gray-500"
            required
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-yellow-300 text-white px-6 py-2 rounded-full hover:bg-yellow-500 w-full md:w-auto">Kirim</button>
        </div>
      </form>

      <div className="mt-8 text-center">
        <p className="font-cal-sans">Atau Anda dapat menghubungi kami melalui:</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="mailto:namlapanstudios@gmail.com" target="_blank" rel="noopener noreferrer">
            <HiOutlineMailOpen className="text-3xl  cursor-pointer hover:text-yellow-600 transition-colors" />
          </a>
          <a href="https://wa.me/+628568991707" target="_blank" rel="noopener noreferrer">
            <BsWhatsapp className="text-3xl  cursor-pointer hover:text-yellow-600 transition-colors" />
          </a>
        </div>
      </div>
    </Section>
  )
}
