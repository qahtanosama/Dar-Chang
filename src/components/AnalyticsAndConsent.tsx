"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";
import { useLocale } from "next-intl";

export default function AnalyticsAndConsent() {
  const [consentGranted, setConsentGranted] = useState(false);
  const locale = useLocale();
  const isRtl = locale === 'ar';

  useEffect(() => {
    const isConsent = getCookieConsentValue();
    if (isConsent === "true") {
      setConsentGranted(true);
    }
  }, []);

  const handleAccept = () => {
    setConsentGranted(true);
  };

  const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText={isRtl ? "موافق" : "I Understand"}
        cookieName="CookieConsent"
        style={{ background: "#0a192f", borderTop: "1px solid rgba(255,255,255,0.1)", zIndex: 9999 }}
        buttonStyle={{ background: "#D4AF37", color: "#fff", fontSize: "14px", fontWeight: "bold", borderRadius: "4px", padding: "10px 24px" }}
        expires={365}
        onAccept={handleAccept}
      >
        {isRtl 
          ? "نستخدم ملفات تعريف الارتباط لتحسين تجربة المستخدم وتحليل البيانات. باستمرارك في استخدام موقعنا، فإنك توافق على سياسة الخصوصية الخاصة بنا."
          : "We use cookies to enhance the user experience and analyze site traffic. By continuing to use our site, you consent to our privacy policy."}
      </CookieConsent>

      {consentGranted && MEASUREMENT_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
    </>
  );
}
