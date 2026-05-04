import { motion } from "framer-motion";
import { FiArrowUpRight, FiPlay } from "react-icons/fi";
import { allProjectsData } from "../constants/projectData";

const MotionDiv = motion.div;
const MotionP = motion.p;
const MotionA = motion.a;

const Projects = () => {
  const [featuredProject, ...supportingProjects] = allProjectsData;
  const visibleProjects = supportingProjects.slice(0, 6);

  return (
    <div className="w-full">
      <div className="mb-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <MotionDiv
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
        >
          <p className="font-cal-sans text-sm uppercase tracking-[0.3em] text-[#e9ff5f]">Selected work</p>
          <h2 className="mt-5 max-w-3xl font-dm-serif text-[clamp(2.8rem,6.5vw,6.5rem)] leading-[0.88] text-white">
            Gambar yang punya napas.
          </h2>
        </MotionDiv>
        <MotionP
          className="max-w-2xl font-cal-sans text-lg leading-8 text-white/62 lg:justify-self-end"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1 } }}
        >
          Dari short movie sampai company profile, kami mencari ritme visual yang bikin penonton berhenti scroll dan mulai merasakan cerita.
        </MotionP>
      </div>

      {featuredProject && (
        <MotionA
          href={`/project/${featuredProject.clientName}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group grid min-h-[520px] overflow-hidden border border-white/12 bg-black md:grid-cols-[1.08fr_0.92fr]"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.75 } }}
        >
          <div className="relative min-h-[320px] overflow-hidden">
            <img
              src={featuredProject.thumbnail || featuredProject.src}
              alt={featuredProject.title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.38),rgba(0,0,0,0.04))]" />
            <div className="absolute left-5 top-5 inline-flex items-center gap-2 bg-[#e9ff5f] px-3 py-2 font-cal-sans text-xs uppercase tracking-[0.22em] text-black">
              <FiPlay />
              Featured
            </div>
          </div>
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
            <div>
              <p className="font-cal-sans text-sm uppercase tracking-[0.28em] text-white/44">
                {featuredProject.clientName}
              </p>
              <h3 className="mt-5 font-dm-serif text-[clamp(2.4rem,5vw,5.2rem)] leading-[0.92] text-white">
                {featuredProject.title}
              </h3>
              <p className="mt-6 max-w-lg font-cal-sans text-lg leading-8 text-white/58">
                {featuredProject.details}
              </p>
            </div>
            <div className="mt-10 flex items-center justify-between border-t border-white/12 pt-5">
              <span className="font-cal-sans text-sm uppercase tracking-[0.22em] text-[#e9ff5f]">Open case</span>
              <FiArrowUpRight className="text-3xl text-white transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </div>
        </MotionA>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {visibleProjects.map((item, index) => (
          <MotionA
            key={item.clientName}
            href={`/project/${item.clientName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group overflow-hidden border border-white/12 bg-white/[0.04]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: index * 0.05 },
            }}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-black">
              <img
                src={item.thumbnail || item.src}
                alt={item.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.54),rgba(0,0,0,0))]" />
              <img
                src={item.logo}
                alt={`${item.clientName} logo`}
                className="absolute bottom-4 right-4 h-11 w-11 bg-white object-contain p-1"
              />
            </div>
            <div className="flex min-h-[150px] flex-col justify-between p-5">
              <div>
                <p className="font-cal-sans text-xs uppercase tracking-[0.22em] text-white/42">
                  {item.clientName}
                </p>
                <h3 className="mt-3 font-cal-sans text-xl leading-7 text-white">
                  {item.title}
                </h3>
              </div>
              <div className="mt-6 flex items-center justify-between text-sm uppercase tracking-[0.2em] text-[#e9ff5f]">
                View
                <FiArrowUpRight className="text-xl transition group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          </MotionA>
        ))}
      </div>
    </div>
  );
};

export default Projects;
