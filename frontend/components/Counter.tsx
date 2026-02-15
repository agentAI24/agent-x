import React, { useEffect, useState } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export const Counter: React.FC<CounterProps> = ({ end, duration = 2000, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smooth stop
      const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);
      
      setCount(Math.floor(easeOutQuart(percentage) * end));

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration]);

  return (
    <span>{prefix}{count.toLocaleString()}{suffix}</span>
  );
};