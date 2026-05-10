import { usePredictions } from '../hooks/usePredictions'
import PredictionCard from '../components/PredictionCard'

const PredictionsPage = () => {
  const { predictions, loading, error, reload } = usePredictions()

  const green = predictions.filter((p) => p.result === 'GREEN').length
  const red = predictions.filter((p) => p.result === 'RED').length
  const total = green + red
  const successRate = total > 0 ? Math.round((green / total) * 100) : 0

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
            <span className="font-stat-lg text-stat-lg">{predictions.length}</span>
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
          <span className="material-symbols-outlined text-error text-4xl">error_outline</span>
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
          {predictions.map((p) => (
            <PredictionCard key={p.id} prediction={p} />
          ))}
        </section>
      )}
    </main>
  )
}

export default PredictionsPage