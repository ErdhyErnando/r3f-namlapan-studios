import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';
import { Interface } from './components/Interface';
import { Navbar } from './components/Navbar';
import { useState, useEffect, useMemo, useRef, createRef } from 'react';
import { MotionConfig } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { colorPalette } from './constants/projectData';

const SECTION_IDS = ['hero', 'projects', 'about', 'contact'];

export default function App() {
  const [section, setSection] = useState(0);
  const [started, setStarted] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [isExploring, setIsExploring] = useState(false);
  const sectionRefs = useMemo(() => ({
    hero: createRef(),
    projects: createRef(),
    about: createRef(),
    contact: createRef(),
  }), []);
  const currentSectionRef = useRef(section);

  useEffect(() => {
    currentSectionRef.current = section;
  }, [section]);

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);

  useEffect(() => {
    document.body.style.overflow = isExploring ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isExploring]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visibleEntry) {
        return;
      }

      const { sectionId } = visibleEntry.target.dataset;
      const index = SECTION_IDS.indexOf(sectionId);

      if (index !== -1 && index !== currentSectionRef.current) {
        setSection(index);
      }
    }, {
      threshold: 0.45,
      rootMargin: '-20% 0px -20% 0px',
    });

    SECTION_IDS.forEach((id) => {
      const element = sectionRefs[id]?.current;
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionRefs]);

  const scrollToSection = (target) => {
    const targetId = typeof target === 'number' ? SECTION_IDS[target] : target;
    if (!targetId) {
      return;
    }

    const element = sectionRefs[targetId]?.current;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const index = SECTION_IDS.indexOf(targetId);
    if (index !== -1 && index !== currentSectionRef.current) {
      setSection(index);
    }
  };

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
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: 0,
          }}
        >
          <Suspense>
            {started && (
              <Experience section={section} isExploring={isExploring} />
            )}
          </Suspense>
        </Canvas>
        {started && (
          <Interface
            sectionRefs={sectionRefs}
            scrollToSection={scrollToSection}
            isExploring={isExploring}
            setIsExploring={setIsExploring}
          />
        )}
        <Navbar
          scrollToSection={scrollToSection}
          menuOpened={menuOpened}
          setMenuOpened={setMenuOpened}
        />
      </MotionConfig>
    </>
  );
}
