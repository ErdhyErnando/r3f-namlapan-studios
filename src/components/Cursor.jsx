import { useState, useEffect } from 'react';

export const Cursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isClicked, setIsClicked] = useState(false);
    const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

    useEffect(() => {
        const updateMousePosition = (ev) => {
            setPosition({ x: ev.clientX, y: ev.clientY });

            // Check if hovering over interactive elements
            const targetElement = document.elementFromPoint(ev.clientX, ev.clientY);
            if (targetElement?.closest('button, input, textarea, select, a')) {
                setIsHoveringInteractive(true);
            } else {
                setIsHoveringInteractive(false);
            }
        };

        const handleMouseDown = () => {
            setIsClicked(true);
        };

        const handleMouseUp = () => {
            setIsClicked(false);
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        // Cleanup listeners on component unmount
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []); // Empty dependency array ensures this runs only once on mount

    const cursorStyle = {
        position: 'fixed',
        top: `${position.y}px`,
        left: `${position.x}px`,
        transform: 'translate(-50%, -50%)', // Center the emoji on the cursor point
        fontSize: '1.5rem', // Adjust size as needed
        pointerEvents: 'none', // Prevent the cursor from blocking interactions
        zIndex: 9999, // Ensure it's on top
        transition: 'transform 0.1s ease-out', // Optional: smooth movement
    };

    const ringStyle = isHoveringInteractive ? {
        width: '20px', // Adjust size
        height: '20px',
        border: '1px solid red', // Or 'black'
        borderRadius: '50%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    } : {};

    return (
        <div style={cursorStyle}>
            {isHoveringInteractive && <div style={ringStyle}></div>}
            <span>{isClicked ? '📸' : '📷'}</span>
        </div>
    );
};