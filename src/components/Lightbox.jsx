import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Keep in sync with the transition durations in the class names below.
const FADE_IN_MS = 50;
const FADE_OUT_MS = 500;

const Lightbox = ({ currentImage, closeLightBox }) => {
    const [showContent, setShowContent] = useState(false);
    const closeButtonRef = useRef(null);
    const restoreFocusRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();
    const fadeOutMs = prefersReducedMotion ? 0 : FADE_OUT_MS;

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
        }, FADE_IN_MS);

        return () => clearTimeout(timer);
    }, []);

    // Move focus into the dialog, and put it back where it was on close —
    // previously the overlay was a <div> with an onClick, so opening it
    // stranded keyboard and screen-reader users on an unreachable control.
    useEffect(() => {
        restoreFocusRef.current = document.activeElement;
        closeButtonRef.current?.focus();

        return () => {
            const previous = restoreFocusRef.current;
            if (previous instanceof HTMLElement && previous.isConnected) {
                previous.focus();
            }
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                event.stopPropagation();
                closeLightBox();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [closeLightBox]);

    const handleClose = () => {
        setShowContent(false);

        if (fadeOutMs === 0) {
            closeLightBox();
            return;
        }

        setTimeout(() => {
            closeLightBox();
        }, fadeOutMs);
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            className={`fixed inset-0 flex items-center justify-center bg-black z-50 transition-opacity duration-500 ease-in-out ${showContent
                    ? "bg-opacity-80 opacity-100"
                    : "bg-opacity-0 opacity-0 pointer-events-none"
                }`}
        >
            {/*
              Full-bleed backdrop. A real <button> so it is announced and
              operable, but removed from the tab order — the visible close
              control and Escape are the keyboard paths.
            */}
            <button
                type="button"
                aria-label="Close image viewer"
                tabIndex={-1}
                onClick={handleClose}
                className="absolute inset-0 h-full w-full cursor-default"
            />

            <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close image viewer"
                onClick={handleClose}
                className={`absolute top-5 right-5 z-10 flex h-12 w-12 items-center justify-center text-4xl leading-none text-white transition-opacity duration-500 ease-in-out hover:text-[#f5f21f] ${showContent ? "opacity-100" : "opacity-0"
                    }`}
            >
                <span aria-hidden="true">&times;</span>
            </button>

            {/* Decorative: the image the user just activated, shown full size. */}
            <img
                src={currentImage}
                alt=""
                className={`relative z-0 object-contain transition-all duration-300 ease-in-out ${showContent
                        ? "max-w-[90vw] max-h-[90vh] opacity-100 scale-100"
                        : "max-w-[80vw] max-h-[80vh] opacity-0 scale-95"
                    }`}
            />
        </div>
    );
};

export default Lightbox;
