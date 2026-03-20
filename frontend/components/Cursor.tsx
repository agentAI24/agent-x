import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, [data-interactive="true"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100] flex items-center justify-center mix-blend-difference"
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      style={{ translateX: '-50%', translateY: '-50%' }}
    >
      <div className={`relative flex items-center justify-center transition-all duration-200 ${isHovering ? 'scale-150' : 'scale-100'}`}>
        {/* Crosshair */}
        <div className="w-6 h-6 border border-cyber-green/50 rounded-full flex items-center justify-center">
          <div className="w-1 h-1 bg-cyber-green rounded-full"></div>
        </div>
        
        {/* Scanning Text */}
        {isHovering && (
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute left-8 text-cyber-green font-mono text-[10px] whitespace-nowrap bg-black/80 px-1 border border-cyber-green/30"
          >
            [ SCANNING ]
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
