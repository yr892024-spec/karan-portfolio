import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // High performance hardware-accelerated motion coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics configs for smooth trail lag damping
  const springConfig = { damping: 40, stiffness: 400, mass: 0.5 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable custom cursor on desktop devices with hover capabilities
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 4);
      cursorY.set(e.clientY - 4);
    };

    const handleMouseOver = (e) => {
      // Check if target is interactive
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Primary Dot - snaps instantly */}
      <motion.div
        className="fixed w-2.5 h-2.5 bg-primary-500 rounded-full pointer-events-none z-50 mix-blend-difference hidden sm:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
      
      {/* Secondary Trail Ring - follows with spring damping */}
      <motion.div
        className="fixed rounded-full pointer-events-none z-50 border-2 border-primary-500/60 hidden sm:block shadow-sm shadow-primary-500/20"
        style={{
          x: trailX,
          y: trailY,
          width: isHovered ? 48 : 28,
          height: isHovered ? 48 : 28,
          left: isHovered ? -20 : -10,
          top: isHovered ? -20 : -10,
          backgroundColor: isHovered ? 'rgba(34, 197, 94, 0.1)' : 'transparent',
          borderColor: isHovered ? 'rgba(34, 197, 94, 0.8)' : 'rgba(34, 197, 94, 0.6)',
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      />
    </>
  );
}
