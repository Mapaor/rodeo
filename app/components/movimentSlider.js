import { useEffect, useRef, useState } from 'react';

export const useSliderMovement = (containerRef, videos, styles) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [velocity, setVelocity] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [clickStartPosition, setClickStartPosition] = useState(null);
  const [dragThreshold] = useState(5); // Pixels de moviment per considerar que és dragging
  const lastPositionRef = useRef(0);
  const lastTimeRef = useRef(Date.now());
  const actualTranslateRef = useRef(0); // Track the real position without normalization

  // Helper function for true infinite scrolling - no boundaries
  const normalizeTranslate = (translate, singleSetWidth) => {
    // Use a single set width for true infinite scrolling
    let normalized = translate % singleSetWidth;
    if (normalized < 0) {
      normalized += singleSetWidth;
    }
    return normalized;
  };

  // Helper function to apply transform with true infinite scrolling
  const applyTransform = (translate) => {
    if (!containerRef.current) return translate;
    
    const container = containerRef.current;
    const totalWidth = container.scrollWidth;
    
    // Calculate the width of a single set of videos (original 5 videos)
    const numberOfSets = 3; // Updated to match the new optimized number of sets
    const singleSetWidth = totalWidth / numberOfSets;
    
    // Normalize to a single set width for seamless looping
    const normalized = normalizeTranslate(translate, singleSetWidth);
    
    // Apply additional offset so we're always showing from the middle copies
    // This ensures we never hit the actual start or end of the DOM content
    const offsetNormalized = normalized + singleSetWidth * 1; // Show from the 2nd copy onward (middle of 3 sets)
    
    container.style.transform = `translate3d(-${offsetNormalized}px, 0px, 0px)`;
    return normalized; // Return the base normalized value for state tracking
  };

  // Initialize actualTranslateRef to start in the middle of the infinite loop
  useEffect(() => {
    const initializePosition = () => {
      if (containerRef.current && containerRef.current.parentElement) {
        const container = containerRef.current;
        const totalWidth = container.scrollWidth;
        
        if (totalWidth > 0) {
          // Calculate the width of a single set of videos
          const numberOfSets = 3; // Updated to match the new optimized number of sets
          const singleSetWidth = totalWidth / numberOfSets;
          
          // Start at a position that's comfortable within our infinite buffer
          // This ensures we never see the actual boundaries
          const startPosition = singleSetWidth * 0.5; // Start halfway through the first set
          
          actualTranslateRef.current = startPosition;
          const normalizedTranslate = applyTransform(startPosition);
          setCurrentTranslate(normalizedTranslate);
          
          // Show the slider now that it's properly positioned
          setIsInitialized(true);
        }
      }
    };

    // Try to initialize immediately
    const timeoutId = setTimeout(initializePosition, 0);
    
    return () => clearTimeout(timeoutId);
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoScrolling || isDragging) return;

    const container = containerRef.current;
    if (!container) return;
    
    const scrollSpeed = 2.0; // Augmentat lleugerament per compensar menys copies
    
    const scrollInterval = setInterval(() => {
      if (container && !isDragging && isAutoScrolling) {
        const newTranslate = actualTranslateRef.current + scrollSpeed;
        actualTranslateRef.current = newTranslate;
        const normalizedTranslate = applyTransform(newTranslate);
        setCurrentTranslate(normalizedTranslate);
      }
    }, 16);
    
    return () => clearInterval(scrollInterval);
  }, [isDragging, isAutoScrolling]);

  // Enhanced velocity-based momentum that transitions to auto-scroll
  useEffect(() => {
    if (isDragging || isAutoScrolling) return;

    const container = containerRef.current;
    if (!container) return;

    const naturalScrollSpeed = 1.5; // Match the auto-scroll speed
    const smoothingFactor = 0.02; // How quickly to converge to natural speed
    
    const velocityInterval = setInterval(() => {
      const currentVelocity = velocity;
      
      // Calculate the difference between current velocity and natural scroll speed
      const velocityDiff = naturalScrollSpeed - currentVelocity;
      
      // Smoothly adjust velocity towards natural speed
      const newVelocity = currentVelocity + (velocityDiff * smoothingFactor);
      
      // If we're very close to natural speed, snap to auto-scroll mode
      if (Math.abs(newVelocity - naturalScrollSpeed) < 0.05) {
        setVelocity(0);
        setIsAutoScrolling(true);
        clearInterval(velocityInterval);
        return;
      }
      
      setVelocity(newVelocity);
      
      const newTranslate = actualTranslateRef.current + newVelocity;
      actualTranslateRef.current = newTranslate;
      const normalizedTranslate = applyTransform(newTranslate);
      setCurrentTranslate(normalizedTranslate);
    }, 16);

    return () => clearInterval(velocityInterval);
  }, [velocity, isDragging, isAutoScrolling]);

  // Global mouse events for better drag handling
  useEffect(() => {
    const handleGlobalMouseMove = (e) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();

    if (clickStartPosition) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [clickStartPosition, isDragging, startX, scrollLeft, currentTranslate]);

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    e.preventDefault();
    setClickStartPosition({ x: e.pageX, y: e.pageY });
    setStartX(e.pageX);
    setScrollLeft(actualTranslateRef.current);
    lastPositionRef.current = e.pageX;
    lastTimeRef.current = Date.now();
    
    // No activem isDragging immediatament, esperem moviment
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      
      // Calculate velocity for smooth transition to auto-scroll
      const currentTime = Date.now();
      const timeDiff = currentTime - lastTimeRef.current;
      if (timeDiff > 0 && timeDiff < 200) { // Only use recent movements
        const positionDiff = lastPositionRef.current - startX;
        const calculatedVelocity = positionDiff / timeDiff * 16; // Convert to per-frame velocity
        const dampedVelocity = -calculatedVelocity * 0.3; // Original natural damping
        
        // Apply maximum velocity cap only to final velocity
        const maxFinalVelocity = 150; // Maximum pixels per frame for final velocity
        const clampedFinalVelocity = Math.max(-maxFinalVelocity, Math.min(maxFinalVelocity, dampedVelocity));
        
        // Always set velocity for smooth transition, even if small
        setVelocity(clampedFinalVelocity);
      } else {
        // No recent movement, start transitioning to auto-scroll immediately
        setVelocity(0);
      }
      
      if (containerRef.current) {
        containerRef.current.style.cursor = 'grab';
        containerRef.current.classList.remove(styles.dragging);
      }
    }
    
    // Reset click position
    setClickStartPosition(null);
  };

  const handleMouseMove = (e) => {
    if (!clickStartPosition) return;
    
    const deltaX = Math.abs(e.pageX - clickStartPosition.x);
    const deltaY = Math.abs(e.pageY - clickStartPosition.y);
    
    // Si el moviment supera el threshold, activem el dragging
    if (!isDragging && (deltaX > dragThreshold || deltaY > dragThreshold)) {
      setIsDragging(true);
      setIsAutoScrolling(false);
      setVelocity(0);
      
      if (containerRef.current) {
        containerRef.current.style.cursor = 'grabbing';
        containerRef.current.classList.add(styles.dragging);
      }
    }
    
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    
    const x = e.pageX;
    const walk = (x - startX) * 1;
    const newTranslate = scrollLeft - walk;
    
    // Update velocity tracking
    const currentTime = Date.now();
    if (currentTime - lastTimeRef.current > 16) { // Throttle velocity calculation
      lastPositionRef.current = x;
      lastTimeRef.current = currentTime;
    }
    
    // Store the raw translate value (can be negative or exceed bounds)
    actualTranslateRef.current = newTranslate;
    
    // Apply transform with infinite scrolling normalization
    const normalizedTranslate = applyTransform(newTranslate);
    setCurrentTranslate(normalizedTranslate);
  };

  // Touch drag handlers
  const handleTouchStart = (e) => {
    setClickStartPosition({ x: e.touches[0].pageX, y: e.touches[0].pageY });
    setStartX(e.touches[0].pageX);
    setScrollLeft(actualTranslateRef.current);
    lastPositionRef.current = e.touches[0].pageX;
    lastTimeRef.current = Date.now();
    
    // No activem isDragging immediatament, esperem moviment
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      
      // Calculate velocity for smooth transition to auto-scroll
      const currentTime = Date.now();
      const timeDiff = currentTime - lastTimeRef.current;
      if (timeDiff > 0 && timeDiff < 200) { // Only use recent movements
        const positionDiff = lastPositionRef.current - startX;
        const calculatedVelocity = positionDiff / timeDiff * 16; // Convert to per-frame velocity
        const dampedVelocity = -calculatedVelocity * 0.3; // Original natural damping
        
        // Apply maximum velocity cap only to final velocity
        const maxFinalVelocity = 150; // Maximum pixels per frame for final velocity (touch)
        const clampedFinalVelocity = Math.max(-maxFinalVelocity, Math.min(maxFinalVelocity, dampedVelocity));
        
        // Always set velocity for smooth transition, even if small
        setVelocity(clampedFinalVelocity);
      } else {
        // No recent movement, start transitioning to auto-scroll immediately
        setVelocity(0);
      }
      
      if (containerRef.current) {
        containerRef.current.classList.remove(styles.dragging);
      }
    }
    
    // Reset click position
    setClickStartPosition(null);
  };

  const handleTouchMove = (e) => {
    if (!clickStartPosition) return;
    
    const deltaX = Math.abs(e.touches[0].pageX - clickStartPosition.x);
    const deltaY = Math.abs(e.touches[0].pageY - clickStartPosition.y);
    
    // Si el moviment supera el threshold, activem el dragging
    if (!isDragging && (deltaX > dragThreshold || deltaY > dragThreshold)) {
      setIsDragging(true);
      setIsAutoScrolling(false);
      setVelocity(0);
      
      if (containerRef.current) {
        containerRef.current.classList.add(styles.dragging);
      }
    }
    
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 1;
    const newTranslate = scrollLeft - walk;
    
    // Update velocity tracking
    const currentTime = Date.now();
    if (currentTime - lastTimeRef.current > 16) { // Throttle velocity calculation
      lastPositionRef.current = x;
      lastTimeRef.current = currentTime;
    }
    
    // Store the raw translate value (can be negative or exceed bounds)
    actualTranslateRef.current = newTranslate;
    
    // Apply transform with infinite scrolling normalization
    const normalizedTranslate = applyTransform(newTranslate);
    setCurrentTranslate(normalizedTranslate);
  };

  return {
    isDragging,
    isInitialized,
    handleMouseDown,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove
  };
};
