import React, { useState } from 'react';
import { X, Search, BookOpen } from 'lucide-react';
import { GLOSARIO } from '../data/glosario';

export default function GlosarioModal({ abierto, onCerrar }) {
  const [busqueda, setBusqueda] = useState('');

  if (!abierto) return null;

  const filtrados = GLOSARIO.filter(
    (item) =>
      item.termino.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.definicion.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Glosario de Términos Algebraicos
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Conceptos fundamentales para dominar la factorización
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

        {/* Search Input */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar término (ej: monomio, MCD, conjugado, discriminante)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Glossary List */}
        <div className="p-6 overflow-y-auto space-y-4">
          {filtrados.length > 0 ? (
            filtrados.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800"
              >
                <h4 className="text-base font-bold text-sky-700 dark:text-sky-400 mb-1">
                  {item.termino}
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
                  {item.definicion}
                </p>
                <div className="font-mono text-xs bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                  <span className="font-sans font-bold text-slate-500">Ejemplo: </span>
                  {item.ejemplo}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-500 py-8 text-sm">
              No se encontraron términos que coincidan con "{busqueda}".
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
