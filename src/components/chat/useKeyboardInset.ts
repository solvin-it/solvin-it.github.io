import { useEffect, useRef, useState } from 'react';

// Hook: tracks keyboard bottom inset using Visual Viewport API with throttling
export default function useKeyboardInset(isOpen: boolean, isMobile: boolean) {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const baselineRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen || !isMobile) {
      baselineRef.current = null;
      setKeyboardHeight(0);
      return () => {};
    }

    let animationFrame = 0;
    let mounted = true;

    const HYSTERESIS_PX = 80;

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
          const currentViewportExtent = vv.height + vv.offsetTop;

          if (baselineRef.current === null || currentViewportExtent >= baselineRef.current) {
            baselineRef.current = currentViewportExtent;
            setKeyboardHeight(0);
            return;
          }

          const baseline = baselineRef.current;
          const diff = Math.max(0, baseline - currentViewportExtent);
          setKeyboardHeight(diff > HYSTERESIS_PX ? diff : 0);
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
      baselineRef.current = null;
      setKeyboardHeight(0);
      setTimeout(() => {
        if (window.visualViewport) window.visualViewport.dispatchEvent(new Event('resize'));
      }, 400);
    };
    window.addEventListener('orientationchange', onOrientation);
    return () => window.removeEventListener('orientationchange', onOrientation);
  }, [isOpen, isMobile]);

  return keyboardHeight;
}
