import { useState, useMemo } from "react";
import { usePredictions } from "../hooks/usePredictions";
import PredictionCard from "../components/PredictionCard";

const PredictionsPage = () => {
  const { predictions, loading, error, reload } = usePredictions();
  const [filter, setFilter] = useState<"ALL" | "GREEN" | "RED">("ALL");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const green = predictions.filter((p) => p.result === "GREEN").length;
  const red = predictions.filter((p) => p.result === "RED").length;
  const total = green + red;
  const successRate = total > 0 ? Math.round((green / total) * 100) : 0;

  const uniqueDates = useMemo(() => {
    const dates = predictions
      .map((p) => {
        const dateStr = p.createdAt.split("T")[0];
        return dateStr;
      })
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort()
      .reverse();
    return dates;
  }, [predictions]);

  
  const formatDate = (dateStr: string): string => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    const isYesterday =
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear();

    if (isToday) return "Hoje";
    if (isYesterday) return "Ontem";

    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
  };

  const filteredByResult = predictions.filter((p) =>
    filter === "ALL" ? true : p.result === filter,
  );

  const filteredByDate = selectedDate
    ? filteredByResult.filter((p) => p.createdAt.split("T")[0] === selectedDate)
    : filteredByResult;

  return (
    <main className="px-margin pt-md pb-32 space-y-md max-w-2xl mx-auto">
      <section className="grid grid-cols-2 gap-sm">
        <div className="glass-card p-sm rounded-lg flex flex-col justify-between h-28 border-primary-container/20">
          <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">
            Taxa de Acerto
          </span>
          <div className="flex items-end gap-xs">
            <span className="font-stat-lg text-stat-lg text-primary-container">
              {successRate}%
            </span>
            <span className="material-symbols-outlined text-primary-container pb-base">
              trending_up
            </span>
          </div>
        </div>

        <div className="glass-card p-sm rounded-lg flex flex-col justify-between h-28">
          <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">
            Total
          </span>
          <div className="flex items-center gap-xs">
            <span className="font-stat-lg text-stat-lg">
              {predictions.length}
            </span>
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse mb-1" />
          </div>
        </div>
      </section>

      <h2 className="font-headline-md-mobile text-headline-md-mobile flex items-center gap-xs">
        Todas as Predições
        <span
          className="material-symbols-outlined text-primary-container"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          analytics
        </span>
      </h2>

      
      <div className="flex gap-sm justify-start overflow-x-auto pb-xs">
        <button
          onClick={() => setFilter("ALL")}
          className={`font-label-mono text-label-mono px-md py-xs rounded-full font-bold transition-all whitespace-nowrap ${
            filter === "ALL"
              ? "bg-on-surface-variant text-background"
              : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter("GREEN")}
          className={`font-label-mono text-label-mono px-md py-xs rounded-full font-bold transition-all flex items-center gap-xs whitespace-nowrap ${
            filter === "GREEN"
              ? "bg-primary-container text-on-primary-container"
              : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-current" />
          Green ({predictions.filter((p) => p.result === "GREEN").length})
        </button>
        <button
          onClick={() => setFilter("RED")}
          className={`font-label-mono text-label-mono px-md py-xs rounded-full font-bold transition-all flex items-center gap-xs whitespace-nowrap ${
            filter === "RED"
              ? "bg-error text-on-error-container"
              : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-current" />
          Red ({predictions.filter((p) => p.result === "RED").length})
        </button>
      </div>

      
      {uniqueDates.length > 0 && (
        <div>
          <span className="font-label-mono text-label-mono text-on-surface-variant uppercase mb-xs block text-[10px]">
            Por Data
          </span>
          <div className="flex gap-sm justify-start overflow-x-auto pb-xs">
            <button
              onClick={() => setSelectedDate(null)}
              className={`font-label-mono text-label-mono px-md py-xs rounded-full font-bold transition-all whitespace-nowrap ${
                selectedDate === null
                  ? "bg-on-surface-variant text-background"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              Todas
            </button>
            {uniqueDates.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`font-label-mono text-label-mono px-md py-xs rounded-full font-bold transition-all whitespace-nowrap ${
                  selectedDate === date
                    ? "bg-primary-container text-on-primary-container"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                {formatDate(date)}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-xl gap-md">
          <span className="material-symbols-outlined text-primary-container animate-spin text-4xl">
            refresh
          </span>
          <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">
            Carregando predições...
          </span>
        </div>
      )}

      {error && !loading && (
        <div className="glass-card rounded-xl p-md text-center space-y-sm">
          <span className="material-symbols-outlined text-error text-4xl">
            error_outline
          </span>
          <p className="font-body-base text-error">{error}</p>
          <button
            onClick={reload}
            className="bg-primary-container text-on-primary-container font-label-mono text-label-mono px-md py-xs rounded-lg font-bold active:scale-95 transition-all"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {!loading && !error && predictions.length === 0 && (
        <div className="glass-card rounded-xl p-xl text-center space-y-sm">
          <span className="material-symbols-outlined text-on-surface-variant text-5xl">
            query_stats
          </span>
          <p className="font-body-base text-on-surface-variant">
            Nenhuma predição ainda. Gere uma na aba Matches!
          </p>
        </div>
      )}

      {!loading && !error && (
        <section className="space-y-sm">
          {filteredByDate.map((p) => (
            <PredictionCard key={p.id} prediction={p} />
          ))}
        </section>
      )}
    </main>
  );
};

export default PredictionsPage;
