import { NavLink } from 'react-router-dom'

const BottomNav = () => (
  <nav className="bg-surface/80 backdrop-blur-xl border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] flex justify-around items-center h-20 px-gutter w-full fixed bottom-0 z-50">
    <NavLink
      to="/"
      end
      className={({ isActive }) =>
        isActive
          ? 'flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-6 py-1 scale-110 transition-transform duration-150'
          : 'flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all'
      }
    >
      <span
        className="material-symbols-outlined"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        sports_soccer
      </span>
      <span className="font-label-mono text-label-mono">Partidas</span>
    </NavLink>

    <NavLink
      to="/predictions"
      className={({ isActive }) =>
        isActive
          ? 'flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-6 py-1 scale-110 transition-transform duration-150'
          : 'flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all'
      }
    >
      <span className="material-symbols-outlined">analytics</span>
      <span className="font-label-mono text-label-mono">Palpites</span>
    </NavLink>
  </nav>
)

export default BottomNav