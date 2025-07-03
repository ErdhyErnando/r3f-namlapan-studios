import { ScrollControls, Scroll } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';
import { Interface } from './components/Interface';
import { ScrollManager } from './components/ScrollManager';
import { Navbar } from './components/Navbar';
import { useState, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { Cursor } from './components/Cursor';
import { LoadingScreen } from './components/LoadingScreen';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { colorPalette } from './constants/projectData';
import { IoColorPaletteSharp } from 'react-icons/io5';

export default function App() {
  const [section, setSection] = useState(0);
  const [started, setStarted] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [isExploring, setIsExploring] = useState(false);

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);

  useEffect(() => {
    document.body.style.overflow = isExploring ? "hidden" : "auto";
  }, [isExploring]);

  return (
    <>
      <LoadingScreen started={started} setStarted={setStarted} />
      <Toaster position='top-right' reverseOrder={false} />
      <MotionConfig transition={{ type: 'spring', mass: 5, stiffness: 500, damping: 50, restDelta: 0.0001 }}>
        <Canvas
          shadows
          camera={{ position: [0, 2, 8], fov: 42 }}
          gl={{ alpha: true }}
          style={{
            background: `linear-gradient(to bottom, ${colorPalette.lightTeal}, ${colorPalette.orangeYellow}, ${colorPalette.salmon}, ${colorPalette.white} 70%)`,
          }}
        >
          {/* <color attach="background" args={["#FAFAFA"]} /> */}
          <ScrollControls pages={4} damping={0.1} enabled={!isExploring}>
            <ScrollManager section={section} onSectionChange={setSection} />
            <Scroll>
              <Suspense>
                {started && (
                  <Experience section={section} menuOpened={menuOpened} isExploring={isExploring} />
                )}
              </Suspense>
            </Scroll>
            <Scroll html>
              {started &&
                <Interface onSectionChange={setSection} isExploring={isExploring} setIsExploring={setIsExploring} />
              }
            </Scroll>
          </ScrollControls>
        </Canvas>
        <Navbar
          onSectionChange={setSection}
          menuOpened={menuOpened}
          setMenuOpened={setMenuOpened}
        />
        {/* <Cursor /> */}
      </MotionConfig>
    </>
  );
}
