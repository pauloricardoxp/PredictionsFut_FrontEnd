export interface Game {
  id: number
  homeTeamName: string
  homeTeamCrest: string | null
  awayTeamName: string
  awayTeamCrest: string | null
  competitionName: string
  country: string
  matchDate: string
  status: 'TIMED' | 'SCHEDULED' | 'IN_PLAY' | 'PAUSED' | 'FINISHED'
  homeGoals: number | null
  awayGoals: number | null
  winner: string | null
}

export interface Prediction {
  id: number
  homeTeamName: string
  awayTeamName: string
  market: string
  score: number
  recommendation: boolean
  result: 'PENDING' | 'GREEN' | 'RED'
  createdAt: string
}