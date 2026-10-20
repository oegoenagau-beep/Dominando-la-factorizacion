import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  XCircle,
  RefreshCw,
  ArrowRight,
  HelpCircle,
  Sparkles,
  ChevronRight
} from 'lucide-react';

const PREGUNTAS_QUIZ = [
  {
    id: 1,
    caso: 'Factor Común',
    enunciado: '¿Cuál es la factorización completa de la expresión 12x³ - 18x²?',
    opciones: [
      '6x²(2x - 3)',
      '2x(6x² - 9x)',
      '3x(4x² - 6x)',
      '6x(2x² - 3x)'
    ],
    correcta: 0,
    explicacion: 'MCD(12, 18) = 6 y la menor potencia de x es x². Por tanto, el factor común máximo es 6x². 12x³/6x² = 2x y -18x²/6x² = -3. Respuesta: 6x²(2x - 3).'
  },
  {
    id: 2,
    caso: 'Diferencia de Cuadrados',
    enunciado: 'Al factorizar 49x² - 64y⁴ se obtiene:',
    opciones: [
      '(7x - 8y²)(7x + 8y²)',
      '(7x - 8y)(7x + 8y)',
      '(49x - 64y²)(49x + 64y²)',
      '(7x - 8y²)²'
    ],
    correcta: 0,
    explicacion: '√(49x²) = 7x y √(64y⁴) = 8y². Por ser diferencia de cuadrados a² - b² = (a - b)(a + b), resulta (7x - 8y²)(7x + 8y²).'
  },
  {
    id: 3,
    caso: 'Trinomio Cuadrado Perfecto',
    enunciado: 'La factorización de 9x² - 30x + 25 corresponde a:',
    opciones: [
      '(3x - 5)²',
      '(3x + 5)²',
      '(9x - 5)(x - 5)',
      '(3x - 25)(3x - 1)'
    ],
    correcta: 0,
    explicacion: '√(9x²) = 3x, √25 = 5. Doble producto: 2 · (3x) · (5) = 30x. El término central tiene signo negativo, por tanto es (3x - 5)².'
  },
  {
    id: 4,
    caso: 'Suma de Cubos',
    enunciado: 'Al factorizar la suma de cubos x³ + 64, el resultado correcto es:',
    opciones: [
      '(x + 4)(x² - 4x + 16)',
      '(x + 4)(x² + 4x + 16)',
      '(x + 4)³',
      '(x - 4)(x² + 4x + 16)'
    ],
    correcta: 0,
    explicacion: 'Raíces cúbicas: x y 4. Por la fórmula a³ + b³ = (a + b)(a² - ab + b²), el trinomio lleva el signo central negativo (-ab): (x + 4)(x² - 4x + 16).'
  },
  {
    id: 5,
    caso: 'Trinomio x² + bx + c',
    enunciado: 'Al factorizar x² - 2x - 35 se obtienen los binomios:',
    opciones: [
      '(x - 7)(x + 5)',
      '(x + 7)(x - 5)',
      '(x - 7)(x - 5)',
      '(x - 35)(x + 1)'
    ],
    correcta: 0,
    explicacion: 'Buscamos dos números que multiplicados den -35 y sumados den -2: son -7 y +5, pues (-7)(+5) = -35 y (-7) + (+5) = -2.'
  },
  {
    id: 6,
    caso: 'Trinomio ax² + bx + c',
    enunciado: 'La factorización completa de 2x² + 5x + 2 es:',
    opciones: [
      '(2x + 1)(x + 2)',
      '(2x + 2)(x + 1)',
      '(2x - 1)(x - 2)',
      '(x + 4)(2x + 1)'
    ],
    correcta: 0,
    explicacion: 'a · c = 2 · 2 = 4. Los números son 4 y 1 (4·1=4, 4+1=5). 2x² + 4x + x + 2 = 2x(x + 2) + 1(x + 2) = (2x + 1)(x + 2).'
  },
  {
    id: 7,
    caso: 'Factorización por Agrupación',
    enunciado: 'Factoriza por agrupación: 3x² - 6xy + 4x - 8y',
    opciones: [
      '(x - 2y)(3x + 4)',
      '(x + 2y)(3x - 4)',
      '(3x - 4)(x + 2y)',
      '(3x + 2y)(x - 4)'
    ],
    correcta: 0,
    explicacion: '3x(x - 2y) + 4(x - 2y) = (x - 2y)(3x + 4).'
  },
  {
    id: 8,
    caso: 'Factorización Mixta',
    enunciado: 'La factorización completa en ℝ de 2x⁴ - 32 es:',
    opciones: [
      '2(x - 2)(x + 2)(x² + 4)',
      '2(x² - 4)(x² + 4)',
      '(2x² - 8)(x² + 4)',
      '2(x - 2)⁴'
    ],
    correcta: 0,
    explicacion: '2(x⁴ - 16) = 2(x² - 4)(x² + 4) = 2(x - 2)(x + 2)(x² + 4). En ℝ, (x² + 4) ya no se puede factorizar más.'
  }
];

