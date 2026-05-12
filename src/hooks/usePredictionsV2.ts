import { useState, useEffect, useCallback } from "react";
import type { PredictionV2 } from "../types";
import { getPredictionsV2Today } from "../service/predictionV2Service";

interface UsePredictionsV2Return {
  predictions: PredictionV2[];
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

export const usePredictionsV2 = (): UsePredictionsV2Return => {
  const [predictions, setPredictions] = useState<PredictionV2[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPredictionsV2Today();
      setPredictions(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar predições IA",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { predictions, loading, error, reload: load };
};
