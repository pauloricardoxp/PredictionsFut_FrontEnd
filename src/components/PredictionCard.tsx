import ScoreBar from './ScoreBar'
import { formatDateTime } from '../utils/formatDate'
import type { Prediction } from '../types'

interface PredictionCardProps {
  prediction: Prediction
}

interface ResultConfig {
  dot: string
  label: string
  icon: string | null
  text: string
  cardBorder: string
}

const resultConfig: Record<Prediction['result'], ResultConfig> = {
  GREEN: {
    dot: 'bg-primary-container',
    label: 'text-primary-container',
    icon: 'check_circle',
    text: 'GREEN',
    cardBorder: 'border-primary-container/30',
  },
  RED: {
    dot: 'bg-error',
    label: 'text-error',
    icon: 'cancel',
    text: 'RED',
    cardBorder: 'border-error/20',
  },
  PENDING: {
    dot: 'bg-white/40',
    label: 'text-on-surface-variant',
    icon: null,
    text: 'PENDING',
    cardBorder: '',
  },
}

const PredictionCard = ({ prediction }: PredictionCardProps) => {
  const cfg = resultConfig[prediction.result] ?? resultConfig.PENDING
  const isRed = prediction.result === 'RED'

  return (
    <div
      className={`glass-card rounded-xl overflow-hidden ${cfg.cardBorder} ${
        isRed ? 'opacity-80 grayscale-[0.4]' : ''
      }`}
    >
      <div className="px-sm py-xs border-b border-white/5 flex justify-between items-center bg-white/5">
        <span className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
          Predição #{prediction.id}
        </span>

        {prediction.recommendation && prediction.result === 'PENDING' && (
          <span className="bg-primary-container text-on-primary-container font-label-mono text-[10px] px-xs py-0.5 rounded-full font-bold">
            RECOMENDADO
          </span>
        )}

        {prediction.result !== 'PENDING' && (
          <span className={`font-label-mono text-[10px] flex items-center gap-1 font-bold ${cfg.label}`}>
            {cfg.icon && (
              <span
                className="material-symbols-outlined text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {cfg.icon}
              </span>
            )}
            {cfg.text}
          </span>
        )}
      </div>

      <div className="p-sm space-y-md">
        <div className="flex justify-between items-center gap-md">
          <div className="flex-1 space-y-xs">
            <span className="font-headline-md-mobile text-headline-md-mobile block">
              {prediction.homeTeamName}
            </span>
            <span className="font-headline-md-mobile text-headline-md-mobile block">
              {prediction.awayTeamName}
            </span>
          </div>
          <div className="text-right">
            <span className="font-label-mono text-label-mono text-on-surface-variant block mb-1">
              MERCADO
            </span>
            <span className="font-stat-lg text-[20px] text-primary-container">
              {prediction.market}
            </span>
          </div>
        </div>

        <ScoreBar score={prediction.score} />

        <div className="flex items-center justify-between pt-base">
          <div className="flex items-center gap-xs">
            <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
            <span className={`font-label-mono text-label-mono ${cfg.label}`}>
              {cfg.text}
            </span>
          </div>
          <span className="font-label-mono text-[10px] text-on-surface-variant">
            {formatDateTime(prediction.createdAt)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default PredictionCard