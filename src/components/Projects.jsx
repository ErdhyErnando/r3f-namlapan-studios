import { useState } from "react";
import { motion } from "framer-motion";

const PolaroidWheel = ({ items }) => {
    const itemCount = items.length;
    const visibleItems = 3;
    const totalItems = itemCount + visibleItems * 2;

    const initialCenterIndex = visibleItems;
    const [centerIndex, setCenterIndex] = useState(initialCenterIndex);

    const nextItem = () => {
        setCenterIndex((prevIndex) => prevIndex + 1);
        if (centerIndex >= itemCount + visibleItems * 2 - 1) {
            setCenterIndex(visibleItems);
        }
    };

    const prevItem = () => {
        setCenterIndex((prevIndex) => prevIndex - 1);
        if (centerIndex <= 0) {
            setCenterIndex(itemCount + visibleItems - 1);
        }
    };

    const getItemAtIndex = (index) => {
        let normalizedIndex = index;
        if (normalizedIndex < visibleItems) {
            normalizedIndex += itemCount;
        } else if (normalizedIndex >= itemCount + visibleItems) {
            normalizedIndex -= itemCount;
        }
        return items[normalizedIndex % itemCount];
    };

    return (
        <div className="flex justify-center items-center relative h-[300px] sm:h-[400px] md:h-[500px] mx-auto overflow-hidden">
            <button
                className="absolute left-2 sm:left-3 md:left-5 top-1/2 -translate-y-1/2 bg-black/50 text-white border-none w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full text-base sm:text-lg md:text-xl cursor-pointer z-[100] hover:bg-black/80 transition-colors"
                onClick={prevItem}>
                &larr;
            </button>

            <div className="relative w-[280px] sm:w-[600px] md:w-[800px] lg:w-[1000px] h-50 mt-0">
                {Array.from({ length: totalItems }, (_, index) => {
                    const item = getItemAtIndex(index);
                    const relativeIndex = index - centerIndex;
                    const angle = relativeIndex * 45;
                    const zIndex = totalItems - Math.abs(relativeIndex);

                    const translateX = `${relativeIndex * (window.innerWidth < 640 ? 150 : window.innerWidth < 768 ? 250 : 350)}px`;

                    return (
                        <div className={`absolute w-[220px] sm:w-[280px] md:w-[320px] lg:w-[380px] h-[180px] sm:h-[220px] md:h-[250px] lg:h-[290px] bg-white p-2 sm:p-3 md:p-4 pb-8 sm:pb-10 md:pb-14 shadow-md rounded-md transition-all duration-500 ease-in-out origin-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${relativeIndex === 0 ? 'opacity-100' : 'opacity-70'}`}
                            key={index}
                            style={{
                                transform: `rotate(${angle}deg) translateX(${translateX})`,
                                zIndex: zIndex,
                            }}
                        >
                            <a href={`/project/${item.clientName}`} target="_blank" className="w-full h-full flex flex-col">
                                {item.type === 'image' ? (
                                    <img
                                        src={item.src}
                                        alt={item.title}
                                        className="w-full h-[100px] sm:h-[140px] md:h-[170px] lg:h-[200px] object-cover"
                                    />
                                ) : (
                                    <video
                                        className="w-full h-[120px] sm:h-[170px] md:h-[200px] lg:h-[250px] bg-black"
                                    >
                                        <source src={item.src} type="video/mp4" />
                                    </video>
                                )}
                                <div className="mt-2 md:mt-4 font-cal-sans text-sm sm:text-base md:text-lg text-start">
                                    {item.title}
                                </div>
                            </a>
                            <div className="absolute bottom-1 sm:bottom-1.5 md:bottom-2 right-1 sm:right-1.5 md:right-2 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12">
                                <img
                                    src={item.logo}
                                    alt="logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <button
                className="absolute right-2 sm:right-3 md:right-5 top-1/2 -translate-y-1/2 bg-black/50 text-white border-none w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full text-base sm:text-lg md:text-xl cursor-pointer z-[100] hover:bg-black/80 transition-colors"
                onClick={nextItem}
            > &rarr;
            </button>
        </div>
    );
};

const Projects = () => {

    const polaroidItems = [
        {
            type: 'image',
            src: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            title: 'Nature Beauty',
            logo: 'https://via.placeholder.com/50x50?text=Logo1',
            clientName: 'nature-beauty',
        },
        {
            type: 'image',
            src: 'https://images.pexels.com/photos/2570060/pexels-photo-2570060.jpeg?auto=compress&cs=tinysrgb&w=600',
            title: 'Urban Life',
            logo: 'https://via.placeholder.com/50x50?text=Logo2',
            clientName: 'urban-life',
        },
        {
            type: 'video',
            src: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
            title: 'Fun Video',
            logo: 'https://via.placeholder.com/50x50?text=Logo3',
            clientName: 'fun-video',
        },
        {
            type: 'image',
            src: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600',
            title: 'Delicious Food',
            logo: 'https://via.placeholder.com/50x50?text=Logo4',
            clientName: 'delicious-food',
        },
        {
            type: 'image',
            src: 'https://images.pexels.com/photos/31831861/pexels-photo-31831861/free-photo-of-lone-hiker-on-cliff-at-sunrise-in-mountain-range.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            title: 'Travel Adventure',
            logo: 'https://via.placeholder.com/50x50?text=Logo5',
            clientName: 'travel-adventure',
        },
        {
            type: 'image',
            src: 'https://pub-e54c94b2502642d69cab5d6cd5d70cee.r2.dev/luffy-1.png',
            title: 'Luffy',
            logo: 'https://via.placeholder.com/50x50?text=Logo6',
            clientName: 'luffy',
        },
    ];

    return (
        <>
            <div className="max-w-6xl mx-auto p-3 sm:p-4 md:p-5 text-center">
                <motion.h1 className="font-dm-serif text-2xl sm:text-2xl md:text-3xl text-gray-800"
                    initial={{ opacity: 0, y: -25, }}
                    whileInView={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.3, } }}
                >
                    Our Previous Works
                </motion.h1>
                <PolaroidWheel items={polaroidItems} />
            </div>
        </>
    );
};

export default Projects;