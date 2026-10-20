export const CASOS_FACTORIZACION = [
  {
    id: 1,
    slug: 'factor-comun',
    nombre: 'Factor Común (Monomio y Polinomio)',
    nombreCorto: 'Factor Común',
    icono: 'Share2',
    color: '#0284c7',
    badge: 'Caso Fundamental',
    resumen: 'Identifica el Máximo Común Divisor (MCD) numérico y las variables comunes con su menor exponente en todos los términos.',
    formulaGeneral: 'a · x + a · y = a(x + y)',
    teoria: `El factor común es el caso más elemental e indispensable del álgebra. Se basa directamente en la aplicación inversa de la propiedad distributiva de la multiplicación respecto a la adición:

$$a(b + c) = ab + ac$$

Al factorizar, buscamos el monomio o polinomio que divide exactamente a cada uno de los términos de la expresión algebraica original. Si el factor es una sola expresión algebraica se denomina factor común monomio; si el elemento repetido es un binomio o trinomio entre paréntesis, se denomina factor común polinomio.`,
    pasos: [
      'Determinar el Máximo Común Divisor (MCD) de los coeficientes numéricos de todos los términos.',
      'Identificar las letras (o factores polinómicos) que aparecen en TODOS los términos y tomar cada una con su exponente más pequeño.',
      'Multiplicar el MCD numérico por las variables seleccionadas para conformar el Factor Común.',
      'Dividir cada término del polinomio original entre el Factor Común obtenido. El resultado de cada división se escribe dentro de un paréntesis conservando los signos correspondientes.'
    ],
    ejemplos: [
      {
        titulo: 'Ejemplo 1: Factor común monomio simple',
        expresion: '6x³ - 9x² + 15x',
        explicacionPasoAPaso: [
          'Calculamos el MCD de los coeficientes numéricos (6, 9, 15): MCD(6, 9, 15) = 3.',
          'La variable x está presente en los tres términos. Su menor exponente es 1 (término 15x). Por tanto, la parte literal común es x.',
          'El factor común global es 3x.',
          'Dividimos cada término: (6x³) / (3x) = 2x²; (-9x²) / (3x) = -3x; (15x) / (3x) = +5.',
          'Escribimos el producto del factor común por el polinomio resultante.'
        ],
        resultado: '3x(2x² - 3x + 5)',
        comprobacion: {
          desarrollo: '3x · (2x²) + 3x · (-3x) + 3x · (5) = 6x³ - 9x² + 15x',
          esCorrecto: true,
          mensaje: 'Al aplicar la propiedad distributiva, recuperamos con total exactitud la expresión inicial.'
        }
      },
      {
        titulo: 'Ejemplo 2: Factor común con coeficientes y múltiples variables',
        expresion: '12a²b³ - 18a³b² + 24a⁴b',
        explicacionPasoAPaso: [
          'MCD de los coeficientes: MCD(12, 18, 24) = 6.',
          'Variables comunes en todos los términos: a (menor potencia: a²) y b (menor potencia: b¹).',
          'Factor común monomio: 6a²b.',
          'Dividimos: (12a²b³) / (6a²b) = 2b²; (-18a³b²) / (6a²b) = -3ab; (24a⁴b) / (6a²b) = 4a².'
        ],
        resultado: '6a²b(2b² - 3ab + 4a²)',
        comprobacion: {
          desarrollo: '6a²b · 2b² - 6a²b · 3ab + 6a²b · 4a² = 12a²b³ - 18a³b² + 24a⁴b',
          esCorrecto: true,
          mensaje: 'Los exponentes se suman al multiplicar variables iguales, verificando la expresión original.'
        }
      },
      {
        titulo: 'Ejemplo 3: Factor común polinomio (expresión compuesta)',
        expresion: '5x(a - 2b) - 3y(a - 2b)',
        explicacionPasoAPaso: [
          'Observamos ambos términos: el primero es 5x(a - 2b) y el segundo es -3y(a - 2b).',
          'El factor común no es un monomio simple, sino el binomio completo (a - 2b).',
          'Extraemos el binomio común (a - 2b) como factor inicial.',
          'Al dividir cada término entre (a - 2b), nos queda 5x en el primer término y -3y en el segundo.'
        ],
        resultado: '(a - 2b)(5x - 3y)',
        comprobacion: {
          desarrollo: '(a - 2b) · 5x - (a - 2b) · 3y = 5x(a - 2b) - 3y(a - 2b)',
          esCorrecto: true,
          mensaje: 'Propiedad distributiva aplicada al factor compuesto.'
        }
      }
    ],
    consejos: [
      'Recuerda siempre: si divides un término entre sí mismo, el resultado es 1, ¡nunca cero! Ej: 4x / 4x = 1.',
      'Revisa que dentro del paréntesis no quede ningún factor común residual.',
      'El factor común es el primer paso que debe evaluarse en cualquier problema de álgebra.'
    ]
  },
  {
    id: 2,
    slug: 'diferencia-de-cuadrados',
    nombre: 'Diferencia de Cuadrados',
    nombreCorto: 'Dif. de Cuadrados',
    icono: 'MinusCircle',
    color: '#059669',
    badge: 'Binomio Cuadrático',
    resumen: 'Se aplica a binomios con dos términos cuadrados perfectos separados por un signo menos: a² - b² = (a - b)(a + b).',
    formulaGeneral: 'a² - b² = (a - b)(a + b)',
    teoria: `La diferencia de cuadrados es uno de los productos notables fundamentales en reversa. Un binomio representa una diferencia de cuadrados si y solo si:

1. Consta exactamente de dos términos separados por un signo de sustracción (-).
2. Ambos términos son cuadrados perfectos (sus coeficientes tienen raíz cuadrada exacta y sus exponentes literales son pares divisibles por 2).

El resultado es el producto de dos binomios conjugados: la suma de sus raíces cuadradas multiplicada por la diferencia de dichas raíces.`,
    pasos: [
      'Extraer la raíz cuadrada positiva del primer término (minuendo): √a² = a.',
      'Extraer la raíz cuadrada positiva del segundo término (sustraendo): √b² = b.',
      'Construir un binomio con la suma de las raíces: (a + b).',
      'Construir un segundo binomio con la resta de las raíces: (a - b).',
      'Escribir la factorización final como el producto de ambos binomios: (a - b)(a + b).'
    ],
    ejemplos: [
      {
        titulo: 'Ejemplo 1: Diferencia básica con enteros',
        expresion: 'x² - 49',
        explicacionPasoAPaso: [
          'Verificamos que sea una resta de dos cuadrados.',
          'Raíz cuadrada del primer término: √x² = x.',
          'Raíz cuadrada del segundo término: √49 = 7.',
          'Multiplicamos la resta de las raíces por su suma.'
        ],
        resultado: '(x - 7)(x + 7)',
        comprobacion: {
          desarrollo: '(x - 7)(x + 7) = x² + 7x - 7x - 49 = x² - 49',
          esCorrecto: true,
          mensaje: 'Los términos medios (+7x y -7x) son opuestos aditivos y se cancelan mutuamente.'
        }
      },
      {
        titulo: 'Ejemplo 2: Coeficientes compuestos y exponentes superiores',
        expresion: '25x² - 64y⁴',
        explicacionPasoAPaso: [
          'Calculamos la raíz cuadrada del primer término: √(25x²) = 5x.',
          'Calculamos la raíz cuadrada del segundo término: √(64y⁴) = 8y² (el exponente 4 se divide entre 2).',
          'Formamos los factores conjugados con las raíces obtenidas: (5x - 8y²) y (5x + 8y²).'
        ],
        resultado: '(5x - 8y²)(5x + 8y²)',
        comprobacion: {
          desarrollo: '(5x)(5x) + (5x)(8y²) - (8y²)(5x) - (8y²)(8y²) = 25x² + 40xy² - 40xy² - 64y⁴ = 25x² - 64y⁴',
          esCorrecto: true,
          mensaje: 'Demostrado: la multiplicación cruzada se cancela y quedan los cuadrados de los extremos.'
        }
      },
      {
        titulo: 'Ejemplo 3: Términos con coeficientes fraccionarios',
        expresion: '(9/16)m² - (1/25)n⁶',
        explicacionPasoAPaso: [
          'Raíz cuadrada del primer término: √(9/16 m²) = (3/4)m.',
          'Raíz cuadrada del segundo término: √(1/25 n⁶) = (1/5)n³.',
          'Formamos el producto de la diferencia por la suma.'
        ],
        resultado: '((3/4)m - (1/5)n³)((3/4)m + (1/5)n³)',
        comprobacion: {
          desarrollo: '((3/4)m)² - ((1/5)n³)² = (9/16)m² - (1/25)n⁶',
          esCorrecto: true,
          mensaje: 'Propiedad de las fracciones: (a/b)² = a²/b² comprobada con exactitud.'
        }
      }
    ],
    consejos: [
      '¡Atención! La suma de cuadrados como x² + 25 NO es factorizable en el conjunto de los números reales ℝ.',
      'Para extraer raíz cuadrada a una variable con exponente, simplemente divide su exponente entre 2: √(x¹⁰) = x⁵.'
    ]
  },
  {
    id: 3,
    slug: 'trinomio-cuadrado-perfecto',
    nombre: 'Trinomio Cuadrado Perfecto (TCP)',
    nombreCorto: 'Trinomio C.P.',
    icono: 'CheckCircle2',
    color: '#d97706',
    badge: 'Trinomio Especial',
    resumen: 'Proviene del cuadrado de un binomio: a² ± 2ab + b² = (a ± b)². Se verifica el doble producto de las raíces.',
    formulaGeneral: 'a² ± 2ab + b² = (a ± b)²',
    teoria: `Un trinomio ordenado es un Cuadrado Perfecto si es el resultado de elevar un binomio al cuadrado: $(a \\pm b)^2$.

Para identificarlo con absoluta certeza:
1. El primer y tercer término deben ser positivos y poseer raíces cuadradas exactas.
2. El término central (segundo término) debe ser exactamente el doble del producto de esas dos raíces cuadradas: $|2ab|$.
3. El signo del binomio resultante coincide con el signo del término central del trinomio original.`,
    pasos: [
      'Ordenar el polinomio en orden decreciente respecto a una de las variables.',
      'Verificar que el primer y tercer término sean positivos.',
      'Calcular la raíz cuadrada del primer término: a = √Término₁.',
      'Calcular la raíz cuadrada del tercer término: b = √Término₃.',
      'Comprobar la condición fundamental: multiplicar 2 · a · b y verificar si es igual en valor absoluto al segundo término.',
      'Si se cumple, escribir la respuesta como (a ± b)², usando el signo del término central.'
    ],
    ejemplos: [
      {
        titulo: 'Ejemplo 1: Trinomio Cuadrado Perfecto básico',
        expresion: 'x² + 8x + 16',
        explicacionPasoAPaso: [
          'El trinomio ya está ordenado.',
          'Raíz del primer término: √x² = x.',
          'Raíz del tercer término: √16 = 4.',
          'Comprobación del doble producto: 2 · (x) · (4) = 8x. ¡Coincide exactamente con el término central!',
          'El signo central es positivo (+), luego el binomio es (x + 4)².'
        ],
        resultado: '(x + 4)²',
        comprobacion: {
          desarrollo: '(x + 4)² = (x)² + 2(x)(4) + (4)² = x² + 8x + 16',
          esCorrecto: true,
          mensaje: 'Desarrollo directo del binomio al cuadrado coincide idénticamente con el trinomio.'
        }
      },
      {
        titulo: 'Ejemplo 2: TCP con signo negativo y coeficientes',
        expresion: '9x² - 30xy + 25y²',
        explicacionPasoAPaso: [
          'Raíz cuadrada del primer término: √(9x²) = 3x.',
          'Raíz cuadrada del tercer término: √(25y²) = 5y.',
          'Doble producto: 2 · (3x) · (5y) = 30xy. Coincide con el término central.',
          'Como el término central tiene signo negativo (-30xy), el binomio resultante lleva signo menos.'
        ],
        resultado: '(3x - 5y)²',
        comprobacion: {
          desarrollo: '(3x - 5y)² = (3x)² - 2(3x)(5y) + (5y)² = 9x² - 30xy + 25y²',
          esCorrecto: true,
          mensaje: 'El término central -30xy surge correctamente de -2ab.'
        }
      },
      {
        titulo: 'Ejemplo 3: TCP con exponentes de grado superior',
        expresion: '16a⁴ + 56a²b³ + 49b⁶',
        explicacionPasoAPaso: [
          'Raíz del primer término: √(16a⁴) = 4a².',
          'Raíz del tercer término: √(49b⁶) = 7b³.',
          'Verificación: 2 · (4a²) · (7b³) = 56a²b³. ¡Coincide con total exactitud!',
          'Signo central positivo: la solución es (4a² + 7b³)².'
        ],
        resultado: '(4a² + 7b³)²',
        comprobacion: {
          desarrollo: '(4a² + 7b³)² = (4a²)² + 2(4a²)(7b³) + (7b³)² = 16a⁴ + 56a²b³ + 49b⁶',
          esCorrecto: true,
          mensaje: 'Leyes de los exponentes (aᵐ)ⁿ = aᵐⁿ corroboradas satisfactoriamente.'
        }
      }
    ],
    consejos: [
      'Siempre calcula 2·a·b antes de escribir el resultado. Si no coincide con el término medio, no es un TCP y debe factorizarse por otro método.',
      'Tanto el primer como el último término deben ser siempre estrictamente positivos (+).'
    ]
  },
  {
    id: 4,
    slug: 'suma-diferencia-de-cubos',
    nombre: 'Suma y Diferencia de Cubos',
    nombreCorto: 'Cubos Perfectos',
    icono: 'Box',
    color: '#7c3aed',
    badge: 'Binomios Cúbicos',
    resumen: 'Descomposición en un binomio y un trinomio: a³ ± b³ = (a ± b)(a² ∓ ab + b²). Nota la alternancia de signos.',
    formulaGeneral: 'a³ ± b³ = (a ± b)(a² ∓ ab + b²)',
    teoria: `A diferencia de los cuadrados, tanto la SUMA como la DIFERENCIA de dos cubos son siempre factorizables en los números reales ℝ.

Se descompone en el producto de:
1. Un **binomio** formado por las raíces cúbicas de ambos términos, conservando el mismo signo de la operación original.
2. Un **trinomio** compuesto por:
   - El cuadrado de la primera raíz: $a^2$
   - El producto de ambas raíces con signo cambiado: $\\mp ab$ (si la expresión original es suma, aquí va resta; si es resta, aquí va suma).
   - El cuadrado de la segunda raíz: $+ b^2$ (siempre positivo).`,
    pasos: [
      'Calcular la raíz cúbica del primer término: a = ∛Término₁.',
      'Calcular la raíz cúbica del segundo término: b = ∛Término₂.',
      'Escribir el factor binomio con el mismo signo original: (a + b) para suma, o (a - b) para resta.',
      'Construir el factor trinomio: a² ∓ ab + b².',
      'Regla nemotécnica de signos "SOAP": Same (mismo signo en el binomio), Opposite (signo opuesto en el producto ab), Always Positive (siempre positivo en el último término b²).'
    ],
    ejemplos: [
      {
        titulo: 'Ejemplo 1: Diferencia de cubos elemental',
        expresion: 'x³ - 27',
        explicacionPasoAPaso: [
          'Raíz cúbica del primer término: ∛x³ = x.',
          'Raíz cúbica del segundo término: ∛27 = 3.',
          'Binomio (mismo signo): (x - 3).',
          'Trinomio: x² + (x)(3) + 3² = x² + 3x + 9 (signo contrario en el término central: +3x).',
          'Producto final: (x - 3)(x² + 3x + 9).'
        ],
        resultado: '(x - 3)(x² + 3x + 9)',
        comprobacion: {
          desarrollo: '(x - 3)(x² + 3x + 9) = x(x² + 3x + 9) - 3(x² + 3x + 9) = x³ + 3x² + 9x - 3x² - 9x - 27 = x³ - 27',
          esCorrecto: true,
          mensaje: 'Los términos intermedios (+3x², -3x², +9x, -9x) se anulan en pares sucesivos.'
        }
      },
      {
        titulo: 'Ejemplo 2: Suma de cubos con coeficientes numéricos',
        expresion: '8y³ + 125',
        explicacionPasoAPaso: [
          'Raíz cúbica del primer término: ∛(8y³) = 2y.',
          'Raíz cúbica del segundo término: ∛125 = 5.',
          'Binomio con el mismo signo: (2y + 5).',
          'Trinomio: (2y)² - (2y)(5) + 5² = 4y² - 10y + 25.',
          'Resultado: (2y + 5)(4y² - 10y + 25).'
        ],
        resultado: '(2y + 5)(4y² - 10y + 25)',
        comprobacion: {
          desarrollo: '(2y + 5)(4y² - 10y + 25) = 2y(4y² - 10y + 25) + 5(4y² - 10y + 25) = 8y³ - 20y² + 50y + 20y² - 50y + 125 = 8y³ + 125',
          esCorrecto: true,
          mensaje: 'Cancelación simétrica perfecta obteniendo 8y³ + 125.'
        }
      },
      {
        titulo: 'Ejemplo 3: Potencias superiores y dos variables',
        expresion: '27m⁶ - 64n³',
        explicacionPasoAPaso: [
          'Raíz cúbica del primer término: ∛(27m⁶) = 3m² (se divide el exponente 6 entre 3).',
          'Raíz cúbica del segundo término: ∛(64n³) = 4n.',
          'Binomio: (3m² - 4n).',
          'Trinomio: (3m²)² + (3m²)(4n) + (4n)² = 9m⁴ + 12m²n + 16n².'
        ],
        resultado: '(3m² - 4n)(9m⁴ + 12m²n + 16n²)',
        comprobacion: {
          desarrollo: '(3m² - 4n)(9m⁴ + 12m²n + 16n²) = 27m⁶ + 36m⁴n + 48m²n² - 36m⁴n - 48m²n² - 64n³ = 27m⁶ - 64n³',
          esCorrecto: true,
          mensaje: 'Verificado paso a paso.'
        }
      }
    ],
    consejos: [
      '¡Cuidado! El término central del trinomio es simple ab, NO 2ab (no confundir con un trinomio cuadrado perfecto).',
      'El trinomio resultante (a² ∓ ab + b²) es siempre irreducible en los números reales ℝ.'
    ]
  },
  {
    id: 5,
    slug: 'trinomio-x2-bx-c',
    nombre: 'Trinomio de la forma x² + bx + c',
    nombreCorto: 'Trinomio x² + bx + c',
    icono: 'Sliders',
    color: '#2563eb',
    badge: 'Coeficiente Unitario',
    resumen: 'Se descompone en dos binomios (x + m)(x + n) donde m · n = c y m + n = b.',
    formulaGeneral: 'x² + bx + c = (x + m)(x + n) con m·n = c y m+n = b',
    teoria: `Este trinomio se caracteriza porque el coeficiente de la variable al cuadrado es estrictamente igual a 1.

Al expandir $(x + m)(x + n)$, obtenemos:
$$x^2 + (m + n)x + mn$$

Por comparación directa de coeficientes:
- El coeficiente lineal $b$ es la suma algebraica: $b = m + n$.
- El término independiente $c$ es el producto algebraico: $c = m \\cdot n$.
- La clave está en descomponer el término $c$ en sus divisores y evaluar cuál pareja suma exactamente $b$.`,
    pasos: [
      'Verificar que el trinomio esté ordenado y que el coeficiente de x² sea 1.',
      'Abrir dos paréntesis con el término común: (x      )(x      ).',
      'Determinar los signos: en el primer paréntesis va el signo de b. En el segundo paréntesis va el producto de los signos de b y c (+ por +, + por -, etc.).',
      'Buscar dos números enteros m y n tales que su producto sea igual a c y su suma algebraica sea igual a b.',
      'Colocar el número de mayor valor absoluto en el primer paréntesis y el menor en el segundo.'
    ],
    ejemplos: [
      {
        titulo: 'Ejemplo 1: Coeficientes todos positivos',
        expresion: 'x² + 7x + 12',
        explicacionPasoAPaso: [
          'Identificamos: b = +7, c = +12.',
          'Estructura de signos: (x +   )(x +   ).',
          'Buscamos dos números m, n cuyo producto sea +12 y cuya suma sea +7.',
          'Factores de 12: 12·1 (suma 13), 6·2 (suma 8), 4·3 (suma 7).',
          'Los números elegidos son 4 y 3.'
        ],
        resultado: '(x + 4)(x + 3)',
        comprobacion: {
          desarrollo: '(x + 4)(x + 3) = x² + 3x + 4x + 12 = x² + 7x + 12',
          esCorrecto: true,
          mensaje: 'La suma 4x + 3x genera el término lineal 7x y 4·3 genera 12.'
        }
      },
      {
        titulo: 'Ejemplo 2: Signos contrarios (producto negativo)',
        expresion: 'x² - 5x - 24',
        explicacionPasoAPaso: [
          'Identificamos: b = -5, c = -24.',
          'Signos: primer paréntesis (-) por ser el signo de b; segundo paréntesis (+) por ley de signos (-) · (-) = (+).',
          'Buscamos dos números que multiplicados den -24 y restados den -5.',
          'Divisores de 24: 24 y 1 (resta 23), 12 y 2 (resta 10), 8 y 3 (resta 5).',
          'Como la suma es negativa (-5), asignamos el signo menos al de mayor valor absoluto: -8 y +3.'
        ],
        resultado: '(x - 8)(x + 3)',
        comprobacion: {
          desarrollo: '(x - 8)(x + 3) = x² + 3x - 8x - 24 = x² - 5x - 24',
          esCorrecto: true,
          mensaje: '+3x - 8x = -5x y (-8) · (+3) = -24.'
        }
      },
      {
        titulo: 'Ejemplo 3: Término medio negativo y constante positiva',
        expresion: 'x² - 11x + 30',
        explicacionPasoAPaso: [
          'Identificamos: b = -11, c = +30.',
          'Signos: (-) y (-) ya que (-) · (+) = (-). Ambos números deben ser negativos.',
          'Buscamos dos números negativos cuyo producto sea +30 y sumados den -11.',
          'Probamos divisores de 30: -30 y -1 (suma -31), -15 y -2 (suma -17), -6 y -5 (suma -11).',
          'Los números son -6 y -5.'
        ],
        resultado: '(x - 6)(x - 5)',
        comprobacion: {
          desarrollo: '(x - 6)(x - 5) = x² - 5x - 6x + 30 = x² - 11x + 30',
          esCorrecto: true,
          mensaje: '(-6) + (-5) = -11 y (-6) · (-5) = +30.'
        }
      }
    ],
    consejos: [
      'Si c es positivo, los dos números tienen el MISMO signo (ambos positivos o ambos negativos) y se suman.',
      'Si c es negativo, los dos números tienen signos DIFERENTES y se restan para obtener b.',
      'El orden de los factores no altera el producto: (x + 3)(x + 4) es idéntico a (x + 4)(x + 3).'
    ]
  },
  {
    id: 6,
    slug: 'trinomio-ax2-bx-c',
    nombre: 'Trinomio de la forma ax² + bx + c',
    nombreCorto: 'Trinomio ax² + bx + c',
    icono: 'Zap',
    color: '#ea580c',
    badge: 'Coeficiente a ≠ 1',
    resumen: 'El coeficiente principal es diferente de 1. Se descompone multiplicando por a o mediante descomposición del término medio (ac).',
    formulaGeneral: 'ax² + bx + c = (a₁x + c₁)(a₂x + c₂)',
    teoria: `Cuando el coeficiente cuadrático $a \\neq 1$, el trinomio no puede factorizarse directamente con números que sumen $b$ y multipliquen $c$.

El método más general y pedagógico es el **Método del Producto ac** (o descomposición del término central):
1. Se calcula el producto clave $P = a \\cdot c$.
2. Se buscan dos enteros $p$ y $q$ que multiplicados den $P$ ($p \\cdot q = a \\cdot c$) y que sumados algebraicamente den el coeficiente central $b$ ($p + q = b$).
3. Se reemplaza el término $bx$ por la suma $px + qx$.
4. Se obtienen 4 términos y se factoriza mediante **agrupación de términos**.`,
    pasos: [
      'Calcular el producto del coeficiente cuadrático por el término independiente: P = a · c.',
      'Encontrar dos números p y q tales que: p · q = P y p + q = b.',
      'Descomponer el término medio bx en px + qx.',
      'Agrupar los cuatro términos resultantes en dos parejas: (ax² + px) + (qx + c).',
      'Extraer el factor común monomio de cada pareja para que quede un paréntesis idéntico en ambas.',
      'Extraer el factor común binomio final.'
    ],
    ejemplos: [
      {
        titulo: 'Ejemplo 1: Coeficientes enteros pequeños',
        expresion: '2x² + 7x + 3',
        explicacionPasoAPaso: [
          'Calculamos a · c = 2 · 3 = +6.',
          'Buscamos dos números que multiplicados den 6 y sumados den 7: 6 y 1 (6 · 1 = 6, 6 + 1 = 7).',
          'Reescribimos el término 7x como 6x + 1x: 2x² + 6x + x + 3.',
          'Agrupamos en parejas: (2x² + 6x) + (x + 3).',
          'Factorizamos cada grupo: 2x(x + 3) + 1(x + 3).',
          'Extraemos el binomio común (x + 3): (2x + 1)(x + 3).'
        ],
        resultado: '(2x + 1)(x + 3)',
        comprobacion: {
          desarrollo: '(2x + 1)(x + 3) = 2x(x + 3) + 1(x + 3) = 2x² + 6x + x + 3 = 2x² + 7x + 3',
          esCorrecto: true,
          mensaje: 'Propiedad distributiva confirma los coeficientes originales.'
        }
      },
      {
        titulo: 'Ejemplo 2: Término medio y constante negativos',
        expresion: '6x² - 7x - 3',
        explicacionPasoAPaso: [
          'Calculamos a · c = 6 · (-3) = -18.',
          'Buscamos p, q tales que p · q = -18 y p + q = -7: -9 y +2 (-9 · 2 = -18, -9 + 2 = -7).',
          'Descomponemos el trinomio: 6x² - 9x + 2x - 3.',
          'Agrupamos: (6x² - 9x) + (2x - 3).',
          'Extraemos factor común: 3x(2x - 3) + 1(2x - 3).',
          'Factor común final: (3x + 1)(2x - 3).'
        ],
        resultado: '(3x + 1)(2x - 3)',
        comprobacion: {
          desarrollo: '(3x + 1)(2x - 3) = 6x² - 9x + 2x - 3 = 6x² - 7x - 3',
          esCorrecto: true,
          mensaje: 'La agrupación conduce a la solución exacta sin ambigüedades.'
        }
      },
      {
        titulo: 'Ejemplo 3: Coeficiente principal primo y término constante negativo',
        expresion: '5x² + 13x - 6',
        explicacionPasoAPaso: [
          'Calculamos a · c = 5 · (-6) = -30.',
          'Buscamos dos números que multiplicados den -30 y sumados den +13: +15 y -2 (15 · (-2) = -30, 15 - 2 = 13).',
          'Descomponemos: 5x² + 15x - 2x - 6.',
          'Agrupamos: (5x² + 15x) - (2x + 6) (nota el cambio de signo dentro del paréntesis por el signo menos exterior).',
          'Extraemos factores: 5x(x + 3) - 2(x + 3).',
          'Resultado: (5x - 2)(x + 3).'
        ],
        resultado: '(5x - 2)(x + 3)',
        comprobacion: {
          desarrollo: '(5x - 2)(x + 3) = 5x² + 15x - 2x - 6 = 5x² + 13x - 6',
          esCorrecto: true,
          mensaje: 'Comprobación exitosa.'
        }
      }
    ],
    consejos: [
      'Al agrupar con un signo menos adelante, como -(2x + 6), ¡no olvides invertir los signos dentro del paréntesis!',
      'Antes de aplicar este método, verifica si no existe un factor común que permita reducir "a" a 1.'
    ]
  },
  {
    id: 7,
    slug: 'agrupacion-de-terminos',
    nombre: 'Factorización por Agrupación',
    nombreCorto: 'Por Agrupación',
    icono: 'Layers',
    color: '#0891b2',
    badge: 'Polinomios de 4+ Términos',
    resumen: 'Se agrupan términos en subgrupos que comparten factores comunes para revelar un factor común polinómico repetido.',
    formulaGeneral: 'ax + ay + bx + by = a(x + y) + b(x + y) = (x + y)(a + b)',
    teoria: `La factorización por agrupación se aplica típicamente a polinomios que tienen un número par de términos (4, 6 o más) en los que no todos los términos comparten una variable o número en común, pero sí lo hacen al reunirlos en subconjuntos de igual tamaño.

El objetivo central es agrupar convenientemente los términos para extraer un factor común monomio de cada subconjunto, logrando que el paréntesis resultante sea exactamente el mismo en cada uno de ellos. Finalmente, ese paréntesis repetido se extrae como factor común polinómico.`,
    pasos: [
      'Contar el número de términos (normalmente 4 o 6).',
      'Asociar los términos en parejas o ternas que tengan letras o divisores en común.',
      'Extraer el factor común de cada grupo de manera individual.',
      'Verificar que los polinomios encerrados entre paréntesis sean estrictamente idénticos (incluidos sus signos).',
      'Extraer el paréntesis repetido como factor común, multiplicándolo por la suma de los factores externos.'
    ],
    ejemplos: [
      {
        titulo: 'Ejemplo 1: Polinomio literal estándar de 4 términos',
        expresion: 'ax + ay + bx + by',
        explicacionPasoAPaso: [
          'Agrupamos en dos parejas: (ax + ay) + (bx + by).',
          'En el primer grupo el factor común es a: a(x + y).',
          'En el segundo grupo el factor común es b: b(x + y).',
          'Expresión resultante: a(x + y) + b(x + y).',
          'Extraemos el factor común (x + y).'
        ],
        resultado: '(x + y)(a + b)',
        comprobacion: {
          desarrollo: '(x + y)(a + b) = x · a + x · b + y · a + y · b = ax + ay + bx + by',
          esCorrecto: true,
          mensaje: 'Desarrollo directo reproduce exactamente los cuatro términos originales.'
        }
      },
      {
        titulo: 'Ejemplo 2: Agrupación con alternancia de signos',
        expresion: '2x² - 3xy - 4x + 6y',
        explicacionPasoAPaso: [
          'Agrupamos los dos primeros y los dos últimos términos: (2x² - 3xy) - (4x - 6y). Observa que al poner el signo (-) antes del segundo paréntesis, el signo de 6y cambió de (+) a (-).',
          'En el primer grupo extraemos x: x(2x - 3y).',
          'En el segundo grupo extraemos 2: 2(2x - 3y).',
          'Ahora ambos grupos tienen el binomio común (2x - 3y).',
          'Factorizamos: (2x - 3y)(x - 2).'
        ],
        resultado: '(2x - 3y)(x - 2)',
        comprobacion: {
          desarrollo: '(2x - 3y)(x - 2) = 2x(x - 2) - 3y(x - 2) = 2x² - 4x - 3xy + 6y',
          esCorrecto: true,
          mensaje: 'Propiedad conmutativa de la adición confirma la correspondencia con 2x² - 3xy - 4x + 6y.'
        }
      },
      {
        titulo: 'Ejemplo 3: Polinomio con coeficientes y variables m y n',
        expresion: '3m² - 6mn + 4m - 8n',
        explicacionPasoAPaso: [
          'Agrupamos: (3m² - 6mn) + (4m - 8n).',
          'Factor común del primer grupo: 3m(m - 2n).',
          'Factor común del segundo grupo: 4(m - 2n).',
          'El factor común repetido es (m - 2n).',
          'Escribimos la respuesta: (m - 2n)(3m + 4).'
        ],
        resultado: '(m - 2n)(3m + 4)',
        comprobacion: {
          desarrollo: '(m - 2n)(3m + 4) = m(3m + 4) - 2n(3m + 4) = 3m² + 4m - 6mn - 8n = 3m² - 6mn + 4m - 8n',
          esCorrecto: true,
          mensaje: 'Los 4 términos originales se recuperan sin variación.'
        }
      }
    ],
    consejos: [
      'Si al agrupar de una forma los paréntesis no coinciden exactamente, intenta reorganizar los términos en otro orden antes de rendirte.',
      'Mucho cuidado con los signos al extraer factores negativos: -(a - b) = -a + b.'
    ]
  },
  {
    id: 8,
    slug: 'factorizacion-mixta',
    nombre: 'Factorización Mixta (Casos Combinados)',
    nombreCorto: 'Mixta / Combinada',
    icono: 'Sparkles',
    color: '#e11d48',
    badge: 'Nivel Avanzado',
    resumen: 'Aplicación sucesiva de dos o más casos de factorización hasta alcanzar factores primos completamente irreducibles.',
    formulaGeneral: 'Polinomio ➔ Factor Común ➔ Diferencia/Trinomio ➔ Factores Primos',
    teoria: `En el cálculo universitario y en la simplificación de fracciones algebraicas complejas, la gran mayoría de las expresiones requieren la aplicación de múltiples casos consecutivos de factorización.

La estrategia rigurosa de resolución ("El algoritmo del factorizador"):
1. **Regla de Oro**: Siempre evaluar y extraer primero el **Factor Común**, ya sea numérico o literal.
2. Contar los términos del polinomio que queda dentro del paréntesis:
   - **2 términos**: evaluar si es Diferencia de Cuadrados ($a^2 - b^2$) o Suma/Diferencia de Cubos ($a^3 \\pm b^3$).
   - **3 términos**: evaluar si es TCP, de la forma $x^2 + bx + c$, o de la forma $ax^2 + bx + c$.
   - **4 términos**: evaluar Agrupación de Términos o combinación de TCP con diferencia de cuadrados.
3. Verificar si alguno de los factores resultantes aún puede descomponerse nuevamente. El proceso se detiene cuando todos los factores son irreducibles en $\\mathbb{R}$.`,
    pasos: [
      'Paso 1: Extraer cualquier factor común monomio o numérico presente en la expresión original.',
      'Paso 2: Inspeccionar la expresión interna y clasificarla según su número de términos (binomio, trinomio o polinomio de 4 términos).',
      'Paso 3: Aplicar el caso específico correspondiente (Diferencia de cuadrados, TCP, Trinomio de la forma ax² + bx + c, etc.).',
      'Paso 4: Inspeccionar todos los factores generados y verificar si alguno de ellos admite una nueva factorización.',
      'Paso 5: Escribir la respuesta final con todos los factores irreducibles multiplicándose entre sí.'
    ],
    ejemplos: [
      {
        titulo: 'Ejemplo 1: Factor común seguido de Diferencia de cuadrados',
        expresion: '2x² - 18',
        explicacionPasoAPaso: [
          'Paso 1: Extraemos el factor común numérico 2: 2(x² - 9).',
          'Paso 2: Analizamos el binomio dentro del paréntesis: (x² - 9). Representa una Diferencia de Cuadrados.',
          'Paso 3: Factorizamos x² - 9 = (x - 3)(x + 3).',
          'Paso 4: El factor 2 y los factores lineales (x - 3) y (x + 3) son primos.',
          'Resultado completo: 2(x - 3)(x + 3).'
        ],
        resultado: '2(x - 3)(x + 3)',
        comprobacion: {
          desarrollo: '2(x - 3)(x + 3) = 2(x² - 9) = 2x² - 18',
          esCorrecto: true,
          mensaje: 'Factor común y binomios conjugados verificados exactamente.'
        }
      },
      {
        titulo: 'Ejemplo 2: Factor común monomio seguido de Trinomio Cuadrado Perfecto',
        expresion: '3x³ - 12x² + 12x',
        explicacionPasoAPaso: [
          'Paso 1: Extraemos el factor común monomio 3x: 3x(x² - 4x + 4).',
          'Paso 2: Analizamos el trinomio (x² - 4x + 4): √x² = x, √4 = 2, doble producto: 2(x)(2) = 4x. ¡Es un Trinomio Cuadrado Perfecto!',
          'Paso 3: Factorizamos el trinomio como (x - 2)²',
          'Resultado final irreducible: 3x(x - 2)².'
        ],
        resultado: '3x(x - 2)²',
        comprobacion: {
          desarrollo: '3x(x - 2)² = 3x(x² - 4x + 4) = 3x³ - 12x² + 12x',
          esCorrecto: true,
          mensaje: 'Comprobación de la expansión confirma el polinomio de partida.'
        }
      },
      {
        titulo: 'Ejemplo 3: Doble diferencia de cuadrados sucesiva',
        expresion: 'x⁴ - 16',
        explicacionPasoAPaso: [
          'Paso 1: Es una diferencia de cuadrados: (x²)² - 4² = (x² - 4)(x² + 4).',
          'Paso 2: Evaluamos cada factor obtenido:',
          '• El factor (x² - 4) es a su vez otra Diferencia de Cuadrados: (x - 2)(x + 2).',
          '• El factor (x² + 4) es una suma de cuadrados, la cual es irreducible en el cuerpo de los números reales ℝ.',
          'Resultado final: (x - 2)(x + 2)(x² + 4).'
        ],
        resultado: '(x - 2)(x + 2)(x² + 4)',
        comprobacion: {
          desarrollo: '(x - 2)(x + 2)(x² + 4) = (x² - 4)(x² + 4) = (x²)² - (4)² = x⁴ - 16',
          esCorrecto: true,
          mensaje: 'La doble factorización queda plenamente demostrada.'
        }
      }
    ],
    consejos: [
      'Si olvidas extraer primero el factor común, los números serán más grandes y los pasos mucho más engorrosos.',
      'Recuerda que una factorización está COMPLETA solo cuando ningún factor entre paréntesis puede ser factorizado más.'
    ]
  }
];
