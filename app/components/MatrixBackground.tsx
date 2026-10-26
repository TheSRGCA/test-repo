'use client';

import { useEffect, useRef } from 'react';

// Configuration object for easy tweaking
const CONFIG = {
  // Visual settings
  color: '#8b5cf6',           // Character color (purple/violet)
  leadColor: '#c4b5fd',       // Brighter lead character color (lighter lavender)
  opacity: 0.12,              // Base opacity for subtle effect
  leadOpacity: 0.18,          // Lead character opacity (slightly brighter)
  trailOpacity: 0.05,         // Fade trail opacity (lower = longer trails)
  fontSize: 10,               // Character size in pixels
  
  // Animation settings
  fps: 12,                    // Target frames per second (~83ms per frame)
  fallSpeed: 1,               // Pixels to move per frame
  
  // Character set
  chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?',
  
  // Responsive settings
  columnWidthDesktop: 10,     // Column width on desktop (matches fontSize)
  columnWidthMobile: 14,      // Wider columns on mobile for better performance
};

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return; // Don't animate if user prefers reduced motion
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let lastFrameTime = 0;
    const frameInterval = 1000 / CONFIG.fps;
    
    let columns: number[] = [];
    let columnWidth: number;

    // Initialize canvas size and columns
    const initCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      
      // Use wider columns on mobile for better performance
      const isMobile = rect.width < 768;
      columnWidth = isMobile ? CONFIG.columnWidthMobile : CONFIG.columnWidthDesktop;
      
      const columnCount = Math.floor(rect.width / columnWidth);
      columns = Array(columnCount).fill(1).map(() => Math.random() * rect.height);
    };

    initCanvas();

    // Animation loop
    const draw = (currentTime: number) => {
      const elapsed = currentTime - lastFrameTime;
      
      if (elapsed > frameInterval) {
        lastFrameTime = currentTime - (elapsed % frameInterval);
        
        const rect = canvas.getBoundingClientRect();
        
        // Create fade effect by drawing semi-transparent black rectangle
        ctx.fillStyle = `rgba(0, 0, 0, ${CONFIG.trailOpacity})`;
        ctx.fillRect(0, 0, rect.width, rect.height);
        
        // Set font
        ctx.font = `${CONFIG.fontSize}px monospace`;
        
        // Draw characters
        for (let i = 0; i < columns.length; i++) {
          const char = CONFIG.chars[Math.floor(Math.random() * CONFIG.chars.length)];
          const x = i * columnWidth;
          const y = columns[i];
          
          // Use brighter color and opacity for the lead character
          ctx.fillStyle = CONFIG.leadColor;
          ctx.globalAlpha = CONFIG.leadOpacity;
          ctx.fillText(char, x, y);
          
          // Draw trailing characters with regular color
          if (y > CONFIG.fontSize) {
            ctx.fillStyle = CONFIG.color;
            ctx.globalAlpha = CONFIG.opacity;
            const trailChar = CONFIG.chars[Math.floor(Math.random() * CONFIG.chars.length)];
            ctx.fillText(trailChar, x, y - CONFIG.fontSize);
          }
          
          // Reset column to top randomly to create varied rain effect
          if (y > rect.height && Math.random() > 0.975) {
            columns[i] = 0;
          }
          
          columns[i] += CONFIG.fallSpeed;
        }
        
        ctx.globalAlpha = 1;
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    // Handle visibility change (pause when tab is hidden)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      } else {
        lastFrameTime = performance.now();
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    // Handle window resize
    const handleResize = () => {
      initCanvas();
    };

    // Start animation
    animationFrameId = requestAnimationFrame(draw);

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
