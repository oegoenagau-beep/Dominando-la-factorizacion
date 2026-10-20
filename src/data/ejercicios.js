export const EJERCICIOS = [
  // CASO 1: FACTOR COMÚN
  {
    id: 'fc-facil',
    casoId: 1,
    dificultad: 'facil',
    titulo: 'Factor Común Monomio Básico',
    expresion: '4x² + 8x',
    solucion: '4x(x + 2)',
    solucionesEquivalentes: [
      '4x(x + 2)',
      '4x(2 + x)',
      '(x + 2) * 4x',
      '(x + 2)(4x)'
    ],
    pistas: [
      'Halla el MCD de los coeficientes 4 y 8.',
      'La variable x aparece en ambos términos; toma la de menor potencia (x¹).'
    ],
    explicacion: 'El MCD(4, 8) = 4 y el factor literal común es x. Al extraer 4x: (4x²)/(4x) = x y (8x)/(4x) = 2. Por tanto, el resultado es 4x(x + 2).',
    comprobacion: '4x · x + 4x · 2 = 4x² + 8x'
  },
  {
    id: 'fc-medio',
    casoId: 1,
    dificultad: 'medio',
    titulo: 'Factor Común con dos variables y tres términos',
    expresion: '15a³b - 20a²b² + 5ab',
    solucion: '5ab(3a² - 4ab + 1)',
    solucionesEquivalentes: [
      '5ab(3a² - 4ab + 1)',
      '5ab(1 - 4ab + 3a²)',
      '(3a² - 4ab + 1)(5ab)'
    ],
    pistas: [
      'El MCD de 15, 20 y 5 es 5.',
      'Toma a¹ y b¹ como factores literales comunes. ¡Cuidado: el último término (5ab)/(5ab) es igual a 1, no desaparece!'
    ],
    explicacion: 'MCD(15, 20, 5) = 5. Literales comunes con menor exponente: a y b. Factor común = 5ab. Al dividir: 15a³b / 5ab = 3a²; -20a²b² / 5ab = -4ab; 5ab / 5ab = 1.',
    comprobacion: '5ab · 3a² - 5ab · 4ab + 5ab · 1 = 15a³b - 20a²b² + 5ab'
  },
  {
    id: 'fc-dificil',
    casoId: 1,
    dificultad: 'dificil',
    titulo: 'Factor Común Polinomio',
    expresion: '2m(x + y - 1) - n(x + y - 1)',
    solucion: '(x + y - 1)(2m - n)',
    solucionesEquivalentes: [
      '(x + y - 1)(2m - n)',
      '(2m - n)(x + y - 1)'
    ],
    pistas: [
      'Observa qué expresión completa entre paréntesis se repite en ambos términos.',
      'Extrae el trinomio (x + y - 1) como un único factor común.'
    ],
    explicacion: 'El factor común es el trinomio compuesto (x + y - 1). Los coeficientes externos forman el binomio (2m - n).',
    comprobacion: '(x + y - 1) · 2m - (x + y - 1) · n = 2m(x + y - 1) - n(x + y - 1)'
  },

  // CASO 2: DIFERENCIA DE CUADRADOS
  {
    id: 'dc-facil',
    casoId: 2,
    dificultad: 'facil',
    titulo: 'Diferencia de Cuadrados Elemental',
    expresion: 'x² - 36',
    solucion: '(x - 6)(x + 6)',
    solucionesEquivalentes: [
      '(x - 6)(x + 6)',
      '(x + 6)(x - 6)'
    ],
    pistas: [
      'Calcula la raíz cuadrada de x² y de 36.',
      'Multiplica la suma de las raíces por su resta.'
    ],
    explicacion: '√x² = x y √36 = 6. Por la fórmula a² - b² = (a - b)(a + b), resulta (x - 6)(x + 6).',
    comprobacion: '(x - 6)(x + 6) = x² + 6x - 6x - 36 = x² - 36'
  },
  {
    id: 'dc-medio',
    casoId: 2,
    dificultad: 'medio',
    titulo: 'Diferencia con Coeficientes Mayores a 1',
    expresion: '9x² - 100y²',
    solucion: '(3x - 10y)(3x + 10y)',
    solucionesEquivalentes: [
      '(3x - 10y)(3x + 10y)',
      '(3x + 10y)(3x - 10y)'
    ],
    pistas: [
      'Extrae la raíz cuadrada de 9x².',
      'Extrae la raíz cuadrada de 100y².'
    ],
    explicacion: '√(9x²) = 3x y √(100y²) = 10y. Construimos los binomios conjugados: (3x - 10y)(3x + 10y).',
    comprobacion: '(3x)(3x) + (3x)(10y) - (10y)(3x) - (10y)(10y) = 9x² - 100y²'
  },
  {
    id: 'dc-dificil',
    casoId: 2,
    dificultad: 'dificil',
    titulo: 'Diferencia de Cuadrados de Cuarto Grado',
    expresion: '81a⁴ - 16b⁴',
    solucion: '(3a - 2b)(3a + 2b)(9a² + 4b²)',
    solucionesEquivalentes: [
      '(3a - 2b)(3a + 2b)(9a² + 4b²)',
      '(3a + 2b)(3a - 2b)(9a² + 4b²)',
      '(9a² + 4b²)(3a - 2b)(3a + 2b)',
      '(9a² - 4b²)(9a² + 4b²)'
    ],
    pistas: [
      'Primera etapa: extrae raíz a 81a⁴ y a 16b⁴, obteniendo (9a² - 4b²)(9a² + 4b²).',
      '¡Atención! El primer binomio (9a² - 4b²) es OTRA diferencia de cuadrados que debes factorizar por completo.'
    ],
    explicacion: '81a⁴ - 16b⁴ = (9a² - 4b²)(9a² + 4b²). Luego, 9a² - 4b² = (3a - 2b)(3a + 2b). Como la suma de cuadrados (9a² + 4b²) no se factoriza en ℝ, el resultado final es (3a - 2b)(3a + 2b)(9a² + 4b²).',
    comprobacion: '(3a - 2b)(3a + 2b)(9a² + 4b²) = (9a² - 4b²)(9a² + 4b²) = 81a⁴ - 16b⁴'
  },

  // CASO 3: TRINOMIO CUADRADO PERFECTO
  {
    id: 'tcp-facil',
    casoId: 3,
    dificultad: 'facil',
    titulo: 'TCP Positivo Estándar',
    expresion: 'x² + 10x + 25',
    solucion: '(x + 5)²',
    solucionesEquivalentes: [
      '(x + 5)²',
      '(x + 5)^2',
      '(x + 5)(x + 5)',
      '(5 + x)²',
      '(5 + x)^2'
    ],
    pistas: [
      'Comprueba que √x² = x y √25 = 5.',
      'Verifica el doble producto: 2 · (x) · (5) = 10x.'
    ],
    explicacion: 'Las raíces son x y 5. El doble producto es 2(x)(5) = 10x, que coincide idénticamente con el término del medio. La respuesta es (x + 5)²',
    comprobacion: '(x + 5)² = x² + 2(x)(5) + 5² = x² + 10x + 25'
  },
  {
    id: 'tcp-medio',
    casoId: 3,
    dificultad: 'medio',
    titulo: 'TCP con Signo Negativo y Coeficiente',
    expresion: '4x² - 28x + 49',
    solucion: '(2x - 7)²',
    solucionesEquivalentes: [
      '(2x - 7)²',
      '(2x - 7)^2',
      '(2x - 7)(2x - 7)',
      '(7 - 2x)²',
      '(7 - 2x)^2'
    ],
    pistas: [
      'Calcula √(4x²) y √49.',
      'El término central es negativo (-28x), por lo que el binomio llevará el signo menos.'
    ],
    explicacion: '√(4x²) = 2x, √49 = 7. El doble producto 2(2x)(7) = 28x. Con signo negativo central resulta (2x - 7)²',
    comprobacion: '(2x - 7)² = (2x)² - 2(2x)(7) + 7² = 4x² - 28x + 49'
  },
  {
    id: 'tcp-dificil',
    casoId: 3,
    dificultad: 'dificil',
    titulo: 'TCP con Exponentes Compuestos',
    expresion: '25x⁴ + 30x²y³ + 9y⁶',
    solucion: '(5x² + 3y³)²',
    solucionesEquivalentes: [
      '(5x² + 3y³)²',
      '(5x² + 3y³)^2',
      '(5x² + 3y³)(5x² + 3y³)',
      '(3y³ + 5x²)²'
    ],
    pistas: [
      'Divide los exponentes de las variables entre 2 al sacar raíz cuadrada.',
      'Verifica que 2 · (5x²) · (3y³) coincida con el término central.'
    ],
    explicacion: '√(25x⁴) = 5x² y √(9y⁶) = 3y³. Doble producto: 2(5x²)(3y³) = 30x²y³. Resultado: (5x² + 3y³)²',
    comprobacion: '(5x² + 3y³)² = (5x²)² + 2(5x²)(3y³) + (3y³)² = 25x⁴ + 30x²y³ + 9y⁶'
  },

  // CASO 4: SUMA Y DIFERENCIA DE CUBOS
  {
    id: 'cubos-facil',
    casoId: 4,
    dificultad: 'facil',
    titulo: 'Diferencia de Cubos Básica',
    expresion: 'x³ - 8',
    solucion: '(x - 2)(x² + 2x + 4)',
    solucionesEquivalentes: [
      '(x - 2)(x² + 2x + 4)',
      '(x² + 2x + 4)(x - 2)'
    ],
    pistas: [
      '∛x³ = x y ∛8 = 2.',
      'Aplica a³ - b³ = (a - b)(a² + ab + b²).'
    ],
    explicacion: 'Raíces cúbicas: x y 2. Binomio: (x - 2). Trinomio: x² + 2x + 4. Resultado: (x - 2)(x² + 2x + 4).',
    comprobacion: '(x - 2)(x² + 2x + 4) = x³ + 2x² + 4x - 2x² - 4x - 8 = x³ - 8'
  },
  {
    id: 'cubos-medio',
    casoId: 4,
    dificultad: 'medio',
    titulo: 'Suma de Cubos con Coeficientes',
    expresion: '27a³ + 64',
    solucion: '(3a + 4)(9a² - 12a + 16)',
    solucionesEquivalentes: [
      '(3a + 4)(9a² - 12a + 16)',
      '(9a² - 12a + 16)(3a + 4)'
    ],
    pistas: [
      '∛(27a³) = 3a y ∛64 = 4.',
      'En la suma de cubos, el signo del trinomio en el término central es NEGATIVO (-ab).'
    ],
    explicacion: 'Raíces: 3a y 4. Binomio: (3a + 4). Trinomio: (3a)² - (3a)(4) + 4² = 9a² - 12a + 16.',
    comprobacion: '(3a + 4)(9a² - 12a + 16) = 27a³ - 36a² + 48a + 36a² - 48a + 64 = 27a³ + 64'
  },
  {
    id: 'cubos-dificil',
    casoId: 4,
    dificultad: 'dificil',
    titulo: 'Diferencia de Cubos con Dos Variables y Grado 6',
    expresion: '125x³ - 8y⁶',
    solucion: '(5x - 2y²)(25x² + 10xy² + 4y⁴)',
    solucionesEquivalentes: [
      '(5x - 2y²)(25x² + 10xy² + 4y⁴)',
      '(25x² + 10xy² + 4y⁴)(5x - 2y²)'
    ],
    pistas: [
      'La raíz cúbica de 125x³ es 5x; la raíz cúbica de 8y⁶ es 2y² (6 dividido 3 = 2).',
      'Trinomio: (5x)² + (5x)(2y²) + (2y²)².'
    ],
    explicacion: 'Raíces: 5x y 2y². Binomio: (5x - 2y²). Trinomio: 25x² + 10xy² + 4y⁴.',
    comprobacion: '(5x - 2y²)(25x² + 10xy² + 4y⁴) = 125x³ + 50x²y² + 20xy⁴ - 50x²y² - 20xy⁴ - 8y⁶ = 125x³ - 8y⁶'
  },

  // CASO 5: TRINOMIO x² + bx + c
  {
    id: 'tx-facil',
    casoId: 5,
    dificultad: 'facil',
    titulo: 'Trinomio x² + bx + c Positivo',
    expresion: 'x² + 9x + 20',
    solucion: '(x + 4)(x + 5)',
    solucionesEquivalentes: [
      '(x + 4)(x + 5)',
      '(x + 5)(x + 4)'
    ],
    pistas: [
      'Busca dos números enteros cuyo producto sea 20 y cuya suma sea 9.',
      'Los divisores de 20 son: 1·20 (suma 21), 2·10 (suma 12), 4·5 (suma 9).'
    ],
    explicacion: 'Los números son +4 y +5, ya que 4 · 5 = 20 y 4 + 5 = 9. Por tanto, (x + 4)(x + 5).',
    comprobacion: '(x + 4)(x + 5) = x² + 5x + 4x + 20 = x² + 9x + 20'
  },
  {
    id: 'tx-medio',
    casoId: 5,
    dificultad: 'medio',
    titulo: 'Trinomio x² + bx + c con Signos Diferentes',
    expresion: 'x² - 3x - 28',
    solucion: '(x - 7)(x + 4)',
    solucionesEquivalentes: [
      '(x - 7)(x + 4)',
      '(x + 4)(x - 7)'
    ],
    pistas: [
      'El producto es -28 (signos contrarios) y la suma es -3.',
      'Busca dos números cuya diferencia sea 3 y asigna el signo menos al mayor.'
    ],
    explicacion: '-7 y +4: (-7) · (+4) = -28 y (-7) + (+4) = -3. Respuesta: (x - 7)(x + 4).',
    comprobacion: '(x - 7)(x + 4) = x² + 4x - 7x - 28 = x² - 3x - 28'
  },
  {
    id: 'tx-dificil',
    casoId: 5,
    dificultad: 'dificil',
    titulo: 'Trinomio x² + bx + c con Ambos Números Negativos',
    expresion: 'x² - 13x + 42',
    solucion: '(x - 7)(x - 6)',
    solucionesEquivalentes: [
      '(x - 7)(x - 6)',
      '(x - 6)(x - 7)'
    ],
    pistas: [
      'El producto es positivo (+42) y la suma es negativa (-13), por lo que ambos números deben ser negativos.',
      'Prueba con los factores de 42: -1·-42, -2·-21, -3·-14, -6·-7.'
    ],
    explicacion: '(-7) · (-6) = +42 y (-7) + (-6) = -13. Respuesta: (x - 7)(x - 6).',
    comprobacion: '(x - 7)(x - 6) = x² - 6x - 7x + 42 = x² - 13x + 42'
  },

  // CASO 6: TRINOMIO ax² + bx + c
  {
    id: 'tax-facil',
    casoId: 6,
    dificultad: 'facil',
    titulo: 'Trinomio ax² + bx + c Elemental',
    expresion: '3x² + 10x + 3',
    solucion: '(3x + 1)(x + 3)',
    solucionesEquivalentes: [
      '(3x + 1)(x + 3)',
      '(x + 3)(3x + 1)'
    ],
    pistas: [
      'Multiplica a · c: 3 · 3 = 9.',
      'Busca dos números que multipliquen 9 y sumen 10: 9 y 1. Descompón 10x en 9x + 1x.'
    ],
    explicacion: '3x² + 9x + x + 3 = 3x(x + 3) + 1(x + 3) = (3x + 1)(x + 3).',
    comprobacion: '(3x + 1)(x + 3) = 3x² + 9x + x + 3 = 3x² + 10x + 3'
  },
  {
    id: 'tax-medio',
    casoId: 6,
    dificultad: 'medio',
    titulo: 'Trinomio ax² + bx + c con Términos Negativos',
    expresion: '2x² - 5x - 3',
    solucion: '(2x + 1)(x - 3)',
    solucionesEquivalentes: [
      '(2x + 1)(x - 3)',
      '(x - 3)(2x + 1)'
    ],
    pistas: [
      'Calcula a · c: 2 · (-3) = -6.',
      'Busca dos números que multipliquen -6 y sumen -5: -6 y +1.'
    ],
    explicacion: '2x² - 6x + x - 3 = 2x(x - 3) + 1(x - 3) = (2x + 1)(x - 3).',
    comprobacion: '(2x + 1)(x - 3) = 2x² - 6x + x - 3 = 2x² - 5x - 3'
  },
  {
    id: 'tax-dificil',
    casoId: 6,
    dificultad: 'dificil',
    titulo: 'Trinomio ax² + bx + c con Múltiples Factores',
    expresion: '6x² + 11x - 10',
    solucion: '(2x + 5)(3x - 2)',
    solucionesEquivalentes: [
      '(2x + 5)(3x - 2)',
      '(3x - 2)(2x + 5)'
    ],
    pistas: [
      'Calcula a · c = 6 · (-10) = -60.',
      'Busca dos números que multiplicados den -60 y sumados den +11: +15 y -4.'
    ],
    explicacion: '6x² + 15x - 4x - 10 = 3x(2x + 5) - 2(2x + 5) = (2x + 5)(3x - 2).',
    comprobacion: '(2x + 5)(3x - 2) = 6x² - 4x + 15x - 10 = 6x² + 11x - 10'
  },

  // CASO 7: FACTORIZACIÓN POR AGRUPACIÓN
  {
    id: 'ag-facil',
    casoId: 7,
    dificultad: 'facil',
    titulo: 'Agrupación Simple de Cuatro Términos',
    expresion: 'ax + ay + 3x + 3y',
    solucion: '(x + y)(a + 3)',
    solucionesEquivalentes: [
      '(x + y)(a + 3)',
      '(a + 3)(x + y)'
    ],
    pistas: [
      'Agrupa los dos primeros términos (ax + ay) y los dos últimos (3x + 3y).',
      'Extrae "a" del primer grupo y "3" del segundo grupo.'
    ],
    explicacion: '(ax + ay) + (3x + 3y) = a(x + y) + 3(x + y) = (x + y)(a + 3).',
    comprobacion: '(x + y)(a + 3) = ax + 3x + ay + 3y = ax + ay + 3x + 3y'
  },
  {
    id: 'ag-medio',
    casoId: 7,
    dificultad: 'medio',
    titulo: 'Agrupación con Coeficientes Numéricos y Literales',
    expresion: '2x² - 4xy + 3x - 6y',
    solucion: '(x - 2y)(2x + 3)',
    solucionesEquivalentes: [
      '(x - 2y)(2x + 3)',
      '(2x + 3)(x - 2y)'
    ],
    pistas: [
      'Agrupa (2x² - 4xy) + (3x - 6y).',
      'Extrae 2x del primer paréntesis y 3 del segundo.'
    ],
    explicacion: '2x(x - 2y) + 3(x - 2y) = (x - 2y)(2x + 3).',
    comprobacion: '(x - 2y)(2x + 3) = 2x² + 3x - 4xy - 6y = 2x² - 4xy + 3x - 6y'
  },
  {
    id: 'ag-dificil',
    casoId: 7,
    dificultad: 'dificil',
    titulo: 'Agrupación con Signos Alternados Negativos',
    expresion: '6m² - 9mn - 4m + 6n',
    solucion: '(2m - 3n)(3m - 2)',
    solucionesEquivalentes: [
      '(2m - 3n)(3m - 2)',
      '(3m - 2)(2m - 3n)'
    ],
    pistas: [
      'Agrupa (6m² - 9mn) - (4m - 6n). Fíjate cómo cambia el signo del +6n al poner el menos fuera.',
      'Extrae 3m del primer grupo y 2 del segundo grupo.'
    ],
    explicacion: '3m(2m - 3n) - 2(2m - 3n) = (2m - 3n)(3m - 2).',
    comprobacion: '(2m - 3n)(3m - 2) = 6m² - 4m - 9mn + 6n = 6m² - 9mn - 4m + 6n'
  },

  // CASO 8: FACTORIZACIÓN MIXTA
  {
    id: 'mix-facil',
    casoId: 8,
    dificultad: 'facil',
    titulo: 'Factor Común y Diferencia de Cuadrados',
    expresion: '5x² - 45',
    solucion: '5(x - 3)(x + 3)',
    solucionesEquivalentes: [
      '5(x - 3)(x + 3)',
      '5(x + 3)(x - 3)',
      '(x - 3)(x + 3) * 5'
    ],
    pistas: [
      'Extrae primero el factor común numérico 5.',
      'El binomio resultante (x² - 9) es una diferencia de cuadrados.'
    ],
    explicacion: '5x² - 45 = 5(x² - 9) = 5(x - 3)(x + 3).',
    comprobacion: '5(x - 3)(x + 3) = 5(x² - 9) = 5x² - 45'
  },
  {
    id: 'mix-medio',
    casoId: 8,
    dificultad: 'medio',
    titulo: 'Factor Común Monomio y Trinomio Cuadrado Perfecto',
    expresion: '2x³ - 8x² + 8x',
    solucion: '2x(x - 2)²',
    solucionesEquivalentes: [
      '2x(x - 2)²',
      '2x(x - 2)^2',
      '2x(x - 2)(x - 2)',
      '2x(2 - x)²',
      '2x(2 - x)^2'
    ],
    pistas: [
      'Extrae 2x como factor común de todos los términos.',
      'El trinomio que queda dentro es x² - 4x + 4, que es un Trinomio Cuadrado Perfecto.'
    ],
    explicacion: '2x(x² - 4x + 4) = 2x(x - 2)²',
    comprobacion: '2x(x - 2)² = 2x(x² - 4x + 4) = 2x³ - 8x² + 8x'
  },
  {
    id: 'mix-dificil',
    casoId: 8,
    dificultad: 'dificil',
    titulo: 'Factor Común Numérico y Doble Diferencia de Cuadrados',
    expresion: '3x⁴ - 48',
    solucion: '3(x - 2)(x + 2)(x² + 4)',
    solucionesEquivalentes: [
      '3(x - 2)(x + 2)(x² + 4)',
      '3(x + 2)(x - 2)(x² + 4)',
      '3(x² + 4)(x - 2)(x + 2)'
    ],
    pistas: [
      'Paso 1: Extrae el factor común numérico 3: 3(x⁴ - 16).',
      'Paso 2: Factoriza la diferencia de cuadrados x⁴ - 16 como (x² - 4)(x² + 4).',
      'Paso 3: Vuelve a factorizar (x² - 4) como (x - 2)(x + 2).'
    ],
    explicacion: '3(x⁴ - 16) = 3(x² - 4)(x² + 4) = 3(x - 2)(x + 2)(x² + 4).',
    comprobacion: '3(x - 2)(x + 2)(x² + 4) = 3(x² - 4)(x² + 4) = 3(x⁴ - 16) = 3x⁴ - 48'
  }
];
