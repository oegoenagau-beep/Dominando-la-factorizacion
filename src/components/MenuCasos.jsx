import React from 'react';
import {
  Share2,
  MinusCircle,
  CheckCircle2,
  Box,
  Sliders,
  Zap,
  Layers,
  Sparkles,
  ArrowRight,
  Check
} from 'lucide-react';
import { CASOS_FACTORIZACION } from '../data/casos';

const ICON_MAP = {
  Share2,
  MinusCircle,
  CheckCircle2,
  Box,
  Sliders,
  Zap,
  Layers,
  Sparkles
};

export default function MenuCasos({ onSeleccionarCaso, ejerciciosResueltos = {} }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          Los 8 Casos de Factorización
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
          Selecciona cualquier caso para estudiar su teoría rigurosa, repasar los 3 ejemplos resueltos paso a paso y resolver los ejercicios interactivos.
        </p>
      </div>

      {/* Grid of 8 Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CASOS_FACTORIZACION.map((caso) => {
          const IconComponent = ICON_MAP[caso.icono] || Layers;
          // Contar ejercicios completados para este caso
          const completados = ['facil', 'medio', 'dificil'].filter(
            (dif) => ejerciciosResueltos[`${caso.id}-${dif}`]
          ).length;

          return (
            <div
              key={caso.id}
              onClick={() => onSeleccionarCaso(caso.id)}
              className="group relative bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 hover:border-sky-400 dark:hover:border-sky-500 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Top badges */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md font-bold text-sm"
                    style={{ backgroundColor: caso.color }}
                  >
                    #{caso.id}
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {caso.badge}
                  </span>
                </div>

                {/* Case Title */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  {caso.nombre}
                </h3>

                {/* Formula pill */}
                <div className="mb-4">
                  <code className="text-xs font-mono font-bold px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-sky-700 dark:text-sky-300 block truncate">
                    {caso.formulaGeneral}
                  </code>
                </div>

                {/* Short summary */}
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-6">
                  {caso.resumen}
                </p>
              </div>

              {/* Bottom stats & CTA */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-medium">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${completados === 3 ? 'bg-emerald-500' : completados > 0 ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-700'}`} />
                  <span className="text-slate-500 dark:text-slate-400 font-semibold">
                    {completados}/3 ejercicios
                  </span>
                </div>

                <div className="flex items-center gap-1 text-sky-600 dark:text-sky-400 font-bold group-hover:translate-x-1 transition-transform">
                  <span>Estudiar</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
