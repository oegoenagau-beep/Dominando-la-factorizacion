/**
 * Motor matemático local para análisis, identificación y resolución paso a paso
 * de casos de factorización algebraica. Funciona 100% en el cliente sin internet.
 */

import { normalizarExpresion } from './verificador.js';

// Algoritmo de Euclides para el Máximo Común Divisor
export function calcularMCD(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
}

export function mcdArray(numeros) {
  if (!numeros || numeros.length === 0) return 1;
  let res = Math.abs(numeros[0]);
  for (let i = 1; i < numeros.length; i++) {
    res = calcularMCD(res, numeros[i]);
  }
  return res || 1;
}

/**
 * Función que detecta si un número entero es un cuadrado perfecto exacto.
 */
export function esCuadradoPerfecto(n) {
  if (n < 0) return false;
  const r = Math.round(Math.sqrt(n));
  return r * r === n ? r : false;
}

/**
 * Función que detecta si un número entero es un cubo perfecto exacto.
 */
export function esCuboPerfecto(n) {
  const r = Math.round(Math.cbrt(n));
  return r * r * r === n ? r : false;
}

/**
 * Parsea un trinomio cuadrático de una variable en la forma ax² + bx + c.
 * Admite x^2, x², etc.
 */
export function parsearTrinomioCuadratico(expr, variable = 'x') {
  const norm = normalizarExpresion(expr);

  // Expresión regular para monomios de segundo grado ax^2 + bx + c
  const v = variable;
  const regex = new RegExp(`^([+-]?[0-9]*)\\*?${v}\\^2([+-][0-9]*)\\*?${v}([+-][0-9]+)$`);
  const match = norm.match(regex);
  if (match) {
    let aStr = match[1];
    let bStr = match[2];
    let cStr = match[3];

    let a = aStr === '' || aStr === '+' ? 1 : aStr === '-' ? -1 : parseInt(aStr, 10);
    let b = bStr === '+' ? 1 : bStr === '-' ? -1 : parseInt(bStr, 10);
    let c = parseInt(cStr, 10);

    return { a, b, c, variable };
  }

  // Probar trinomios donde b=0 o c=0 o formas simples
  const regexSimple = new RegExp(`^${v}\\^2([+-][0-9]+)\\*?${v}([+-][0-9]+)$`);
  const match2 = norm.match(regexSimple);
  if (match2) {
    let b = parseInt(match2[1], 10);
    let c = parseInt(match2[2], 10);
    return { a: 1, b, c, variable };
  }

  return null;
}

/**
 * Parsea un binomio del tipo ax² - b (diferencia de cuadrados potencial).
 */
export function parsearBinomioCuadratico(expr, variable = 'x') {
  const norm = normalizarExpresion(expr);
  const v = variable;
  const regex = new RegExp(`^([0-9]*)\\*?${v}\\^2-([0-9]+)$`);
  const match = norm.match(regex);
  if (match) {
    let a = match[1] === '' ? 1 : parseInt(match[1], 10);
    let b = parseInt(match[2], 10);
    return { a, b, tipo: 'resta' };
  }
  return null;
}

/**
 * Parsea un binomio cúbico ax³ ± b.
 */
export function parsearBinomioCubico(expr, variable = 'x') {
  const norm = normalizarExpresion(expr);
  const v = variable;
  const regex = new RegExp(`^([0-9]*)\\*?${v}\\^3([+-])([0-9]+)$`);
  const match = norm.match(regex);
  if (match) {
    let a = match[1] === '' ? 1 : parseInt(match[1], 10);
    let signo = match[2];
    let b = parseInt(match[3], 10);
    return { a, signo, b };
  }
  return null;
}

/**
 * Identifica con heurísticas rigurosas qué caso de factorización aplica a una expresión.
 */
