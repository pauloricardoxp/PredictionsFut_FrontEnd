import { useState, useEffect } from "react";
import type { AIAnalysis } from "../types";
import { getAIAnalysis } from "../service/predictionV2Service";

interface AIAnalysisModalProps {
  predictionId: number;
  onClose: () => void;
}

const AIAnalysisModal = ({ predictionId, onClose }: AIAnalysisModalProps) => {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAIAnalysis(predictionId);
        setAnalysis(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar análise",
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [predictionId]);

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "HIGH":
        return "text-primary-container";
      case "MEDIUM":
        return "text-yellow-400";
      case "LOW":
        return "text-error";
      default:
        return "text-on-surface";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-gutter">
      <div className="glass-card rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-surface-container border-b border-white/5 p-md flex justify-between items-center">
          <h3 className="font-headline-md text-headline-md">Análise IA</h3>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-md space-y-md">
          {loading && (
            <div className="flex flex-col items-center justify-center py-xl gap-md">
              <span className="material-symbols-outlined text-primary-container animate-spin text-4xl">
                refresh
              </span>
              <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">
                Analisando...
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

          {analysis && !loading && (
            <div className="space-y-md">
              {/* Prediction */}
              <div>
                <span className="font-label-mono text-label-mono text-on-surface-variant uppercase block mb-xs">
                  Predição
                </span>
                <div className="bg-surface-container rounded-lg p-sm">
                  <p className="font-headline-md-mobile text-headline-md-mobile text-primary-container">
                    {analysis.prediction}
                  </p>
                </div>
              </div>

              {/* Confidence */}
              <div>
                <span className="font-label-mono text-label-mono text-on-surface-variant uppercase block mb-xs">
                  Confiança
                </span>
                <span
                  className={`font-headline-md-mobile text-headline-md-mobile ${getConfidenceColor(
                    analysis.confidence,
                  )}`}
                >
                  {analysis.confidence}
                </span>
              </div>

              {/* Analysis */}
              <div>
                <span className="font-label-mono text-label-mono text-on-surface-variant uppercase block mb-xs">
                  Análise
                </span>
                <p className="font-body-base text-sm text-on-surface leading-relaxed">
                  {analysis.analysis}
                </p>
              </div>

              {/* Reasoning */}
              <div>
                <span className="font-label-mono text-label-mono text-on-surface-variant uppercase block mb-xs">
                  Raciocínio
                </span>
                <p className="font-body-base text-sm text-on-surface leading-relaxed">
                  {analysis.reasoning}
                </p>
              </div>
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

export default AIAnalysisModal;
