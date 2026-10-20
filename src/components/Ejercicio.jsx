import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  RefreshCw,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Eye,
  Check
} from 'lucide-react';
import { verificarRespuesta } from '../utils/verificador';

export default function Ejercicio({
  ejercicio,
  onEjercicioCompletado,
  yaCompletado = false
}) {
  const [respuesta, setRespuesta] = useState('');
  const [resultadoVerif, setResultadoVerif] = useState(null);
  const [pistasReveladas, setPistasReveladas] = useState(0);
  const [mostrarSolucion, setMostrarSolucion] = useState(false);
  const inputRef = useRef(null);

  // Insertar símbolo matemático en la posición actual del cursor
  const insertarSimbolo = (simbolo) => {
    if (!inputRef.current) return;
    const start = inputRef.current.selectionStart || 0;
    const end = inputRef.current.selectionEnd || 0;
    const nuevaRespuesta = respuesta.substring(0, start) + simbolo + respuesta.substring(end);
    setRespuesta(nuevaRespuesta);

    // Restaurar foco y cursor
    setTimeout(() => {
      inputRef.current.focus();
      const pos = start + simbolo.length;
      inputRef.current.setSelectionRange(pos, pos);
    }, 10);
  };

  const handleVerificar = (e) => {
    if (e) e.preventDefault();
    const verif = verificarRespuesta(respuesta, ejercicio);
    setResultadoVerif(verif);

    if (verif.esCorrecto) {
      // Disparar confeti
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch (err) {
        // Fallback si no está disponible
      }

      // Notificar al componente padre para sumar XP
      onEjercicioCompletado(ejercicio.id, ejercicio.dificultad);
    }
  };

  const handleLimpiar = () => {
    setRespuesta('');
    setResultadoVerif(null);
    setMostrarSolucion(false);
    if (inputRef.current) inputRef.current.focus();
  };

  const puntosXP = ejercicio.dificultad === 'facil' ? 10 : ejercicio.dificultad === 'medio' ? 20 : 30;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md">
      {/* Exercise Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className={`text-xs font-black uppercase px-2.5 py-1 rounded-full ${
            ejercicio.dificultad === 'facil'
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400'
              : ejercicio.dificultad === 'medio'
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400'
              : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-400'
          }`}>
            Nivel: {ejercicio.dificultad}
          </span>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">
            {ejercicio.titulo}
          </h4>
        </div>

        <div className="flex items-center gap-2">
          {yaCompletado && (
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              <Check className="w-3.5 h-3.5" />
              ¡Superado!
            </span>
          )}
          <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 fill-amber-500" />
            +{puntosXP} XP
          </span>
        </div>
      </div>

      {/* Target Mathematical Expression */}
      <div className="bg-slate-50 dark:bg-slate-950/50 rounded-2xl p-6 text-center border border-slate-200 dark:border-slate-800/80 mb-6">
        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold tracking-wider mb-2">
          Factoriza la siguiente expresión algebraica:
        </p>
        <div className="text-2xl sm:text-3xl font-mono font-extrabold text-sky-700 dark:text-sky-400 tracking-tight">
          {ejercicio.expresion}
        </div>
      </div>

      {/* Input Field & Submit */}
      <form onSubmit={handleVerificar} className="space-y-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">
            Escribe tu respuesta factorizada:
          </label>
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={respuesta}
              onChange={(e) => setRespuesta(e.target.value)}
              placeholder="Ejemplo: (x + 3)(x - 2)"
              className="w-full px-4 py-3.5 rounded-2xl font-mono text-base bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-500 dark:focus:border-sky-400 transition-colors shadow-inner"
            />
          </div>
        </div>

        {/* Virtual Math Keypad */}
        <div>
          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
            Teclado matemático rápido:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {['²', '³', '^', '(', ')', '+', '-', '*', 'x', 'y', 'a', 'b'].map((sim) => (
              <button
                key={sim}
                type="button"
                onClick={() => insertarSimbolo(sim)}
                className="vk-btn text-xs sm:text-sm"
              >
                {sim}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md shadow-sky-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Verificar Respuesta</span>
          </button>

          <button
            type="button"
            onClick={handleLimpiar}
            className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Limpiar</span>
          </button>

          {/* Hint Trigger */}
          {ejercicio.pistas && pistasReveladas < ejercicio.pistas.length && (
            <button
              type="button"
              onClick={() => setPistasReveladas((p) => p + 1)}
              className="px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 font-semibold text-sm transition-colors flex items-center gap-1.5"
            >
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Pedir Pista ({pistasReveladas + 1}/{ejercicio.pistas.length})</span>
            </button>
          )}

          {/* Show Answer Toggle */}
          <button
            type="button"
            onClick={() => setMostrarSolucion(!mostrarSolucion)}
            className="px-3 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1 ml-auto"
          >
            <Eye className="w-4 h-4" />
            <span>{mostrarSolucion ? 'Ocultar solución' : 'Ver solución'}</span>
          </button>
        </div>
      </form>

      {/* Progressive Hints Section */}
      {pistasReveladas > 0 && (
        <div className="space-y-2 mb-6">
          {ejercicio.pistas.slice(0, pistasReveladas).map((pista, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-xs sm:text-sm flex items-start gap-2.5 animate-fade-in"
            >
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Pista {idx + 1}: </span>
                {pista}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Verification Feedback Banner */}
      {resultadoVerif && (
        <div className={`p-4 rounded-2xl mb-6 border animate-fade-in flex items-start gap-3 ${
          resultadoVerif.esCorrecto
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
            : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
        }`}>
          {resultadoVerif.esCorrecto ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          )}
          <div>
            <p className="font-bold text-sm">
              {resultadoVerif.esCorrecto ? '¡Respuesta Correcta!' : 'Respuesta Incorrecta'}
            </p>
            <p className="text-xs sm:text-sm mt-0.5 opacity-90">
              {resultadoVerif.mensaje}
            </p>
          </div>
        </div>
      )}

      {/* Solution & Verification Breakdown (When solved or toggled) */}
      {(resultadoVerif?.esCorrecto || mostrarSolucion) && (
        <div className="p-5 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-slate-800 dark:text-slate-200 text-sm animate-fade-in">
          <div className="flex items-center gap-2 font-bold text-sky-800 dark:text-sky-300 mb-2">
            <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Explicación Paso a Paso & Comprobación Matemática:</span>
          </div>
          <p className="text-xs sm:text-sm mb-3 text-slate-700 dark:text-slate-300">
            {ejercicio.explicacion}
          </p>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-800/80 font-mono text-xs text-sky-900 dark:text-sky-200">
            <span className="font-bold text-slate-500 dark:text-slate-400">Comprobación: </span>
            {ejercicio.comprobacion}
          </div>
        </div>
      )}
    </div>
  );
}
