# 🎓 DOMINA LA FACTORIZACIÓN — GUÍA COMPLETA Y MANUAL DE USO (LEAME)

**Universidad del Magdalena — Facultad de Ingeniería**
**Cátedra de Álgebra Fundamental y Matemáticas para Ingeniería**
**Licencia:** MIT (Software Libre y Educativo)

---

## 📌 1. RESUMEN DEL PROYECTO

"Domina la Factorización" es una aplicación web interactiva de alto rigor matemático diseñada para que estudiantes universitarios aprendan, practiquen y consulten los **8 casos fundamentales de factorización algebraica**.

La aplicación funciona **100% en el navegador**, sin necesidad obligatoria de backend ni conexión a internet para el verificador de respuestas y el asistente virtual local.

---

## 🧮 2. LOS 8 CASOS DE FACTORIZACIÓN IMPLEMENTADOS

Cada caso cuenta con su fundamentación teórica, algoritmo ordenado de pasos, 3 ejemplos con comprobación inversa y ejercicios progresivos (fácil, medio, difícil):

1. **Factor Común (Monomio y Polinomio)**:
   - Identificación del Máximo Común Divisor (MCD) numérico y literales de menor exponente.
   - Fórmula: $a \cdot x + a \cdot y = a(x + y)$.
2. **Diferencia de Cuadrados**:
   - Binomios con dos cuadrados perfectos separados por resta.
   - Fórmula: $a^2 - b^2 = (a - b)(a + b)$.
3. **Trinomio Cuadrado Perfecto (TCP)**:
   - Verificación de raíces en los extremos y del término central $2ab$.
   - Fórmula: $a^2 \pm 2ab + b^2 = (a \pm b)^2$.
4. **Suma y Diferencia de Cubos**:
   - Binomio por trinomio con regla nemotécnica de signos "SOAP".
   - Fórmula: $a^3 \pm b^3 = (a \pm b)(a^2 \mp ab + b^2)$.
5. **Trinomio de la forma $x^2 + bx + c$**:
   - Descomposición en factores $(x + m)(x + n)$ donde $m \cdot n = c$ y $m + n = b$.
6. **Trinomio de la forma $ax^2 + bx + c$ ($a \neq 1$)**:
   - Descomposición del término medio mediante el método del producto $a \cdot c$.
7. **Factorización por Agrupación de Términos**:
   - Polinomios de 4 o 6 términos organizados en subgrupos con factor común parcial.
8. **Factorización Mixta (Casos Combinados)**:
   - Estrategia integral: Factor común inicial ➔ Diferencia/Trinomio ➔ Factores irreducibles en $\mathbb{R}$.

---

## 💻 3. INSTALACIÓN Y EJECUCIÓN LOCAL

Para ejecutar el proyecto en tu computadora:

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor local de desarrollo
npm run dev

# 3. Compilar para producción (carpeta dist/)
npm run build
```

---

## 🚀 4. INSTRUCCIONES PASO A PASO PARA SUBIR A GITHUB

Ejecuta los siguientes comandos en tu terminal (PowerShell o Git Bash):

```bash
# 1. Inicializar el repositorio Git
git init

# 2. Crear la rama principal 'main'
git branch -M main

# 3. Agregar todos los archivos
git add .

# 4. Crear el commit de inicio
git commit -m "feat: Lanzamiento de la plataforma Domina la Factorización"

# 5. Crear el repositorio en GitHub (a través de tu navegador en https://github.com/new)
# Nombre sugerido: dominando-la-factorizacion

# 6. Conectar el repositorio remoto (reemplaza TU_USUARIO por tu cuenta de GitHub)
git remote add origin https://github.com/TU_USUARIO/dominando-la-factorizacion.git

# 7. Subir el proyecto a GitHub
git push -u origin main
```

---

## 🌐 5. DESPLIEGUE EN GITHUB PAGES

El proyecto incluye el archivo de flujo de trabajo `.github/workflows/deploy.yml`:

1. Ingresa a tu repositorio en GitHub y ve a **Settings** (Configuración).
2. En la barra izquierda, selecciona **Pages**.
3. En la sección **Build and deployment** ➔ **Source**, elige **GitHub Actions**.
4. ¡Listo! Cada vez que hagas `git push origin main`, GitHub compilará y publicará la web automáticamente.
5. El enlace público será: `https://TU_USUARIO.github.io/dominando-la-factorizacion/`

---

## 🤖 6. CHATBOT ASISTENTE: MOTOR LOCAL VS. MODO IA

- **Motor Local (Siempre activo)**: Algoritmo en JavaScript que detecta la estructura del polinomio, resuelve paso a paso, genera ejercicios y da pistas sin necesidad de internet ni API keys.
- **Modo IA Seguro**: Para proteger tu clave secreta de OpenAI o Gemini, **NUNCA** coloques la clave en el frontend. Crea un endpoint proxy en Cloudflare Workers o Vercel y configura la variable en un archivo `.env`:
  ```env
  VITE_API_URL=https://tu-proxy-privado.workers.dev/api/chat
  ```
  Si no hay internet o el proxy no responde, el asistente regresa automáticamente al motor local.

---

## 📁 7. ARQUITECTURA DE ARCHIVOS

- `src/components/`: Portada, Navbar, MenuCasos, CasoFactorizacion, Ejercicio, Quiz, Chatbot, Glosario, Logros.
- `src/data/`: casos.js, ejercicios.js, glosario.js.
- `src/utils/`: factorizador.js (motor algebraico), verificador.js (evaluador de equivalencia).
- `src/styles/`: index.css.
- `LEAME.MD`, `README.md`, `APP.JS`, `INDICE.HTML`, `ESTILOS.CSS`.
