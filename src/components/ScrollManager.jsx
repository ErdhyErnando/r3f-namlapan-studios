import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "framer-motion";

export const ScrollManager = (props) => {
  const { section, onSectionChange } = props;

  const data = useScroll();
  const lastScroll = useRef(0);
  const isAnimating = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  // Styling the scroll fill is a DOM side effect, so it belongs in an effect —
  // running it in the component body mutated a drei-owned node during render,
  // on every render, and twice under StrictMode. useLayoutEffect keeps it
  // before the first paint, so there is no visible flash.
  useLayoutEffect(() => {
    data.fill.classList.add("top-0", "absolute");
  }, [data.fill]);

  useEffect(() => {
    const tween = gsap.to(data.el, {
      // A 0.9 s scroll animation is exactly what reduced-motion users are
      // asking not to see, so jump straight to the section instead.
      duration: prefersReducedMotion ? 0 : 0.9,
      scrollTop: section * data.el.clientHeight,
      onStart: () => {
        isAnimating.current = true;
      },
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    return () => tween.kill();
  }, [section, data.el, prefersReducedMotion]);

  useFrame(() => {
    if (isAnimating.current) {
      lastScroll.current = data.scroll.current;
      return;
    }

    const curSection = Math.floor(data.scroll.current * data.pages);
    if (data.scroll.current > lastScroll.current && curSection === 0) {
      onSectionChange(1);
    }
    if (data.scroll.current < lastScroll.current && data.scroll.current < 1 / (data.pages - 1)) {
      onSectionChange(0);
    }
    lastScroll.current = data.scroll.current;
  })
  return null;
}