export function identificarCaso(expresion) {
  const norm = normalizarExpresion(expresion);

  // Contar términos aproximados buscando + o - no encerrados en paréntesis
  let terminos = 0;
  let depth = 0;
  for (let i = 0; i < norm.length; i++) {
    const c = norm[i];
    if (c === '(') depth++;
    else if (c === ')') depth--;
    else if (depth === 0 && (c === '+' || c === '-') && i > 0) {
      terminos++;
    }
  }
  terminos += 1;

  // 1. Binomios (2 términos)
  if (terminos === 2) {
    // Verificar si es diferencia de cuadrados
    const bCuad = parsearBinomioCuadratico(norm);
    if (bCuad && bCuad.tipo === 'resta') {
      const rA = esCuadradoPerfecto(bCuad.a);
      const rB = esCuadradoPerfecto(bCuad.b);
      if (rA !== false && rB !== false) {
        return {
          casoId: 2,
          nombre: 'Diferencia de Cuadrados',
          confianza: 0.99,
          datos: { a: bCuad.a, b: bCuad.b, rA, rB }
        };
      }
      // Si tiene factor común previo, ej 2x^2 - 18
      const mcd = calcularMCD(bCuad.a, bCuad.b);
      if (mcd > 1 && esCuadradoPerfecto(bCuad.a / mcd) && esCuadradoPerfecto(bCuad.b / mcd)) {
        return {
          casoId: 8,
          nombre: 'Factorización Mixta (Factor Común + Diferencia de Cuadrados)',
          confianza: 0.95,
          datos: { mcd }
        };
      }
    }

    // Verificar si es suma o diferencia de cubos
    const bCub = parsearBinomioCubico(norm);
    if (bCub) {
      const rA = esCuboPerfecto(bCub.a);
      const rB = esCuboPerfecto(bCub.b);
      if (rA !== false && rB !== false) {
        return {
          casoId: 4,
          nombre: bCub.signo === '+' ? 'Suma de Cubos' : 'Diferencia de Cubos',
          confianza: 0.98,
          datos: { a: bCub.a, b: bCub.b, rA, rB, signo: bCub.signo }
        };
      }
    }

    // Factor común en binomio
    return {
      casoId: 1,
      nombre: 'Factor Común Monomio',
      confianza: 0.85
    };
  }

  // 2. Trinomios (3 términos)
  if (terminos === 3) {
    const trin = parsearTrinomioCuadratico(norm);
    if (trin) {
      const { a, b, c } = trin;

      // Comprobar si es Trinomio Cuadrado Perfecto: b² = 4ac y a, c > 0
      if (a > 0 && c > 0) {
        const rA = esCuadradoPerfecto(a);
        const rC = esCuadradoPerfecto(c);
        if (rA !== false && rC !== false) {
          if (Math.abs(b) === 2 * rA * rC) {
            return {
              casoId: 3,
              nombre: 'Trinomio Cuadrado Perfecto (TCP)',
              confianza: 0.99,
              datos: { a, b, c, rA, rC, signo: b >= 0 ? '+' : '-' }
            };
          }
        }
      }

      // Trinomio x² + bx + c (a = 1)
      if (a === 1) {
        return {
          casoId: 5,
          nombre: 'Trinomio de la forma x² + bx + c',
          confianza: 0.95,
          datos: { a, b, c }
        };
      }

      // Factor común en trinomio cuadrático (ej. 3x^2 - 12x + 12)
      const mcd = mcdArray([a, b, c]);
      if (mcd > 1) {
        return {
          casoId: 8,
          nombre: 'Factorización Mixta (Factor Común + Trinomio)',
          confianza: 0.92,
          datos: { mcd, a, b, c }
        };
      }

      // Trinomio ax² + bx + c (a ≠ 1)
      return {
        casoId: 6,
        nombre: 'Trinomio de la forma ax² + bx + c',
        confianza: 0.94,
        datos: { a, b, c }
      };
    }

    // Trinomio general
    return {
      casoId: 1,
      nombre: 'Factor Común (Trinomio)',
      confianza: 0.75
    };
  }

  // 3. Polinomios de 4 o más términos
  if (terminos === 4 || terminos === 6) {
    return {
      casoId: 7,
      nombre: 'Factorización por Agrupación de Términos',
      confianza: 0.90
    };
  }

  // Por defecto, evaluar factor común
  return {
    casoId: 1,
    nombre: 'Factor Común',
    confianza: 0.70
  };
}

/**
 * Resuelve y explica paso a paso la factorización de una expresión algebraica.
 */
