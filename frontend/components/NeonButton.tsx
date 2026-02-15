import React from 'react';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
}

export const NeonButton: React.FC<NeonButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 active:scale-95";
  
  const variants = {
    primary: "bg-[#FF2D55] text-white shadow-[0_0_15px_rgba(255,45,85,0.4)] hover:shadow-[0_0_25px_rgba(255,45,85,0.6)] hover:bg-[#ff4d6d]",
    secondary: "bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-md",
    ghost: "bg-transparent text-[#FF2D55] hover:text-white hover:bg-[#FF2D55]/10"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};