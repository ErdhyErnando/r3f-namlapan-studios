import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";

const Gallery = ({ openLightbox, projectGallery }) => {
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

    const images = projectGallery;

    // Memoize the randomized image properties
    const memoizedRandomizedImages = useMemo(() => {
        const getRandomHeight = () => {
            const minHeight = 20;
            const maxHeight = 50;
            return Math.floor(
                Math.random() * (maxHeight - minHeight + 1) + minHeight
            );
        };

        const getRandomAlignment = () => {
            const alignments = ["flex-start", "center", "flex-end"];
            return alignments[Math.floor(Math.random() * alignments.length)];
        };

        return [...images]
            .sort(() => Math.random() - 0.5)
            .map((src) => ({
                src,
                randomHeight: getRandomHeight(),
                randomAlignment: getRandomAlignment(),
            }));
    }, []);

    return (
        <div
            ref={galleryContainerRef}
            className="gallery-container flex overflow-x-scroll overflow-y-hidden whitespace-nowrap h-screen"
        >
            <div className="gallery flex justify-start min-w-max p-5 h-full items-center">
                <div className="p-10 flex flex-col justify-center text-blue-900 mr-10 flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px]">
                    <h1 className="text-2xl md:text-4xl font-bold mb-4 text-blue-900">
                        Welcome to the Gallery
                    </h1>
                    <p className="text-lg mb-2 whitespace-normal text-blue-900">
                        Scroll to the right to explore a collection of beautiful images.
                    </p>
                    <p className="text-md whitespace-normal text-blue-900">
                        Each image is uniquely sized and positioned for a dynamic viewing
                        experience.
                    </p>
                </div>

                {memoizedRandomizedImages.map((image, index) => (
                    <motion.img
                        key={index}
                        src={image.src}
                        alt={`Gallery Image ${index + 1}`}
                        className="gallery-image rounded-lg shadow-md transition-transform hover:scale-102 cursor-pointer mr-4"
                        style={{
                            maxHeight: `${image.randomHeight}vh`,
                            alignSelf: image.randomAlignment,
                        }}
                        onClick={() => openLightbox(image.src)}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Gallery;
