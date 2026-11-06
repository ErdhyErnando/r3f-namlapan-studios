import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';
import { Interface } from './components/Interface';
import { Navbar } from './components/Navbar';
import { useState, useEffect, useMemo, useRef } from 'react';
import { MotionConfig } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { Helmet } from '@dr.pogodin/react-helmet';

// Branded toast surface — matches the dark contact panel (#151515) and the
// accent palette used across the site. Sharp corners and a left accent bar
// instead of the library default rounded white card.
const TOAST_BASE_STYLE = {
  background: '#151515',
  color: '#f4efe6',
  border: '1px solid rgba(244, 239, 230, 0.14)',
  borderLeft: '3px solid #e9ff5f',
  borderRadius: '0px',
  padding: '14px 18px 14px 16px',
  fontFamily: 'var(--font-cal-sans), sans-serif',
  fontSize: '0.875rem',
  lineHeight: '1.45',
  letterSpacing: '0.01em',
  maxWidth: '26rem',
  boxShadow: '0 24px 48px -24px rgba(5, 5, 5, 0.9)',
};

const TOASTER_OPTIONS = {
  duration: 5000,
  style: TOAST_BASE_STYLE,
  success: {
    style: { borderLeftColor: '#e9ff5f' },
    iconTheme: { primary: '#e9ff5f', secondary: '#151515' },
  },
  error: {
    style: { borderLeftColor: '#f6935a' },
    iconTheme: { primary: '#f6935a', secondary: '#151515' },
  },
  loading: {
    style: { borderLeftColor: '#f5f21f' },
    iconTheme: { primary: '#f5f21f', secondary: '#151515' },
  },
};

// The site header is `fixed top-0 pt-3` with a 70px nav (≈82px tall), so the
// default 16px inset would drop the toast straight onto the nav links.
const TOASTER_CONTAINER_STYLE = { top: '6.5rem', right: '1.5rem' };

const SECTION_IDS = ['hero', 'projects', 'about', 'contact'];

export default function App() {
  const [section, setSection] = useState(0);
  const [started, setStarted] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [isExploring, setIsExploring] = useState(false);
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  // Ref identities are stable, so this object stays stable too — the
  // IntersectionObserver effect below depends on it.
  const sectionRefs = useMemo(
    () => ({ hero: heroRef, projects: projectsRef, about: aboutRef, contact: contactRef }),
    [],
  );
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Namlapan Studios",
    "url": "https://namlapan.studio/",
    "logo": "https://namlapan.studio/namlapan-favicon.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+62 856 8991 707",
      "contactType": "customer service"
    }
  };

  return (
    <>
      <Helmet>
        <title>Namlapan Studios - Turning Crazy Ideas into Cinematic Reality</title>
        <meta name="description" content="Namlapan Studios offers creative digital solutions including Photo & Video Creation, Editing, and Documentation." />
        <link rel="canonical" href="https://namlapan.studio/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://namlapan.studio/" />
        <meta property="og:title" content="Namlapan Studios - Turning Crazy Ideas into Cinematic Reality" />
        <meta property="og:description" content="Namlapan Studios offers creative digital solutions including Photo & Video Creation, Editing, and Documentation." />
        <meta property="og:image" content="https://namlapan.studio/og-image.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://namlapan.studio/" />
        <meta property="twitter:title" content="Namlapan Studios - Turning Crazy Ideas into Cinematic Reality" />
        <meta property="twitter:description" content="Namlapan Studios offers creative digital solutions including Photo & Video Creation, Editing, and Documentation." />
        <meta property="twitter:image" content="https://namlapan.studio/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <LoadingScreen started={started} setStarted={setStarted} />
      <Toaster
        position='top-right'
        reverseOrder={false}
        gutter={12}
        toastOptions={TOASTER_OPTIONS}
        containerStyle={TOASTER_CONTAINER_STYLE}
      />
      <MotionConfig transition={{ type: 'spring', mass: 5, stiffness: 500, damping: 50, restDelta: 0.0001 }}>
        <Canvas
          shadows
          camera={{ position: [0, 2, 8], fov: 42 }}
          gl={{ alpha: true }}
          style={{
            background: 'linear-gradient(115deg, #f7f421 0%, #ece819 52%, #d9d214 100%)',
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
