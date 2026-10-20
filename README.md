# 🎓 Domina la Factorización — Plataforma Educativa Interactiva

[![Licencia: MIT](https://img.shields.io/badge/Licencia-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Universidad del Magdalena](https://img.shields.io/badge/Universidad_del_Magdalena-Facultad_de_Ingeniería-002855.svg)](https://www.unimagdalena.edu.co/)

> **"Domina la Factorización"** es una aplicación web interactiva, moderna y con total rigor matemático diseñada para estudiantes de pregrado (cálculo, álgebra lineal, matemáticas fundamentales e ingeniería) de la **Universidad del Magdalena** y la comunidad académica abierta.

---

## 🌟 Características Principales

1. **Los 8 Casos Fundamentales de Factorización**:
   - Cada caso incluye: **Fundamentación teórica** ➔ **Algoritmo de resolución paso a paso** ➔ **3 ejemplos resueltos con comprobación inversa en pantalla** ➔ **Práctica interactiva progresiva (Fácil, Medio, Difícil)**.
2. **Verificador de Respuestas Local e Inteligente**:
   - No requiere conexión a internet ni servidores externos.
   - Normaliza automáticamente la notación matemática y los espacios.
   - **Admite permutación de factores** (propiedad conmutativa: $(x+2)(x-3) \equiv (x-3)(x+2)$).
   - Detecta errores frecuentes (ej. escribir el polinomio expandido sin factorizar, olvidar signos del término central).
3. **Comprobación Matemática Inversa**:
   - Cada ejercicio y ejemplo demuestra en tiempo real la multiplicación de los factores de vuelta para recuperar con exactitud el polinomio original.
4. **Tutor Virtual / Chatbot Asistente (Dos Capas)**:
   - **Motor Local de Reglas (100% Offline)**: Identifica el caso de cualquier polinomio que escribas, lo factoriza paso a paso, explica conceptos y genera ejercicios aleatorios.
   - **Modo IA Opcional**: Conectable a cualquier LLM mediante la variable `VITE_API_URL` a través de un proxy seguro (sin exponer API keys en el frontend).
5. **Gamificación y Cuaderno Personal**:
   - Sistema de Puntos de Experiencia (XP), niveles e insignias académicas desbloqueables.
   - Auto-Evaluación (Quiz) integral con nota académica de 0.0 a 5.0 (escala colombiana) y porcentaje.
   - Cuaderno de notas personal por caso guardado en `localStorage`.
   - Soporte total para **Modo Claro / Modo Oscuro** y diseño adaptable a móviles, tabletas y computadores.

---

## 📐 Los 8 Casos Cubiertos

| # | Caso de Factorización | Fórmula Canónica | Nivel |
|---|----------------------|------------------|-------|
| 1 | **Factor Común** (Monomio y Polinomio) | $a \cdot x + a \cdot y = a(x + y)$ | Fundamental |
| 2 | **Diferencia de Cuadrados** | $a^2 - b^2 = (a - b)(a + b)$ | Binomio Cuadrático |
| 3 | **Trinomio Cuadrado Perfecto (TCP)** | $a^2 \pm 2ab + b^2 = (a \pm b)^2$ | Trinomio Especial |
| 4 | **Suma y Diferencia de Cubos** | $a^3 \pm b^3 = (a \pm b)(a^2 \mp ab + b^2)$ | Binomios Cúbicos |
| 5 | **Trinomio de la forma $x^2 + bx + c$** | $(x + m)(x + n)$ donde $m \cdot n = c$ y $m + n = b$ | Coeficiente Unitario |
| 6 | **Trinomio de la forma $ax^2 + bx + c$** | Método del producto $a \cdot c$ y descomposición media | Coeficiente $a \neq 1$ |
| 7 | **Factorización por Agrupación de Términos** | $ax + ay + bx + by = (x + y)(a + b)$ | Polinomios 4+ términos |
| 8 | **Factorización Mixta (Casos Combinados)** | Factor Común ➔ Diferencia/Trinomio ➔ Factores Primos | Nivel Avanzado |

---

## 📂 Estructura del Proyecto

```text
dominando-la-factorizacion/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Workflow de GitHub Actions para despliegue automático
├── public/
│   ├── favicon.svg             # Favicon vectorial con gradientes
│   └── logo.svg                # Escudo oficial estilizado Unimagdalena
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Barra superior, niveles XP, racha y switch dark/light
│   │   ├── Portada.jsx         # Hero, créditos Unimagdalena y llamada a la acción
│   │   ├── MenuCasos.jsx       # Cuadrícula interactiva con los 8 casos
│   │   ├── CasoFactorizacion.jsx # Vista completa (teoría, pasos, 3 ejemplos, notas)
│   │   ├── Ejercicio.jsx       # Resolvedor con teclado matemático virtual y pistas
│   │   ├── Quiz.jsx            # Examen de autoevaluación con nota de 0 a 5.0
│   │   ├── Chatbot.jsx         # Tutor flotante con motor local y fallback de IA
│   │   ├── GlosarioModal.jsx   # Diccionario algebraico con buscador en tiempo real
│   │   └── LogrosModal.jsx     # Insignias universitarias desbloqueadas
│   ├── data/
│   │   ├── casos.js            # Teoría matemática, pasos y ejemplos comprobados
│   │   ├── ejercicios.js       # 24 ejercicios verificados (fácil, medio, difícil)
│   │   └── glosario.js         # Glosario con definiciones formales y ejemplos
│   ├── styles/
│   │   └── index.css           # Estilos base, fuentes matemáticas y animaciones
│   ├── utils/
│   │   ├── factorizador.js     # Motor algorítmico local de análisis y resolución
│   │   └── verificador.js      # Verificador de equivalencia algebraica Monte Carlo
│   ├── App.jsx                 # Componente raíz con control de estado y persistencia
│   └── main.jsx                # Punto de entrada de React 18
├── index.html                  # HTML principal de Vite
├── vite.config.js              # Configuración de Vite con rutas relativas para GitHub Pages
├── tailwind.config.js          # Configuración de colores y tipografía de Tailwind
├── postcss.config.js           # Procesamiento de Tailwind y Autoprefixer
├── package.json                # Dependencias y scripts de ejecución
├── LICENSE                     # Licencia MIT
└── README.md                   # Documentación completa del proyecto
```

---

## 🚀 Instalación y Ejecución Local

### Prerrequisitos
- [Node.js](https://nodejs.org/) (versión 18 o superior).
- Gestor de paquetes `npm`.

### Pasos
1. Clonar el repositorio o descargar la carpeta del proyecto:
   ```bash
   git clone https://github.com/tu-usuario/dominando-la-factorizacion.git
   cd dominando-la-factorizacion
   ```
2. Instalar las dependencias:
   ```bash
   npm install
   ```
3. Iniciar el servidor de desarrollo local:
   ```bash
   npm run dev
   ```
4. Abre tu navegador web en la dirección indicada por la consola (usualmente `http://localhost:5173`).

---

## 🤖 Configuración del Chatbot (Motor Local vs. Modo IA)

Por defecto, el Chatbot opera **100% de manera autónoma en el navegador** utilizando los algoritmos en [`src/utils/factorizador.js`](src/utils/factorizador.js). Es capaz de:
- Identificar casos de polinomios escritos por el usuario.
- Factorizar paso a paso con comprobación.
- Explicar teoría y dar pistas contextuales.
- Generar nuevos ejercicios.

### ¿Cómo activar el Modo IA con un Proxy Seguro?
Por directrices estrictas de seguridad web, **NUNCA debes incluir tu clave privada de OpenAI, Google Gemini o Anthropic en el código frontend de React**, ya que cualquier persona podría verla inspeccionando el código fuente en GitHub Pages.

Para conectar un modelo de lenguaje:
1. Crea un pequeño backend serverless gratuito (por ejemplo, en **Cloudflare Workers**, **Vercel Functions** o **Netlify Functions**).
2. En dicho proxy guardas tu variable secreta de entorno `API_KEY` y reenvías la solicitud del usuario al modelo.
3. En tu proyecto de React, crea un archivo `.env` en la raíz:
   ```env
   VITE_API_URL=https://tu-proxy-seguro.workers.dev/chat
   ```
4. Si la conexión falla, se corta el internet o la URL no está configurada, el Chatbot **vuelve automáticamente al motor local** sin mostrar errores al estudiante.

---

## 🌐 Publicación en GitHub y Despliegue en GitHub Pages

Para publicar tu proyecto en GitHub y que quede accesible en internet mediante GitHub Pages:

### Paso 1: Inicializar el repositorio Git local
Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
# 1. Inicializar git
git init

# 2. Configurar la rama principal como 'main'
git branch -M main

# 3. Agregar todos los archivos al seguimiento
git add .

# 4. Crear el primer commit
git commit -m "feat: Versión inicial completa de Domina la Factorización"
```

### Paso 2: Crear el repositorio en GitHub
1. Entra a tu cuenta en [GitHub.com](https://github.com) y pulsa en **"New repository"**.
2. Dale por nombre `dominando-la-factorizacion` (o el nombre de tu preferencia).
3. Selecciona visibilidad **Public** y **no** marques "Initialize with README" (ya lo tenemos creado).
4. Haz clic en **Create repository**.

### Paso 3: Conectar el repositorio local con GitHub y subirlo
Copia la URL de tu nuevo repositorio y ejecuta en tu terminal:

```bash
# 1. Vincular el remoto origin (reemplaza TU_USUARIO por tu nombre de usuario en GitHub)
git remote add origin https://github.com/TU_USUARIO/dominando-la-factorizacion.git

# 2. Subir tu código a la rama main
git push -u origin main
```

### Paso 4: Activar GitHub Pages en el repositorio
1. En GitHub, ve a la pestaña **Settings** de tu repositorio.
2. En el menú lateral izquierdo, haz clic en **Pages**.
3. En **Build and deployment** ➔ **Source**, selecciona:
   **GitHub Actions** (en lugar de "Deploy from a branch").
4. El archivo [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) incluido en el proyecto compilará y desplegará la web automáticamente en pocos segundos.
5. Tu sitio estará disponible en una URL como:
   `https://TU_USUARIO.github.io/dominando-la-factorizacion/`

---

## 🤝 Cómo Contribuir

¡Las contribuciones de la comunidad docente y estudiantil son bienvenidas!
1. Haz un Fork del proyecto.
2. Crea tu rama de características (`git checkout -b feature/NuevoCasoOEjercicios`).
3. Realiza tus cambios con rigor matemático (`git commit -m 'Add: Nuevos ejercicios de factorización mixta'`).
4. Haz push a tu rama (`git push origin feature/NuevoCasoOEjercicios`).
5. Abre un Pull Request.

---

## 📜 Licencia y Créditos

Este software está licenciado bajo la [Licencia MIT](LICENSE).

Desarrollado con dedicación para los estudiantes de la **Universidad del Magdalena (Santa Marta, Colombia)** como herramienta pedagógica de acceso libre para la excelencia matemática.
