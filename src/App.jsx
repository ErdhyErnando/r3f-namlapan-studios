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

export default function App() {
  const [section, setSection] = useState(0);
  const [started, onStarted] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);

  return (
    <>
      <LoadingScreen started={started} setStarted={onStarted} />
      <Toaster position='top-right' reverseOrder={false} />
      <MotionConfig transition={{ type: 'spring', mass: 5, stiffness: 500, damping: 50, restDelta: 0.0001 }}>
        <Canvas
          shadows
          camera={{ position: [30, 30, -25], fov: 50 }}
          gl={{ alpha: true }} // Enable transparency for the canvas
          style={{
            background: 'linear-gradient(to bottom, #ff7e5f, #ffb36b, #ce93d8, #4a148c)', // Sunset gradient
          }}
        >
          {/* <color attach="background" args={["#fbe7ff"]} />  -- This line is removed -- */}
          <ScrollControls pages={4} damping={0.1}>
            <ScrollManager section={section} onSectionChange={setSection} />
            <Scroll>
              <Suspense>
                {started && (
                  <Experience section={section} menuOpened={menuOpened} />
                )}
              </Suspense>
            </Scroll>
            <Scroll html>
              {started &&
                <Interface />
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

