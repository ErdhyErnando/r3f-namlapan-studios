import { ScrollControls, Scroll } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';
import { Interface } from './components/Interface';
import { ScrollManager } from './components/ScrollManager';
import { Navbar } from './components/Navbar';
import { useState } from 'react';
import { useEffect } from 'react';

export default function App() {
  const [section, setSection] = useState(0);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);

  return (
    <>
      <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
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
    </>
  );
}

