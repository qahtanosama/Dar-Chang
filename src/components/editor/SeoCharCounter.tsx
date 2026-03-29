'use client'

import { CheckCircle2, AlertTriangle } from 'lucide-react'

interface SeoCharCounterProps {
  value: string
  max: number
  label?: string
}

/**
 * SeoCharCounter — shows live character count with SEO health indicator.
 * Green checkmark = within limit. Orange alert = over limit.
 */
export function SeoCharCounter({ value, max, label }: SeoCharCounterProps) {
  const count = value.length
  const isOver = count > max
  const isEmpty = count === 0

  return (
    <div className="flex items-center justify-between mt-1">
      {label && (
        <span className="text-xs text-slate-400">{label}</span>
      )}
      <div className={`flex items-center gap-1 ml-auto text-xs font-medium tabular-nums ${
        isOver ? 'text-orange-500' : isEmpty ? 'text-slate-400' : 'text-emerald-600'
      }`}>
        {!isEmpty && (
          isOver
            ? <AlertTriangle className="w-3 h-3 shrink-0" />
            : <CheckCircle2 className="w-3 h-3 shrink-0" />
        )}
        <span>{count}<span className="text-slate-300 font-normal">/{max}</span></span>
      </div>
    </div>
  )
}
