import { ScrollControls, Scroll } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';
import { Interface } from './components/Interface';
import { ScrollManager } from './components/ScrollManager';
import { Navbar } from './components/Navbar';
import { useState, useEffect } from 'react';
import { MotionConfig } from 'motion/react';

export default function App() {
  const [section, setSection] = useState(0);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);

  return (
    <>
      <MotionConfig transition={{ type: 'spring', mass: 5, stiffness: 50, damping: 50, restDelta: 0.0001}}>
        <Canvas shadows camera={{ position: [45, 0, 45], fov: 50 }}>

          <color attach="background" args={["#e9e7ff"]} />

          <ScrollControls pages={4} damping={0.1}>
            <ScrollManager section={section} onSectionChange={setSection} />
            <Experience />
            <Scroll html>
              <Interface />
            </Scroll>
          </ScrollControls>
        </Canvas>
        <Navbar
          onSectionChange={setSection}
          menuOpened={menuOpened}
          setMenuOpened={setMenuOpened}
        />

      </MotionConfig>
    </>
  );
}

