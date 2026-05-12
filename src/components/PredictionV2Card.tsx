import { useState } from "react";
import type { PredictionV2 } from "../types";

interface PredictionV2CardProps {
  prediction: PredictionV2;
}

const riskLevelConfig = {
  LOW: {
    bg: "bg-primary-container/10",
    border: "border-primary-container/30",
    label: "text-primary-container",
    icon: "shield_check",
  },
  MEDIUM: {
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    label: "text-yellow-400",
    icon: "warning",
  },
  HIGH: {
    bg: "bg-error/10",
    border: "border-error/30",
    label: "text-error",
    icon: "error",
  },
};

const PredictionV2Card = ({ prediction }: PredictionV2CardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const riskConfig = riskLevelConfig[prediction.riskLevel];
  const confidenceColor =
    prediction.finalConfidence >= 80
      ? "text-primary-container"
      : prediction.finalConfidence >= 60
        ? "text-yellow-400"
        : "text-error";

  return (
    <div
      className={`glass-card rounded-xl overflow-hidden ${riskConfig.border}`}
    >
      {/* Header */}
      <div className="px-sm py-xs border-b border-white/5 flex justify-between items-center bg-white/5">
        <div className="flex items-center gap-xs">
          <span
            className={`font-label-mono text-[10px] uppercase tracking-widest ${riskConfig.label}`}
          >
            {prediction.league}
          </span>
        </div>
        <div className="flex items-center gap-xs">
          <span
            className={`font-label-mono text-[10px] px-xs py-0.5 rounded-full font-bold ${riskConfig.bg} ${riskConfig.label}`}
          >
            {prediction.riskLevel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-sm space-y-md">
        {/* Teams and Market */}
        <div className="flex justify-between items-start gap-md">
          <div className="flex-1 text-left space-y-xs">
            <div className="font-headline-md-mobile text-headline-md-mobile text-on-surface">
              {prediction.homeTeam}
            </div>
            <div className="font-headline-md-mobile text-headline-md-mobile text-on-surface">
              {prediction.awayTeam}
            </div>
            <div className="flex items-center gap-xs mt-xs">
              <span className="material-symbols-outlined text-[12px] text-on-surface-variant">
                schedule
              </span>
              <span className="font-label-mono text-[10px] text-on-surface-variant">
                {prediction.matchDate} • {prediction.matchTime}
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="font-label-mono text-label-mono text-on-surface-variant block mb-1">
              MARKET
            </span>
            <span className="font-stat-lg text-[20px] text-primary-container">
              {prediction.bestMarket}
            </span>
          </div>
        </div>

        {/* Confidence Bar */}
        <div className="space-y-xs">
          <div className="flex justify-between items-end">
            <span className="font-label-mono text-label-mono text-on-surface-variant">
              CONFIANÇA
            </span>
            <span
              className={`font-label-mono text-label-mono font-bold ${confidenceColor}`}
            >
              {prediction.finalConfidence}%
            </span>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                prediction.finalConfidence >= 80
                  ? "bg-primary-container confidence-glow"
                  : prediction.finalConfidence >= 60
                    ? "bg-yellow-400"
                    : "bg-error"
              }`}
              style={{ width: `${prediction.finalConfidence}%` }}
            />
          </div>
        </div>

        {/* Suggestion */}
        <div className="bg-white/5 rounded-lg p-xs">
          <p className="font-body-base text-sm text-on-surface-variant leading-tight">
            {prediction.suggestion}
          </p>
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full border border-white/20 text-on-surface font-label-mono text-label-mono px-md py-xs rounded-lg active:scale-95 transition-all flex items-center justify-center gap-xs hover:bg-white/5"
        >
          <span className="material-symbols-outlined text-[16px]">
            {isExpanded ? "expand_less" : "expand_more"}
          </span>
          {isExpanded ? "Ver menos" : "Ver detalhes"}
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="border-t border-white/5 pt-md space-y-md">
            <div>
              <h4 className="font-label-mono text-label-mono text-on-surface-variant uppercase mb-xs">
                Análise
              </h4>
              <p className="font-body-base text-sm text-on-surface leading-relaxed">
                {prediction.reasoning}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-sm">
              <div className="bg-surface-container rounded-lg p-xs">
                <span className="font-label-mono text-[10px] text-on-surface-variant uppercase block mb-xs">
                  Nível de Risco
                </span>
                <span
                  className={`font-headline-md-mobile text-[18px] ${riskConfig.label}`}
                >
                  {prediction.riskLevel}
                </span>
              </div>

              <div className="bg-surface-container rounded-lg p-xs">
                <span className="font-label-mono text-[10px] text-on-surface-variant uppercase block mb-xs">
                  Confiança Final
                </span>
                <span
                  className={`font-headline-md-mobile text-[18px] ${confidenceColor}`}
                >
                  {prediction.finalConfidence}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionV2Card;
