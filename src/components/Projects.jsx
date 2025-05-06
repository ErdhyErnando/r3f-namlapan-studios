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
            // setCenterIndex(itemCount + visibleItems * 2 - 1);
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
        <div className="flex justify-center items-center relative h-[500px] mx-auto overflow-hidden ">
            <button
                className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/50 text-white border-none w-12 h-12 rounded-full text-xl cursor-pointer z-[100] hover:bg-black/80 transition-colors" onClick={prevItem}>
                &larr;
            </button>

            <div className="relative w-[1000px] h-full">
                {Array.from({ length: totalItems }, (_, index) => {
                    const item = getItemAtIndex(index);
                    const relativeIndex = index - centerIndex;
                    const angle = relativeIndex * 45;
                    const zIndex = totalItems - Math.abs(relativeIndex);

                    return (
                        <div className={`absolute w-[380px] h-[290px] bg-white p-4 pb-14 shadow-md rounded-md transition-all duration-500 ease-in-out origin-center left-1/2 top-1/2 -ml-[150px] -mt-[175px] ${relativeIndex === 0 ? 'opacity-100' : 'opacity-70'}`}
                            key={index}
                            style={{
                                transform: `rotate(${angle}deg) translateX(${relativeIndex * 350}px)`,
                                zIndex: zIndex,
                            }}
                        >
                            <div className="w-full h-full flex flex-col">
                                {item.type === 'image' ? (
                                    <img
                                        src={item.src}
                                        alt={item.title}
                                        className="w-full h-[200px] object-cover"
                                    />
                                ) : (
                                    <video
                                        controls
                                        className="w-full h-[250px] bg-black"
                                    >
                                        <source src={item.src} type="video/mp4" />
                                    </video>
                                )}
                                <div className="mt-4 font-cal-sans text-lg text-start">
                                    {item.title}
                                </div>
                            </div>
                            <div className="absolute bottom-2 right-2 w-12 h-12">
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
                className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/50 text-white border-none w-12 h-12 rounded-full text-xl cursor-pointer z-[100] hover:bg-black/80 transition-colors"
                onClick={nextItem}
            > &rarr;
            </button>
        </div>
    )

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
            <div className="max-w-6xl mx-auto p-5 text-center">
                <motion.h1 className="font-dm-serif text-3xl text-gray-800"
                    initial={{ opacity: 0, y: -25, }}
                    whileInView={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.3, } }}
                >
                    Our Previous Works
                </motion.h1>
                <PolaroidWheel items={polaroidItems} />
            </div>

        </>
    )
}

export default Projects;