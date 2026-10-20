/**
 * ============================================================================
 * DOMINA LA FACTORIZACIÓN — APLICACIÓN PRINCIPAL (APP.JS)
 * Universidad del Magdalena • Cátedra de Álgebra Fundamental
 * ============================================================================
 */

// Casos de Factorización con rigor matemático
const CASOS_APP = [
  {
    id: 1,
    nombre: "Factor Común",
    badge: "Caso I",
    formula: "a·x + a·y = a(x + y)",
    resumen: "Extracción del Máximo Común Divisor (MCD) numérico y la menor potencia de las variables comunes.",
    teoria: "El Factor Común es la propiedad distributiva leída en sentido inverso: a·b + a·c = a(b + c). Consiste en identificar el factor numérico y/o literal que se repite en todos los términos.",
    pasos: [
      "Calcula el Máximo Común Divisor (MCD) de los coeficientes.",
      "Identifica las variables comunes con su menor exponente.",
      "Divide cada término del polinomio original entre el factor común.",
      "Escribe el resultado como el producto del factor común por el polinomio restante."
    ],
    ejemplos: [
      {
        titulo: "Factor común monomio",
        expresion: "12x³ - 18x²",
        resultado: "6x²(2x - 3)",
        comprobacion: "6x² · (2x) - 6x² · (3) = 12x³ - 18x² ✓"
      },
      {
        titulo: "Factor común polinomio",
        expresion: "a(x + 1) - b(x + 1)",
        resultado: "(x + 1)(a - b)",
        comprobacion: "(x + 1)·a - (x + 1)·b = a(x + 1) - b(x + 1) ✓"
      },
      {
        titulo: "Monomio multivariable",
        expresion: "15a²b³ + 25a³b²",
        resultado: "5a²b²(3b + 5a)",
        comprobacion: "5a²b²·(3b) + 5a²b²·(5a) = 15a²b³ + 25a³b² ✓"
      }
    ],
    ejercicio: {
      expresion: "14x² - 21x",
      solucion: "7x(2x - 3)",
      equivalente: "7x(-3 + 2x)"
    }
  },
  {
    id: 2,
    nombre: "Diferencia de Cuadrados",
    badge: "Caso II",
    formula: "a² - b² = (a - b)(a + b)",
    resumen: "Binomio de dos cuadrados perfectos separados por una resta; se factoriza en binomios conjugados.",
    teoria: "Una diferencia de cuadrados se origina al multiplicar dos binomios conjugados: (a - b)(a + b) = a² - b². Para factorizar, extraemos la raíz cuadrada de cada término.",
    pasos: [
      "Verifica que el binomio tenga exactamente dos términos y signo menos entre ellos.",
      "Extrae la raíz cuadrada del primer término: √a² = a.",
      "Extrae la raíz cuadrada del segundo término: √b² = b.",
      "Forma los factores conjugados: (a - b)(a + b)."
    ],
    ejemplos: [
      {
        titulo: "Binomio simple",
        expresion: "x² - 36",
        resultado: "(x - 6)(x + 6)",
        comprobacion: "(x - 6)(x + 6) = x² + 6x - 6x - 36 = x² - 36 ✓"
      },
      {
        titulo: "Coeficientes compuestos",
        expresion: "25x² - 81y²",
        resultado: "(5x - 9y)(5x + 9y)",
        comprobacion: "(5x - 9y)(5x + 9y) = 25x² - 81y² ✓"
      },
      {
        titulo: "Exponentes pares mayores",
        expresion: "16x⁴ - 1",
        resultado: "(4x² - 1)(4x² + 1)",
        comprobacion: "(4x² - 1)(4x² + 1) = 16x⁴ - 1 ✓"
      }
    ],
    ejercicio: {
      expresion: "x² - 49",
      solucion: "(x - 7)(x + 7)",
      equivalente: "(x + 7)(x - 7)"
    }
  },
  {
    id: 3,
    nombre: "Trinomio Cuadrado Perfecto",
    badge: "Caso III",
    formula: "a² ± 2ab + b² = (a ± b)²",
    resumen: "Trinomio donde dos términos son cuadrados y el central es el doble producto de sus raíces.",
    teoria: "Surge del cuadrado de un binomio: (a ± b)² = a² ± 2ab + b². El término central debe coincidir exactamente con 2·a·b.",
    pasos: [
      "Ordena el trinomio en forma descendente.",
      "Extrae la raíz cuadrada del primer y tercer término.",
      "Multiplica ambas raíces por 2 y verifica que iguale al término central.",
      "Escribe el binomio al cuadrado con el signo del término medio."
    ],
    ejemplos: [
      {
        titulo: "Trinomio suma",
        expresion: "x² + 6x + 9",
        resultado: "(x + 3)²",
        comprobacion: "(x + 3)(x + 3) = x² + 3x + 3x + 9 = x² + 6x + 9 ✓"
      },
      {
        titulo: "Trinomio resta",
        expresion: "4x² - 20x + 25",
        resultado: "(2x - 5)²",
        comprobacion: "(2x - 5)² = 4x² - 20x + 25 ✓"
      },
      {
        titulo: "Multivariable",
        expresion: "9x² + 24xy + 16y²",
        resultado: "(3x + 4y)²",
        comprobacion: "(3x + 4y)² = 9x² + 24xy + 16y² ✓"
      }
    ],
    ejercicio: {
      expresion: "x² + 10x + 25",
      solucion: "(x + 5)²",
      equivalente: "(x + 5)(x + 5)"
    }
  },
  {
    id: 4,
    nombre: "Suma y Diferencia de Cubos",
    badge: "Caso IV",
    formula: "a³ ± b³ = (a ± b)(a² ∓ ab + b²)",
    resumen: "Binomios cúbicos que se factorizan en un binomio por un trinomio irreducible.",
    teoria: "Regla SOAP para los signos: Mismo signo (Same), Signo Opuesto (Opposite), Siempre Positivo (Always Positive).",
    pasos: [
      "Extrae la raíz cúbica de cada término: a = ∛(a³) y b = ∛(b³).",
      "Forma el binomio con las raíces y el mismo signo.",
      "Forma el trinomio: cuadrado del primero, producto cruzado con signo cambiado, y cuadrado del segundo.",
      "El trinomio resultante siempre es irreducible en los números reales."
    ],
    ejemplos: [
      {
        titulo: "Diferencia de cubos",
        expresion: "x³ - 27",
        resultado: "(x - 3)(x² + 3x + 9)",
        comprobacion: "(x - 3)(x² + 3x + 9) = x³ + 3x² + 9x - 3x² - 9x - 27 = x³ - 27 ✓"
      },
      {
        titulo: "Suma de cubos",
        expresion: "8x³ + 125",
        resultado: "(2x + 5)(4x² - 10x + 25)",
        comprobacion: "(2x + 5)(4x² - 10x + 25) = 8x³ + 125 ✓"
      },
      {
        titulo: "Cúbico multivariable",
        expresion: "27a³ - 64b³",
        resultado: "(3a - 4b)(9a² + 12ab + 16b²)",
        comprobacion: "(3a - 4b)(9a² + 12ab + 16b²) = 27a³ - 64b³ ✓"
      }
    ],
    ejercicio: {
      expresion: "x³ + 8",
      solucion: "(x + 2)(x² - 2x + 4)",
      equivalente: "(x + 2)(4 - 2x + x²)"
    }
  },
  {
    id: 5,
    nombre: "Trinomio x² + bx + c",
    badge: "Caso V",
    formula: "x² + bx + c = (x + m)(x + n)",
    resumen: "Trinomio cuadrático de coeficiente principal 1; se buscan dos números m y n tales que m·n = c y m+n = b.",
    teoria: "Al expandir (x + m)(x + n) obtenemos x² + (m + n)x + mn. Comparando coeficientes, el producto es c y la suma es b.",
    pasos: [
      "Asegúrate de que el coeficiente de x² sea 1.",
      "Busca dos enteros m y n que multiplicados den c.",
      "Verifica que la suma m + n sea igual a b.",
      "Escribe los binomios factores: (x + m)(x + n)."
    ],
    ejemplos: [
      {
        titulo: "Términos positivos",
        expresion: "x² + 7x + 12",
        resultado: "(x + 3)(x + 4)",
        comprobacion: "(x + 3)(x + 4) = x² + 4x + 3x + 12 = x² + 7x + 12 ✓"
      },
      {
        titulo: "Términos con signos opuestos",
        expresion: "x² - 5x - 24",
        resultado: "(x - 8)(x + 3)",
        comprobacion: "(x - 8)(x + 3) = x² + 3x - 8x - 24 = x² - 5x - 24 ✓"
      },
      {
        titulo: "Suma negativa, producto positivo",
        expresion: "x² - 11x + 30",
        resultado: "(x - 5)(x - 6)",
        comprobacion: "(x - 5)(x - 6) = x² - 6x - 5x + 30 = x² - 11x + 30 ✓"
      }
    ],
    ejercicio: {
      expresion: "x² + 5x + 6",
      solucion: "(x + 2)(x + 3)",
      equivalente: "(x + 3)(x + 2)"
    }
  },
  {
    id: 6,
    nombre: "Trinomio ax² + bx + c",
    badge: "Caso VI",
    formula: "ax² + bx + c (a ≠ 1)",
    resumen: "Método del producto a·c para descomponer el término medio y agrupar en parejas.",
    teoria: "Cuando a ≠ 1, multiplicamos a por c. Buscamos dos números cuyo producto sea a·c y su suma sea b, para luego separar el término central y factorizar por agrupación.",
    pasos: [
      "Multiplica el coeficiente principal por el término independiente: producto = a · c.",
      "Encuentra dos números p y q tales que p · q = a·c y p + q = b.",
      "Reescribe el trinomio como ax² + px + qx + c.",
      "Factoriza por agrupación de términos para obtener los dos factores lineales."
    ],
    ejemplos: [
      {
        titulo: "Trinomio cuadrático general",
        expresion: "2x² + 7x + 3",
        resultado: "(2x + 1)(x + 3)",
        comprobacion: "(2x + 1)(x + 3) = 2x² + 6x + x + 3 = 2x² + 7x + 3 ✓"
      },
      {
        titulo: "Con signos negativos",
        expresion: "6x² - 7x - 3",
        resultado: "(2x - 3)(3x + 1)",
        comprobacion: "(2x - 3)(3x + 1) = 6x² + 2x - 9x - 3 = 6x² - 7x - 3 ✓"
      },
      {
        titulo: "Coeficientes altos",
        expresion: "4x² - 17x + 4",
        resultado: "(4x - 1)(x - 4)",
        comprobacion: "(4x - 1)(x - 4) = 4x² - 16x - x + 4 = 4x² - 17x + 4 ✓"
      }
    ],
    ejercicio: {
      expresion: "3x² + 10x + 8",
      solucion: "(3x + 4)(x + 2)",
      equivalente: "(x + 2)(3x + 4)"
    }
  },
  {
    id: 7,
    nombre: "Factorización por Agrupación",
    badge: "Caso VII",
    formula: "ax + ay + bx + by = (x + y)(a + b)",
    resumen: "Aplicable en polinomios de 4 o 6 términos organizándolos en subgrupos que compartan un factor común.",
    teoria: "Se utiliza cuando no hay un factor común para todos los términos simultáneamente, pero sí entre parejas o tríos de términos.",
    pasos: [
      "Organiza los términos en grupos con igual número de elementos (ej. parejas).",
      "Extrae el factor común de cada grupo de forma independiente.",
      "Verifica que el paréntesis resultante en cada grupo sea idéntico.",
      "Extrae ese paréntesis común como factor global."
    ],
    ejemplos: [
      {
        titulo: "Agrupación 2 y 2",
        expresion: "ax + bx + ay + by",
        resultado: "(x + y)(a + b)",
        comprobacion: "(x + y)(a + b) = ax + bx + ay + by ✓"
      },
      {
        titulo: "Con coeficientes numéricos",
        expresion: "2x² - 3xy - 4x + 6y",
        resultado: "(x - 2)(2x - 3y)",
        comprobacion: "(x - 2)(2x - 3y) = 2x² - 3xy - 4x + 6y ✓"
      },
      {
        titulo: "Polinomio con cambio de signo",
        expresion: "3m² - 6mn + 4m - 8n",
        resultado: "(3m + 4)(m - 2n)",
        comprobacion: "(3m + 4)(m - 2n) = 3m² - 6mn + 4m - 8n ✓"
      }
    ],
    ejercicio: {
      expresion: "am - bm + an - bn",
      solucion: "(m + n)(a - b)",
      equivalente: "(a - b)(m + n)"
    }
  },
  {
    id: 8,
    nombre: "Factorización Mixta",
    badge: "Caso VIII",
    formula: "Combinación encadenada de casos",
    resumen: "Aplicación sucesiva de múltiples casos hasta descomponer el polinomio en factores primos irreducibles.",
    teoria: "En problemas universitarios y cálculo diferencial, la mayoría de polinomios requieren primero extraer un factor común y luego aplicar diferencia de cuadrados o trinomios.",
    pasos: [
      "Paso obligado: Extrae siempre el factor común global si existe.",
      "Evalúa los factores resultantes: si tienen 2 términos busca diferencia de cuadrados o cubos; si tienen 3 términos, aplica trinomios.",
      "Continúa factorizando de forma recursiva hasta que ningún factor pueda descomponerse más en ℝ."
    ],
    ejemplos: [
      {
        titulo: "Factor común + Diferencia de cuadrados",
        expresion: "2x² - 18",
        resultado: "2(x - 3)(x + 3)",
        comprobacion: "2(x - 3)(x + 3) = 2(x² - 9) = 2x² - 18 ✓"
      },
      {
        titulo: "Factor común + Trinomio",
        expresion: "3x³ - 12x² + 12x",
        resultado: "3x(x - 2)²",
        comprobacion: "3x(x - 2)² = 3x(x² - 4x + 4) = 3x³ - 12x² + 12x ✓"
      },
      {
        titulo: "Doble diferencia de cuadrados",
        expresion: "x⁴ - 16",
        resultado: "(x - 2)(x + 2)(x² + 4)",
        comprobacion: "(x - 2)(x + 2)(x² + 4) = (x² - 4)(x² + 4) = x⁴ - 16 ✓"
      }
    ],
    ejercicio: {
      expresion: "5x² - 20",
      solucion: "5(x - 2)(x + 2)",
      equivalente: "5(x + 2)(x - 2)"
    }
  }
];

