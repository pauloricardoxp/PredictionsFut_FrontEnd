import type { Game } from '../types'

type GameStatus = Game['status']

export const formatStatus = (status: GameStatus): string => {
  const map: Record<GameStatus, string> = {
    TIMED: 'Agendado',
    SCHEDULED: 'Agendado',
    IN_PLAY: 'Ao Vivo',
    PAUSED: 'Intervalo',
    FINISHED: 'Encerrado',
  }
  return map[status] ?? status
}

export const isLive = (status: GameStatus): boolean =>
  status === 'IN_PLAY' || status === 'PAUSED'

export const isFinished = (status: GameStatus): boolean =>
  status === 'FINISHED'

export const isScheduled = (status: GameStatus): boolean =>
  status === 'TIMED' || status === 'SCHEDULED'