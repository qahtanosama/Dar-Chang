"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  splashImageUrl?: string | null;
}

export function SplashScreen({ splashImageUrl }: Props) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Only show if there is an image configured
    if (!splashImageUrl) {
      setShow(false);
      return;
    }

    const timer = setTimeout(() => {
      setShow(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [splashImageUrl]);

  if (!show || !splashImageUrl) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-primary-navy transition-opacity duration-500 ease-in-out`}
      style={{ opacity: show ? 1 : 0, pointerEvents: show ? "auto" : "none" }}
    >
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 animate-pulse">
        <Image
          src={splashImageUrl}
          alt="Loading..."
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
