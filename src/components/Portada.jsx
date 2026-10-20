import React from 'react';
import {
  ArrowRight,
  CheckCircle,
  Bot,
  Sparkles,
  GraduationCap,
  BookOpen,
  Award,
  Layers
} from 'lucide-react';

export default function Portada({ onComenzar, onIrAQuiz, onAbrirGlosario }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-sky-400/20 dark:bg-sky-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-amber-400/15 dark:bg-amber-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Institutional Badge - Universidad del Magdalena */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-300 text-xs sm:text-sm font-semibold mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
            <GraduationCap className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Universidad del Magdalena • Facultad de Ciencias de la educación</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
            Domina la <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Factorización
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-10">
            Plataforma interactiva con rigor matemático universitario. Aprende, ejercita y
            domina los <span className="font-semibold text-sky-600 dark:text-sky-400">8 casos de factorización</span> con
            verificación local de respuestas paso a paso y tutor inteligente integrado.
          </p>

          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={onComenzar}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold text-lg shadow-xl shadow-sky-600/25 hover:shadow-sky-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 group"
            >
              <span>Comenzar a Aprender</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onIrAQuiz}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-lg border border-slate-200 dark:border-slate-700 shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Award className="w-5 h-5 text-amber-500" />
              <span>Evaluar mis Conocimientos</span>
            </button>
          </div>

          {/* University Seal Card & Author Credits */}
          <div className="max-w-xl mx-auto p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-4 text-left">
            <div className="w-14 h-14 shrink-0 flex items-center justify-center">
              <img
                src="./logoUniversidad.png"
                alt="Logo Universidad del Magdalena"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Universidad del Magdalena — Santa Marta, Colombia
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Proyecto pedagógico diseñado para estudiantes de cálculo, álgebra lineal e ingeniería.
              </p>
              <p className="text-[15px] font-semibold text-sky-600 dark:text-sky-400 mt-1">
                Autor: Oscar Goenaga, Cod: 2023172030
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-sky-300 dark:hover:border-sky-700 transition-all">
            <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">
              8 Casos Completos
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Desde factor común y trinomios hasta cubos y factorización mixta, con la misma estructura y rigor.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">
              Verificador Inteligente
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Acepta respuestas conmutativas como <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">(x+2)(x-3)</code> y comprueba la multiplicación de vuelta.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-300 dark:hover:border-purple-700 transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">
              Tutor Virtual 24/7
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Chatbot con doble motor: algoritmo local sin internet e IA opcional configurable, listo para resolver dudas y dar pistas.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-300 dark:hover:border-amber-700 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">
              Gamificación & Progreso
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Gana puntos XP, desbloquea insignias, guarda tus apuntes personales por caso y conserva tu progreso en el navegador.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400 bg-white/40 dark:bg-slate-900/40">
        <p>© Universidad del Magdalena • Cátedra de Álgebra Fundamental • Aplicación Educativa Abierta</p>
      </footer>
    </div>
  );
}
