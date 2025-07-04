import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { allProjectsData } from "../constants/projectData";

const ProjectsCarousel = ({ items }) => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextProject = () => {
        setDirection(1);
        setIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const prevProject = () => {
        setDirection(-1);
        setIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    const item = items[index];

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? -100 : 100,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
        }),
    };

    return (
        <div className="relative flex flex-col items-center justify-center w-full h-[300px] sm:h-[400px] md:h-[600px] overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
                <motion.div
                    key={index}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                    className="absolute w-[280px] sm:w-[320px] md:w-[400px] lg:w-[480px]"
                >
                    <div className="bg-white p-3 sm:p-4 md:p-5 pb-10 sm:pb-12 md:pb-16 shadow-lg rounded-lg">
                        <a href={`/project/${item.clientName}`} target="_blank" rel="noopener noreferrer" className="w-full h-full flex flex-col">
                            {item.type === 'image' ? (
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    className="w-full h-[150px] sm:h-[200px] md:h-[250px] object-cover rounded-t-lg"
                                />
                            ) : (
                                <video
                                    className="w-full h-[150px] sm:h-[200px] md:h-[250px] bg-black rounded-t-lg"
                                    autoPlay loop muted playsInline
                                >
                                    <source src={item.src} type="video/mp4" />
                                </video>
                            )}
                            <div className="mt-3 md:mt-4 font-cal-sans text-md sm:text-lg md:text-xl text-start text-black">
                                {item.title}
                            </div>
                        </a>
                        <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                            <img
                                src={item.logo}
                                alt={`${item.clientName} logo`}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-1 md:bottom-3 flex justify-center items-center w-full">
                <button
                    className="bg-black/50 text-white border-none w-10 h-10 sm:w-12 sm:h-12 rounded-full text-lg sm:text-xl cursor-pointer hover:bg-black/80 transition-colors mx-2"
                    onClick={prevProject}>
                    &larr;
                </button>
                <button
                    className="bg-black/50 text-white border-none w-10 h-10 sm:w-12 sm:h-12 rounded-full text-lg sm:text-xl cursor-pointer hover:bg-black/80 transition-colors mx-2"
                    onClick={nextProject}>
                    &rarr;
                </button>
            </div>
        </div>
    );
};

const Projects = () => {

    return (
        <>
            <div className="max-w-6xl mx-auto p-3 sm:p-4 md:p-5 text-center">
                <motion.h1 className="font-dm-serif text-2xl sm:text-3xl md:text-4xl text-white"
                    initial={{ opacity: 0, y: -25, }}
                    whileInView={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.3, } }}
                >
                    Proyek Yang Telah Kami Kerjakan
                </motion.h1>
                <ProjectsCarousel items={allProjectsData} />
            </div>
        </>
    );
};

export default Projects;