import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = false }) => {
  return (
    <div 
      className={`
        glass-panel rounded-2xl p-6 relative overflow-hidden transition-all duration-300
        ${hoverEffect ? 'hover:shadow-[0_0_20px_rgba(255,45,85,0.2)] hover:border-[#FF2D55]/30 hover:-translate-y-1' : ''}
        ${className}
      `}
    >
      {/* Glossy gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};