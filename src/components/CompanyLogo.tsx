import React, { useState } from 'react';

interface CompanyLogoProps {
  className?: string;
  size?: number | string;
  variant?: 'full' | 'icon' | 'badge';
  withGlow?: boolean;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  className = 'w-12 h-12',
  size,
  withGlow = false
}) => {
  const [imgSrc, setImgSrc] = useState('/company_logo.jpg');
  const inlineStyle = size ? { width: size, height: size } : undefined;

  const handleImageError = () => {
    // If /company_logo.jpg fails, fallback to local asset path
    if (imgSrc !== '/assets/aistudio/WhatsApp_Image_2026-10-29_at_1.20.36_PM__1__0a31e158.jpeg') {
      setImgSrc('/assets/aistudio/WhatsApp_Image_2026-10-29_at_1.20.36_PM__1__0a31e158.jpeg');
    }
  };

  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-white shadow-md ${className}`} 
      style={inlineStyle}
    >
      {withGlow && (
        <div className="absolute -inset-1 rounded-full bg-amber-400/40 blur-md pointer-events-none" />
      )}
      <img
        src={imgSrc}
        alt="Global Care Link Services LLP Official Logo"
        className="w-full h-full object-contain rounded-full select-none pointer-events-none transition-transform duration-200"
        loading="eager"
        onError={handleImageError}
      />
    </div>
  );
};
