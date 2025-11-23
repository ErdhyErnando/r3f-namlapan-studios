import { useState } from "react";
import { motion } from 'framer-motion';
import { colorPalette } from '../constants/projectData';
import { Helmet } from "react-helmet-async";

const services = [
    "produksi video",
    "penyuntingan video",
    "dokumentasi",
    "sesi foto",
];

const servicesDescriptions = {
    "produksi video": "Layanan Produksi Video mulai dari penulisan naskah, pengambilan gambar, hingga penyuntingan.",
    "penyuntingan video": "Kami mengubah rekaman mentah Anda menjadi produk akhir yang berkualitas.",
    "dokumentasi": "Abadikan acara Anda dengan layanan dokumentasi video dan fotografi kami.",
    "sesi foto": "Hasilkan gambar-gambar memukau untuk acara atau merek Anda dengan layanan sesi foto profesional kami.",
}

const pricingData = {
    "produksi video": [
        {
            name: "The First Take",
            price: "IDR 3.299.000",
            features: ["Panggilan Penemuan, Pengembangan Konsep, Sesi Strategi", "Video hingga 2-3 menit", "Pengambilan gambar hingga 6 jam", "1 Lokasi", "1x Revisi Mayor", "1x Revisi Minor"],
        },
        {
            name: "The Director's Cut",
            price: "IDR 5.799.000",
            features: ["Panggilan Penemuan, Pengembangan Konsep, Sesi Strategi", "Video hingga 5-10 menit", "Pengambilan gambar hingga 8 jam", "Hingga 2 Lokasi", "2x Revisi Mayor", "2x Revisi Minor"],
            popular: true,
        },
        {
            name: "The Studio Premiere",
            price: "Kustom",
            features: ["Pra-Produksi Kustom Penuh", "Durasi Video Kustom", "Jadwal Pengambilan Gambar Kustom", "Banyak Lokasi", "Revisi Berulang"],
        },
    ],
    "penyuntingan video": [
        {
            name: "Assembly Edit",
            price: "IDR 799.000",
            features: ["Rekaman mentah hingga 30 menit", "Koreksi dan Grading Warna", "Musik Bebas Royalti", "1x Revisi"],
        },
        {
            name: "Picture Lock Polish",
            price: "IDR 1.699.000",
            features: ["Rekaman mentah hingga 90 menit", "Koreksi dan Grading Warna", "Grafik Gerak Sederhana", "Musik Bebas Royalti", "3x Revisi"],
            popular: true,
        },
        {
            name: "Hollywood Finish",
            price: "Kustom",
            features: ["Cakupan Kustom (multi-kamera, format panjang, dll)", "Grading Tingkat Lanjut", "Grafik Gerak Kustom", "Revisi Berulang",],
        },
    ],
    dokumentasi: [
        {
            name: "The Screen Test",
            price: "IDR 4.999.000",
            features: ["Pengambilan gambar hingga 4 jam", "Satu Lokasi", "Video hingga 3 menit", "25 Foto yang Diedit", "1x Revisi Mayor"],
        },
        {
            name: "Feature Shoot",
            price: "IDR 6.999.000",
            features: ["Pengambilan gambar hingga 8 jam", "Hingga 2 lokasi", "Video hingga 10 menit", "50 Foto yang Diedit", "2x Revisi Mayor"],
            popular: true,
        },
        {
            name: "Red Carpet Gallery",
            price: "Kustom",
            features: ["Durasi Kustom", "Banyak Lokasi", "Panjang Video Kustom", "Hingga 200 Foto yang Diedit", "Revisi Berulang"],
        },
    ],
    "sesi foto": [
        {
            name: "Spark Session",
            price: "IDR 1.499.000",
            features: ["Pengambilan gambar hingga 4 jam", "Satu Lokasi", "25 foto yang diedit"],
        },
        {
            name: "Spotlight Story",
            price: "IDR 3.199.000",
            features: ["Pengambilan gambar hingga 8 jam", "Hingga 2 Lokasi", "70 foto yang diedit"],
            popular: true,
        },
        {
            name: "Luminary Collection",
            price: "Kustom",
            features: ["Durasi Kustom", "Banyak Lokasi", "Hingga 200 foto yang diedit"],
        },
    ],
};


const PricingPage = () => {
    const [selectedService, setSelectedService] = useState(services[0]);

    // Add WhatsApp configuration
    const whatsappNumber = "628568991707"; // Replace with your actual WhatsApp number
    const getWhatsAppLink = (serviceName, planName) => {
        const message = `Halo! Saya tertarik dengan paket ${planName} untuk layanan ${serviceName}.`;
        return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    };

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
            <Helmet>
                <title>Pricing - Namlapan Studios</title>
                <meta name="description" content="Find the perfect pricing plan for your video production, editing, documentation, or photo session needs." />
                <link rel="canonical" href="https://namlapan.studio/pricing" />
                <meta property="og:title" content="Pricing - Namlapan Studios" />
                <meta property="og:description" content="Find the perfect pricing plan for your video production, editing, documentation, or photo session needs." />
                <meta property="og:url" content="https://namlapan.studio/pricing" />
                <meta property="og:image" content="https://namlapan.studio/og-image.png" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="Pricing - Namlapan Studios" />
                <meta property="twitter:description" content="Find the perfect pricing plan for your video production, editing, documentation, or photo session needs." />
                <meta property="twitter:image" content="https://namlapan.studio/og-image.png" />
            </Helmet>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-8 font-dm-serif text-shadow-md text-black">Harga sederhana dan transparan</h1>

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
                        <p className="text-3xl font-extrabold mb-2">{card.price}<span className="text-lg font-medium opacity-50">/proyek</span></p>
                        <ul className="space-y-4 mb-8 flex-grow">
                            {card.features.map((feature, i) => (
                                <li key={i} className="flex items-center">
                                    <svg aria-hidden="true" className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ color: colorPalette.lightTeal }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        {/* Replace the button with an anchor tag */}
                        <a
                            href={getWhatsAppLink(selectedService, card.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3 rounded-lg font-semibold transition-colors text-white text-center block"
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
                            Mulai
                        </a>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default PricingPage;
