import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Lightbulb,
  HelpCircle,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { identificarCaso, factorizarPasoAPaso, generarEjercicioAleatorio } from '../utils/factorizador';
import { CASOS_FACTORIZACION } from '../data/casos';

export default function Chatbot() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState([
    {
      id: 1,
      remitente: 'bot',
      texto: '¡Hola! Soy tu tutor virtual de factorización de la Universidad del Magdalena. ¿Tienes alguna duda con un caso, necesitas identificar un polinomio o quieres que te genere un ejercicio de práctica?'
    }
  ]);
  const [inputTexto, setInputTexto] = useState('');
  const [estaEscribiendo, setEstaEscribiendo] = useState(false);
  const [escuchando, setEscuchando] = useState(false);
  const [reproduciendoId, setReproduciendoId] = useState(null);
  const scrollRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-scroll al final del chat cuando se agreguen mensajes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [mensajes, estaEscribiendo]);

  // Limpiar voz si se cierra el componente o la ventana
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Función 1: Síntesis de voz (Text-to-Speech)
  const alternarVoz = (id, texto) => {
    if (!('speechSynthesis' in window)) {
      alert('Tu navegador no tiene soporte nativo para síntesis de voz.');
      return;
    }

    // Si ya está reproduciendo este mensaje, detenerlo (toggle)
    if (reproduciendoId === id) {
      window.speechSynthesis.cancel();
      setReproduciendoId(null);
      return;
    }

    // Cancelar cualquier locución anterior
    window.speechSynthesis.cancel();

    // Limpiar caracteres especiales de markdown para pronunciación natural
    const textoLimpio = texto
      .replace(/[*#`_~]/g, '')
      .replace(/•/g, ',')
      .replace(/\^2/g, ' al cuadrado ')
      .replace(/\^3/g, ' al cubo ')
      .replace(/²/g, ' al cuadrado ')
      .replace(/³/g, ' al cubo ');

    const utterance = new SpeechSynthesisUtterance(textoLimpio);
    utterance.lang = 'es-ES'; // Español
    utterance.rate = 1.0;     // Velocidad estándar
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setReproduciendoId(null);
    };

    utterance.onerror = () => {
      setReproduciendoId(null);
    };

    setReproduciendoId(id);
    window.speechSynthesis.speak(utterance);
  };

  // Función 2: Reconocimiento de voz por micrófono (Speech-to-Text)
  const alternarMicrofono = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Tu navegador no soporta entrada de voz directa por micrófono. Te recomendamos usar Google Chrome, Microsoft Edge o Safari.');
      return;
    }

    if (escuchando) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setEscuchando(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setEscuchando(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputTexto((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
      };

      recognition.onerror = (event) => {
        console.warn('Error en reconocimiento de voz:', event.error);
        setEscuchando(false);
      };

      recognition.onend = () => {
        setEscuchando(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error(err);
      setEscuchando(false);
    }
  };

  // Respuestas del Motor Local Inteligente
  const responderLocalmente = (mensajeUsuario) => {
    const texto = mensajeUsuario.toLowerCase().trim();

    // 1. ¿Cómo identificar el caso?
    if (texto.includes('como identifico') || texto.includes('cómo identifico') || texto.includes('identificar caso')) {
      return `Para identificar rápidamente cualquier caso de factorización, sigue esta regla nemotécnica según el número de términos:

1. **Regla de Oro**: Siempre busca primero si hay un **Factor Común** (letras o números divisores de todos).
2. **2 Términos (Binomio)**:
   • Si están restando y son cuadrados: **Diferencia de Cuadrados** (a² - b²).
   • Si tienen exponentes múltiplos de 3: **Suma o Diferencia de Cubos** (a³ ± b³).
3. **3 Términos (Trinomio)**:
   • Comprueba si es **Trinomio Cuadrado Perfecto**: el término medio es 2·a·b.
   • Si el primer término es x² (coeficiente 1): **Trinomio x² + bx + c** (dos números que multipliquen c y sumen b).
   • Si el primer término es ax² (a ≠ 1): **Trinomio ax² + bx + c** (método del producto a·c).
4. **4 o 6 Términos**: Agrupa en parejas y aplica **Factorización por Agrupación**.`;
    }

    // 2. Explicación de un caso específico
    for (const caso of CASOS_FACTORIZACION) {
      if (texto.includes(caso.slug) || texto.includes(caso.nombreCorto.toLowerCase()) || texto.includes(caso.nombre.toLowerCase())) {
        return `**${caso.nombre}**:

• **Fórmula general**: ${caso.formulaGeneral}
• **Pasos principales**:
${caso.pasos.map((p, i) => `${i + 1}. ${p}`).join('\n')}

💡 *Consejo del profesor*: ${caso.consejos ? caso.consejos[0] : 'Revisa siempre los signos.'}`;
      }
    }

    // 3. Generar ejercicio
    if (texto.includes('dame un ejercicio') || texto.includes('generar ejercicio') || texto.includes('quiero practicar')) {
      const casoAleatorio = Math.floor(Math.random() * 8) + 1;
      const nuevoEj = generarEjercicioAleatorio(casoAleatorio, 'facil');
      return `¡Aquí tienes un ejercicio para practicar!

📝 **Expresión**: \`${nuevoEj.expresion}\`
Intenta resolverlo en una hoja o en la sección de práctica. Si necesitas una pista o la solución, pídemela.`;
    }

    // 4. Pedir pista
    if (texto.includes('pista') || texto.includes('dame una pista')) {
      return `💡 **Pista general del tutor**:
Recuerda contar primero cuántos términos tiene la expresión. Si tiene 2 términos, calcula si tienen raíz cuadrada o cúbica exacta. Si tiene 3 términos, observa si el coeficiente inicial es 1 o mayor a 1. ¡Escríbeme la expresión exacta y te guiaré con pistas específicas sin darte la respuesta de inmediato!`;
    }

    // 5. Análisis de expresión matemática introducida por el usuario
    if (texto.includes('^') || texto.includes('²') || texto.includes('³') || /[a-z][0-9]/i.test(texto) || /[0-9][a-z]/i.test(texto)) {
      try {
        const limpia = mensajeUsuario.replace(/factoriza(r)?/i, '').replace(/resuelve/i, '').trim();
        const resolucion = factorizarPasoAPaso(limpia);
        return `Analicé la expresión algebraica **${limpia}**:

• **Caso Detectado**: ${resolucion.caso}
• **Pasos de resolución**:
${resolucion.pasos.map((p, i) => `${i + 1}. ${p}`).join('\n')}

🎯 **Resultado Factorizado**:
\`${resolucion.resultado}\`

🔍 **Comprobación Inversa**:
${resolucion.comprobacion}`;
      } catch (err) {
        return `Identifiqué tu expresión algebraica. Recuerda que para factorizarla debes verificar primero si comparten algún factor común numérico o literal, y luego analizar si es binomio o trinomio.`;
      }
    }

    // 6. Errores comunes
    if (texto.includes('error') || texto.includes('signo') || texto.includes('duda')) {
      return `Uno de los errores más frecuentes es olvidar el signo del término medio en los trinomios, o pensar que la suma de cuadrados (ej. x² + 25) se puede factorizar en ℝ. ¡Recuerda que la suma de cuadrados es irreducible en los reales!`;
    }

    // Respuesta por defecto
    return `Comprendo tu consulta. Como tu profesor tutor, puedo:
1. **Identificar y resolver** cualquier expresión: escribe o dicta por ejemplo \`factoriza x^2 - 49\` o \`x^2 + 8x + 16\`.
2. **Explicar cualquiera de los 8 casos**: pide \`explícame trinomio ax^2 + bx + c\`.
3. **Darte ejercicios nuevos**: pide \`dame un ejercicio\`.
4. **Enseñarte a identificar el caso**: pregunta \`cómo identifico el caso\`.`;
  };

  const handleEnviarMensaje = async (e) => {
    if (e) e.preventDefault();
    if (!inputTexto.trim()) return;

    const textoUsuario = inputTexto;
    setInputTexto('');

    const nuevoMensajeUsuario = {
      id: Date.now(),
      remitente: 'usuario',
      texto: textoUsuario
    };

    setMensajes((prev) => [...prev, nuevoMensajeUsuario]);
    setEstaEscribiendo(true);

    const apiUrl = import.meta.env.VITE_API_URL;
    let respuestaFinal = '';

    if (apiUrl) {
      try {
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: `Actúa como un profesor universitario de álgebra de la Universidad del Magdalena, paciente y riguroso. Pregunta del estudiante: ${textoUsuario}`
          })
        });
        if (res.ok) {
          const data = await res.json();
          respuestaFinal = data.respuesta || data.text || data.message;
        } else {
          respuestaFinal = responderLocalmente(textoUsuario);
        }
      } catch (err) {
        respuestaFinal = responderLocalmente(textoUsuario);
      }
    } else {
      await new Promise((r) => setTimeout(r, 450));
      respuestaFinal = responderLocalmente(textoUsuario);
    }

    setEstaEscribiendo(false);
    setMensajes((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        remitente: 'bot',
        texto: respuestaFinal
      }
    ]);
  };

  const enviarSugerencia = (texto) => {
    setInputTexto(texto);
    setTimeout(() => {
      const form = document.getElementById('form-chatbot');
      if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }, 50);
  };

  return (
    <>
      {/* Botón Flotante (Siempre visible en todas las pantallas) */}
      <div className="fixed bottom-6 right-6 z-50">
        {!abierto && (
          <button
            onClick={() => setAbierto(true)}
            aria-label="Abrir Asistente Tutor Virtual"
            className="w-14 h-14 rounded-full bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-2xl shadow-sky-600/40 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative"
          >
            <Bot className="w-7 h-7 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-white dark:border-slate-900 animate-ping" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-white dark:border-slate-900" />
          </button>
        )}
      </div>

      {/* Ventana de Chat */}
      {abierto && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[440px] h-[600px] max-h-[85vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-sky-600 to-blue-700 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight">
                  Tutor de Factorización
                </h3>
                <p className="text-[11px] text-sky-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Audio & Motor Local Activos • Unimagdalena</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                setAbierto(false);
              }}
              className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sugerencias Rápidas */}
          <div className="px-3 py-2 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 flex gap-1.5 overflow-x-auto scrollbar-none shrink-0">
            {[
              '¿Cómo identifico el caso?',
              'Explícame diferencia de cuadrados',
              'Factoriza x^2 - 49',
              'Dame un ejercicio',
              'Dame una pista'
            ].map((sug, i) => (
              <button
                key={i}
                type="button"
                onClick={() => enviarSugerencia(sug)}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-sky-950/50 hover:text-sky-600 whitespace-nowrap transition-colors"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Mensajes */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-3">
            {mensajes.map((m) => {
              const esBot = m.remitente === 'bot';
              const estaHablandoEste = reproduciendoId === m.id;

              return (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${esBot ? 'items-start' : 'items-end justify-end'}`}
                >
                  {esBot && (
                    <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className="flex flex-col gap-1 max-w-[85%]">
                    <div
                      className={`rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                        esBot
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                          : 'bg-sky-600 text-white rounded-br-none'
                      }`}
                    >
                      {m.texto}
                    </div>

                    {/* Botón de Escuchar Audio (Solo para mensajes del tutor) */}
                    {esBot && (
                      <div className="flex items-center gap-1.5 px-1">
                        <button
                          type="button"
                          onClick={() => alternarVoz(m.id, m.texto)}
                          className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md transition-all ${
                            estaHablandoEste
                              ? 'bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-300 font-bold'
                              : 'text-slate-400 hover:text-sky-600 dark:hover:text-sky-400'
                          }`}
                          title={estaHablandoEste ? 'Detener voz' : 'Escuchar respuesta en voz alta'}
                        >
                          {estaHablandoEste ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
                              <span>Detener audio</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>Escuchar</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {estaEscribiendo && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 text-xs font-bold">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-2 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <span>El profesor está respondiendo</span>
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-100">.</span>
                  <span className="animate-bounce delay-200">.</span>
                </div>
              </div>
            )}
          </div>

          {/* Input & Botones de Audio */}
          <form
            id="form-chatbot"
            onSubmit={handleEnviarMensaje}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 shrink-0"
          >
            {/* Botón de Entrada por Micrófono */}
            <button
              type="button"
              onClick={alternarMicrofono}
              title={escuchando ? 'Detener dictado por voz' : 'Hablar por micrófono (Dictar pregunta)'}
              className={`p-2.5 rounded-xl transition-all shrink-0 ${
                escuchando
                  ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400'
              }`}
            >
              {escuchando ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputTexto}
              onChange={(e) => setInputTexto(e.target.value)}
              placeholder={escuchando ? 'Escuchando tu voz...' : 'Escribe o dicta tu duda...'}
              className={`flex-1 px-4 py-2.5 rounded-xl border text-slate-900 dark:text-white placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none transition-colors font-sans ${
                escuchando
                  ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-700'
                  : 'bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:border-sky-500'
              }`}
            />

            <button
              type="submit"
              disabled={!inputTexto.trim()}
              className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white transition-all shrink-0 shadow-md shadow-sky-600/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
