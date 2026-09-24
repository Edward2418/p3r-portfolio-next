import type { CSSProperties } from 'react'

interface ProgressBarProps {
  label: string
  value: number
  max?: number
  trackClassName: string
  fillClassName: string
  valueText?: string
  role?: 'progressbar' | 'meter'
  delay?: number
}

export default function ProgressBar({
  label, value, max = 100, trackClassName, fillClassName,
  valueText, role = 'progressbar', delay = 0,
}: ProgressBarProps) {
  const upperBound = Number.isFinite(max) && max > 0 ? max : 100
  const boundedValue = Number.isFinite(value) ? Math.min(upperBound, Math.max(0, value)) : 0

  return (
    <div
      className={trackClassName}
      role={role}
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={upperBound}
      aria-valuenow={boundedValue}
      aria-valuetext={valueText}
    >
      <div
        className={`${fillClassName} animated-bar-fill`}
        style={{
          width: `${boundedValue / upperBound * 100}%`,
          '--bar-delay': `${delay}ms`,
        } as CSSProperties}
      />
    </div>
  )
}
