import { useState } from 'react'
import LiveBadge from './LiveBadge'
import { formatTime } from '../utils/formatDate'
import { formatStatus, isLive, isFinished } from '../utils/formatStatus'
import type { Game } from '../types'
import { generatePrediction } from '../service/predictionService'

interface MatchCardProps {
  game: Game
}

const MatchCard = ({ game }: MatchCardProps) => {
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [genError, setGenError] = useState<string | null>(null)

  const live = isLive(game.status)
  const finished = isFinished(game.status)

  const handleGenerate = async () => {
    try {
      setGenerating(true)
      setGenError(null)
      await generatePrediction(game.id)
      setGenerated(true)
    } catch {
      setGenError('Erro ao gerar predição')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div
      className={`glass-card rounded-xl p-md overflow-hidden relative transition-opacity duration-300 ${
        finished ? 'opacity-60' : 'opacity-100'
      }`}
    >
      {live && (
        <div className="absolute top-0 right-0 p-xs">
          <LiveBadge />
        </div>
      )}

      <div className="mb-sm">
        <p className="font-label-mono text-label-mono text-on-surface-variant flex items-center gap-xs">
          <span className="material-symbols-outlined text-[14px]">public</span>
          {game.competitionName?.toUpperCase()} • {game.country?.toUpperCase()}
        </p>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-md">
        {/* Home */}
        <div className="flex flex-col items-center text-center gap-xs">
          <div className="w-14 h-14 flex items-center justify-center">
            {game.homeTeamCrest ? (
              <img src={game.homeTeamCrest} alt={game.homeTeamName} className="w-10 h-10 object-contain" />
            ) : (
              <span className="material-symbols-outlined text-on-surface-variant text-4xl">shield</span>
            )}
          </div>
          <span className="font-headline-md-mobile text-headline-md-mobile text-center leading-tight">
            {game.homeTeamName}
          </span>
        </div>

        {/* Score or Time */}
        <div className="flex flex-col items-center gap-xs">
          {finished || live ? (
            <>
              <div className="flex items-center gap-sm">
                <span className={`font-stat-lg text-stat-lg ${live ? 'text-primary-container' : 'text-on-surface'}`}>
                  {game.homeGoals ?? '–'}
                </span>
                <span className="font-stat-lg text-stat-lg text-on-surface-variant opacity-30">:</span>
                <span className="font-stat-lg text-stat-lg text-on-surface">
                  {game.awayGoals ?? '–'}
                </span>
              </div>
              {finished && (
                <span className="font-label-mono text-[10px] text-on-surface-variant uppercase border border-white/10 px-xs rounded">
                  Encerrado
                </span>
              )}
            </>
          ) : (
            <>
              <span className="font-headline-md text-headline-md text-on-surface-variant">
                {formatTime(game.matchDate)}
              </span>
              <span className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
                {formatStatus(game.status)}
              </span>
            </>
          )}
        </div>

        {/* Away */}
        <div className="flex flex-col items-center text-center gap-xs">
          <div className="w-14 h-14 flex items-center justify-center">
            {game.awayTeamCrest ? (
              <img src={game.awayTeamCrest} alt={game.awayTeamName} className="w-10 h-10 object-contain" />
            ) : (
              <span className="material-symbols-outlined text-on-surface-variant text-4xl">shield</span>
            )}
          </div>
          <span className="font-headline-md-mobile text-headline-md-mobile text-center leading-tight">
            {game.awayTeamName}
          </span>
        </div>
      </div>

      {!finished && (
        <div className="mt-md pt-sm border-t border-white/5 flex justify-end items-center gap-sm">
          {genError && (
            <span className="font-label-mono text-[10px] text-error mr-auto">{genError}</span>
          )}
          {generated ? (
            <span className="font-label-mono text-label-mono text-primary-container flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
              Predição gerada!
            </span>
          ) : (
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="bg-primary-container text-on-primary-container font-label-mono text-label-mono px-md py-xs rounded-lg font-bold active:scale-95 transition-all shadow-[0_4px_12px_rgba(57,255,20,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generating ? 'Gerando...' : 'Gerar Predição'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default MatchCard