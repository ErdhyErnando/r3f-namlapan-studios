import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiMaximize2, FiPlay } from "react-icons/fi";

const MotionDiv = motion.div;
const MotionButton = motion.button;

const Gallery = ({ openLightbox, project }) => {
    const galleryContainerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const container = galleryContainerRef.current;
            if (container) {
                const scrollPercentage =
                    (container.scrollLeft /
                        (container.scrollWidth - container.clientWidth)) *
                    100;
                const progressBar = document.querySelector(".progress-bar");
                if (progressBar) {
                    progressBar.style.width = `${scrollPercentage}%`;
                }
            }
        };

        const handleWheel = (e) => {
            e.preventDefault();
            const container = galleryContainerRef.current;
            if (container) {
                container.scrollLeft += e.deltaY * 2;
            }
        };

        const galleryContainer = galleryContainerRef.current;
        if (galleryContainer) {
            galleryContainer.addEventListener("scroll", handleScroll);
            galleryContainer.addEventListener("wheel", handleWheel);
        }

        return () => {
            if (galleryContainer) {
                galleryContainer.removeEventListener("scroll", handleScroll);
                galleryContainer.removeEventListener("wheel", handleWheel);
            }
        };
    }, []);

    const images = project.gallery;

    // Memoize the randomized image properties
    const memoizedRandomizedImages = useMemo(() => {
        const getRandomHeight = () => {
            const minHeight = 40;
            const maxHeight = 70;
            return Math.floor(
                Math.random() * (maxHeight - minHeight + 1) + minHeight
            );
        };

        const getRandomAlignment = () => {
            const alignments = ["flex-start", "center", "flex-end"];
            return alignments[Math.floor(Math.random() * alignments.length)];
        };

        const getMediaTypeAndSrc = (url) => {
            const youtubeRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
            const match = url.match(youtubeRegex);

            if (match && match[2].length === 11) {
                const videoId = match[2];
                return {
                    type: "youtube",
                    src: `https://www.youtube.com/embed/${videoId}`,
                };
            } else if (url.match(/\.(jpeg|jpg|gif|png|jpeg|webp)$/i)) {
                return { type: "image", src: url };
            } else {
                return { type: "video", src: url };
            }
        };

        return [...images]
            .sort(() => Math.random() - 0.5)
            .map((src) => ({
                ...getMediaTypeAndSrc(src),
                randomHeight: getRandomHeight(),
                randomAlignment: getRandomAlignment(),
            }));
    }, [images]);

    return (
        <div
            ref={galleryContainerRef}
            className="gallery-container flex h-screen overflow-x-scroll overflow-y-hidden whitespace-nowrap bg-[#f5f21f]"
        >
            <div className="gallery flex h-full min-w-max items-center justify-start gap-5 px-5 pb-8 pt-20 sm:px-8">
                <MotionDiv
                    className="mr-8 flex h-[72vh] w-[330px] flex-shrink-0 flex-col justify-between border border-black bg-black p-6 text-[#f5f21f] shadow-2xl shadow-black/20 sm:w-[430px] lg:w-[560px] lg:p-8"
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <div>
                        <p className="font-cal-sans text-xs uppercase tracking-[0.28em] text-[#f5f21f]/85">
                            Project case
                        </p>
                        <h1 className="mt-6 whitespace-normal font-dm-serif text-[clamp(2.8rem,5vw,5.6rem)] leading-[0.88] text-[#f5f21f]">
                        {project.title}
                        </h1>
                        <p className="mt-6 max-w-md whitespace-normal font-cal-sans text-lg leading-8 text-[#f5f21f]/85">
                            {project.details}
                        </p>
                    </div>
                    <div className="border-t border-[#f5f21f]/24 pt-5">
                        <div className="flex items-center gap-3 font-cal-sans text-xs uppercase tracking-[0.22em] text-[#f5f21f]/90">
                            Scroll sideways
                            <FiArrowRight />
                        </div>
                    </div>
                </MotionDiv>

                {memoizedRandomizedImages.map((item, index) => {
                    if (item.type === "image") {
                        return (
                            <MotionButton
                                key={index}
                                type="button"
                                className="group relative mr-3 flex-shrink-0 cursor-pointer overflow-hidden border border-black bg-black p-2 text-left shadow-2xl shadow-black/18"
                                style={{
                                    height: `${item.randomHeight}vh`,
                                    width: `${item.randomHeight * 1.45}vh`,
                                    alignSelf: item.randomAlignment,
                                }}
                                onClick={() => openLightbox(item.src)}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.015 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <img
                                    src={item.src}
                                    alt={`Gallery Image ${index + 1}`}
                                    className="h-full w-full object-cover opacity-95 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                                />
                                <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center bg-[#f5f21f] text-black opacity-0 transition group-hover:opacity-100">
                                    <FiMaximize2 />
                                </div>
                            </MotionButton>
                        );
                    } else if (item.type === "youtube") {
                        return (
                            <MotionDiv
                                key={index}
                                className="gallery-video relative mr-3 overflow-hidden border border-black bg-black p-2 shadow-2xl shadow-black/18"
                                style={{
                                    height: `${item.randomHeight}vh`,
                                    width: `${item.randomHeight * 1.77}vh`,
                                    alignSelf: item.randomAlignment,
                                }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.015 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <iframe
                                    src={item.src}
                                    title={`Gallery Video ${index + 1}`}
                                    className="h-full w-full"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                                <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 bg-[#f5f21f] px-3 py-2 font-cal-sans text-xs uppercase tracking-[0.18em] text-black">
                                    <FiPlay />
                                    Video
                                </div>
                            </MotionDiv>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default Gallery;
