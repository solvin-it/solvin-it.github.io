import { useEffect, useState } from 'react';

// Hook: tracks keyboard bottom inset using Visual Viewport API with throttling
export default function useKeyboardInset(isOpen: boolean, isMobile: boolean) {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    if (!isOpen || !isMobile) return () => {};

    let animationFrame = 0;
    let mounted = true;

    const throttle = (fn: Function, ms = 50) => {
      let lastCall = 0;
      return (...args: any[]) => {
        const now = performance.now();
        if (now - lastCall >= ms) {
          lastCall = now;
          fn(...args);
        }
      };
    };

    const handleViewportChange = throttle(() => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        if (!mounted) return;
        if (window.visualViewport) {
          const vv = window.visualViewport;
          const bottomInset = Math.max(0, window.innerHeight - (vv.height + vv.offsetTop));
          setKeyboardHeight(bottomInset > 140 ? bottomInset : 0);
        }
      });
    }, 50);

    if (window.visualViewport) {
      const vv = window.visualViewport;
      vv.addEventListener('resize', handleViewportChange);
      vv.addEventListener('scroll', handleViewportChange);
      handleViewportChange();

      return () => {
        mounted = false;
        vv.removeEventListener('resize', handleViewportChange);
        vv.removeEventListener('scroll', handleViewportChange);
        cancelAnimationFrame(animationFrame);
      };
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [isOpen, isMobile]);

  // Orientation change handling
  useEffect(() => {
    if (!isOpen || !isMobile) return () => {};
    const onOrientation = () => {
      setTimeout(() => {
        if (window.visualViewport) window.visualViewport.dispatchEvent(new Event('resize'));
      }, 400);
    };
    window.addEventListener('orientationchange', onOrientation);
    return () => window.removeEventListener('orientationchange', onOrientation);
  }, [isOpen, isMobile]);

  return keyboardHeight;
}