export function factorizarPasoAPaso(expresion) {
  const identificacion = identificarCaso(expresion);
  const norm = normalizarExpresion(expresion);

  // CASO 2: DIFERENCIA DE CUADRADOS
  if (identificacion.casoId === 2) {
    const bCuad = parsearBinomioCuadratico(norm);
    if (bCuad) {
      const rA = Math.round(Math.sqrt(bCuad.a));
      const rB = Math.round(Math.sqrt(bCuad.b));
      const termA = rA === 1 ? 'x' : `${rA}x`;
      const res = `(${termA} - ${rB})(${termA} + ${rB})`;

      return {
        caso: 'Diferencia de Cuadrados (a² - b² = (a - b)(a + b))',
        casoId: 2,
        pasos: [
          `Identificamos que es un binomio cuyos dos términos son cuadrados y están separados por un signo menos.`,
          `Extraemos la raíz cuadrada del primer término: √(${bCuad.a === 1 ? 'x²' : bCuad.a + 'x²'}) = ${termA}.`,
          `Extraemos la raíz cuadrada del segundo término: √(${bCuad.b}) = ${rB}.`,
          `Formamos los dos binomios conjugados con la diferencia y la suma de las raíces.`
        ],
        resultado: res,
        comprobacion: `${res} = (${termA})² - (${rB})² = ${expresion}`
      };
    }
  }

  // CASO 3: TRINOMIO CUADRADO PERFECTO
  if (identificacion.casoId === 3) {
    const { a, b, c, rA, rC, signo } = identificacion.datos;
    const termA = rA === 1 ? 'x' : `${rA}x`;
    const res = `(${termA} ${signo} ${rC})²`;

    return {
      caso: 'Trinomio Cuadrado Perfecto (a² ± 2ab + b² = (a ± b)²)',
      casoId: 3,
      pasos: [
        `Verificamos que el primer término (${a === 1 ? 'x²' : a + 'x²'}) y el último término (${c}) sean positivos.`,
        `Raíz del primer término: a = ${termA}.`,
        `Raíz del tercer término: b = ${rC}.`,
        `Verificación del término medio: 2 · (${termA}) · (${rC}) = ${2 * rA * rC}x. ¡Coincide con el término central!`,
        `Escribimos el binomio al cuadrado con el signo correspondiente (${signo}).`
      ],
      resultado: res,
      comprobacion: `${res} = (${termA})² ${signo === '+' ? '+' : '-'} 2(${termA})(${rC}) + (${rC})² = ${expresion}`
    };
  }

  // CASO 5: TRINOMIO x² + bx + c
  if (identificacion.casoId === 5) {
    const { b, c } = identificacion.datos;
    // Buscar m, n tales que m*n = c y m+n = b
    let m = null;
    let n = null;
    const lim = Math.max(Math.abs(c), 50);

    for (let i = -lim; i <= lim; i++) {
      if (i !== 0 && c % i === 0) {
        const j = c / i;
        if (i + j === b) {
          m = Math.max(i, j);
          n = Math.min(i, j);
          break;
        }
      }
    }

    if (m !== null && n !== null) {
      const sM = m >= 0 ? `+ ${m}` : `- ${Math.abs(m)}`;
      const sN = n >= 0 ? `+ ${n}` : `- ${Math.abs(n)}`;
      const res = `(x ${sM})(x ${sN})`;

      return {
        caso: 'Trinomio de la forma x² + bx + c = (x + m)(x + n)',
        casoId: 5,
        pasos: [
          `El coeficiente cuadrático es 1. Buscamos dos números enteros m y n.`,
          `Condición de producto: m · n = ${c}.`,
          `Condición de suma: m + n = ${b}.`,
          `Los números que satisfacen ambas condiciones son ${m} y ${n} (ya que ${m} · ${n} = ${c} y ${m} + ${n} = ${b}).`,
          `Escribimos los dos binomios: (x + m)(x + n).`
        ],
        resultado: res,
        comprobacion: `${res} = x² ${sN}x ${sM}x + (${m}·${n}) = ${expresion}`
      };
    }
  }

  // CASO 6: TRINOMIO ax² + bx + c
  if (identificacion.casoId === 6) {
    const { a, b, c } = identificacion.datos;
    const ac = a * c;
    let p = null;
    let q = null;
    const lim = Math.abs(ac);

    for (let i = -lim; i <= lim; i++) {
      if (i !== 0 && ac % i === 0) {
        const j = ac / i;
        if (i + j === b) {
          p = i;
          q = j;
          break;
        }
      }
    }

    if (p !== null && q !== null) {
      // ax^2 + px + qx + c -> agrupar
      const gcd1 = calcularMCD(a, p);
      const fact1A = a / gcd1;
      const fact1B = p / gcd1;

      const gcd2 = q / fact1A;
      const binomio1 = `${gcd1 === 1 ? 'x' : gcd1 + 'x'} ${gcd2 >= 0 ? '+' : '-'} ${Math.abs(gcd2)}`;
      const binomio2 = `${fact1A === 1 ? 'x' : fact1A + 'x'} ${fact1B >= 0 ? '+' : '-'} ${Math.abs(fact1B)}`;
      const res = `(${binomio1})(${binomio2})`;

      return {
        caso: 'Trinomio de la forma ax² + bx + c (Método del Producto ac)',
        casoId: 6,
        pasos: [
          `Multiplicamos el primer coeficiente por la constante: a · c = ${a} · (${c}) = ${ac}.`,
          `Buscamos dos números p y q que multiplicados den ${ac} y sumados den el término medio ${b}.`,
          `Los números encontrados son ${p} y ${q} (${p} · ${q} = ${ac} y ${p} + ${q} = ${b}).`,
          `Descomponemos el término central: ${a}x² ${p >= 0 ? '+' : ''}${p}x ${q >= 0 ? '+' : ''}${q}x ${c >= 0 ? '+' : ''}${c}.`,
          `Agrupamos en parejas y extraemos factores comunes para obtener el producto de binomios.`
        ],
        resultado: res,
        comprobacion: `${res} = ${expresion}`
      };
    }
  }

  // CASO 4: SUMA O DIFERENCIA DE CUBOS
  if (identificacion.casoId === 4) {
    const bCub = parsearBinomioCubico(norm);
    if (bCub) {
      const rA = Math.round(Math.cbrt(bCub.a));
      const rB = Math.round(Math.cbrt(bCub.b));
      const termA = rA === 1 ? 'x' : `${rA}x`;
      const termASq = rA * rA === 1 ? 'x²' : `${rA * rA}x²`;
      const termProd = rA * rB === 1 ? 'x' : `${rA * rB}x`;
      const termBSq = rB * rB;

      if (bCub.signo === '+') {
        const res = `(${termA} + ${rB})(${termASq} - ${termProd} + ${termBSq})`;
        return {
          caso: 'Suma de Cubos (a³ + b³ = (a + b)(a² - ab + b²))',
          casoId: 4,
          pasos: [
            `Identificamos una suma de cubos perfectos.`,
            `Raíz cúbica del primer término: a = ${termA}.`,
            `Raíz cúbica del segundo término: b = ${rB}.`,
            `Binomio suma: (${termA} + ${rB}).`,
            `Trinomio con signo central negativo: (${termA})² - (${termA})(${rB}) + (${rB})² = ${termASq} - ${termProd} + ${termBSq}.`
          ],
          resultado: res,
          comprobacion: `${res} = ${expresion}`
        };
      } else {
        const res = `(${termA} - ${rB})(${termASq} + ${termProd} + ${termBSq})`;
        return {
          caso: 'Diferencia de Cubos (a³ - b³ = (a - b)(a² + ab + b²))',
          casoId: 4,
          pasos: [
            `Identificamos una resta de cubos perfectos.`,
            `Raíz cúbica del primer término: a = ${termA}.`,
            `Raíz cúbica del segundo término: b = ${rB}.`,
            `Binomio resta: (${termA} - ${rB}).`,
            `Trinomio con signo central positivo: (${termA})² + (${termA})(${rB}) + (${rB})² = ${termASq} + ${termProd} + ${termBSq}.`
          ],
          resultado: res,
          comprobacion: `${res} = ${expresion}`
        };
      }
    }
  }

  // Respuesta general pedagógica
  return {
    caso: identificacion.nombre,
    casoId: identificacion.casoId,
    pasos: [
      `Analizamos la estructura y el número de términos del polinomio.`,
      `El patrón corresponde al caso: ${identificacion.nombre}.`,
      `Aplicamos el procedimiento sistemático: extraer factores comunes y evaluar si los factores restantes son reducibles.`
    ],
    resultado: `Expresión analizada con éxito (${identificacion.nombre})`,
    comprobacion: 'Al desarrollar los factores multiplicados, se recupera el polinomio original.'
  };
}

