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
          const currentExtent = vv.height + Math.max(0, vv.offsetTop); // avoid negatives

          // When the viewport gets bigger by a lot, assume keyboard closed and reset baseline.
          if (baselineRef.current !== null && currentExtent - baselineRef.current > 120) {
            baselineRef.current = currentExtent;
            setKeyboardHeight(0);
            return;
          }

          if (baselineRef.current === null || currentExtent >= baselineRef.current) {
            baselineRef.current = currentExtent;
            setKeyboardHeight(0);
            return;
          }

          const baseline = baselineRef.current;
          const diff = Math.max(0, baseline - currentExtent);
          const HYSTERESIS_PX = 56; // a bit less sticky so it snaps back sooner
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

  // Fix 1: Force-reset height to 0 whenever no editable element is focused
  useEffect(() => {
    if (!isOpen || !isMobile) return;

    const isEditable = (el: Element | null) =>
      !!el && (el instanceof HTMLTextAreaElement ||
               (el instanceof HTMLInputElement && !['button','checkbox','radio','submit','reset','file'].includes(el.type)) ||
               (el as HTMLElement).isContentEditable);

    const handleFocusChange = () => {
      // If nothing editable is focused, treat keyboard as hidden
      if (!isEditable(document.activeElement)) {
        baselineRef.current = null;
        setKeyboardHeight(0);
        // Nudge iOS to recalc in case vv events didn't fire
        if (window.visualViewport) {
          // fire a synthetic resize on next tick
          setTimeout(() => window.visualViewport!.dispatchEvent(new Event('resize')), 0);
        }
      }
    };

    document.addEventListener('focusout', handleFocusChange, true);
    document.addEventListener('focusin', handleFocusChange, true);
    return () => {
      document.removeEventListener('focusout', handleFocusChange, true);
      document.removeEventListener('focusin', handleFocusChange, true);
    };
  }, [isOpen, isMobile]);

  // Fix 2: Listen to window resize and visibilitychange for additional fallbacks
  useEffect(() => {
    if (!isOpen || !isMobile) return;

    const onWinResize = () => {
      // Defer to let URL bar/viewport settle
      requestAnimationFrame(() => {
        // If no editable is focused, snap to 0
        const el = document.activeElement;
        const editable = el && ((el as HTMLElement).isContentEditable || el.tagName === 'TEXTAREA' || el.tagName === 'INPUT');
        if (!editable) {
          baselineRef.current = null;
          setKeyboardHeight(0);
        }
      });
    };

    const onVis = () => {
      if (document.visibilityState === 'visible') {
        baselineRef.current = null;
        setKeyboardHeight(0);
        window.visualViewport?.dispatchEvent(new Event('resize'));
      }
    };

    window.addEventListener('resize', onWinResize);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      window.removeEventListener('resize', onWinResize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [isOpen, isMobile]);

  // Fix 3: Use the modern Virtual Keyboard API on Chrome/Android (if available)
  useEffect(() => {
    if (!isOpen || !isMobile) return;
    const vk: any = (navigator as any).virtualKeyboard;
    if (!vk || typeof vk.addEventListener !== 'function') return;

    try { vk.overlaysContent = true; } catch {}
    const onGeom = (e: any) => {
      const rect = e?.target?.boundingRect;
      const h = Math.max(0, rect?.height || 0);
      // When keyboard closed, this goes to 0
      setKeyboardHeight(h);
      if (h === 0) baselineRef.current = null;
    };
    vk.addEventListener('geometrychange', onGeom);
    return () => vk.removeEventListener('geometrychange', onGeom);
  }, [isOpen, isMobile]);

  return keyboardHeight;
}
