import { motion } from 'framer-motion';

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

export const Interface = () => {
  return <div className="flex flex-col items-center w-screen">
    <HeroSection />
    <Section>
      <h1>Clients</h1>
    </Section>
    <AboutSection />
    <ContactSection />
  </div>
}

const HeroSection = () => {
  return (
    <Section>
      <motion.h1
        className="text-3xl md:text-4xl font-cal-sans leading-snug my-0"
        initial={{ opacity: 0, y: -15, }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.3, } }}
      >Bantu Ubah Ide 'Gila-mu'</motion.h1>
      <motion.h1
        className="text-5xl md:text-6xl font-dm-serif leading-snug bg-white"
        initial={{ opacity: 0, y: -15, }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.7, } }}
      > Jadi Realitas Sinematik</motion.h1>
      <motion.button
        className="bg-yellow-500 text-white px-5 py-2 rounded-lg mt-4 hover:bg-iyellow-700 font-cal-sans tracking-widest"
        initial={{ opacity: 0, y: -15, }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 1, delay: 1, } }}
      >Get Started</motion.button>
    </Section>
  )
}

const AboutSection = () => {

  return (
    <Section alignItems="items-center" className="text-justify">
      <motion.h1 className="text-5xl font-medium text-center my-4 font-dm-serif"
        initial={{ opacity: 0, x: -15, }}
        whileInView={{ opacity: 1, x: 0, transition: { duration: 1, delay: 0.7, } }}
      >We’re Not Your Average Video Crew</motion.h1>
      <div className="rounded-lg outline outline-white/5 bg-gray-950/70 p-4">
        <motion.p className="text-xl/loose text-white mb-8 font-cal-sans"
          initial={{ opacity: 0, x: -15, }}
          whileInView={{ opacity: 1, x: 0, transition: { duration: 1, delay: 0.9, } }}
        >
          Namlapan Studios is where raw creativity meets fearless execution. Born from a love of storytelling and a hatred of boring,
          <br />we’re a squad of misfits who live for crafting videos that spark conversations. </motion.p>
        <motion.p className="text-xl/loose text-white mb-4 font-cal-sans"
          initial={{ opacity: 0, x: -15, }}
          whileInView={{ opacity: 1, x: 0, transition: { duration: 1, delay: 1, } }}
        >
          Based in Jabodetabek, we blend grit, soul, and a touch of weird to make every project uniquely yours.
          <br />No cookie-cutter vibes here—just real, bold, and a little unhinged.</motion.p>
      </div>
    </Section>
  )
}

const ContactSection = () => {
  return (
    <Section alignItems="items-center">
      <div className="flex flex-col items-center text-center mb-8">
        <h2 className="text-4xl font-dm-serif">Ready to make some Noise?</h2>
        <p className="font-cal-sans text-lg max-w-lg">Drop us a line, and let’s start turning your ideas into something that’ll blow minds.</p>
      </div>
      <form className="w-full max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-cal-sans">Name:</label>
            <input type="text" id="name" name="name" placeholder="What should we call you?" className="p-2 rounded-md outline outline-white/5 bg-stone-200/70 text-black placeholder:text-gray-500" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-1 font-cal-sans">Phone Number:</label>
            <input type="tel" id="phone" name="phone" placeholder="[Your Number]" className="p-2 rounded-lg outline outline-white/5 bg-stone-200/70 text-black placeholder:text-gray-500" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-cal-sans">Email:</label>
            <input type="email" id="email" name="email" placeholder="Where can we hit you back?" className="p-2 rounded-lg outline outline-white/5 bg-stone-200/70 text-black placeholder:text-gray-500" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="source" className="mb-1 font-cal-sans">Where did you hear about us?</label>
            <select id="source" name="source" className="p-2 rounded-lg outline outline-white/5 bg-stone-200/70 text-black">
              <option value="">Select an option</option>
              <option value="social_media">Social Media</option>
              <option value="referral">Referral</option>
              <option value="search_engine">Search Engine</option>
              <option value="advertisement">Advertisement</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="message" className="mb-1 font-cal-sans">Message Us:</label>
          <textarea id="message" name="message"
            placeholder="Spill the tea 🍵, what story you want to tell?"
            rows="4"
            className="p-2 rounded-lg outline outline-white/5 bg-stone-200/70 text-black placeholder:text-gray-500"></textarea>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 font-cal-sans tracking-wide w-full md:w-auto">Send</button>
        </div>
      </form>
    </Section>
  )
}
