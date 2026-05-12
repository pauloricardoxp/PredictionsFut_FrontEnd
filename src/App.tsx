import { BrowserRouter, Routes, Route } from "react-router-dom";
import MatchesPage from "./pages/MatchesPage";
import PredictionsPage from "./pages/PredictionPage";
import PredictionIaPage from "./pages/PredictionIaPage";
import { useGames } from "./hooks/useGames";
import BottomNav from "./components/Bottomnav";

const Header = () => {
  const { refresh } = useGames();

  return (
    <header className="bg-surface/70 backdrop-blur-md border-b border-white/10 shadow-[0_0_15px_rgba(57,255,20,0.1)] flex items-center justify-between px-margin h-16 w-full z-50 sticky top-0">
      <div className="flex items-center gap-xs">
        <span
          className="material-symbols-outlined text-primary-container"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          sports_soccer
        </span>
        <h1 className="font-headline-md font-extrabold text-primary-container tracking-tight">
          PredictionsFut
        </h1>
      </div>
      <button
        onClick={refresh}
        className="text-on-surface-variant hover:text-primary-container transition-colors duration-200 active:opacity-80 active:scale-95"
        title="Atualizar jogos"
      >
        <span className="material-symbols-outlined">refresh</span>
      </button>
    </header>
  );
};

const App = () => (
  <BrowserRouter>
    <div className="min-h-screen bg-background">
      <Header />
      <Routes>
        <Route path="/" element={<MatchesPage />} />
        <Route path="/predictions" element={<PredictionsPage />} />
        <Route path="/prediction-ia" element={<PredictionIaPage />} />
      </Routes>
      <BottomNav />
    </div>
  </BrowserRouter>
);

export default App;
