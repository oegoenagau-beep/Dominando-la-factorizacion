import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Portada from './components/Portada';
import MenuCasos from './components/MenuCasos';
import CasoFactorizacion from './components/CasoFactorizacion';
import Quiz from './components/Quiz';
import Chatbot from './components/Chatbot';
import GlosarioModal from './components/GlosarioModal';
import LogrosModal from './components/LogrosModal';
import { CASOS_FACTORIZACION } from './data/casos';

export default function App() {
  const [vistaActual, setVistaActual] = useState('portada'); // 'portada' | 'casos' | 'caso-detalle' | 'quiz'
  const [casoSeleccionadoId, setCasoSeleccionadoId] = useState(1);
  const [temaOscuro, setTemaOscuro] = useState(() => {
    const guardado = localStorage.getItem('factorizacion_tema');
    if (guardado !== null) return guardado === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Estado de Gamificación
  const [xp, setXp] = useState(() => {
    const valor = localStorage.getItem('factorizacion_xp');
    return valor ? parseInt(valor, 10) : 0;
  });

  const [racha, setRacha] = useState(() => {
    const valor = localStorage.getItem('factorizacion_racha');
    return valor ? parseInt(valor, 10) : 1;
  });

  const [ejerciciosResueltos, setEjerciciosResueltos] = useState(() => {
    const valor = localStorage.getItem('factorizacion_resueltos');
    return valor ? JSON.parse(valor) : {};
  });

  // Modales
  const [glosarioAbierto, setGlosarioAbierto] = useState(false);
  const [logrosAbierto, setLogrosAbierto] = useState(false);

  // Sincronizar tema con la clase 'dark' en el elemento html
  useEffect(() => {
    if (temaOscuro) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('factorizacion_tema', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('factorizacion_tema', 'light');
    }
  }, [temaOscuro]);

  // Persistir XP y ejercicios resueltos
  useEffect(() => {
    localStorage.setItem('factorizacion_xp', xp.toString());
  }, [xp]);

  useEffect(() => {
    localStorage.setItem('factorizacion_resueltos', JSON.stringify(ejerciciosResueltos));
  }, [ejerciciosResueltos]);

  const toggleTema = () => {
    setTemaOscuro((prev) => !prev);
  };

  const handleSeleccionarCaso = (id) => {
    setCasoSeleccionadoId(id);
    setVistaActual('caso-detalle');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEjercicioCompletado = (casoId, dificultad, ejercicioId) => {
    const key = `${casoId}-${dificultad}`;
    if (!ejerciciosResueltos[key]) {
      const puntos = dificultad === 'facil' ? 10 : dificultad === 'medio' ? 20 : 30;
      setXp((prev) => prev + puntos);
      setEjerciciosResueltos((prev) => ({
        ...prev,
        [key]: true
      }));
    }
  };

  const handleQuizFinalizado = (correctas, total, nota) => {
    const puntosGanados = correctas * 15;
    setXp((prev) => prev + puntosGanados);
  };

  const casoSeleccionado = CASOS_FACTORIZACION.find((c) => c.id === casoSeleccionadoId) || CASOS_FACTORIZACION[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
      {/* Barra de Navegación Global */}
      <Navbar
        vistaActual={vistaActual}
        setVistaActual={setVistaActual}
        temaOscuro={temaOscuro}
        toggleTema={toggleTema}
        xp={xp}
        racha={racha}
        onAbrirGlosario={() => setGlosarioAbierto(true)}
        onAbrirLogros={() => setLogrosAbierto(true)}
      />

      {/* Contenido Principal según Vista */}
      <main className="flex-1">
        {vistaActual === 'portada' && (
          <Portada
            onComenzar={() => {
              setVistaActual('casos');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onIrAQuiz={() => {
              setVistaActual('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAbrirGlosario={() => setGlosarioAbierto(true)}
          />
        )}

        {vistaActual === 'casos' && (
          <MenuCasos
            onSeleccionarCaso={handleSeleccionarCaso}
            ejerciciosResueltos={ejerciciosResueltos}
          />
        )}

        {vistaActual === 'caso-detalle' && (
          <CasoFactorizacion
            caso={casoSeleccionado}
            onVolver={() => {
              setVistaActual('casos');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onEjercicioCompletado={handleEjercicioCompletado}
            ejerciciosResueltos={ejerciciosResueltos}
          />
        )}

        {vistaActual === 'quiz' && (
          <Quiz onQuizFinalizado={handleQuizFinalizado} />
        )}
      </main>

      {/* Chatbot Asistente Inteligente (Disponible siempre en la esquina inferior derecha) */}
      <Chatbot />

      {/* Modales */}
      <GlosarioModal
        abierto={glosarioAbierto}
        onCerrar={() => setGlosarioAbierto(false)}
      />

      <LogrosModal
        abierto={logrosAbierto}
        onCerrar={() => setLogrosAbierto(false)}
        xp={xp}
        ejerciciosResueltos={ejerciciosResueltos}
      />
    </div>
  );
}