export default function Quiz({ onQuizFinalizado }) {
  const [indiceActual, setIndiceActual] = useState(0);
  const [respuestasUsuario, setRespuestasUsuario] = useState({});
  const [quizTerminado, setQuizTerminado] = useState(false);

  const pregunta = PREGUNTAS_QUIZ[indiceActual];

  const handleSeleccionarOpcion = (idxOpcion) => {
    setRespuestasUsuario({
      ...respuestasUsuario,
      [indiceActual]: idxOpcion
    });
  };

  const handleSiguiente = () => {
    if (indiceActual < PREGUNTAS_QUIZ.length - 1) {
      setIndiceActual(indiceActual + 1);
    } else {
      // Calcular puntaje
      let correctas = 0;
      PREGUNTAS_QUIZ.forEach((p, idx) => {
        if (respuestasUsuario[idx] === p.correcta) {
          correctas++;
        }
      });
      setQuizTerminado(true);

      // Lanzar confeti si aprobó con nota sobresaliente
      const nota = (correctas / PREGUNTAS_QUIZ.length) * 5.0;
      if (nota >= 3.8) {
        try {
          confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
        } catch {}
      }

      if (onQuizFinalizado) {
        onQuizFinalizado(correctas, PREGUNTAS_QUIZ.length, nota);
      }
    }
  };

  const handleReiniciar = () => {
    setIndiceActual(0);
    setRespuestasUsuario({});
    setQuizTerminado(false);
  };

  // Pantalla de Resultados
  if (quizTerminado) {
    let aciertos = 0;
    PREGUNTAS_QUIZ.forEach((p, idx) => {
      if (respuestasUsuario[idx] === p.correcta) aciertos++;
    });

    const total = PREGUNTAS_QUIZ.length;
    const notaSobre5 = ((aciertos / total) * 5.0).toFixed(1);
    const porcentaje = Math.round((aciertos / total) * 100);

    let calificacion = 'Insuficiente';
    let colorNota = 'text-rose-600 dark:text-rose-400';
    if (notaSobre5 >= 4.5) {
      calificacion = 'Excelente / Sobresaliente';
      colorNota = 'text-emerald-600 dark:text-emerald-400';
    } else if (notaSobre5 >= 3.8) {
      calificacion = 'Bueno / Aprobado con distinción';
      colorNota = 'text-sky-600 dark:text-sky-400';
    } else if (notaSobre5 >= 3.0) {
      calificacion = 'Aceptable / Aprobado';
      colorNota = 'text-amber-600 dark:text-amber-400';
    }

    return (
      <div className="max-w-3xl mx-auto px-4 py-10 animate-fade-in">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-500 mb-6">
            <Award className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
            Resultado de la Auto-Evaluación
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Evaluación integral de los 8 casos de factorización algebraica
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
                Nota Académica (0 a 5.0)
              </span>
              <span className={`text-4xl font-black ${colorNota}`}>
                {notaSobre5}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
                Aciertos
              </span>
              <span className="text-4xl font-black text-slate-900 dark:text-white">
                {aciertos}/{total}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
                Porcentaje
              </span>
              <span className="text-4xl font-black text-sky-600 dark:text-sky-400">
                {porcentaje}%
              </span>
            </div>
          </div>

          <p className="text-base font-bold text-slate-800 dark:text-slate-200 mb-8">
            Dictamen: <span className={colorNota}>{calificacion}</span>
          </p>

          <button
            onClick={handleReiniciar}
            className="px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Intentar el Quiz Nuevamente</span>
          </button>
        </div>

        {/* Detailed Review */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          Revisión Detallada de Preguntas:
        </h3>
        <div className="space-y-4">
          {PREGUNTAS_QUIZ.map((p, idx) => {
            const resp = respuestasUsuario[idx];
            const esBien = resp === p.correcta;

            return (
              <div
                key={p.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    Pregunta {idx + 1} • {p.caso}
                  </span>
                  {esBien ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      Correcta
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400">
                      <XCircle className="w-4 h-4" />
                      Incorrecta
                    </span>
                  )}
                </div>

                <p className="font-semibold text-slate-900 dark:text-white text-sm mb-3">
                  {p.enunciado}
                </p>

                <div className="text-xs space-y-1 mb-3">
                  <p className="text-slate-500 dark:text-slate-400">
                    Tu respuesta: <span className={esBien ? 'font-bold text-emerald-600' : 'font-bold text-rose-600'}>{p.opciones[resp] || 'Sin responder'}</span>
                  </p>
                  {!esBien && (
                    <p className="text-slate-500 dark:text-slate-400">
                      Respuesta correcta: <span className="font-bold text-emerald-600 dark:text-emerald-400">{p.opciones[p.correcta]}</span>
                    </p>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-bold">Justificación: </span>
                  {p.explicacion}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Quiz in progress
  const seleccionActual = respuestasUsuario[indiceActual];
  const progresoPorcentaje = Math.round(((indiceActual + 1) / PREGUNTAS_QUIZ.length) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
          <span>Pregunta {indiceActual + 1} de {PREGUNTAS_QUIZ.length}</span>
          <span>{progresoPorcentaje}% completado</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${progresoPorcentaje}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-md">
        <div className="mb-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 uppercase tracking-wider">
            {pregunta.caso}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-3 mb-6">
          {pregunta.enunciado}
        </h3>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {pregunta.opciones.map((opcion, idx) => {
            const estaSeleccionada = seleccionActual === idx;
            return (
              <div
                key={idx}
                onClick={() => handleSeleccionarOpcion(idx)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  estaSeleccionada
                    ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-100 font-bold shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-950/50 text-slate-800 dark:text-slate-200 font-medium'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center ${
                    estaSeleccionada
                      ? 'bg-sky-600 text-white'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="font-mono text-sm sm:text-base">
                    {opcion}
                  </span>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  estaSeleccionada ? 'border-sky-600 bg-sky-600 text-white' : 'border-slate-300 dark:border-slate-700'
                }`}>
                  {estaSeleccionada && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => indiceActual > 0 && setIndiceActual(indiceActual - 1)}
            disabled={indiceActual === 0}
            className="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 disabled:opacity-40"
          >
            Anterior
          </button>

          <button
            onClick={handleSiguiente}
            disabled={seleccionActual === undefined}
            className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
          >
            <span>{indiceActual === PREGUNTAS_QUIZ.length - 1 ? 'Finalizar Examen' : 'Siguiente'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
