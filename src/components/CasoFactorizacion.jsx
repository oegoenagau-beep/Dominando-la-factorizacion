import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  BookOpen,
  ListOrdered,
  CheckCircle,
  Dumbbell,
  FileEdit,
  Save,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import Ejercicio from './Ejercicio';
import { EJERCICIOS } from '../data/ejercicios';

export default function CasoFactorizacion({
  caso,
  onVolver,
  onEjercicioCompletado,
  ejerciciosResueltos = {}
}) {
  const [pestañaActiva, setPestañaActiva] = useState('teoria'); // 'teoria' | 'ejemplos' | 'practica' | 'notas'
  const [nivelPractica, setNivelPractica] = useState('facil');
  const [notas, setNotas] = useState('');
  const [guardadoExitoso, setGuardadoExitoso] = useState(false);

  // Cargar notas personales del estudiante desde localStorage
  useEffect(() => {
    const key = `notas_caso_${caso.id}`;
    const guardadas = localStorage.getItem(key);
    if (guardadas) {
      setNotas(guardadas);
    } else {
      setNotas('');
    }
  }, [caso.id]);

  // Guardar notas
  const handleGuardarNotas = () => {
    const key = `notas_caso_${caso.id}`;
    localStorage.setItem(key, notas);
    setGuardadoExitoso(true);
    setTimeout(() => setGuardadoExitoso(false), 2000);
  };

  // Filtrar ejercicios de este caso
  const ejerciciosDelCaso = EJERCICIOS.filter((e) => e.casoId === caso.id);
  const ejercicioActual = ejerciciosDelCaso.find((e) => e.dificultad === nivelPractica) || ejerciciosDelCaso[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Back button & Case Header */}
      <div className="mb-6">
        <button
          onClick={onVolver}
          className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors mb-4 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Volver al menú de casos</span>
        </button>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: caso.color }}
              >
                #{caso.id}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {caso.badge}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {caso.nombre}
            </h1>
          </div>

          <div className="bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/80 px-4 py-2.5 rounded-2xl">
            <span className="text-xs text-sky-600 dark:text-sky-400 block font-semibold">
              Fórmula canónica:
            </span>
            <code className="text-sm sm:text-base font-mono font-bold text-sky-900 dark:text-sky-200">
              {caso.formulaGeneral}
            </code>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex overflow-x-auto gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl mb-8 border border-slate-200 dark:border-slate-800 scrollbar-none">
        <button
          onClick={() => setPestañaActiva('teoria')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            pestañaActiva === 'teoria'
              ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Teoría & Pasos</span>
        </button>

        <button
          onClick={() => setPestañaActiva('ejemplos')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            pestañaActiva === 'ejemplos'
              ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <ListOrdered className="w-4 h-4" />
          <span>3 Ejemplos Resueltos</span>
        </button>

        <button
          onClick={() => setPestañaActiva('practica')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            pestañaActiva === 'practica'
              ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Dumbbell className="w-4 h-4" />
          <span>Práctica Interactiva</span>
        </button>

        <button
          onClick={() => setPestañaActiva('notas')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            pestañaActiva === 'notas'
              ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FileEdit className="w-4 h-4" />
          <span>Cuaderno de Notas</span>
        </button>
      </div>

      {/* TAB 1: TEORÍA Y PASOS NUMERADOS */}
      {pestañaActiva === 'teoria' && (
        <div className="space-y-6 animate-fade-in">
          {/* Fundamentación Teórica */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              <span>Fundamentación Teórica</span>
            </h3>
            <div className="text-slate-700 dark:text-slate-300 leading-relaxed text-base space-y-4 whitespace-pre-line">
              {caso.teoria}
            </div>
          </div>

          {/* Pasos Numerados de Resolución */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <ListOrdered className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              <span>Algoritmo de Resolución Paso a Paso</span>
            </h3>
            <div className="space-y-4">
              {caso.pasos.map((paso, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80">
                  <div className="w-8 h-8 rounded-xl bg-sky-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                    {idx + 1}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed pt-0.5">
                    {paso}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Consejos Clave */}
          {caso.consejos && (
            <div className="bg-amber-50/80 dark:bg-amber-950/30 rounded-3xl p-6 border border-amber-200 dark:border-amber-800/60 shadow-sm">
              <h4 className="text-base font-bold text-amber-900 dark:text-amber-200 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <span>Consejos del Profesor & Errores Comunes a Evitar:</span>
              </h4>
              <ul className="space-y-2 text-sm text-amber-900/90 dark:text-amber-200/90 list-disc list-inside">
                {caso.consejos.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Siguiente paso CTA */}
          <div className="text-center pt-4">
            <button
              onClick={() => setPestañaActiva('ejemplos')}
              className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
            >
              <span>Ver los 3 Ejemplos Resueltos</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: 3 EJEMPLOS RESUELTOS CON COMPROBACIÓN INVERSA */}
      {pestañaActiva === 'ejemplos' && (
        <div className="space-y-6 animate-fade-in">
          {caso.ejemplos.map((ej, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              {/* Header Ejemplo */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-400">
                  {ej.titulo}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Ejemplo #{index + 1} de 3
                </span>
              </div>

              {/* Expresión original */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Polinomio a factorizar:
                </p>
                <div className="text-xl sm:text-2xl font-mono font-bold text-slate-900 dark:text-white">
                  {ej.expresion}
                </div>
              </div>

              {/* Desarrollo paso a paso */}
              <div className="mb-6 space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Desarrollo y Justificación:
                </p>
                {ej.explicacionPasoAPaso.map((p, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{p}</span>
                  </div>
                ))}
              </div>

              {/* Resultado */}
              <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 mb-4">
                <span className="text-xs font-bold text-sky-700 dark:text-sky-400 block mb-1">
                  Resultado Factorizado:
                </span>
                <span className="font-mono text-lg sm:text-xl font-extrabold text-sky-900 dark:text-sky-100">
                  {ej.resultado}
                </span>
              </div>

              {/* Comprobación Matemática Inversa Requerida */}
              <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-400 mb-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Comprobación Inversa (Multiplicación de factores hacia el polinomio original):</span>
                </div>
                <div className="font-mono text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 font-semibold mb-1">
                  {ej.comprobacion.desarrollo}
                </div>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  {ej.comprobacion.mensaje}
                </p>
              </div>
            </div>
          ))}

          {/* Siguiente paso CTA */}
          <div className="text-center pt-4">
            <button
              onClick={() => setPestañaActiva('practica')}
              className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
            >
              <span>¡Practicar Ahora con Ejercicios!</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: PRÁCTICA INTERACTIVA CON DIFICULTAD PROGRESIVA */}
      {pestañaActiva === 'practica' && (
        <div className="space-y-6 animate-fade-in">
          {/* Difficulty selector tabs */}
          <div className="flex items-center justify-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl max-w-md mx-auto border border-slate-200 dark:border-slate-800">
            {['facil', 'medio', 'dificil'].map((dif) => {
              const completado = ejerciciosResueltos[`${caso.id}-${dif}`];
              return (
                <button
                  key={dif}
                  onClick={() => setNivelPractica(dif)}
                  className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold capitalize transition-all flex items-center justify-center gap-1.5 ${
                    nivelPractica === dif
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>{dif}</span>
                  {completado && (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Exercise component */}
          {ejercicioActual ? (
            <Ejercicio
              key={ejercicioActual.id}
              ejercicio={ejercicioActual}
              onEjercicioCompletado={(id, dif) => onEjercicioCompletado(caso.id, dif, id)}
              yaCompletado={!!ejerciciosResueltos[`${caso.id}-${nivelPractica}`]}
            />
          ) : (
            <p className="text-center text-slate-500">No hay ejercicios para este nivel.</p>
          )}
        </div>
      )}

      {/* TAB 4: CUADERNO DE NOTAS PERSONAL */}
      {pestañaActiva === 'notas' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm animate-fade-in space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileEdit className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                <span>Cuaderno Personal de Notas — Caso #{caso.id}</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Apunta tus propias reglas nemotécnicas, dudas y fórmulas. Se guardan automáticamente en tu navegador.
              </p>
            </div>
            <button
              onClick={handleGuardarNotas}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{guardadoExitoso ? '¡Guardado!' : 'Guardar'}</span>
            </button>
          </div>

          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            rows={10}
            placeholder={`Escribe aquí tus apuntes sobre "${caso.nombre}"...\nPor ejemplo:\n- Clave para identificarlo: ...\n- Mi fórmula favorita: ...\n- Error que no debo cometer: ...`}
            className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 font-mono text-sm border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
          />

          <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 pt-2">
            <span>Almacenamiento persistente local (LocalStorage)</span>
            <span>{notas.length} caracteres</span>
          </div>
        </div>
      )}
    </div>
  );
}
