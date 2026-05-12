import type { AIAnalysis, TopRecommendationsResponse } from "../types";
import api from "./api";

export const getAIAnalysis = (predictionId: number): Promise<AIAnalysis> => {
  return api
    .get<AIAnalysis>(`/api/prediction/${predictionId}/ai-analysis-cached`)
    .then((r) => r.data)
    .catch(() =>
      api
        .get<AIAnalysis>(`/api/prediction/${predictionId}/ai-analysis`)
        .then((r) => r.data),
    );
};

export const getTopRecommendations = (
  gameId: number,
): Promise<TopRecommendationsResponse> => {
  return api
    .get<TopRecommendationsResponse>(
      `/api/prediction/game/${gameId}/top-recommendations-cached`,
    )
    .then((r) => r.data)
    .catch(() =>
      api
        .get<TopRecommendationsResponse>(
          `/api/prediction/game/${gameId}/top-recommendations`,
        )
        .then((r) => r.data),
    );
};

export const evaluatePredictions = (): Promise<string> =>
  api.post<string>("/api/prediction/evaluate").then((r) => r.data);
