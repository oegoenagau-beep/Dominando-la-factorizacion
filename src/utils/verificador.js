/**
 * Verificador algebraico local para evaluar respuestas de factorización.
 * Normaliza expresiones, admite permutación de factores, signos equivalentes y exponentes.
 */

// Mapeo de superíndices a notación estándar con ^
const SUPERSCRIPTS = {
  '⁰': '^0', '¹': '^1', '²': '^2', '³': '^3', '⁴': '^4',
  '⁵': '^5', '⁶': '^6', '⁷': '^7', '⁸': '^8', '⁹': '^9'
};

/**
 * Normaliza una cadena matemática eliminando espacios y convirtiendo superíndices.
 */
export function normalizarExpresion(str) {
  if (!str) return '';
  let res = str.trim();

  // Reemplazar superíndices unicode
  for (const [sup, exp] of Object.entries(SUPERSCRIPTS)) {
    res = res.replaceAll(sup, exp);
  }

  // Eliminar espacios
  res = res.replace(/\s+/g, '');

  // Convertir corchetes a paréntesis
  res = res.replace(/\[/g, '(').replace(/\]/g, ')');

  // Normalizar multiplicaciones implícitas entre paréntesis: )( -> )*(
  res = res.replace(/\)\(/g, ')*(');

  // Normalizar número o letra pegada a paréntesis: 2( -> 2*( , x( -> x*(
  res = res.replace(/([0-9a-zA-Z])\(/g, '$1*(');
  res = res.replace(/\)([0-9a-zA-Z])/g, ')*$1');

  return res;
}

/**
 * Divide una expresión en factores principales de nivel superior (separados por *).
 */
export function extraerFactoresPrincipales(expr) {
  const norm = normalizarExpresion(expr);
  const factores = [];
  let depth = 0;
  let actual = '';

  for (let i = 0; i < norm.length; i++) {
    const c = norm[i];
    if (c === '(') {
      depth++;
      actual += c;
    } else if (c === ')') {
      depth--;
      actual += c;
    } else if (c === '*' && depth === 0) {
      if (actual) factores.push(actual);
      actual = '';
    } else {
      actual += c;
    }
  }
  if (actual) factores.push(actual);
  return factores;
}

/**
 * Comprueba si una expresión tiene signos + o - por fuera de paréntesis
 * (lo que delata que NO está factorizada, sino expandida).
 */
