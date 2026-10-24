"use client";

import React, { useState } from "react";

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  localSrc: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
}

export default function SmartImage({
  localSrc,
  fallbackSrc,
  alt,
  className = "",
  ...props
}: SmartImageProps) {
  const [currentSrc, setCurrentSrc] = useState(localSrc);
  const [hasError, setHasError] = useState(false);

  React.useEffect(() => {
    setCurrentSrc(localSrc);
    setHasError(false);
  }, [localSrc]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      className={className}
      {...props}
    />
  );
}
