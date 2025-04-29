import { motion } from 'motion/react';

const Section = (props) => {
  const { children } = props

  return (
    <motion.section className={`h-screen w-screen p-8 max-w-screen-2xl mx-auto flex flex-col items-start justify-center`}
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
      <h1 className="text-4xl leading-snug">Helping You Turn Chaotic Ideas</h1>
      <h1 className="text-6xl font-serif font-semibold leading-snug">Into Cinematic Reality</h1>
    </Section >
  )
}

const AboutSection = () => {

  return (
    <Section className="text-justify">
      <motion.h1 className="text-4xl font-medium text-center my-4"
        initial={{ opacity: 0, x: -15, }}
        whileInView={{ opacity: 1, x: 0, transition: { duration: 1, delay: 0.7, } }}
      >We’re Not Your Average Video Crew</motion.h1>
      <div className="rounded-lg outline outline-white/5 bg-gray-950/70 p-4">
        <motion.p className="text-lg/loose text-white mb-4"
          initial={{ opacity: 0, x: -15, }}
          whileInView={{ opacity: 1, x: 0, transition: { duration: 1, delay: 0.9, } }}
        >
          Namlapan Studios is where raw creativity meets fearless execution. Born from a love of storytelling and a hatred of boring,
          <br />we’re a squad of misfits who live for crafting videos that spark conversations. </motion.p>
        <motion.p className="text-lg/loose text-white"
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
    <Section className="items-center">
      <div className="flex flex-col">
        <h2 className="text-4xl font-serif">Ready to make some Noise?</h2>
        <p>Drop us a line, and let’s start turning your ideas into something that’ll blow minds.</p>
      </div>
      <form className="flex flex-col gap-1">
        <label for="name">Name:</label>
        <input type="text" name="name" placeholder="What should we call you?" className="p-2 rounded-md outline outline-white/5 bg-stone-200/70" />

        <label for="phone">Phone Number:</label>
        <input type="tel" name="phone" placeholder="[Your Number]" className="p-2 rounded-lg outline outline-white/5 bg-stone-200/70" />

        <label for="email">Email: </label>
        <input type="email" name="email" placeholder="Where can we hit you back?" className="p-2 rounded-lg outline outline-white/5 bg-stone-200/70" />

        <label for="message">Message Us:</label>
        <textarea name="message"
          placeholder="spill the tea 🍵, what story you want to tell?:"
          className="p-2 rounded-lg outline outline-white/5 bg-stone-200/70"></textarea>
        <button type="submit" className="bg-purple-500 text-white p-2 rounded-lg">Send</button>
      </form>
    </Section>
  )
}