export function tieneOperadoresEnNivelSuperior(expr) {
  const norm = normalizarExpresion(expr);
  let depth = 0;
  for (let i = 0; i < norm.length; i++) {
    const c = norm[i];
    if (c === '(') depth++;
    else if (c === ')') depth--;
    else if (depth === 0) {
      // Ignorar un signo inicial negativo al principio de la expresión
      if (i > 0 && (c === '+' || c === '-')) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Normaliza un factor individual simplificando términos lineales por ejemplo (x + 3) vs (3 + x)
 */
function normalizarFactorSimple(factor) {
  let f = factor;
  // Quitar paréntesis envolventes si abarcan todo el factor sin exponente
  if (f.startsWith('(') && f.endsWith(')')) {
    let depth = 0;
    let soloUnBloque = true;
    for (let i = 0; i < f.length - 1; i++) {
      if (f[i] === '(') depth++;
      else if (f[i] === ')') depth--;
      if (depth === 0) {
        soloUnBloque = false;
        break;
      }
    }
    if (soloUnBloque) {
      f = f.slice(1, -1);
    }
  }

  // Manejar potencia: e.g. (x+5)^2
  const matchPow = f.match(/^\((.+)\)\^2$/);
  if (matchPow) {
    return `[${normalizarFactorSimple(matchPow[1])}]^2`;
  }

  return f;
}

/**
 * Evalúa numéricamente una expresión para valores dados de variables.
 * Utilizado para verificación de equivalencia algebraica mediante muestreo Monte Carlo.
 */
function evaluarExpresion(expr, vars = { x: 2.3, y: 1.7, a: 3.1, b: 2.5, m: 1.9, n: 4.2 }) {
  try {
    let codigo = normalizarExpresion(expr);

    // Reemplazar operadores de potencia ^ por **
    codigo = codigo.replace(/\^/g, '**');

    // Reemplazar multiplicación implícita que haya quedado
    // Reemplazar variables con sus valores
    const ordenVariables = ['x', 'y', 'a', 'b', 'm', 'n'];
    for (const v of ordenVariables) {
      if (vars[v] !== undefined) {
        // Reemplazar la variable sola asegurando que no forme parte de otra palabra
        const reg = new RegExp(`\\b${v}\\b`, 'g');
        codigo = codigo.replace(reg, `(${vars[v]})`);
      }
    }

    // Evaluar de forma segura
    // Solo permitimos números, operadores matemáticos y paréntesis
    if (!/^[0-9+\-*/().\s*]+$/.test(codigo)) {
      return null;
    }

    // eslint-disable-next-line no-new-func
    const fn = new Function(`return (${codigo});`);
    const val = fn();
    return typeof val === 'number' && !isNaN(val) && isFinite(val) ? val : null;
  } catch {
    return null;
  }
}

/**
 * Función principal de verificación de respuestas.
 * Retorna { esCorrecto, mensaje, tipo }
 */
export function verificarRespuesta(inputUsuario, ejercicio) {
  if (!inputUsuario || !inputUsuario.trim()) {
    return {
      esCorrecto: false,
      mensaje: 'Por favor escribe tu respuesta antes de verificar.',
      tipo: 'vacio'
    };
  }

  const limpioUsuario = normalizarExpresion(inputUsuario);
  const solucionOficial = normalizarExpresion(ejercicio.solucion);

  // 1. Verificación contra la solución canónica exacta
  if (limpioUsuario === solucionOficial) {
    return {
      esCorrecto: true,
      mensaje: '¡Excelente! Respuesta matemáticamente perfecta y canónica.',
      tipo: 'exacto'
    };
  }

  // 2. Verificación contra la lista de soluciones equivalentes registradas
  if (ejercicio.solucionesEquivalentes && ejercicio.solucionesEquivalentes.length > 0) {
    for (const eq of ejercicio.solucionesEquivalentes) {
      if (limpioUsuario === normalizarExpresion(eq)) {
        return {
          esCorrecto: true,
          mensaje: '¡Correcto! Tu respuesta es completamente válida y equivalente.',
          tipo: 'equivalente'
        };
      }
    }
  }

  // 3. Verificación de permutación de factores (conmutatividad del producto)
  const factoresUsuario = extraerFactoresPrincipales(inputUsuario).map(normalizarFactorSimple).sort();
  const factoresSolucion = extraerFactoresPrincipales(ejercicio.solucion).map(normalizarFactorSimple).sort();

  if (factoresUsuario.length === factoresSolucion.length && factoresUsuario.length > 1) {
    let coinciden = true;
    for (let i = 0; i < factoresUsuario.length; i++) {
      if (factoresUsuario[i] !== factoresSolucion[i]) {
        coinciden = false;
        break;
      }
    }
    if (coinciden) {
      return {
        esCorrecto: true,
        mensaje: '¡Muy bien! Factores correctos organizados de forma equivalente.',
        tipo: 'conmutativo'
      };
    }
  }

  // 4. Detección de error común: Escribir el polinomio original sin factorizar
  const expresionOriginal = normalizarExpresion(ejercicio.expresion);
  if (limpioUsuario === expresionOriginal) {
    return {
      esCorrecto: false,
      mensaje: 'Escribiste la expresión original. Recuerda que factorizar significa descomponer en un PRODUCTO de factores irreducibles entre paréntesis.',
      tipo: 'sin_factorizar'
    };
  }

  // Si tiene sumas o restas sueltas en el nivel superior, no está completamente factorizado
  if (tieneOperadoresEnNivelSuperior(inputUsuario)) {
    return {
      esCorrecto: false,
      mensaje: 'Tu respuesta contiene sumas o restas fuera de paréntesis. Una expresión factorizada debe ser un producto de factores.',
      tipo: 'operadores_sueltos'
    };
  }

  // 5. Verificación numérica por múltiples puntos aleatorios (Monte Carlo)
  // Conjuntos de prueba para variables comunes
  const puntosDePrueba = [
    { x: 3, y: 2, a: 5, b: 4, m: 2, n: 3 },
    { x: -2, y: 3, a: -3, b: 2, m: -1, n: 5 },
    { x: 4.5, y: -1.5, a: 2.2, b: -3.1, m: 1.5, n: -2.5 },
    { x: 7, y: -4, a: 6, b: 7, m: 3, n: -1 }
  ];

  let todasCoinciden = true;
  let pruebasValidas = 0;

  for (const punto of puntosDePrueba) {
    const valUser = evaluarExpresion(inputUsuario, punto);
    const valSol = evaluarExpresion(ejercicio.solucion, punto);

    if (valUser !== null && valSol !== null) {
      pruebasValidas++;
      const diff = Math.abs(valUser - valSol);
      if (diff > 1e-4) {
        todasCoinciden = false;
        break;
      }
    }
  }

  if (pruebasValidas >= 2 && todasCoinciden) {
    // Es algebraicamente equivalente y ya comprobamos que no tiene operadores sueltos
    return {
      esCorrecto: true,
      mensaje: '¡Excelente razonamiento! Expresión algebraicamente equivalente y en forma factorizada.',
      tipo: 'algebraico'
    };
  }

  // Si no coincidió, devolver sugerencia pedagógica
  return {
    esCorrecto: false,
    mensaje: 'La respuesta no coincide con la factorización requerida. Revisa los signos, los exponentes y asegúrate de no haber omitido el factor común.',
    tipo: 'incorrecto'
  };
}
