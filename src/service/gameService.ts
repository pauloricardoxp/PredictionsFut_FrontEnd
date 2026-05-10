import api from './api'
import type { Game } from '../types'

export const getGames = (): Promise<Game[]> =>
  api.get<Game[]>('/api/games').then((r) => r.data)

export const fetchGames = (): Promise<Game[]> =>
  api.get<Game[]>('/api/games/fetch').then((r) => r.data)