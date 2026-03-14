# Pre-Deployment Audit Report

## 1. Navbar GSAP Memory Leak & Scroll Performance

**File:** `src/components/layout/Navbar.tsx`
🛑 **Issue:** The scroll event listener natively uses `gsap.to()` outside of a GSAP Context (`useGSAP()`). This can cause severe memory leaks and unexpected behavior in React strict mode or during frequent route transitions.
⚠️ **Risk Level:** High
✅ **Proposed Surgical Fix:**
Wrap the scroll functionality in `useGSAP()` or at minimum use `gsap.context()` inside the `useEffect`.

```tsx
useEffect(() => {
  let lastScroll = 0;
  const ctx = gsap.context(() => {
    // GSAP logic...
  });
  const handleScroll = () => {
    // ... scroll logic
    gsap.to(".desktop-nav", { yPercent: -100, duration: 0.3 });
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => {
    window.removeEventListener("scroll", handleScroll);
    ctx.revert(); // CRITICAL FIX
  };
}, []);
```

## 2. ServicesOverview Interactive GSAP Memory Leak

**File:** `src/components/sections/ServicesOverview.tsx`
🛑 **Issue:** GSAP animations triggered directly via `onMouseEnter` and `onMouseLeave` are not wrapped in `contextSafe()`. If the component unmounts mid-animation (e.g., fast route changes), it will throw "Element not found" errors and leak memory.
⚠️ **Risk Level:** Medium
✅ **Proposed Surgical Fix:**
Use `contextSafe` from the `useGSAP` hook for interactive GSAP callbacks.

```tsx
const { contextSafe } = useGSAP({ scope: sectionRef });

const handleMouseEnter = contextSafe((e: React.MouseEvent) => {
  // gsap.to(...)
});

const handleMouseLeave = contextSafe((e: React.MouseEvent) => {
  // gsap.to(...)
});
```

## 3. Unoptimized Native Image Loading

**File:** `src/app/[locale]/(public)/portfolio/page.tsx`
🛑 **Issue:** The portfolio cards dynamically map utilizing raw `<img>` tags (`<img src={pillar.bgImage} />`) instead of using the `next/image` component. This bypasses Next.js image optimization, delaying the Largest Contentful Paint (LCP) and negatively impacting SEO/Core Web Vitals.
⚠️ **Risk Level:** Medium
✅ **Proposed Surgical Fix:**
Replace the standard `<img>` tag with the `next/image` component to take advantage of WebP optimization.

```tsx
<Image
  src={pillar.bgImage}
  alt=""
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
  className="object-cover scale-100 lg:scale-110 group-hover:scale-100 transition-transform duration-700 ease-out"
/>
```

## 4. TrustMarquee Legacy Cleanup

**File:** `src/components/sections/TrustMarquee.tsx`
🛑 **Issue:** The marquee uses a raw `useEffect` with `gsap.timeline()`. While it uses `tl.kill()` on unmount, migrating to the `@gsap/react` `useGSAP` hook provides cleaner React 19/Next 15 compatibility and absolute memory safety.
⚠️ **Risk Level:** Low
✅ **Proposed Surgical Fix:**
Replace `useEffect` with `useGSAP`.

```tsx
useGSAP(
  () => {
    // We animate X percent from 0 to -50% because we duplicated the items
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 25,
      ease: "none",
      repeat: -1,
    });
  },
  { scope: marqueeRef },
);
```
