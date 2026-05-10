import type { Prediction } from '../types'
import api from './api'


export const getPredictions = (): Promise<Prediction[]> =>
  api.get<Prediction[]>('/api/prediction').then((r) => r.data)

export const generatePrediction = (gameId: number): Promise<Prediction> =>
  api.post<Prediction>(`/api/prediction/generate/${gameId}`).then((r) => r.data)