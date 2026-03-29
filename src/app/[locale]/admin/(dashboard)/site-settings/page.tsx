"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Save, UploadCloud, RefreshCw, X, Linkedin, Twitter, Facebook, Instagram, Youtube, Phone } from "lucide-react";

type SettingsData = {
  ga4Id: string;
  gtmId: string;
  metaPixelId: string;
  clarityId: string;
  hotjarId: string;
  snapchatPixelId: string;
  tiktokPixelId: string;
  yandexMetricaId: string;
  gscVerificationCode: string;
  googleMyBusinessUrl: string;
  logoUrl: string;
  footerLogoUrl: string;
  footerText: string;
  faviconUrl: string;
  ogImageUrl: string;
  heroVideoUrl: string;
  splashImageUrl: string;
  webhookUrl: string;
  socialLinkedIn: string;
  socialTwitter: string;
  socialFacebook: string;
  socialInstagram: string;
  socialWhatsApp: string;
  socialYoutube: string;
};

const defaultSettings: SettingsData = {
  ga4Id: "", gtmId: "", metaPixelId: "", clarityId: "", hotjarId: "",
  snapchatPixelId: "", tiktokPixelId: "", yandexMetricaId: "",
  gscVerificationCode: "", googleMyBusinessUrl: "",
  logoUrl: "", footerLogoUrl: "", footerText: "", faviconUrl: "",
  ogImageUrl: "", heroVideoUrl: "", splashImageUrl: "", webhookUrl: "",
  socialLinkedIn: "", socialTwitter: "", socialFacebook: "",
  socialInstagram: "", socialWhatsApp: "", socialYoutube: "",
};

