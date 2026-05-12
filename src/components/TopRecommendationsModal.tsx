import { useState, useEffect } from "react";
import type { TopRecommendationsResponse } from "../types";
import { getTopRecommendations } from "../service/predictionV2Service";

interface TopRecommendationsModalProps {
  gameId: number;
  onClose: () => void;
}

const TopRecommendationsModal = ({
  gameId,
  onClose,
}: TopRecommendationsModalProps) => {
  const [data, setData] = useState<TopRecommendationsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getTopRecommendations(gameId);
        setData(response);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar recomendações",
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [gameId]);

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "HIGH":
        return "bg-primary-container/20 text-primary-container";
      case "MEDIUM":
        return "bg-yellow-500/20 text-yellow-400";
      case "LOW":
        return "bg-error/20 text-error";
      default:
        return "bg-white/10 text-on-surface";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-gutter">
      <div className="glass-card rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-surface-container border-b border-white/5 p-md">
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-primary transition-colors float-right"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <h3 className="font-headline-md text-headline-md mb-xs">
            Top 3 Recomendações
          </h3>
          {data && (
            <p className="font-body-base text-sm text-on-surface-variant">
              {data.homeTeam} vs {data.awayTeam}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="p-md space-y-md">
          {loading && (
            <div className="flex flex-col items-center justify-center py-xl gap-md">
              <span className="material-symbols-outlined text-primary-container animate-spin text-4xl">
                refresh
              </span>
              <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">
                Gerando Top 3...
              </span>
            </div>
          )}

          {error && !loading && (
            <div className="text-center space-y-sm">
              <span className="material-symbols-outlined text-error text-4xl">
                error_outline
              </span>
              <p className="font-body-base text-error">{error}</p>
            </div>
          )}

          {data && !loading && (
            <div className="space-y-sm">
              {data.topRecommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className={`border rounded-lg p-sm space-y-xs ${
                    rec.confidence === "HIGH"
                      ? "border-primary-container/30 bg-primary-container/5"
                      : rec.confidence === "MEDIUM"
                        ? "border-yellow-500/30 bg-yellow-500/5"
                        : "border-error/30 bg-error/5"
                  }`}
                >
                  {/* Rank and Market */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-xs">
                      <span className="font-headline-md-mobile text-headline-md-mobile text-primary-container">
                        #{idx + 1}
                      </span>
                      <span className="font-headline-md-mobile text-headline-md-mobile text-on-surface">
                        {rec.market}
                      </span>
                    </div>
                    <span
                      className={`font-label-mono text-[10px] px-xs py-0.5 rounded-full font-bold ${getConfidenceColor(
                        rec.confidence,
                      )}`}
                    >
                      {rec.confidence}
                    </span>
                  </div>

                  {/* Score */}
                  <div className="flex items-center gap-xs">
                    <span className="font-label-mono text-label-mono text-on-surface-variant">
                      Score
                    </span>
                    <span className="font-stat-lg text-[24px] text-primary-container">
                      {rec.score}
                    </span>
                  </div>

                  {/* Analysis */}
                  <p className="font-body-base text-sm text-on-surface-variant leading-tight">
                    {rec.analysis}
                  </p>

                  {/* Key Indicator */}
                  <div className="bg-surface-container rounded px-xs py-xs">
                    <p className="font-label-mono text-[10px] text-on-surface-variant">
                      {rec.keyIndicator}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/5 p-md">
          <button
            onClick={onClose}
            className="w-full bg-primary-container text-on-primary-container font-label-mono text-label-mono px-md py-xs rounded-lg font-bold active:scale-95 transition-all"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopRecommendationsModal;
