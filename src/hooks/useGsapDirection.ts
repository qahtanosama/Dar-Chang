import { useLocale } from "next-intl";

/**
 * A utility hook for GSAP animations that automatically inverses
 * X-axis translation values when the application is in RTL mode (Arabic).
 *
 * Example: `x: rx(100)` -> returns `100` in LTR, `-100` in RTL.
 */
export function useGsapDirection() {
  const locale = useLocale();
  const isRtl = locale === "ar";

  /**
   * Reverses the X value if the locale is RTL.
   * @param x The original horizontal translation value
   */
  const rx = (x: number): number => {
    return isRtl ? -x : x;
  };

  /**
   * Reverses an array of X values if the locale is RTL (useful for `x` arrays in GSAP)
   */
  const rxArray = (xArr: number[]): number[] => {
    return isRtl ? xArr.map((val) => -val) : xArr;
  };

  return { isRtl, rx, rxArray };
}
