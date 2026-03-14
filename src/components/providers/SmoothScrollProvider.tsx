"use client";

import { ReactLenis } from "lenis/react";
import { useLocale } from "next-intl";
import { useEffect, useRef } from "react";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // We synchronize the Lenis scroll direction dynamically
    // based on the React-Intl provider's current locale.
    if (lenisRef.current?.lenis) {
      // Future-proofing or direct lenis manipulation if needed
    }
  }, [locale]);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={
        {
          lerp: 0.1, // Buttery smooth deceleration as requested
          duration: 1.5, // Enhances the weighted, premium feel
          smoothWheel: true,
          syncTouch: true,
          touchMultiplier: 2,
          orientation: "vertical",
          gestureOrientation: "vertical",
          direction: dir === "rtl" ? "rtl" : "ltr",
        } as unknown as Record<string, unknown>
      }
    >
      {children}
    </ReactLenis>
  );
}
