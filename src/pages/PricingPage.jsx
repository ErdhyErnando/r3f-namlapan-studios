import { useState } from "react";
import { motion } from 'framer-motion';
import { Helmet } from "react-helmet-async";
import { FiArrowLeft, FiArrowRight, FiCheck } from "react-icons/fi";

const MotionDiv = motion.div;

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
        <div className="min-h-screen bg-[#f5f21f] px-5 py-6 text-black sm:px-8 lg:px-12">
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
            <header className="mx-auto flex max-w-screen-2xl items-center justify-between border border-black bg-black px-4 py-3 text-[#f5f21f]">
                <a href="/" className="inline-flex items-center gap-3 font-cal-sans text-xs uppercase tracking-[0.22em] text-[#f5f21f]/78 transition hover:text-white">
                    <FiArrowLeft />
                    Home
                </a>
                <a href="/" aria-label="Namlapan Studios home" className="flex h-11 w-11 overflow-hidden bg-[#f5f21f]">
                    <img src="/namlapan-favicon.svg" alt="" className="h-full w-full object-cover" />
                </a>
            </header>

            <main className="mx-auto max-w-screen-2xl py-14 sm:py-20">
                <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
                    <div>
                        <p className="font-cal-sans text-sm uppercase tracking-[0.3em] text-black/58">Production menu</p>
                        <h1 className="mt-5 max-w-4xl font-dm-serif text-[clamp(3rem,7vw,7rem)] leading-[0.86]">
                            Harga yang jelas untuk ide yang masih liar.
                        </h1>
                    </div>
                    <p className="max-w-2xl font-cal-sans text-lg leading-8 text-black/64 lg:justify-self-end">
                        Pilih layanan utama dulu. Detail scope, jadwal, dan kebutuhan talent bisa kita rapikan bareng setelah brief awal.
                    </p>
                </div>

                <div
                    className="mb-10 grid grid-cols-2 gap-2 border border-black bg-black p-2 font-cal-sans tracking-wide md:grid-cols-4"
                >
                    {services.map((service) => (
                        <button
                            key={service}
                            onClick={() => setSelectedService(service)}
                            className={`px-4 py-3 text-sm font-medium capitalize transition-colors ${selectedService === service
                                ? "bg-[#f5f21f] text-black"
                                : "text-[#f5f21f]/62 hover:bg-[#f5f21f]/10 hover:text-[#f5f21f]"
                                }`}
                        >
                            {service}
                        </button>
                    ))}
                </div>
                <p className="mb-8 max-w-2xl border-l border-black pl-5 font-cal-sans text-base leading-7 text-black/64">
                    {servicesDescriptions[selectedService]}
                </p>

                <MotionDiv
                    key={selectedService}
                    className="grid grid-cols-1 gap-4 font-cal-sans tracking-wide md:grid-cols-3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {pricingData[selectedService].map((card, index) => (
                        <MotionDiv
                            key={index}
                            className={`relative flex min-h-[520px] flex-col border p-6 shadow-2xl shadow-black/10 sm:p-8 ${card.popular ? "border-black bg-black text-[#f5f21f]" : "border-black bg-[#f5f21f] text-black"}`}
                            variants={cardVariants}
                        >
                            {card.popular && (
                                <div className="absolute right-5 top-5 bg-[#f5f21f] px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-black">
                                    Populer
                                </div>
                            )}
                            <div>
                                <p className={`text-xs uppercase tracking-[0.24em] ${card.popular ? "text-[#f5f21f]/52" : "text-black/42"}`}>
                                    0{index + 1}
                                </p>
                                <h3 className="mt-8 font-dm-serif text-4xl leading-none">{card.name}</h3>
                                <p className="mt-5 text-3xl font-bold">
                                    {card.price}
                                    <span className={`block text-base font-medium ${card.popular ? "text-[#f5f21f]/52" : "text-black/42"}`}>
                                        per project
                                    </span>
                                </p>
                            </div>

                            <ul className="my-8 flex-grow space-y-4">
                                {card.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 leading-7">
                                        <FiCheck className={`mt-1 shrink-0 ${card.popular ? "text-[#f5f21f]" : "text-black"}`} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href={getWhatsAppLink(selectedService, card.name)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex w-full items-center justify-center gap-3 border px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] transition ${card.popular ? "border-[#f5f21f] bg-[#f5f21f] text-black hover:bg-white" : "border-black bg-black text-[#f5f21f] hover:bg-white hover:text-black"}`}
                            >
                                Mulai
                                <FiArrowRight />
                            </a>
                        </MotionDiv>
                    ))}
                </MotionDiv>
            </main>
        </div>
    );
};

export default PricingPage;