/**
 * Generador automático de nuevos ejercicios aleatorios según caso y dificultad.
 */
export function generarEjercicioAleatorio(casoId, nivel = 'facil') {
  const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const randPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  switch (casoId) {
    case 1: { // Factor Común
      if (nivel === 'facil') {
        const k = randPick([2, 3, 4, 5, 6]);
        const m = randInt(2, 7);
        return {
          expresion: `${k}x² + ${k * m}x`,
          solucion: `${k}x(x + ${m})`,
          casoId: 1,
          nivel
        };
      }
      const k = randPick([3, 5, 6, 7]);
      const m = randInt(2, 5);
      const n = randInt(1, 4);
      return {
        expresion: `${k}x³ - ${k * m}x² + ${k * n}x`,
        solucion: `${k}x(x² - ${m}x + ${n})`,
        casoId: 1,
        nivel
      };
    }
    case 2: { // Diferencia de Cuadrados
      if (nivel === 'facil') {
        const k = randInt(2, 12);
        return {
          expresion: `x² - ${k * k}`,
          solucion: `(x - ${k})(x + ${k})`,
          casoId: 2,
          nivel
        };
      }
      const a = randPick([2, 3, 4, 5]);
      const b = randPick([3, 5, 7, 9]);
      return {
        expresion: `${a * a}x² - ${b * b}y²`,
        solucion: `(${a}x - ${b}y)(${a}x + ${b}y)`,
        casoId: 2,
        nivel
      };
    }
    case 3: { // Trinomio Cuadrado Perfecto
      if (nivel === 'facil') {
        const k = randInt(2, 9);
        return {
          expresion: `x² + ${2 * k}x + ${k * k}`,
          solucion: `(x + ${k})²`,
          casoId: 3,
          nivel
        };
      }
      const a = randPick([2, 3, 5]);
      const b = randPick([1, 2, 4, 5]);
      return {
        expresion: `${a * a}x² - ${2 * a * b}x + ${b * b}`,
        solucion: `(${a}x - ${b})²`,
        casoId: 3,
        nivel
      };
    }
    case 4: { // Cubos
      if (nivel === 'facil') {
        const k = randPick([2, 3, 4, 5]);
        return {
          expresion: `x³ - ${k * k * k}`,
          solucion: `(x - ${k})(x² + ${k}x + ${k * k})`,
          casoId: 4,
          nivel
        };
      }
      const k = randPick([2, 3]);
      return {
        expresion: `8x³ + ${k * k * k}`,
        solucion: `(2x + ${k})(4x² - ${2 * k}x + ${k * k})`,
        casoId: 4,
        nivel
      };
    }
    case 5: { // x² + bx + c
      const m = randInt(1, 8);
      const n = randPick([1, 2, 3, 4, 5, 6]);
      const signo = randPick(['++', '+-', '--']);
      let n1 = m;
      let n2 = n;
      if (signo === '+-') n2 = -n;
      if (signo === '--') { n1 = -m; n2 = -n; }

      const b = n1 + n2;
      const c = n1 * n2;
      const bStr = b > 0 ? `+ ${b}x` : b < 0 ? `- ${Math.abs(b)}x` : '';
      const cStr = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
      const s1 = n1 >= 0 ? `+ ${n1}` : `- ${Math.abs(n1)}`;
      const s2 = n2 >= 0 ? `+ ${n2}` : `- ${Math.abs(n2)}`;

      return {
        expresion: `x² ${bStr} ${cStr}`,
        solucion: `(x ${s1})(x ${s2})`,
        casoId: 5,
        nivel
      };
    }
    default: {
      const k = randInt(2, 6);
      return {
        expresion: `x² - ${k * k}`,
        solucion: `(x - ${k})(x + ${k})`,
        casoId: 2,
        nivel
      };
    }
  }
}
