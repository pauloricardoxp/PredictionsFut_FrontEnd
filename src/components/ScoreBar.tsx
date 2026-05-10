interface ScoreBarProps {
  score: number
}

const ScoreBar = ({ score }: ScoreBarProps) => {
  const pct = Math.min(100, Math.max(0, score ?? 0))

  return (
    <div className="space-y-xs">
      <div className="flex justify-between items-end">
        <span className="font-label-mono text-label-mono text-on-surface-variant">
          CONFIANÇA
        </span>
        <span className="font-label-mono text-label-mono text-primary-container">
          {pct}%
        </span>
      </div>
      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-primary-container h-full rounded-full confidence-glow transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default ScoreBar