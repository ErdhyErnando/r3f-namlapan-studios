import { useState, useEffect } from "react";

const Lightbox = ({ currentImage, closeLightBox }) => {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Trigger fade-in after a brief moment to allow initial styles to apply
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 50); // Small delay like 50ms

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setShowContent(false); // Start fade-out animation
        setTimeout(() => {
            closeLightBox(); // Call the actual close function after animation
        }, 500); // Match this duration with CSS transition duration
    };

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-black z-50 transition-all duration-500 ease-in-out ${showContent
                    ? "bg-opacity-80 opacity-100"
                    : "bg-opacity-0 opacity-0 pointer-events-none"
                }`}
            onClick={handleClose} // Close when clicking on the backdrop
        >
            <span
                className={`absolute top-5 right-5 text-white text-4xl cursor-pointer transition-opacity duration-500 ease-in-out ${showContent ? "opacity-100" : "opacity-0"
                    }`}
                onClick={(e) => {
                    e.stopPropagation(); // Prevent backdrop click when clicking button
                    handleClose();
                }}
            >
                &times;
            </span>
            <img
                src={currentImage}
                alt="Lightbox Image"
                className={`object-contain transition-all duration-300 ease-in-out ${showContent
                        ? "max-w-[90vw] max-h-[90vh] opacity-100 scale-100"
                        : "max-w-[80vw] max-h-[80vh] opacity-0 scale-95"
                    }`}
                onClick={(e) => e.stopPropagation()} // Prevent backdrop click when clicking image
            />
        </div>
    );
};

export default Lightbox;
