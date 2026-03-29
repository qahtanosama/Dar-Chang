'use client'

import { useState, useEffect, useCallback } from 'react'
import { Loader2, Plus, Trash2, Save } from 'lucide-react'

type ImpactStat = {
  id?: string
  labelEn: string
  labelAr: string
  value: string
  suffix: string
  order: number
}

const EMPTY_STAT: ImpactStat = { labelEn: '', labelAr: '', value: '', suffix: '', order: 0 }

export default function StatsAdminPage() {
  const [stats, setStats] = useState<ImpactStat[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 3000)
  }

  const fetchStats = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/stats')
    const data = await res.json()
    setStats(data)
    setLoading(false)
  }, [])

  useEffect(() => { fetchStats() }, [fetchStats])

  const updateStat = (idx: number, key: keyof ImpactStat, value: string | number) => {
    setStats((prev) => prev.map((s, i) => i === idx ? { ...s, [key]: value } : s))
  }

  const addRow = () => {
    setStats((prev) => [...prev, { ...EMPTY_STAT, order: prev.length }])
  }

  const removeRow = (idx: number) => {
    setStats((prev) => prev.filter((_, i) => i !== idx).map((s, i) => ({ ...s, order: i })))
  }

  const saveAll = async () => {
    setSaving(true)
    const data = stats.map((s, i) => ({ ...s, order: i }))
    const res = await fetch('/api/admin/stats', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setSaving(false)
    if (res.ok) {
      showToast('Stats saved! Homepage will update on next visit.')
      fetchStats()
    }
  }

  const inputCls = 'w-full px-2.5 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900'

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Impact Stats</h2>
          <p className="text-sm text-slate-500">These numbers appear in the homepage stats section.</p>
        </div>
        <button onClick={saveAll} disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save All
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-12 text-xs font-medium text-slate-500 px-4 py-2.5 bg-slate-50 border-b border-slate-100">
            <div className="col-span-2">Value</div>
            <div className="col-span-1">Suffix</div>
            <div className="col-span-4">Label (EN)</div>
            <div className="col-span-4">Label (AR)</div>
            <div className="col-span-1"></div>
          </div>

          <div className="divide-y divide-slate-100">
            {stats.map((stat, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-2 px-4 py-3 items-center hover:bg-slate-50 transition-colors">
                <div className="col-span-2">
                  <input
                    className={inputCls + ' text-center font-bold text-slate-800'}
                    value={stat.value}
                    onChange={(e) => updateStat(idx, 'value', e.target.value)}
                    placeholder="450"
                  />
                </div>
                <div className="col-span-1">
                  <input
                    className={inputCls + ' text-center'}
                    value={stat.suffix}
                    onChange={(e) => updateStat(idx, 'suffix', e.target.value)}
                    placeholder="+"
                    maxLength={3}
                  />
                </div>
                <div className="col-span-4">
                  <input
                    className={inputCls}
                    value={stat.labelEn}
                    onChange={(e) => updateStat(idx, 'labelEn', e.target.value)}
                    placeholder="Containers Processed"
                  />
                </div>
                <div className="col-span-4">
                  <input
                    className={inputCls}
                    value={stat.labelAr}
                    onChange={(e) => updateStat(idx, 'labelAr', e.target.value)}
                    placeholder="حاوية تم شحنها"
                    dir="rtl"
                  />
                </div>
                <div className="col-span-1 flex justify-center">
                  <button onClick={() => removeRow(idx)}
                    className="p-1.5 rounded hover:bg-red-50 text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 py-3 border-t border-slate-100">
            <button onClick={addRow}
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors">
              <Plus className="w-4 h-4" />
              Add Row
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button onClick={saveAll} disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save All Stats
        </button>
      </div>

      {toastMsg && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white text-sm px-4 py-2.5 rounded-lg shadow-lg">
          ✓ {toastMsg}
        </div>
      )}
    </div>
  )
}
