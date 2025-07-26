import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { colorPalette } from "../constants/projectData";

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
                document.querySelector(
                    ".progress-bar"
                ).style.width = `${scrollPercentage}%`;
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
            className="gallery-container flex overflow-x-scroll overflow-y-hidden whitespace-nowrap h-screen"
        >
            <div className="gallery flex justify-start min-w-max p-5 h-full items-center">
                <div className="p-10 flex flex-col justify-center mr-24 flex-shrink-0 w-[320px] sm:w-[420px] md:w-[520px] lg:w-[620px]">
                    <h1
                        className="text-2xl md:text-4xl font-bold mb-4 whitespace-normal font-dm-serif"
                        style={{ color: colorPalette.black }}
                    >
                        {project.title}
                    </h1>
                    <p
                        className="text-lg mb-2 whitespace-normal font-cal-sans"
                        style={{ color: colorPalette.darkTeal }}
                    >
                        {project.details}
                    </p>
                    <p
                        className="text-md whitespace-normal font-cal-sans opacity-80"
                        style={{ color: colorPalette.darkTeal }}
                    >
                        Geser ke Kanan untuk melihat lebih banyak
                    </p>
                </div>

                {memoizedRandomizedImages.map((item, index) => {
                    if (item.type === "image") {
                        return (
                            <motion.img
                                key={index}
                                src={item.src}
                                alt={`Gallery Image ${index + 1}`}
                                className="gallery-image rounded-lg transition-transform  cursor-pointer mr-4"
                                style={{
                                    maxHeight: `${item.randomHeight}vh`,
                                    alignSelf: item.randomAlignment,
                                    boxShadow: `0 4px 20px rgba(0, 0, 0, 0.1)`,
                                }}
                                onClick={() => openLightbox(item.src)}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{
                                    scale: 1.01,
                                    boxShadow: `0 8px 30px rgba(0, 0, 0, 0.15)`,
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            />
                        );
                    } else if (item.type === "youtube") {
                        return (
                            <motion.div
                                key={index}
                                className="gallery-video rounded-lg mr-4 overflow-hidden"
                                style={{
                                    height: `${item.randomHeight}vh`,
                                    width: `${item.randomHeight * 1.77}vh`,
                                    alignSelf: item.randomAlignment,
                                    boxShadow: `0 4px 20px rgba(0, 0, 0, 0.1)`,
                                }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: `0 8px 30px rgba(0, 0, 0, 0.15)`,
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <iframe
                                    src={item.src}
                                    title={`Gallery Video ${index + 1}`}
                                    className="w-full h-full"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </motion.div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default Gallery;
