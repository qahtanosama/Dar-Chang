"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Assuming you don't have a specific `Button` component exported yet in `admin` or using generic html buttons
// Using a standard styled html button based on project tokens.

interface AiButtonProps {
  label?: string;
  onClick: () => Promise<void>;
  disabled?: boolean;
  size?: "sm" | "xs";
  className?: string;
}

export function AiButton({
  label = "Generate",
  onClick,
  disabled,
  size = "sm",
  className,
}: AiButtonProps) {
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setLoading(true);
    try { await onClick(); }
    finally { setLoading(false); }
  };

  const szCls = size === "xs" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm";

  return (
    <button
      type="button"
      onClick={handle}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 font-medium rounded-md border shrink-0 transition-colors focus:outline-none focus:ring-1 focus:ring-violet-500",
        szCls,
        "text-violet-600 border-violet-200 bg-white hover:bg-violet-50 hover:border-violet-400 disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <Sparkles className="w-3.5 h-3.5" />
      )}
      {loading ? "Generating…" : label}
    </button>
  );
}

export function TranslateButton({
  from,
  to,
  onClick,
  disabled,
}: {
  from: "en" | "ar";
  to: "en" | "ar";
  onClick: () => Promise<void>;
  disabled?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const handle = async () => {
    setLoading(true);
    try { await onClick(); }
    finally { setLoading(false); }
  };

  return (
    <button
      type="button"
      onClick={handle}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 font-medium rounded-md border shrink-0 px-3 py-1.5 text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500",
        "text-blue-600 border-blue-200 bg-white hover:bg-blue-50 hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
      )}
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <span className="text-xs">⇄</span>
      )}
      {loading ? "Translating…" : `→ ${to === "ar" ? "العربية" : "English"}`}
    </button>
  );
}
