import { useState } from "react";
import { motion } from 'framer-motion';
import { colorPalette } from '../constants/projectData';

const services = [
    "video production",
    "video editing",
    "documentation",
    "photoshoot",
];

const pricingData = {
    "video production": [
        {
            name: "The First Take",
            price: "IDR 3.299.000",
            features: ["Discovery Call, Concept Development, Strategy Session", "Up to 2-3 minute Video", "Up to 6-hours of shoot", "1 Location", "1x Major Revision", "1x Minor Revision"],
        },
        {
            name: "The Director's Cut",
            price: "IDR 5.799.000",
            features: ["Discovery Call, Concept Development, Strategy Session", "Up to 5-10 Minute Video", "Up to 8-hours of shoot", "Up to 2 Location", "2x Major Revision", "2x Minor Revision"],
            popular: true,
        },
        {
            name: "The Studio Premiere",
            price: "Custom",
            features: ["Full Custom Pre-Production", "Custom Video Length", "Custom Shooting Schedule", "Multiple Locations", "Multiple Revisions"],
        },
    ],
    "video editing": [
        {
            name: "Assembly Edit",
            price: "IDR 799.000",
            features: ["Up to 30 minutes RAW footage", "Color Correction and Grading", "Royalty-Free Music", "1x Revision"],
        },
        {
            name: "Picture Lock Polish",
            price: "IDR 1.699.000",
            features: ["Up to 90 minutes RAW footage", "Color Correction and Grading", "Simple Motion Graphics", "Royalty-Free Music", "3x Revision"],
            popular: true,
        },
        {
            name: "Hollywood Finish",
            price: "Custom",
            features: ["Custom Scope (multi-cam, long form, etc)", "Advance Grading", "Custom Motion Graphics", "Multiple Revisions",],
        },
    ],
    documentation: [
        {
            name: "The Screen Test",
            price: "IDR 4.999.000",
            features: ["Up to 4 hours of shooting", "Single Location", "Up to 3 minute video", "25 Edited Photos", "1x Major Revision"],
        },
        {
            name: "Feature Shoot",
            price: "IDR 6.999.000",
            features: ["Up to 8 hours of shooting", "Up to 2 locations", "Up to 10 minute video", "50 Edited Photos", "2x Major Revision"],
            popular: true,
        },
        {
            name: "Red Carpet Gallery",
            price: "Custom",
            features: ["Custom Duration", "Multiple Locations", "Custom Video Length", "Up to 200 Edited Photos", "Multiple Revisions"],
        },
    ],
    photoshoot: [
        {
            name: "Spark Session",
            price: "IDR 1.499.000",
            features: ["Up to 4 hours of shooting", "Single Location", "25 edited photos"],
        },
        {
            name: "Spotlight Story",
            price: "IDR 3.199.000",
            features: ["Up to 8 hours of shooting", "Up to 2 Locations", "70 edited photos"],
            popular: true,
        },
        {
            name: "Luminary Collection",
            price: "Custom",
            features: ["Custom Duration", "Multiple Locations", "Up to 200 edited photos"],
        },
    ],
};


const PricingPage = () => {
    const [selectedService, setSelectedService] = useState(services[0]);

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <div
            className="text-white min-h-screen p-8 font-sans"
            style={{
                background: `linear-gradient(to bottom, ${colorPalette.lightTeal}, ${colorPalette.orangeYellow}, ${colorPalette.salmon}, ${colorPalette.white} 70%)`,
            }}
        >
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-8 font-dm-serif text-shadow-md text-black">Simple, transparent pricing</h1>

                <div
                    className="inline-grid md:grid-cols-4 grid-cols-2 flex-wrap p-2 items-center justify-center rounded-lg gap-2 font-cal-sans tracking-wide"
                    style={{ backgroundColor: colorPalette.darkTeal }}
                >
                    {services.map((service) => (
                        <button
                            key={service}
                            onClick={() => setSelectedService(service)}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors capitalize ${selectedService === service
                                ? "text-black"
                                : "text-white/70 hover:bg-black/20"
                                }`}
                            style={{
                                backgroundColor: selectedService === service ? colorPalette.orangeYellow : 'transparent'
                            }}
                        >
                            {service}
                        </button>
                    ))}
                </div>
            </div>

            <motion.div
                key={selectedService}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto font-cal-sans tracking-wide"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {pricingData[selectedService].map((card, index) => (
                    <motion.div
                        key={index}
                        className={`rounded-2xl p-8 flex flex-col relative shadow-lg ${card.popular ? "border-2" : ""}`}
                        style={{
                            backgroundColor: colorPalette.white,
                            color: colorPalette.black,
                            borderColor: card.popular ? colorPalette.salmon : 'transparent'
                        }}
                        variants={cardVariants}
                    >
                        {card.popular && (
                            <div
                                className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-3 py-1 rounded-full"
                                style={{ backgroundColor: colorPalette.salmon }}
                            >
                                Most Popular
                            </div>
                        )}
                        <h3 className="text-2xl font-bold mb-2">{card.name}</h3>
                        <p className="text-3xl font-extrabold mb-2">{card.price}<span className="text-lg font-medium opacity-50">/project</span></p>
                        <p className="opacity-50 mb-6">Perfect for your needs.</p>
                        <ul className="space-y-4 mb-8 flex-grow">
                            {card.features.map((feature, i) => (
                                <li key={i} className="flex items-center">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ color: colorPalette.lightTeal }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button
                            className="w-full py-3 rounded-lg font-semibold transition-colors text-white"
                            style={{
                                backgroundColor: card.popular ? colorPalette.salmon : colorPalette.darkTeal,
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = card.popular ? colorPalette.orangeYellow : colorPalette.lightTeal;
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = card.popular ? colorPalette.salmon : colorPalette.darkTeal;
                            }}
                        >
                            Get started
                        </button>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default PricingPage;
