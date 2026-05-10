import { useState, useEffect, useCallback } from 'react'
import { getGames, fetchGames } from '../service/gameService'
import type { Game } from '../types'


const FIVE_MINUTES = 5 * 60 * 1000

interface UseGamesReturn {
  games: Game[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
}

export const useGames = (): UseGamesReturn => {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      setError(null)
      const data = await getGames()
      setGames(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar jogos')
    } finally {
      setLoading(false)
    }
  }, [])

  const refresh = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      await fetchGames()
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar jogos')
      setLoading(false)
    }
  }, [load])

  useEffect(() => {
    load()
    const interval = setInterval(load, FIVE_MINUTES)
    return () => clearInterval(interval)
  }, [load])

  return { games, loading, error, refresh }
}