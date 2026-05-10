import { useState, useEffect, useCallback } from 'react'
import type { Prediction } from '../types'
import { getPredictions } from '../service/predictionService'


interface UsePredictionsReturn {
  predictions: Prediction[]
  loading: boolean
  error: string | null
  reload: () => Promise<void>
}

export const usePredictions = (): UsePredictionsReturn => {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      setError(null)
      const data = await getPredictions()
      setPredictions(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar predições')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return { predictions, loading, error, reload: load }
}