export default function SiteSettingsPage() {
  const [activeTab, setActiveTab] = useState("analytics");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);

  useEffect(() => {
    fetch("/api/admin/site-settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings({ ...defaultSettings, ...data });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load settings");
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error("Failed to save");
      toast.success("Site settings updated successfully.");
    } catch (err) {
      toast.error("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  const handleClearAsset = (assetKey: keyof SettingsData) => {
    setSettings(prev => ({ ...prev, [assetKey]: "" }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, assetKey: keyof SettingsData) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const toastId = toast.loading(`Uploading ${assetKey}...`);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("assetKey", assetKey.replace("Url", "")); // e.g. "logoUrl" -> "logo"

      const res = await fetch("/api/admin/site-settings/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const { url } = await res.json();
      setSettings(prev => ({ ...prev, [assetKey]: url }));
      toast.success(`${assetKey} uploaded successfully`, { id: toastId });
    } catch (err: any) {
      toast.error(err.message || "Failed to upload file", { id: toastId });
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading settings...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Manage global configuration, integrations, and assets.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors"
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Settings
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
        {/* Custom Sidebar Tabs */}
        <div className="md:w-64 bg-slate-50 border-r border-slate-200 shrink-0 p-4 space-y-1">
          {[
            { id: "analytics", label: "Analytics & Marketing" },
            { id: "verification", label: "Verification & SEO" },
            { id: "assets", label: "Site Assets" },
            { id: "footer", label: "Footer Content" },
            { id: "social", label: "Social Media" },
            { id: "integrations", label: "Integrations" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id ? "bg-white text-blue-700 shadow-sm border border-slate-200" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="flex-1 p-6 lg:p-8">
          {activeTab === "analytics" && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">Tracking IDs</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "ga4Id", label: "Google Analytics 4 (G-...)", placeholder: "G-XXXXXXXXXX" },
                  { key: "gtmId", label: "Google Tag Manager (GTM-...)", placeholder: "GTM-XXXXXXX" },
                  { key: "metaPixelId", label: "Meta Pixel ID", placeholder: "Numeric ID" },
                  { key: "tiktokPixelId", label: "TikTok Pixel ID", placeholder: "Alphanumeric ID" },
                  { key: "snapchatPixelId", label: "Snapchat Pixel ID", placeholder: "Alphanumeric ID" },
                  { key: "clarityId", label: "Microsoft Clarity ID", placeholder: "String ID" },
                  { key: "hotjarId", label: "Hotjar Site ID", placeholder: "Numeric ID" },
                  { key: "yandexMetricaId", label: "Yandex Metrica ID", placeholder: "Numeric ID" },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{field.label}</label>
                    <input
                      type="text"
                      name={field.key}
                      value={(settings as any)[field.key]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm placeholder:text-slate-300"
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-4 bg-blue-50 p-3 rounded-md text-blue-800 border border-blue-100">
                Scripts are dynamically injected across the site only if an ID is provided.
              </p>
            </div>
          )}

          {activeTab === "verification" && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">SEO & Verification</h2>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Google Search Console Verification Code</label>
                <input
                  type="text"
                  name="gscVerificationCode"
                  value={settings.gscVerificationCode}
                  onChange={handleChange}
                  placeholder="e.g. Qo...xyz"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                />
                <p className="text-xs text-slate-500 mt-1">Found in the meta tag from GSC.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Google My Business URL</label>
                <input
                  type="url"
                  name="googleMyBusinessUrl"
                  value={settings.googleMyBusinessUrl}
                  onChange={handleChange}
                  placeholder="https://g.page/r/..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          )}

          {activeTab === "assets" && (
            <div className="space-y-8 animate-in fade-in">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">Site Media Assets</h2>
              {[
                { key: "logoUrl", label: "Main Navigation Logo", type: "image/*" },
                { key: "faviconUrl", label: "Favicon (.ico, .png)", type: "image/x-icon,image/png" },
                { key: "ogImageUrl", label: "Default OpenGraph (Social) Image", type: "image/jpeg,image/png,image/webp" },
                { key: "splashImageUrl", label: "Splash / Loading Screen Image", type: "image/jpeg,image/png,image/webp" },
                { key: "heroVideoUrl", label: "Hero Background Video (50MB Max)", type: "video/mp4,video/webm" },
              ].map(field => (
                <div key={field.key} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-slate-900">{field.label}</label>
                    <p className="text-xs text-slate-500 mt-1 mb-3 break-all font-mono bg-white p-1 rounded inline-block border">
                      {(settings as any)[field.key] || "No file uploaded"}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="relative inline-block">
                        <input
                          type="file"
                          accept={field.type}
                          onChange={(e) => handleFileUpload(e, field.key as keyof SettingsData)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded shadow-sm text-sm hover:bg-slate-50 pointer-events-none">
                          <UploadCloud className="w-4 h-4 text-slate-400" />
                          {(settings as any)[field.key] ? "Replace" : "Upload"}
                        </button>
                      </div>
                      {(settings as any)[field.key] && (
                        <button
                          type="button"
                          onClick={() => handleClearAsset(field.key as keyof SettingsData)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-red-200 text-red-600 rounded shadow-sm text-sm hover:bg-red-50 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                  {/* Preview Area */}
                  {(settings as any)[field.key] && (
                    <div className="w-32 h-20 shrink-0 bg-white border border-slate-200 rounded-lg flex items-center justify-center overflow-hidden">
                      {field.key === "heroVideoUrl" ? (
                        <video src={(settings as any)[field.key]} className="w-full h-full object-cover" muted />
                      ) : (
                        <img src={(settings as any)[field.key]} alt="" className="max-w-full max-h-full object-contain p-1" />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === "footer" && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">Footer Customization</h2>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <label className="block text-sm font-semibold text-slate-900 mb-1">Footer Logo</label>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="relative inline-block">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, "footerLogoUrl")}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded shadow-sm text-sm hover:bg-slate-50 pointer-events-none">
                          <UploadCloud className="w-4 h-4 text-slate-400" />
                          {settings.footerLogoUrl ? "Replace Footer Logo" : "Upload Footer Logo"}
                        </button>
                      </div>
                      {settings.footerLogoUrl && (
                        <button
                          type="button"
                          onClick={() => handleClearAsset("footerLogoUrl")}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-red-200 text-red-600 rounded shadow-sm text-sm hover:bg-red-50 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                          Remove
                        </button>
                      )}
                    </div>
                    {settings.footerLogoUrl && (
                      <p className="text-xs text-slate-500 font-mono break-all bg-white inline-block p-1 border rounded">{settings.footerLogoUrl}</p>
                    )}
                  </div>
                  {settings.footerLogoUrl && (
                    <div className="w-24 h-16 bg-slate-800 shrink-0 border border-slate-300 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src={settings.footerLogoUrl} alt="" className="max-w-full max-h-full object-contain p-2" />
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-1">Footer Text (Bi-lingual fallback via Code if empty)</label>
                <textarea
                  name="footerText"
                  value={settings.footerText}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g. Sourcing Without Worry, Results Without Borders."
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          )}
          {activeTab === "social" && (
            <div className="space-y-5 animate-in fade-in">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">Social Media Links</h2>
              <p className="text-xs text-slate-500 bg-blue-50 border border-blue-100 rounded-md p-3 text-blue-800">
                Leave a field blank to hide that icon in the footer. Full URL including https://.
              </p>
              {[
                { key: "socialLinkedIn", label: "LinkedIn", placeholder: "https://linkedin.com/company/darchang", icon: <Linkedin className="w-4 h-4" /> },
                { key: "socialTwitter", label: "X / Twitter", placeholder: "https://twitter.com/darchang", icon: <Twitter className="w-4 h-4" /> },
                { key: "socialFacebook", label: "Facebook", placeholder: "https://facebook.com/darchang.consulting", icon: <Facebook className="w-4 h-4" /> },
                { key: "socialInstagram", label: "Instagram", placeholder: "https://instagram.com/darchang.global", icon: <Instagram className="w-4 h-4" /> },
                { key: "socialWhatsApp", label: "WhatsApp (tel link)", placeholder: "https://wa.me/8618721160270", icon: <Phone className="w-4 h-4" /> },
                { key: "socialYoutube", label: "YouTube", placeholder: "https://youtube.com/@darchang", icon: <Youtube className="w-4 h-4" /> },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                    <span className="text-slate-400">{field.icon}</span>
                    {field.label}
                  </label>
                  <input
                    type="url"
                    name={field.key}
                    value={(settings as any)[field.key]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === "integrations" && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">Integrations</h2>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Webhook URL</label>
                <input
                  type="url"
                  name="webhookUrl"
                  value={settings.webhookUrl}
                  onChange={handleChange}
                  placeholder="https://your-n8n.example.com/webhook/..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                />
                <p className="text-xs text-slate-500 mt-1">Fired as a POST request when an insight is published. Useful for n8n automations.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
