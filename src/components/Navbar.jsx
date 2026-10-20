import React from 'react';
import {
  BookOpen,
  Award,
  HelpCircle,
  Sun,
  Moon,
  Flame,
  Sparkles,
  GraduationCap
} from 'lucide-react';

export default function Navbar({
  vistaActual,
  setVistaActual,
  temaOscuro,
  toggleTema,
  xp,
  racha,
  onAbrirGlosario,
  onAbrirLogros
}) {
  const nivel = Math.floor(xp / 100) + 1;
  const progresoNivel = xp % 100;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div
          onClick={() => setVistaActual('portada')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 p-1 flex items-center justify-center shadow-md border border-slate-200 dark:border-slate-700 group-hover:scale-105 transition-transform shrink-0">
            <img
              src="./logoUniversidad.png"
              alt="Logo Universidad"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
                Domina la <span className="text-sky-600 dark:text-sky-400">Factorización</span>
              </span>
            </div>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 -mt-1 hidden sm:block">
              Universidad del Magdalena
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => setVistaActual('portada')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              vistaActual === 'portada'
                ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => setVistaActual('casos')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              vistaActual === 'casos' || vistaActual === 'caso-detalle'
                ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Los 8 Casos
          </button>
          <button
            onClick={() => setVistaActual('quiz')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              vistaActual === 'quiz'
                ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Auto-Evaluación
          </button>
          <button
            onClick={onAbrirGlosario}
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-1"
          >
            <BookOpen className="w-4 h-4 text-sky-500" />
            Glosario
          </button>
        </nav>

        {/* User stats & Theme switch */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* XP & Nivel Badge */}
          <div
            onClick={onAbrirLogros}
            title={`Nivel ${nivel} (${progresoNivel}/100 XP para el siguiente nivel). Clic para ver insignias.`}
            className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 px-2.5 py-1 rounded-full cursor-pointer hover:scale-105 transition-transform"
          >
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase leading-none">
                Nv. {nivel}
              </span>
              <span className="text-xs font-black text-amber-900 dark:text-amber-200 leading-none">
                {xp} XP
              </span>
            </div>
          </div>

          {/* Racha */}
          <div
            title="Días de racha de estudio"
            className="hidden sm:flex items-center gap-1 bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 px-2 py-1 rounded-full"
          >
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
            <span className="text-xs font-bold text-orange-700 dark:text-orange-400">
              {racha}d
            </span>
          </div>

          {/* Botón Logros */}
          <button
            onClick={onAbrirLogros}
            title="Ver logros e insignias"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Award className="w-5 h-5 text-indigo-500" />
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTema}
            title={temaOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-label="Alternar tema de color"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {temaOscuro ? (
              <Sun className="w-5 h-5 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700 hover:-rotate-12 transition-transform" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
