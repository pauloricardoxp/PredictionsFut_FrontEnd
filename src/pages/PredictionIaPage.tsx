import { useState } from "react";
import { useGames } from "../hooks/useGames";
import { formatDate } from "../utils/formatDate";
import AIAnalysisModal from "../components/AIAnalysisModal";
import TopRecommendationsModal from "../components/TopRecommendationsModal";


const PredictionIaPage = () => {
  const { games, loading, error, refresh } = useGames();
  const today = formatDate(new Date().toISOString());
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [modalType, setModalType] = useState<
    "analysis" | "recommendations" | null
  >(null);

  return (
    <main className="pb-32 pt-gutter px-gutter max-w-2xl mx-auto space-y-md">
      <div className="flex justify-between items-end">
        <div>
          <p className="font-label-mono text-label-mono text-primary-container uppercase tracking-widest">
            AI Predictions
          </p>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Análise de Jogos
          </h2>
        </div>
        <span className="font-label-mono text-label-mono text-on-surface-variant bg-surface-container-high px-xs py-base rounded-lg border border-white/5">
          {today}
        </span>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-xl gap-md">
          <span className="material-symbols-outlined text-primary-container animate-spin text-4xl">
            refresh
          </span>
          <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">
            Carregando jogos...
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
            onClick={refresh}
            className="bg-primary-container text-on-primary-container font-label-mono text-label-mono px-md py-xs rounded-lg font-bold active:scale-95 transition-all"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {!loading && !error && games.length === 0 && (
        <div className="glass-card rounded-xl p-xl text-center space-y-sm">
          <span className="material-symbols-outlined text-on-surface-variant text-5xl">
            sports_soccer
          </span>
          <p className="font-body-base text-on-surface-variant">
            Nenhum jogo hoje.
          </p>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-sm">
          {games.map((game) => (
            <div
              key={game.id}
              className="glass-card rounded-xl p-md overflow-hidden relative"
            >
              <div className="mb-sm">
                <p className="font-label-mono text-label-mono text-on-surface-variant flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[14px]">
                    public
                  </span>
                  {game.competitionName?.toUpperCase()} •{" "}
                  {game.country?.toUpperCase()}
                </p>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-md mb-md">
                {/* Home */}
                <div className="flex flex-col items-center text-center gap-xs">
                  <div className="w-14 h-14 flex items-center justify-center">
                    {game.homeTeamCrest ? (
                      <img
                        src={game.homeTeamCrest}
                        alt={game.homeTeamName}
                        className="w-10 h-10 object-contain"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-on-surface-variant text-4xl">
                        shield
                      </span>
                    )}
                  </div>
                  <span className="font-headline-md-mobile text-headline-md-mobile text-center leading-tight">
                    {game.homeTeamName}
                  </span>
                </div>

                {/* Time */}
                <div className="flex flex-col items-center gap-xs">
                  <span className="font-headline-md text-headline-md text-on-surface-variant">
                    {game.matchDate.split("T")[1]?.slice(0, 5) || "TBD"}
                  </span>
                </div>

                {/* Away */}
                <div className="flex flex-col items-center text-center gap-xs">
                  <div className="w-14 h-14 flex items-center justify-center">
                    {game.awayTeamCrest ? (
                      <img
                        src={game.awayTeamCrest}
                        alt={game.awayTeamName}
                        className="w-10 h-10 object-contain"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-on-surface-variant text-4xl">
                        shield
                      </span>
                    )}
                  </div>
                  <span className="font-headline-md-mobile text-headline-md-mobile text-center leading-tight">
                    {game.awayTeamName}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-sm border-t border-white/5 flex gap-sm justify-between">
                <button
                  onClick={() => {
                    setSelectedGame(game.id);
                    setModalType("analysis");
                  }}
                  className="flex-1 bg-primary-container/20 text-primary-container font-label-mono text-label-mono px-md py-xs rounded-lg font-bold active:scale-95 transition-all flex items-center justify-center gap-xs hover:bg-primary-container/30"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    auto_awesome
                  </span>
                  Análise IA
                </button>
                <button
                  onClick={() => {
                    setSelectedGame(game.id);
                    setModalType("recommendations");
                  }}
                  className="flex-1 bg-primary-container text-on-primary-container font-label-mono text-label-mono px-md py-xs rounded-lg font-bold active:scale-95 transition-all flex items-center justify-center gap-xs shadow-[0_4px_12px_rgba(57,255,20,0.3)]"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    star
                  </span>
                  Top 3
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {selectedGame && modalType === "analysis" && (
        <AIAnalysisModal
          predictionId={selectedGame}
          onClose={() => {
            setSelectedGame(null);
            setModalType(null);
          }}
        />
      )}

      {selectedGame && modalType === "recommendations" && (
        <TopRecommendationsModal
          gameId={selectedGame}
          onClose={() => {
            setSelectedGame(null);
            setModalType(null);
          }}
        />
      )}
    </main>
  );
};

export default PredictionIaPage;