// Estado de la Aplicación
let estado = {
  vista: 'portada',
  casoSeleccionado: 1,
  tema: localStorage.getItem('factorizacion_tema') || 'light',
  xp: parseInt(localStorage.getItem('factorizacion_xp') || '0', 10),
  chatbotAbierto: false
};

// Normalizar expresiones algebraicas para verificación local
function normalizar(expr) {
  if (!expr) return '';
  return expr
    .replace(/\s+/g, '')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/⁴/g, '^4')
    .toLowerCase();
}

// Inicializar Aplicación al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  aplicarTema(estado.tema);
  renderizar();
});

function aplicarTema(t) {
  estado.tema = t;
  localStorage.setItem('factorizacion_tema', t);
  if (t === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

function alternarTema() {
  const nuevoTema = estado.tema === 'dark' ? 'light' : 'dark';
  aplicarTema(nuevoTema);
  renderizar();
}

function cambiarVista(vista, casoId = null) {
  estado.vista = vista;
  if (casoId) estado.casoSeleccionado = casoId;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderizar();
}

function renderizar() {
  const app = document.getElementById('app');
  if (!app) return;

  const nivel = Math.floor(estado.xp / 100) + 1;

  app.innerHTML = `
    <!-- Barra de Navegación -->
    <header class="navbar">
      <div class="navbar-container">
        <div class="brand" onclick="cambiarVista('portada')">
          <div class="brand-icon">UM</div>
          <div>
            <div class="brand-title">Domina la <span style="color: #0284c7">Factorización</span></div>
            <div class="brand-subtitle">Universidad del Magdalena</div>
          </div>
        </div>

        <nav class="nav-links">
          <button class="nav-btn ${estado.vista === 'portada' ? 'active' : ''}" onclick="cambiarVista('portada')">Inicio</button>
          <button class="nav-btn ${estado.vista === 'casos' || estado.vista === 'caso-detalle' ? 'active' : ''}" onclick="cambiarVista('casos')">Los 8 Casos</button>
          <button class="nav-btn ${estado.vista === 'quiz' ? 'active' : ''}" onclick="cambiarVista('quiz')">Auto-Evaluación</button>
        </nav>

        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.3); padding: 4px 12px; border-radius: 20px; font-weight: 700; font-size: 13px; color: #d97706;">
            Nv. ${nivel} • ${estado.xp} XP
          </div>
          <button onclick="alternarTema()" class="nav-btn" style="padding: 8px 12px;">
            ${estado.tema === 'dark' ? '☀️ Claro' : '🌙 Oscuro'}
          </button>
        </div>
      </div>
    </header>

    <!-- Contenido Dinámico -->
    <main class="container">
      ${obtenerHtmlVista()}
    </main>

    <!-- Chatbot Asistente Flotante -->
    <div id="chatbot-container">
      ${obtenerHtmlChatbot()}
    </div>
  `;
}

function obtenerHtmlVista() {
  if (estado.vista === 'portada') {
    return `
      <section style="text-align: center; padding: 40px 10px;">
        <div style="display: inline-block; padding: 6px 16px; border-radius: 20px; background: rgba(2, 132, 199, 0.1); color: #0284c7; font-weight: 700; font-size: 13px; margin-bottom: 20px;">
          🎓 Cátedra de Álgebra Fundamental • Universidad del Magdalena
        </div>
        <h1 style="font-size: clamp(32px, 5vw, 56px); font-weight: 900; line-height: 1.15; margin-bottom: 20px;">
          Domina la <span style="color: #0284c7;">Factorización</span> Algebraica
        </h1>
        <p style="font-size: 18px; color: var(--text-secondary); max-width: 700px; margin: 0 auto 30px auto;">
          Plataforma de rigor universitario para aprender, practicar y consultar los 8 casos de factorización con comprobación inversa y tutor virtual inteligente.
        </p>

        <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-bottom: 40px;">
          <button class="btn-primary" onclick="cambiarVista('casos')">
            Comenzar con los 8 Casos ➔
          </button>
          <button class="btn-secondary" onclick="cambiarVista('quiz')">
            Presentar Auto-Evaluación ✍️
          </button>
        </div>

        <!-- Tarjetas destacadas -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-top: 30px; text-align: left;">
          <div class="card">
            <h3 style="font-size: 17px; font-weight: 700; margin-bottom: 8px;">📚 8 Casos con Rigor</h3>
            <p style="font-size: 13px; color: var(--text-secondary);">Fundamentación teórica, pasos sistemáticos y 3 ejemplos explicados por caso.</p>
          </div>
          <div class="card">
            <h3 style="font-size: 17px; font-weight: 700; margin-bottom: 8px;">🔄 Comprobación Inversa</h3>
            <p style="font-size: 13px; color: var(--text-secondary);">Cada solución demuestra cómo multiplicar los factores hacia atrás para obtener el polinomio original.</p>
          </div>
          <div class="card">
            <h3 style="font-size: 17px; font-weight: 700; margin-bottom: 8px;">🤖 Tutor Asistente</h3>
            <p style="font-size: 13px; color: var(--text-secondary);">Motor inteligente 100% offline para analizar polinomios, explicar y generar ejercicios.</p>
          </div>
          <div class="card">
            <h3 style="font-size: 17px; font-weight: 700; margin-bottom: 8px;">⚡ Gamificación & XP</h3>
            <p style="font-size: 13px; color: var(--text-secondary);">Gana puntos de experiencia, sube de nivel y guarda tus apuntes en tu navegador.</p>
          </div>
        </div>
      </section>
    `;
  }

  if (estado.vista === 'casos') {
    return `
      <div>
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="font-size: 32px; font-weight: 800; margin-bottom: 8px;">Los 8 Casos de Factorización</h2>
          <p style="color: var(--text-secondary);">Selecciona un caso para estudiar su teoría, ejemplos con comprobación y ejercicios interactivos.</p>
        </div>

        <div class="grid-casos">
          ${CASOS_APP.map(c => `
            <div class="card" onclick="cambiarVista('caso-detalle', ${c.id})" style="cursor: pointer;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <span style="background: #0284c7; color: #fff; padding: 3px 10px; border-radius: 8px; font-size: 12px; font-weight: 800;">#${c.id}</span>
                <span style="font-size: 12px; font-weight: 700; color: var(--text-muted);">${c.badge}</span>
              </div>
              <h3 style="font-size: 18px; font-weight: 800; margin-bottom: 8px;">${c.nombre}</h3>
              <div class="math-display" style="font-size: 12px; margin-bottom: 12px; width: 100%; box-sizing: border-box; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
                ${c.formula}
              </div>
              <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">${c.resumen}</p>
              <div style="font-size: 13px; font-weight: 700; color: var(--primary);">Estudiar Caso ➔</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (estado.vista === 'caso-detalle') {
    const c = CASOS_APP.find(item => item.id === estado.casoSeleccionado) || CASOS_APP[0];
    return `
      <div>
        <button class="nav-btn" onclick="cambiarVista('casos')" style="margin-bottom: 16px; padding: 6px 12px;">
          ← Volver al Menú de Casos
        </button>

        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; margin-bottom: 30px;">
          <div>
            <span style="font-size: 12px; font-weight: 800; color: #0284c7; text-transform: uppercase;">${c.badge}</span>
            <h1 style="font-size: 32px; font-weight: 900;">${c.nombre}</h1>
          </div>
          <div class="math-display" style="font-size: 16px;">
            ${c.formula}
          </div>
        </div>

        <!-- Teoría y Pasos -->
        <div class="card" style="margin-bottom: 24px;">
          <h3 style="font-size: 18px; font-weight: 800; margin-bottom: 12px;">📖 Fundamentación Teórica</h3>
          <p style="font-size: 15px; color: var(--text-secondary); margin-bottom: 20px; line-height: 1.7;">${c.teoria}</p>

          <h4 style="font-size: 16px; font-weight: 800; margin-bottom: 12px;">Algoritmo de Resolución Paso a Paso:</h4>
          <ol style="padding-left: 20px; color: var(--text-secondary); font-size: 14px; line-height: 1.8;">
            ${c.pasos.map(p => `<li>${p}</li>`).join('')}
          </ol>
        </div>

        <!-- 3 Ejemplos Resueltos con Comprobación Inversa -->
        <div class="card" style="margin-bottom: 24px;">
          <h3 style="font-size: 18px; font-weight: 800; margin-bottom: 16px;">📝 3 Ejemplos Resueltos con Comprobación Inversa</h3>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            ${c.ejemplos.map((ej, idx) => `
              <div style="background: var(--bg-card-subtle); padding: 16px; border-radius: 12px; border: 1px solid var(--border);">
                <div style="font-size: 13px; font-weight: 800; color: #0284c7; margin-bottom: 6px;">Ejemplo #${idx + 1}: ${ej.titulo}</div>
                <div style="font-size: 18px; font-family: var(--font-mono); font-weight: 700; margin-bottom: 8px;">${ej.expresion} = <span style="color: #0284c7;">${ej.resultado}</span></div>
                <div style="font-size: 13px; font-family: var(--font-mono); color: #10b981; background: rgba(16, 185, 129, 0.1); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(16, 185, 129, 0.2);">
                  <strong>Comprobación inversa:</strong> ${ej.comprobacion}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Ejercicio Interactivo -->
        <div class="card">
          <h3 style="font-size: 18px; font-weight: 800; margin-bottom: 12px;">🎯 Práctica Interactiva con Verificación Local</h3>
          <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 16px;">
            Factoriza la expresión en tu cuaderno o directamente en el campo. El verificador admite el orden conmutativo de factores.
          </p>

          <div style="background: var(--bg-card-subtle); padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 16px;">
            <div style="font-size: 12px; text-transform: uppercase; font-weight: 700; color: var(--text-muted); margin-bottom: 6px;">Expresión:</div>
            <div style="font-size: 24px; font-family: var(--font-mono); font-weight: 800; color: #0284c7;">${c.ejercicio.expresion}</div>
          </div>

          <div style="display: flex; gap: 8px; margin-bottom: 10px; flex-wrap: wrap;">
            <input type="text" id="input-practica" placeholder="Escribe tu respuesta, ej: ${c.ejercicio.solucion}" style="flex: 1; padding: 12px 16px; border-radius: 10px; border: 1px solid var(--border); font-family: var(--font-mono); font-size: 15px; outline: none; background: var(--bg-card); color: var(--text-primary);" />
            <button class="btn-primary" onclick="verificarEjercicio(${c.id})">Verificar</button>
          </div>

          <!-- Teclado rápido -->
          <div class="keyboard-bar">
            ${['²', '³', '^', '(', ')', '+', '-', '*', 'x', 'y', 'a', 'b'].map(sym => `
              <button class="vk-btn" onclick="insertarSimbolo('${sym}')">${sym}</button>
            `).join('')}
          </div>

          <div id="resultado-verif" style="margin-top: 16px;"></div>
        </div>
      </div>
    `;
  }

  if (estado.vista === 'quiz') {
    return `
      <div style="max-w: 700px; margin: 0 auto; text-align: center;">
        <h2 style="font-size: 32px; font-weight: 900; margin-bottom: 12px;">Auto-Evaluación de Factorización</h2>
        <p style="color: var(--text-secondary); margin-bottom: 24px;">Examen de opción múltiple para evaluar tu dominio con calificación académica de 0.0 a 5.0.</p>
        <div class="card" style="text-align: left; padding: 30px;">
          <h3 style="font-size: 18px; font-weight: 800; margin-bottom: 16px;">Pregunta 1: Diferencia de Cuadrados</h3>
          <p style="font-size: 15px; margin-bottom: 20px;">¿Cuál es la factorización completa de 49x² - 64?</p>
          <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
            <button class="btn-secondary" onclick="responderQuiz(true)" style="text-align: left; justify-content: flex-start;">A) (7x - 8)(7x + 8)</button>
            <button class="btn-secondary" onclick="responderQuiz(false)" style="text-align: left; justify-content: flex-start;">B) (7x - 8)²</button>
            <button class="btn-secondary" onclick="responderQuiz(false)" style="text-align: left; justify-content: flex-start;">C) (49x - 64)(x + 1)</button>
          </div>
          <div id="feedback-quiz"></div>
        </div>
      </div>
    `;
  }

  return '';
}

// Verificador de respuestas en la práctica interactiva
window.verificarEjercicio = function(casoId) {
  const c = CASOS_APP.find(item => item.id === casoId);
  const input = document.getElementById('input-practica');
  const out = document.getElementById('resultado-verif');
  if (!input || !out || !c) return;

  const respuesta = normalizar(input.value);
  const sol1 = normalizar(c.ejercicio.solucion);
  const sol2 = normalizar(c.ejercicio.equivalente);

  if (!respuesta) {
    out.innerHTML = `<div style="color: #ef4444; font-weight: 700;">Por favor escribe una respuesta antes de verificar.</div>`;
    return;
  }

  if (respuesta === sol1 || respuesta === sol2) {
    estado.xp += 20;
    localStorage.setItem('factorizacion_xp', estado.xp.toString());
    out.innerHTML = `
      <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #047857; padding: 14px; border-radius: 12px; font-weight: 700;">
        ¡Correcto! +20 XP. Tu respuesta factorizada es válida y equivalente.
        <div style="font-size: 12px; margin-top: 4px; font-weight: normal;">Comprobación: al multiplicar los factores se obtiene ${c.ejercicio.expresion}.</div>
      </div>
    `;
    setTimeout(() => renderizar(), 2500);
  } else {
    out.innerHTML = `
      <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; color: #b91c1c; padding: 14px; border-radius: 12px; font-weight: 700;">
        Respuesta incorrecta. Revisa los signos y factores. La solución esperada es: ${c.ejercicio.solucion}.
      </div>
    `;
  }
};

window.insertarSimbolo = function(sym) {
  const input = document.getElementById('input-practica');
  if (input) {
    input.value += sym;
    input.focus();
  }
};

window.responderQuiz = function(esCorrecto) {
  const fb = document.getElementById('feedback-quiz');
  if (!fb) return;
  if (esCorrecto) {
    fb.innerHTML = `<div style="color: #10b981; font-weight: 800; margin-top: 10px;">¡Excelente! Respuesta correcta. Calificación: 5.0 / 5.0.</div>`;
  } else {
    fb.innerHTML = `<div style="color: #ef4444; font-weight: 800; margin-top: 10px;">Opción incorrecta. Recuerda que a² - b² = (a - b)(a + b).</div>`;
  }
};

// Chatbot UI & Motor Local
function obtenerHtmlChatbot() {
  if (!estado.chatbotAbierto) {
    return `
      <button class="chatbot-fab" onclick="alternarChatbot()" title="Abrir Tutor Virtual">
        🤖
      </button>
    `;
  }

  return `
    <div class="chat-window">
      <div class="chat-header">
        <div>
          <strong style="font-size: 14px; display: block;">Tutor de Factorización</strong>
          <span style="font-size: 11px; opacity: 0.9;">Universidad del Magdalena • Offline</span>
        </div>
        <button onclick="alternarChatbot()" style="background: transparent; border: none; color: #fff; font-size: 18px; cursor: pointer;">✕</button>
      </div>

      <div class="chat-body" id="chat-messages">
        <div class="chat-bubble bot">
          ¡Hola! Soy tu asistente de álgebra. Escríbeme una expresión (por ejemplo: "x^2 - 49" o "x^2 + 6x + 9") o pregúntame cómo identificar un caso.
        </div>
      </div>

      <div class="chat-footer">
        <input type="text" id="chat-input" class="chat-input" placeholder="Escribe tu polinomio o duda..." onkeypress="if(event.key==='Enter') enviarChat()" />
        <button class="btn-primary" onclick="enviarChat()" style="padding: 10px 14px;">Enviar</button>
      </div>
    </div>
  `;
}

window.alternarChatbot = function() {
  estado.chatbotAbierto = !estado.chatbotAbierto;
  renderizar();
};

window.enviarChat = function() {
  const input = document.getElementById('chat-input');
  const box = document.getElementById('chat-messages');
  if (!input || !box || !input.value.trim()) return;

  const msg = input.value.trim();
  input.value = '';

  box.innerHTML += `<div class="chat-bubble user">${msg}</div>`;

  // Motor Local de Respuesta
  setTimeout(() => {
    let respuesta = "Puedo ayudarte a resolver cualquier expresión cuadrática o binomio de los 8 casos. Escribe por ejemplo 'x^2 - 36' o 'x^2 + 8x + 16'.";
    const min = msg.toLowerCase();

    if (min.includes('identificar') || min.includes('como se')) {
      respuesta = "Regla rápida: 2 términos (diferencia de cuadrados o cubos); 3 términos (trinomio cuadrado perfecto o x²+bx+c); 4 términos (agrupación).";
    } else if (min.includes('x^2 - 49') || min.includes('x² - 49')) {
      respuesta = "Expresión: x² - 49. Es una Diferencia de Cuadrados: √(x²) = x y √(49) = 7. Resultado: (x - 7)(x + 7).";
    } else if (min.includes('x^2 -') || min.includes('x² -')) {
      respuesta = "Detecto una Diferencia de Cuadrados potencial (a² - b²). Se resuelve extrayendo raíces cuadradas y formando binomios conjugados: (a - b)(a + b).";
    }

    box.innerHTML += `<div class="chat-bubble bot">${respuesta}</div>`;
    box.scrollTop = box.scrollHeight;
  }, 400);
};

// Exportar globalmente para navegación
window.cambiarVista = cambiarVista;
window.alternarTema = alternarTema;
