'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronUp, ChevronDown, Loader2, Save, Plus } from 'lucide-react'
import { AiButton, TranslateButton } from '@/components/admin/AiButton'

type Service = {
  id: string
  slug: string
  titleEn: string
  titleAr: string
  descriptionEn: string
  descriptionAr: string
  icon: string
  order: number
  active: boolean
  status: string
}

const ICONS = ['Search', 'ShieldCheck', 'Settings', 'Ship', 'FileText', 'Globe', 'Package', 'Truck', 'Factory', 'Zap', 'Star', 'CheckCircle']

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [edited, setEdited] = useState<Record<string, Partial<Service>>>({})
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [toastMsg, setToastMsg] = useState('')

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 3000)
  }

  const fetchServices = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/services')
    const data = await res.json()
    setServices(data)
    setLoading(false)
  }, [])

  useEffect(() => { fetchServices() }, [fetchServices])

  const update = (id: string, key: keyof Service, value: string | boolean | number) => {
    setEdited((prev) => ({ ...prev, [id]: { ...prev[id], [key]: value } }))
    setServices((prev) => prev.map((s) => s.id === id ? { ...s, [key]: value } : s))
  }

  const saveService = async (id: string) => {
    setSaving(id)
    const service = services.find((s) => s.id === id)!
    await fetch(`/api/admin/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(service),
    })
    setSaving(null)
    setEdited((prev) => { const n = { ...prev }; delete n[id]; return n })
    showToast('Service saved!')
  }

  const reorder = async (idx: number, dir: -1 | 1) => {
    const newServices = [...services]
    ;[newServices[idx], newServices[idx + dir]] = [newServices[idx + dir], newServices[idx]]
    setServices(newServices)
    await Promise.all([
      fetch(`/api/admin/services/${newServices[idx].id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: idx }),
      }),
      fetch(`/api/admin/services/${newServices[idx + dir].id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: idx + dir }),
      }),
    ])
  }

  const addService = async () => {
    setLoading(true)
    const newOrder = services.length
    const newService = {
      slug: `new-service-${Date.now()}`,
      titleEn: 'New Service',
      titleAr: 'خدمة جديدة',
      descriptionEn: '',
      descriptionAr: '',
      icon: 'Star',
      order: newOrder,
      active: false
    }
    const res = await fetch('/api/admin/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newService)
    })
    const created = await res.json()
    setServices([...services, created])
    setExpandedId(created.id)
    setLoading(false)
    showToast('New service added!')
  }

  const callAI = async (
    endpoint: string,
    body: object,
    onResult: (result: any) => void
  ) => {
    try {
      const res = await fetch(`/api/admin/ai/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "AI request failed");
      onResult(data.result);
      showToast("Generated — review before saving");
    } catch (err: any) {
      showToast(err.message || "AI generation failed");
    }
  };

  const inputCls = 'w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900'

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Services</h2>
          <p className="text-sm text-slate-500">Click a row to edit. Changes appear live on the public website.</p>
        </div>
        <button onClick={addService} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors">
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>
      ) : (
        <div className="space-y-3">
          {services.map((service, idx) => (
            <div key={service.id} className={`bg-white rounded-xl border transition-all ${expandedId === service.id ? 'border-slate-900 shadow-sm' : 'border-slate-200'}`}>
              {/* Row Header */}
              <div
                className="flex items-center gap-3 p-4 cursor-pointer"
                onClick={() => setExpandedId(expandedId === service.id ? null : service.id)}
              >
                {/* Reorder */}
                <div className="flex flex-col gap-0.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button disabled={idx === 0} onClick={() => reorder(idx, -1)}
                    className="text-slate-300 hover:text-slate-600 disabled:opacity-20">
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button disabled={idx === services.length - 1} onClick={() => reorder(idx, 1)}
                    className="text-slate-300 hover:text-slate-600 disabled:opacity-20">
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Icon badge */}
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-xs font-medium text-slate-500">
                  {service.icon.slice(0, 2)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-medium text-slate-800 text-sm">{service.titleEn}</div>
                  <div className="text-xs text-slate-400 truncate" dir="rtl">{service.titleAr}</div>
                </div>

                <div className="flex items-center gap-3 shrink-0" onClick={(e) => e.stopPropagation()}>
                  {/* Active toggle */}
                  <button
                    onClick={() => { update(service.id, 'active', !service.active); setTimeout(() => saveService(service.id), 100) }}
                    className={`text-xs px-2 py-1 rounded-full font-medium transition-colors ${
                      service.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {service.active ? 'Active' : 'Inactive'}
                  </button>
                  {edited[service.id] && (
                    <button onClick={() => saveService(service.id)}
                      disabled={saving === service.id}
                      className="flex items-center gap-1 px-3 py-1 text-xs bg-slate-900 text-white rounded-lg">
                      {saving === service.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                      Save
                    </button>
                  )}
                </div>
              </div>

              {/* Expanded Edit */}
              {expandedId === service.id && (
                <div className="border-t border-slate-100 p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Title (English)</label>
                      <input className={inputCls} value={service.titleEn}
                        onChange={(e) => update(service.id, 'titleEn', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Title (Arabic)</label>
                      <input className={inputCls} value={service.titleAr} dir="rtl"
                        onChange={(e) => update(service.id, 'titleAr', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <label className="text-xs font-medium text-slate-600">Description (English)</label>
                      <AiButton onClick={() => callAI("write-content",
                        { field: "description", locale: "en", context: service.titleEn, existingContent: service.descriptionEn },
                        (r) => update(service.id, "descriptionEn", r)
                      )} />
                      <TranslateButton from="en" to="ar" onClick={() => callAI("translate",
                        { text: service.descriptionEn, from: "en", to: "ar", fieldType: "description" },
                        (r) => update(service.id, "descriptionAr", r)
                      )} />
                    </div>
                    <textarea className={inputCls} rows={3} value={service.descriptionEn}
                      onChange={(e) => update(service.id, 'descriptionEn', e.target.value)} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1 justify-end flex-row-reverse">
                      <label className="text-xs font-medium text-slate-600 text-right">Description (Arabic)</label>
                      <AiButton onClick={() => callAI("write-content",
                        { field: "description", locale: "ar", context: service.titleAr, existingContent: service.descriptionAr },
                        (r) => update(service.id, "descriptionAr", r)
                      )} />
                      <TranslateButton from="ar" to="en" onClick={() => callAI("translate",
                        { text: service.descriptionAr, from: "ar", to: "en", fieldType: "description" },
                        (r) => update(service.id, "descriptionEn", r)
                      )} />
                    </div>
                    <textarea className={inputCls} rows={3} value={service.descriptionAr} dir="rtl"
                      onChange={(e) => update(service.id, 'descriptionAr', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Icon (lucide-react name)</label>
                    <div className="flex gap-2 flex-wrap mb-2">
                      {ICONS.map((icon) => (
                        <button key={icon} type="button"
                          onClick={() => update(service.id, 'icon', icon)}
                          className={`px-2 py-1 rounded text-xs font-mono border transition-colors ${
                            service.icon === icon ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200 text-slate-600 hover:border-slate-400'
                          }`}>
                          {icon}
                        </button>
                      ))}
                    </div>
                    <input className={inputCls} value={service.icon}
                      onChange={(e) => update(service.id, 'icon', e.target.value)}
                      placeholder="e.g. Search" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Status</label>
                    <select className={inputCls} value={service.status ?? 'published'}
                      onChange={(e) => update(service.id, 'status', e.target.value)}>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  <div className="flex justify-end">
                    <button onClick={() => saveService(service.id)}
                      disabled={saving === service.id}
                      className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-700 transition-colors">
                      {saving === service.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {toastMsg && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white text-sm px-4 py-2.5 rounded-lg shadow-lg">
          ✓ {toastMsg}
        </div>
      )}
    </div>
  )
}
