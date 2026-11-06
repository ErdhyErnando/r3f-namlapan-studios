import { useProgress } from "@react-three/drei";
import { useEffect } from "react";


export const LoadingScreen = (props) => {
    const { started, setStarted } = props;
    const { progress } = useProgress();

    // One timer, one cleanup. The previous version cleared only the 1400 ms
    // fallback and left the 500 ms completion timer running past unmount, and
    // its dependency list included `item`, which changes for every loaded
    // asset — so it re-armed the fallback on every progress tick.
    useEffect(() => {
        const timer = setTimeout(() => {
            setStarted(true);
        }, progress === 100 ? 500 : 1400);

        return () => clearTimeout(timer);
    }, [progress, setStarted]);

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full z-50 transition-opacity duration-1000 pointer-events-none flex items-center justify-center bg-[#fafafa] ${started ? "opacity-0" : "opacity-100"}`}
        >
            <div className="text-4xl md:text-9xl font-dm-serif text-[#050505] relative">
                <div
                    className="absolute left-0 top-0 overflow-hidden transition-[width] duration-500 whitespace-nowrap"
                    style={{
                        width: `${progress}%`,
                    }}
                >
                    Namlapan Studios
                </div>
                <div className="opacity-40">
                    Namlapan Studios
                </div>
            </div>
        </div>
    )
}
