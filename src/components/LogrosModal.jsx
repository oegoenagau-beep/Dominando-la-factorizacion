import React from 'react';
import { X, Award, Sparkles, CheckCircle2, Lock } from 'lucide-react';

const INSIGNIAS = [
  {
    id: 'primer-ejercicio',
    titulo: 'Primer Factor',
    descripcion: 'Resuelve con éxito tu primer ejercicio de factorización.',
    icono: '🎯',
    desbloqueada: (xp, totalResueltos) => totalResueltos >= 1
  },
  {
    id: 'cinco-resueltos',
    titulo: 'Aprendiz Prometedor',
    descripcion: 'Supera al menos 5 ejercicios interactivos.',
    icono: '⭐',
    desbloqueada: (xp, totalResueltos) => totalResueltos >= 5
  },
  {
    id: 'diez-resueltos',
    titulo: 'Cazador de Polinomios',
    descripcion: 'Supera 10 ejercicios interactivos.',
    icono: '🔥',
    desbloqueada: (xp, totalResueltos) => totalResueltos >= 10
  },
  {
    id: 'veinte-resueltos',
    titulo: 'Maestro de la Factorización',
    descripcion: 'Supera 20 ejercicios de diferentes niveles y casos.',
    icono: '👑',
    desbloqueada: (xp, totalResueltos) => totalResueltos >= 20
  },
  {
    id: 'cien-xp',
    titulo: 'Centenario de XP',
    descripcion: 'Alcanza tus primeros 100 puntos de experiencia.',
    icono: '⚡',
    desbloqueada: (xp) => xp >= 100
  },
  {
    id: 'quinientos-xp',
    titulo: 'Cerebro Algebraico',
    descripcion: 'Acumula más de 300 puntos de experiencia en la plataforma.',
    icono: '💎',
    desbloqueada: (xp) => xp >= 300
  }
];

export default function LogrosModal({ abierto, onCerrar, xp = 0, ejerciciosResueltos = {} }) {
  if (!abierto) return null;

  const totalResueltos = Object.keys(ejerciciosResueltos).length;
  const nivel = Math.floor(xp / 100) + 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Logros & Insignias Universitarias
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tu progreso y distinciones académicas en la plataforma
              </p>
            </div>
          </div>
          <button
            onClick={onCerrar}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Summary Banner */}
        <div className="p-5 bg-gradient-to-r from-sky-600 to-blue-700 text-white flex items-center justify-around text-center">
          <div>
            <span className="text-xs uppercase font-semibold text-sky-200 block">Nivel Actual</span>
            <span className="text-2xl font-black">{nivel}</span>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div>
            <span className="text-xs uppercase font-semibold text-sky-200 block">Puntos XP</span>
            <span className="text-2xl font-black">{xp}</span>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div>
            <span className="text-xs uppercase font-semibold text-sky-200 block">Ejercicios Superados</span>
            <span className="text-2xl font-black">{totalResueltos}/24</span>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="p-6 overflow-y-auto space-y-3">
          {INSIGNIAS.map((ins) => {
            const desbloqueada = ins.desbloqueada(xp, totalResueltos);

            return (
              <div
                key={ins.id}
                className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${
                  desbloqueada
                    ? 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/60'
                    : 'bg-slate-50/50 dark:bg-slate-950/30 border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                  desbloqueada ? 'bg-amber-100 dark:bg-amber-900/40 shadow-inner' : 'bg-slate-200 dark:bg-slate-800'
                }`}>
                  {desbloqueada ? ins.icono : <Lock className="w-5 h-5 text-slate-400" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {ins.titulo}
                    </h4>
                    {desbloqueada && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Desbloqueada
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    {ins.descripcion}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
