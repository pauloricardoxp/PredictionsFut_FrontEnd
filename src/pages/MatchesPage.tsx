import { useGames } from '../hooks/useGames'
import MatchCard from '../components/MatchCard'
import { formatDate } from '../utils/formatDate'

const MatchesPage = () => {
  const { games, loading, error, refresh } = useGames()
  const today = formatDate(new Date().toISOString())

  return (
    <main className="pb-32 pt-gutter px-gutter max-w-2xl mx-auto space-y-md">
      <div className="flex justify-between items-end">
        <div>
          <p className="font-label-mono text-label-mono text-primary-container uppercase tracking-widest">
            Atualizações ao vivo
          </p>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Partidas de hoje
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
          <span className="material-symbols-outlined text-error text-4xl">error_outline</span>
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
          <p className="font-body-base text-on-surface-variant">Nenhum jogo hoje.</p>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-sm">
          {games.map((game) => (
            <MatchCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </main>
  )
}

export default MatchesPage