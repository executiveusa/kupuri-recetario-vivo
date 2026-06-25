import type { Recipe, CookbookSection, Cookbook } from "@/lib/types";

export const sampleSections: CookbookSection[] = [
  { id: "breakfast", titleEn: "Breakfast", titleEsMx: "Desayuno", order: 1 },
  {
    id: "snacks",
    titleEn: "Snacks & Sides",
    titleEsMx: "Botanas y Guarniciones",
    order: 2,
  },
  { id: "soups", titleEn: "Soups", titleEsMx: "Sopas", order: 3 },
  {
    id: "main-dishes",
    titleEn: "Main Dishes",
    titleEsMx: "Platos Fuertes",
    order: 4,
  },
  { id: "baking", titleEn: "Baking", titleEsMx: "Panadería", order: 5 },
];

export const sampleRecipes: Recipe[] = [
  {
    slug: "tomato-scrambled-eggs",
    titleEn: "Tomato Scrambled Eggs",
    titleEsMx: "Huevos Revueltos con Jitomate",
    section: "breakfast",
    sourcePages: [18],
    totalCostUsd: "$1.50",
    totalCostMxn: "$26 MXN",
    costPerServingUsd: "$0.75",
    costPerServingMxn: "$13 MXN",
    yieldEn: "Serves 2",
    yieldEsMx: "Rinde 2 porciones",
    commentaryEn:
      "A quick, bright breakfast that makes the most of ripe tomatoes. This is comfort food at its simplest — eggs and tomatoes come together in minutes for a satisfying meal.",
    commentaryEsMx:
      "Un desayuno rápido y lleno de sabor que aprovecha los jitomates maduros. Es comida reconfortante en su forma más sencilla — los huevos y jitomates se unen en minutos para una comida satisfactoria.",
    ingredients: [
      { originalEn: "4 eggs", esMx: "4 huevos", amount: "4", item: "eggs" },
      {
        originalEn: "2 medium tomatoes, chopped",
        esMx: "2 jitomates medianos, picados",
        amount: "2",
        item: "tomatoes",
      },
      {
        originalEn: "1 tablespoon butter",
        esMx: "1 cucharada de mantequilla",
        amount: "1 tbsp",
        item: "butter",
      },
      {
        originalEn: "Salt and pepper to taste",
        esMx: "Sal y pimienta al gusto",
        item: "salt and pepper",
      },
      {
        originalEn: "2 green onions, chopped",
        esMx: "2 cebollitas de cambray, picadas",
        amount: "2",
        item: "green onions",
      },
    ],
    steps: [
      {
        order: 1,
        textEn: "Melt butter in a skillet over medium heat.",
        textEsMx: "Derrite la mantequilla en un sartén a fuego medio.",
      },
      {
        order: 2,
        textEn:
          "Add chopped tomatoes and cook for 2 minutes until they start to soften.",
        textEsMx:
          "Agrega los jitomates picados y cocina por 2 minutos hasta que empiecen a suavizarse.",
        timers: [{ label: "Cocinar jitomates", seconds: 120 }],
      },
      {
        order: 3,
        textEn:
          "Crack eggs into the skillet, stir gently, and scramble until just set.",
        textEsMx:
          "Rompe los huevos en el sartén, revuelve suavemente y cocina hasta que cuajen.",
      },
      {
        order: 4,
        textEn:
          "Season with salt and pepper, top with green onions, and serve immediately.",
        textEsMx:
          "Sazona con sal y pimienta, decora con cebollitas y sirve de inmediato.",
      },
    ],
    tips: [
      {
        type: "budget",
        textEn:
          "Use canned tomatoes when fresh ones aren't in season — they're cheaper and taste great.",
        textEsMx:
          "Usa jitomates de lata cuando no sea temporada de frescos — son más baratos y saben muy bien.",
      },
      {
        type: "technique",
        textEn: "Low heat and gentle stirring give you big, fluffy curds.",
        textEsMx:
          "Fuego bajo y revolver suavemente te da trozos grandes y esponjosos.",
      },
    ],
    techniques: ["scrambling", "sautéing"],
    tags: ["desayuno", "rápido", "vegetariano", "económico"],
    hero: {
      featured: true,
      tilePosition: "wide",
      shortTitleEsMx: "Huevos con Jitomate",
      oneLineHookEsMx: "Desayuno clásico en 5 minutos",
      colorAccent: "tomato",
    },
  },
  {
    slug: "broiled-grapefruit",
    titleEn: "Broiled Grapefruit",
    titleEsMx: "Toronja al Gratinador",
    section: "breakfast",
    sourcePages: [19],
    totalCostUsd: "$0.80",
    totalCostMxn: "$14 MXN",
    costPerServingUsd: "$0.40",
    costPerServingMxn: "$7 MXN",
    yieldEn: "Serves 2",
    yieldEsMx: "Rinde 2 porciones",
    commentaryEn:
      "Broiling transforms a plain grapefruit into a warm, caramelized treat. The sugar bubbles and browns under the heat, creating a crispy top over juicy citrus.",
    commentaryEsMx:
      "El gratinador transforma una simple toronja en un postre tibio y caramelizado. El azúcar burbujea y se dora bajo el calor, creando una capa crujiente sobre la jugosa fruta.",
    ingredients: [
      {
        originalEn: "1 grapefruit, halved",
        esMx: "1 toronja, cortada por la mitad",
        amount: "1",
        item: "grapefruit",
      },
      {
        originalEn: "2 teaspoons brown sugar",
        esMx: "2 cucharaditas de azúcar morena",
        amount: "2 tsp",
        item: "brown sugar",
      },
      {
        originalEn: "Pinch of cinnamon",
        esMx: "Una pizca de canela",
        item: "cinnamon",
      },
      {
        originalEn: "Pinch of salt",
        esMx: "Una pizca de sal",
        item: "salt",
      },
    ],
    steps: [
      {
        order: 1,
        textEn:
          "Set oven to broil. Place grapefruit halves cut-side up on a baking sheet.",
        textEsMx:
          "Enciende el gratinador del horno. Coloca las mitades de toronja con el corte hacia arriba en una charola.",
      },
      {
        order: 2,
        textEn:
          "Sprinkle each half with brown sugar, cinnamon, and a pinch of salt.",
        textEsMx:
          "Espolvorea cada mitad con azúcar morena, canela y una pizca de sal.",
      },
      {
        order: 3,
        textEn:
          "Broil for 3-5 minutes, until the sugar is bubbly and slightly charred.",
        textEsMx:
          "Gratina por 3 a 5 minutos, hasta que el azúcar burbujee y se dore ligeramente.",
        timers: [{ label: "Gratinar", seconds: 240 }],
      },
    ],
    tips: [
      {
        type: "substitution",
        textEn: "No brown sugar? Use honey or maple syrup instead.",
        textEsMx:
          "¿No tienes azúcar morena? Usa miel de abeja o miel de maple.",
      },
    ],
    techniques: ["broiling"],
    tags: ["desayuno", "rápido", "vegetariano", "fruta", "económico"],
    hero: {
      featured: true,
      tilePosition: "square",
      shortTitleEsMx: "Toronja Gratinada",
      oneLineHookEsMx: "Fruta caramelizada en minutos",
      colorAccent: "corn",
    },
  },
  {
    slug: "omelette",
    titleEn: "Omelette",
    titleEsMx: "Omelette",
    section: "breakfast",
    sourcePages: [20],
    totalCostUsd: "$1.20",
    totalCostMxn: "$21 MXN",
    costPerServingUsd: "$1.20",
    costPerServingMxn: "$21 MXN",
    yieldEn: "Serves 1",
    yieldEsMx: "Rinde 1 porción",
    commentaryEn:
      "Master the omelette and you'll never go hungry. Fill it with whatever you have — cheese, vegetables, leftover beans, salsa.",
    commentaryEsMx:
      "Domina el omelette y nunca te quedarás con hambre. Rellénalo con lo que tengas — queso, verduras, frijoles sobrantes, salsa.",
    ingredients: [
      { originalEn: "2 eggs", esMx: "2 huevos", amount: "2", item: "eggs" },
      {
        originalEn: "1 tablespoon butter",
        esMx: "1 cucharada de mantequilla",
        amount: "1 tbsp",
        item: "butter",
      },
      {
        originalEn: "¼ cup shredded cheese",
        esMx: "¼ taza de queso rallado",
        amount: "¼ cup",
        item: "cheese",
      },
      {
        originalEn: "Salt and pepper",
        esMx: "Sal y pimienta",
        item: "salt and pepper",
      },
    ],
    steps: [
      {
        order: 1,
        textEn: "Beat eggs with a pinch of salt and pepper.",
        textEsMx: "Bate los huevos con una pizca de sal y pimienta.",
      },
      {
        order: 2,
        textEn: "Melt butter in a non-stick pan over medium-low heat.",
        textEsMx:
          "Derrite la mantequilla en un sartén antiadherente a fuego medio-bajo.",
      },
      {
        order: 3,
        textEn:
          "Pour in eggs and let them cook undisturbed until the edges set, about 2 minutes.",
        textEsMx:
          "Vierte los huevos y déjalos cocinar sin mover hasta que las orillas cuajen, unos 2 minutos.",
        timers: [{ label: "Cuajar huevos", seconds: 120 }],
      },
      {
        order: 4,
        textEn:
          "Add cheese to one half, fold over, and slide onto a plate.",
        textEsMx:
          "Agrega el queso en una mitad, dobla y desliza al plato.",
      },
    ],
    tips: [
      {
        type: "technique",
        textEn: "The secret is low heat. Don't rush it.",
        textEsMx: "El secreto es fuego bajo. No lo apresures.",
      },
      {
        type: "substitution",
        textEn:
          "Fill with sautéed mushrooms, peppers, or leftover vegetables.",
        textEsMx:
          "Rellena con champiñones salteados, pimientos o verduras sobrantes.",
      },
    ],
    techniques: ["pan-frying", "folding"],
    tags: ["desayuno", "rápido", "vegetariano", "proteína"],
    hero: {
      featured: true,
      tilePosition: "square",
      shortTitleEsMx: "Omelette",
      oneLineHookEsMx: "Rellénalo con lo que tengas",
      colorAccent: "corn",
    },
  },
  {
    slug: "banana-pancakes",
    titleEn: "Banana Pancakes",
    titleEsMx: "Hotcakes de Plátano",
    section: "breakfast",
    sourcePages: [22],
    totalCostUsd: "$1.80",
    totalCostMxn: "$32 MXN",
    costPerServingUsd: "$0.45",
    costPerServingMxn: "$8 MXN",
    yieldEn: "Serves 4",
    yieldEsMx: "Rinde 4 porciones",
    commentaryEn:
      "Use up those overripe bananas! These pancakes are naturally sweet and fluffy, no need for much added sugar.",
    commentaryEsMx:
      "¡Aprovecha esos plátanos maduros! Estos hotcakes son naturalmente dulces y esponjosos, sin necesidad de mucha azúcar extra.",
    ingredients: [
      {
        originalEn: "2 ripe bananas, mashed",
        esMx: "2 plátanos maduros, machacados",
        amount: "2",
        item: "bananas",
      },
      {
        originalEn: "1 cup all-purpose flour",
        esMx: "1 taza de harina de trigo",
        amount: "1 cup",
        item: "flour",
      },
      { originalEn: "1 egg", esMx: "1 huevo", amount: "1", item: "egg" },
      {
        originalEn: "¾ cup milk",
        esMx: "¾ taza de leche",
        amount: "¾ cup",
        item: "milk",
      },
      {
        originalEn: "1 tablespoon butter, melted",
        esMx: "1 cucharada de mantequilla derretida",
        amount: "1 tbsp",
        item: "butter",
      },
      {
        originalEn: "1 teaspoon baking powder",
        esMx: "1 cucharadita de polvo para hornear",
        amount: "1 tsp",
        item: "baking powder",
      },
    ],
    steps: [
      {
        order: 1,
        textEn:
          "Mash the bananas in a large bowl. Add egg, milk, and melted butter; stir to combine.",
        textEsMx:
          "Machaca los plátanos en un tazón grande. Agrega el huevo, la leche y la mantequilla derretida; revuelve para combinar.",
      },
      {
        order: 2,
        textEn:
          "Add flour and baking powder. Mix until just combined — lumps are fine.",
        textEsMx:
          "Agrega la harina y el polvo para hornear. Mezcla hasta que apenas se combine — los grumos están bien.",
      },
      {
        order: 3,
        textEn:
          "Heat a skillet over medium heat. Pour ¼ cup batter per pancake.",
        textEsMx:
          "Calienta un sartén a fuego medio. Vierte ¼ de taza de masa por hotcake.",
      },
      {
        order: 4,
        textEn:
          "Cook until bubbles form on top, about 2 minutes, then flip and cook 1 more minute.",
        textEsMx:
          "Cocina hasta que se formen burbujas en la superficie, unos 2 minutos, luego voltea y cocina 1 minuto más.",
        timers: [
          { label: "Primer lado", seconds: 120 },
          { label: "Segundo lado", seconds: 60 },
        ],
      },
    ],
    tips: [
      {
        type: "budget",
        textEn:
          "Overripe bananas are often discounted — buy them cheap and freeze for later.",
        textEsMx:
          "Los plátanos muy maduros suelen estar en oferta — cómpralos baratos y congélalos.",
      },
      {
        type: "substitution",
        textEn:
          "Add a handful of chocolate chips or blueberries to the batter.",
        textEsMx:
          "Agrega un puñado de chispas de chocolate o arándanos a la masa.",
      },
    ],
    techniques: ["pan-frying", "mixing"],
    tags: ["desayuno", "vegetariano", "dulce", "económico"],
    hero: {
      featured: true,
      tilePosition: "tall",
      shortTitleEsMx: "Hotcakes de Plátano",
      oneLineHookEsMx: "Dulzura natural sin gastar de más",
      colorAccent: "corn",
    },
  },
  {
    slug: "chocolate-zucchini-muffins",
    titleEn: "Chocolate Zucchini Muffins",
    titleEsMx: "Muffins de Chocolate y Calabacita",
    section: "baking",
    sourcePages: [24],
    totalCostUsd: "$3.20",
    totalCostMxn: "$56 MXN",
    costPerServingUsd: "$0.27",
    costPerServingMxn: "$5 MXN",
    yieldEn: "Makes 12 muffins",
    yieldEsMx: "Rinde 12 muffins",
    commentaryEn:
      "Zucchini melts into chocolate muffins and keeps them incredibly moist. A great way to sneak in vegetables.",
    commentaryEsMx:
      "La calabacita se funde en los muffins de chocolate y los mantiene increíblemente húmedos. Una gran forma de incluir verduras.",
    ingredients: [
      {
        originalEn: "1½ cups all-purpose flour",
        esMx: "1½ tazas de harina de trigo",
        amount: "1½ cups",
        item: "flour",
      },
      {
        originalEn: "⅓ cup cocoa powder",
        esMx: "⅓ taza de cocoa en polvo",
        amount: "⅓ cup",
        item: "cocoa powder",
      },
      {
        originalEn: "1 cup grated zucchini",
        esMx: "1 taza de calabacita rallada",
        amount: "1 cup",
        item: "zucchini",
      },
      {
        originalEn: "½ cup sugar",
        esMx: "½ taza de azúcar",
        amount: "½ cup",
        item: "sugar",
      },
      {
        originalEn: "⅓ cup vegetable oil",
        esMx: "⅓ taza de aceite vegetal",
        amount: "⅓ cup",
        item: "vegetable oil",
      },
      { originalEn: "1 egg", esMx: "1 huevo", amount: "1", item: "egg" },
    ],
    steps: [
      {
        order: 1,
        textEn:
          "Preheat oven to 350°F (175°C). Line a muffin tin with paper liners.",
        textEsMx:
          "Precalienta el horno a 175°C. Coloca capacillos en un molde para muffins.",
      },
      {
        order: 2,
        textEn: "Mix flour, cocoa, and sugar in a large bowl.",
        textEsMx:
          "Mezcla la harina, la cocoa y el azúcar en un tazón grande.",
      },
      {
        order: 3,
        textEn:
          "In another bowl, combine grated zucchini, oil, and egg. Add wet ingredients to dry and stir until just combined.",
        textEsMx:
          "En otro tazón, combina la calabacita rallada, el aceite y el huevo. Agrega los ingredientes húmedos a los secos y revuelve hasta que apenas se combinen.",
      },
      {
        order: 4,
        textEn:
          "Fill muffin cups two-thirds full. Bake for 20-25 minutes.",
        textEsMx:
          "Llena los capacillos hasta dos tercios. Hornea por 20 a 25 minutos.",
        timers: [{ label: "Hornear muffins", seconds: 1350 }],
      },
    ],
    tips: [
      {
        type: "technique",
        textEn:
          "Don't squeeze the zucchini — the moisture is what keeps the muffins tender.",
        textEsMx:
          "No exprimas la calabacita — la humedad es lo que mantiene los muffins suaves.",
      },
      {
        type: "budget",
        textEn:
          "Zucchini is one of the cheapest vegetables, especially in summer.",
        textEsMx:
          "La calabacita es una de las verduras más baratas, especialmente en verano.",
      },
    ],
    techniques: ["baking", "grating", "mixing"],
    tags: ["panadería", "vegetariano", "dulce", "económico", "calabacita"],
    hero: {
      featured: true,
      tilePosition: "square",
      shortTitleEsMx: "Muffins de Chocolate",
      oneLineHookEsMx: "Con calabacita secreta que los hace suaves",
      colorAccent: "chile",
    },
  },
  {
    slug: "whole-wheat-jalapeno-cheddar-scones",
    titleEn: "Whole-Wheat Jalapeño Cheddar Scones",
    titleEsMx: "Scones Integrales de Jalapeño y Queso",
    section: "baking",
    sourcePages: [26],
    totalCostUsd: "$2.80",
    totalCostMxn: "$49 MXN",
    costPerServingUsd: "$0.35",
    costPerServingMxn: "$6 MXN",
    yieldEn: "Makes 8 scones",
    yieldEsMx: "Rinde 8 scones",
    commentaryEn:
      "Savory scones with a kick! The jalapeño and cheddar combination makes these irresistible with soup or on their own.",
    commentaryEsMx:
      "¡Scones salados con un toque picante! La combinación de jalapeño y queso los hace irresistibles con sopa o solos.",
    ingredients: [
      {
        originalEn: "2 cups whole-wheat flour",
        esMx: "2 tazas de harina integral",
        amount: "2 cups",
        item: "whole-wheat flour",
      },
      {
        originalEn: "1 tablespoon baking powder",
        esMx: "1 cucharada de polvo para hornear",
        amount: "1 tbsp",
        item: "baking powder",
      },
      {
        originalEn: "¼ cup cold butter, cubed",
        esMx: "¼ taza de mantequilla fría, en cubos",
        amount: "¼ cup",
        item: "butter",
      },
      {
        originalEn: "1 cup shredded cheddar",
        esMx: "1 taza de queso cheddar rallado",
        amount: "1 cup",
        item: "cheddar cheese",
      },
      {
        originalEn: "2 jalapeños, seeded and diced",
        esMx: "2 chiles jalapeños, sin semillas y picados",
        amount: "2",
        item: "jalapeños",
      },
      {
        originalEn: "¾ cup milk",
        esMx: "¾ taza de leche",
        amount: "¾ cup",
        item: "milk",
      },
    ],
    steps: [
      {
        order: 1,
        textEn:
          "Preheat oven to 400°F (200°C). Line a baking sheet with parchment.",
        textEsMx:
          "Precalienta el horno a 200°C. Forra una charola con papel para hornear.",
      },
      {
        order: 2,
        textEn:
          "Mix flour and baking powder. Cut in cold butter until mixture resembles coarse crumbs.",
        textEsMx:
          "Mezcla la harina y el polvo para hornear. Incorpora la mantequilla fría cortándola hasta que parezcan migas gruesas.",
      },
      {
        order: 3,
        textEn:
          "Stir in cheese and jalapeños. Add milk and mix until dough comes together.",
        textEsMx:
          "Incorpora el queso y los jalapeños. Agrega la leche y mezcla hasta que la masa se una.",
      },
      {
        order: 4,
        textEn:
          "Pat dough into a circle, cut into 8 wedges, and place on baking sheet.",
        textEsMx:
          "Aplana la masa en un círculo, corta en 8 triángulos y coloca en la charola.",
      },
      {
        order: 5,
        textEn: "Bake for 20-22 minutes until golden brown.",
        textEsMx:
          "Hornea por 20 a 22 minutos hasta que estén dorados.",
        timers: [{ label: "Hornear scones", seconds: 1260 }],
      },
    ],
    tips: [
      {
        type: "safety",
        textEn:
          "Wear gloves or wash hands well after handling jalapeños. Don't touch your eyes!",
        textEsMx:
          "Usa guantes o lávate bien las manos después de manejar jalapeños. ¡No te toques los ojos!",
      },
      {
        type: "substitution",
        textEn:
          "Use any cheese you have — queso Oaxaca works wonderfully.",
        textEsMx:
          "Usa el queso que tengas — el queso Oaxaca funciona de maravilla.",
      },
    ],
    techniques: ["baking", "cutting-in-butter"],
    tags: ["panadería", "vegetariano", "picante", "jalapeño"],
    hero: {
      featured: true,
      tilePosition: "wide",
      shortTitleEsMx: "Scones de Jalapeño",
      oneLineHookEsMx: "Pan casero con un toque picante",
      colorAccent: "herb",
    },
  },
  {
    slug: "peanut-butter-jelly-granola-bars",
    titleEn: "Peanut Butter and Jelly Granola Bars",
    titleEsMx: "Barras de Granola con Crema de Cacahuate",
    section: "snacks",
    sourcePages: [30],
    totalCostUsd: "$3.50",
    totalCostMxn: "$62 MXN",
    costPerServingUsd: "$0.44",
    costPerServingMxn: "$8 MXN",
    yieldEn: "Makes 8 bars",
    yieldEsMx: "Rinde 8 barras",
    commentaryEn:
      "Homemade granola bars cost a fraction of store-bought and taste so much better. Peanut butter holds them together while the jam adds pockets of sweetness.",
    commentaryEsMx:
      "Las barras de granola caseras cuestan una fracción de las compradas y saben mucho mejor. La crema de cacahuate las mantiene unidas y la mermelada agrega toques de dulzura.",
    ingredients: [
      {
        originalEn: "2 cups rolled oats",
        esMx: "2 tazas de avena en hojuelas",
        amount: "2 cups",
        item: "rolled oats",
      },
      {
        originalEn: "½ cup peanut butter",
        esMx: "½ taza de crema de cacahuate",
        amount: "½ cup",
        item: "peanut butter",
      },
      {
        originalEn: "¼ cup honey",
        esMx: "¼ taza de miel de abeja",
        amount: "¼ cup",
        item: "honey",
      },
      {
        originalEn: "¼ cup jam or jelly",
        esMx: "¼ taza de mermelada",
        amount: "¼ cup",
        item: "jam",
      },
      {
        originalEn: "Pinch of salt",
        esMx: "Una pizca de sal",
        item: "salt",
      },
    ],
    steps: [
      {
        order: 1,
        textEn:
          "Preheat oven to 325°F (160°C). Line an 8×8 pan with parchment.",
        textEsMx:
          "Precalienta el horno a 160°C. Forra un molde de 20×20 cm con papel para hornear.",
      },
      {
        order: 2,
        textEn:
          "Warm peanut butter and honey together until easy to stir. Mix with oats and salt.",
        textEsMx:
          "Calienta la crema de cacahuate y la miel juntas hasta que sean fáciles de revolver. Mezcla con la avena y la sal.",
      },
      {
        order: 3,
        textEn:
          "Press half the mixture into the pan. Spread jam on top. Add remaining oat mixture and press firmly.",
        textEsMx:
          "Presiona la mitad de la mezcla en el molde. Unta la mermelada encima. Agrega el resto de la mezcla de avena y presiona firmemente.",
      },
      {
        order: 4,
        textEn:
          "Bake for 25 minutes. Let cool completely before cutting into bars.",
        textEsMx:
          "Hornea por 25 minutos. Deja enfriar completamente antes de cortar en barras.",
        timers: [{ label: "Hornear barras", seconds: 1500 }],
      },
    ],
    tips: [
      {
        type: "budget",
        textEn:
          "Buy oats in bulk — they're one of the cheapest pantry staples.",
        textEsMx:
          "Compra avena a granel — es uno de los básicos de despensa más baratos.",
      },
      {
        type: "commentary",
        textEn: "These keep for a week in an airtight container.",
        textEsMx:
          "Estas barras duran una semana en un recipiente hermético.",
      },
    ],
    techniques: ["baking", "pressing"],
    tags: ["botana", "vegetariano", "dulce", "económico", "lonchera"],
    hero: {
      featured: true,
      tilePosition: "tall",
      shortTitleEsMx: "Barras de Granola",
      oneLineHookEsMx: "Mejor y más barato que las de tienda",
      colorAccent: "corn",
    },
  },
  {
    slug: "dal",
    titleEn: "Dal",
    titleEsMx: "Dal (Lentejas al Estilo Indio)",
    section: "main-dishes",
    sourcePages: [76],
    totalCostUsd: "$2.50",
    totalCostMxn: "$44 MXN",
    costPerServingUsd: "$0.63",
    costPerServingMxn: "$11 MXN",
    yieldEn: "Serves 4",
    yieldEsMx: "Rinde 4 porciones",
    commentaryEn:
      "Dal is a staple across South Asia — a bowl of warm, spiced lentils that's deeply satisfying and costs almost nothing to make.",
    commentaryEsMx:
      "El dal es un platillo básico en todo el sur de Asia — un tazón de lentejas tibias y especiadas que es profundamente satisfactorio y no cuesta casi nada de hacer.",
    ingredients: [
      {
        originalEn: "1 cup red lentils",
        esMx: "1 taza de lentejas rojas",
        amount: "1 cup",
        item: "red lentils",
      },
      {
        originalEn: "1 tablespoon butter or oil",
        esMx: "1 cucharada de mantequilla o aceite",
        amount: "1 tbsp",
        item: "butter",
      },
      {
        originalEn: "1 onion, diced",
        esMx: "1 cebolla, picada en cubos",
        amount: "1",
        item: "onion",
      },
      {
        originalEn: "3 cloves garlic, minced",
        esMx: "3 dientes de ajo, picados finamente",
        amount: "3",
        item: "garlic",
      },
      {
        originalEn: "1 teaspoon cumin",
        esMx: "1 cucharadita de comino",
        amount: "1 tsp",
        item: "cumin",
      },
      {
        originalEn: "1 teaspoon turmeric",
        esMx: "1 cucharadita de cúrcuma",
        amount: "1 tsp",
        item: "turmeric",
      },
    ],
    steps: [
      {
        order: 1,
        textEn:
          "Rinse lentils and set aside. Dice onion and mince garlic.",
        textEsMx:
          "Enjuaga las lentejas y resérvalas. Pica la cebolla en cubos y el ajo finamente.",
      },
      {
        order: 2,
        textEn:
          "Heat butter in a pot over medium heat. Cook onion until translucent, about 5 minutes.",
        textEsMx:
          "Calienta la mantequilla en una olla a fuego medio. Cocina la cebolla hasta que esté translúcida, unos 5 minutos.",
        timers: [{ label: "Sofreír cebolla", seconds: 300 }],
      },
      {
        order: 3,
        textEn:
          "Add garlic, cumin, and turmeric. Stir for 30 seconds until fragrant.",
        textEsMx:
          "Agrega el ajo, el comino y la cúrcuma. Revuelve por 30 segundos hasta que suelten su aroma.",
        timers: [{ label: "Tostar especias", seconds: 30 }],
      },
      {
        order: 4,
        textEn:
          "Add lentils and 3 cups of water. Bring to a boil, then reduce heat and simmer for 20-25 minutes until lentils are soft.",
        textEsMx:
          "Agrega las lentejas y 3 tazas de agua. Lleva a ebullición, luego baja el fuego y cocina a fuego lento por 20 a 25 minutos hasta que las lentejas estén suaves.",
        timers: [{ label: "Cocinar lentejas", seconds: 1350 }],
      },
      {
        order: 5,
        textEn: "Season with salt and serve with rice or bread.",
        textEsMx: "Sazona con sal y sirve con arroz o pan.",
      },
    ],
    tips: [
      {
        type: "budget",
        textEn:
          "Dried lentils are one of the cheapest proteins available. A 1-pound bag costs about $1.",
        textEsMx:
          "Las lentejas secas son una de las proteínas más baratas que hay. Una bolsa de medio kilo cuesta unos $15 MXN.",
      },
      {
        type: "technique",
        textEn:
          "Red lentils don't need soaking and cook quickly, unlike other varieties.",
        textEsMx:
          "Las lentejas rojas no necesitan remojo y se cocinan rápido, a diferencia de otras variedades.",
      },
    ],
    techniques: ["simmering", "sautéing", "toasting-spices"],
    tags: ["plato-fuerte", "vegano", "económico", "proteína", "lentejas"],
    hero: {
      featured: true,
      tilePosition: "wide",
      shortTitleEsMx: "Dal de Lentejas",
      oneLineHookEsMx: "Proteína abundante por casi nada",
      colorAccent: "corn",
    },
  },
  {
    slug: "corn-soup",
    titleEn: "Corn Soup",
    titleEsMx: "Sopa de Elote",
    section: "soups",
    sourcePages: [52],
    totalCostUsd: "$2.00",
    totalCostMxn: "$35 MXN",
    costPerServingUsd: "$0.50",
    costPerServingMxn: "$9 MXN",
    yieldEn: "Serves 4",
    yieldEsMx: "Rinde 4 porciones",
    commentaryEn:
      "Sweet, creamy corn soup that celebrates the flavor of fresh corn. Simple ingredients, big taste.",
    commentaryEsMx:
      "Sopa de elote dulce y cremosa que celebra el sabor del elote fresco. Ingredientes sencillos, gran sabor.",
    ingredients: [
      {
        originalEn: "4 ears of corn, kernels cut off",
        esMx: "4 elotes, granos cortados",
        amount: "4",
        item: "corn",
      },
      {
        originalEn: "1 onion, diced",
        esMx: "1 cebolla, picada",
        amount: "1",
        item: "onion",
      },
      {
        originalEn: "2 cloves garlic, minced",
        esMx: "2 dientes de ajo, picados",
        amount: "2",
        item: "garlic",
      },
      {
        originalEn: "1 tablespoon butter",
        esMx: "1 cucharada de mantequilla",
        amount: "1 tbsp",
        item: "butter",
      },
      {
        originalEn: "3 cups water or broth",
        esMx: "3 tazas de agua o caldo",
        amount: "3 cups",
        item: "broth",
      },
    ],
    steps: [
      {
        order: 1,
        textEn:
          "Melt butter in a pot. Sauté onion and garlic until soft, about 4 minutes.",
        textEsMx:
          "Derrite la mantequilla en una olla. Saltea la cebolla y el ajo hasta que estén suaves, unos 4 minutos.",
        timers: [{ label: "Sofreír", seconds: 240 }],
      },
      {
        order: 2,
        textEn:
          "Add corn kernels and broth. Bring to a boil, then simmer for 15 minutes.",
        textEsMx:
          "Agrega los granos de elote y el caldo. Lleva a ebullición, luego cocina a fuego lento por 15 minutos.",
        timers: [{ label: "Cocinar sopa", seconds: 900 }],
      },
      {
        order: 3,
        textEn:
          "Blend half the soup until smooth, then stir it back in for a creamy but chunky texture.",
        textEsMx:
          "Licúa la mitad de la sopa hasta que quede tersa, luego incorpórala de nuevo para una textura cremosa pero con trozos.",
      },
      {
        order: 4,
        textEn: "Season with salt and pepper. Serve hot.",
        textEsMx: "Sazona con sal y pimienta. Sirve caliente.",
      },
    ],
    tips: [
      {
        type: "budget",
        textEn:
          "Frozen corn works great and is available year-round at a low price.",
        textEsMx:
          "El elote congelado funciona muy bien y está disponible todo el año a bajo precio.",
      },
      {
        type: "technique",
        textEn:
          "Blending only half keeps interesting texture while still feeling creamy.",
        textEsMx:
          "Licuar solo la mitad mantiene una textura interesante sin dejar de ser cremosa.",
      },
    ],
    techniques: ["simmering", "blending", "sautéing"],
    tags: ["sopa", "vegetariano", "económico", "elote"],
    hero: {
      featured: false,
      shortTitleEsMx: "Sopa de Elote",
      oneLineHookEsMx: "Cremosa y reconfortante",
      colorAccent: "corn",
    },
  },
  {
    slug: "mexican-street-corn",
    titleEn: "Mexican Street Corn",
    titleEsMx: "Elotes Callejeros",
    section: "snacks",
    sourcePages: [42],
    totalCostUsd: "$1.80",
    totalCostMxn: "$32 MXN",
    costPerServingUsd: "$0.45",
    costPerServingMxn: "$8 MXN",
    yieldEn: "Serves 4",
    yieldEsMx: "Rinde 4 porciones",
    commentaryEn:
      "Inspired by the classic Mexican street food — charred corn slathered with creamy, tangy, spicy toppings. Every bite is a party.",
    commentaryEsMx:
      "Inspirados en la comida callejera clásica mexicana — elote asado cubierto de ingredientes cremosos, ácidos y picantes. Cada mordida es una fiesta.",
    ingredients: [
      {
        originalEn: "4 ears of corn",
        esMx: "4 elotes",
        amount: "4",
        item: "corn",
      },
      {
        originalEn: "¼ cup mayonnaise",
        esMx: "¼ taza de mayonesa",
        amount: "¼ cup",
        item: "mayonnaise",
      },
      {
        originalEn: "¼ cup cotija cheese, crumbled",
        esMx: "¼ taza de queso cotija, desmoronado",
        amount: "¼ cup",
        item: "cotija cheese",
      },
      {
        originalEn: "1 lime, cut into wedges",
        esMx: "1 limón, cortado en gajos",
        amount: "1",
        item: "lime",
      },
      {
        originalEn: "Chile powder to taste",
        esMx: "Chile en polvo al gusto",
        item: "chile powder",
      },
    ],
    steps: [
      {
        order: 1,
        textEn:
          "Grill or broil corn until charred on all sides, about 8-10 minutes, turning occasionally.",
        textEsMx:
          "Asa los elotes hasta que estén dorados por todos lados, unos 8 a 10 minutos, volteando de vez en cuando.",
        timers: [{ label: "Asar elotes", seconds: 540 }],
      },
      {
        order: 2,
        textEn: "Spread mayonnaise over the hot corn.",
        textEsMx: "Unta mayonesa sobre los elotes calientes.",
      },
      {
        order: 3,
        textEn:
          "Sprinkle with crumbled cotija cheese and chile powder.",
        textEsMx:
          "Espolvorea con queso cotija desmoronado y chile en polvo.",
      },
      {
        order: 4,
        textEn:
          "Squeeze lime over the top and serve immediately.",
        textEsMx: "Exprime limón por encima y sirve de inmediato.",
      },
    ],
    tips: [
      {
        type: "substitution",
        textEn: "No cotija? Use feta or parmesan as a substitute.",
        textEsMx:
          "¿No tienes cotija? Usa queso feta o parmesano como sustituto.",
      },
      {
        type: "commentary",
        textEn:
          "This is as close to street-side elotes as you can get at home.",
        textEsMx:
          "Esto es lo más cercano a los elotes del puesto que puedes lograr en casa.",
      },
    ],
    techniques: ["grilling", "broiling"],
    tags: ["botana", "vegetariano", "mexicano", "elote", "callejero"],
    hero: {
      featured: false,
      shortTitleEsMx: "Elotes Callejeros",
      oneLineHookEsMx: "El sabor de la calle en tu cocina",
      colorAccent: "chile",
    },
  },
  {
    slug: "cauliflower-tacos",
    titleEn: "Cauliflower Tacos",
    titleEsMx: "Tacos de Coliflor",
    section: "main-dishes",
    sourcePages: [88],
    totalCostUsd: "$3.00",
    totalCostMxn: "$53 MXN",
    costPerServingUsd: "$0.75",
    costPerServingMxn: "$13 MXN",
    yieldEn: "Serves 4",
    yieldEsMx: "Rinde 4 porciones",
    commentaryEn:
      "Roasted cauliflower gets crispy and caramelized, making it a surprisingly meaty taco filling. Top with fresh salsa and a squeeze of lime.",
    commentaryEsMx:
      "La coliflor asada se pone crujiente y caramelizada, haciéndola un relleno de taco sorprendentemente sustancioso. Corona con salsa fresca y un chorrito de limón.",
    ingredients: [
      {
        originalEn: "1 head cauliflower, cut into florets",
        esMx: "1 cabeza de coliflor, cortada en ramilletes",
        amount: "1",
        item: "cauliflower",
      },
      {
        originalEn: "2 tablespoons oil",
        esMx: "2 cucharadas de aceite",
        amount: "2 tbsp",
        item: "oil",
      },
      {
        originalEn: "1 teaspoon cumin",
        esMx: "1 cucharadita de comino",
        amount: "1 tsp",
        item: "cumin",
      },
      {
        originalEn: "1 teaspoon chili powder",
        esMx: "1 cucharadita de chile en polvo",
        amount: "1 tsp",
        item: "chili powder",
      },
      {
        originalEn: "8 small tortillas",
        esMx: "8 tortillas chicas",
        amount: "8",
        item: "tortillas",
      },
      {
        originalEn: "Toppings: salsa, lime, cilantro",
        esMx: "Para servir: salsa, limón, cilantro",
        item: "toppings",
      },
    ],
    steps: [
      {
        order: 1,
        textEn:
          "Preheat oven to 425°F (220°C). Toss cauliflower with oil, cumin, chili powder, and salt.",
        textEsMx:
          "Precalienta el horno a 220°C. Mezcla la coliflor con aceite, comino, chile en polvo y sal.",
      },
      {
        order: 2,
        textEn:
          "Spread on a baking sheet in a single layer. Roast for 25-30 minutes, flipping halfway, until crispy and golden.",
        textEsMx:
          "Extiende en una charola en una sola capa. Asa por 25 a 30 minutos, volteando a la mitad, hasta que esté crujiente y dorada.",
        timers: [{ label: "Asar coliflor", seconds: 1650 }],
      },
      {
        order: 3,
        textEn:
          "Warm tortillas in a dry skillet or directly over a gas flame.",
        textEsMx:
          "Calienta las tortillas en un comal seco o directamente sobre la llama.",
      },
      {
        order: 4,
        textEn:
          "Fill tortillas with roasted cauliflower and top with salsa, lime juice, and cilantro.",
        textEsMx:
          "Rellena las tortillas con coliflor asada y corona con salsa, jugo de limón y cilantro.",
      },
    ],
    tips: [
      {
        type: "technique",
        textEn:
          "Don't crowd the pan — the cauliflower needs space to get crispy, not steamy.",
        textEsMx:
          "No amontones la charola — la coliflor necesita espacio para ponerse crujiente, no al vapor.",
      },
      {
        type: "substitution",
        textEn:
          "Add a drizzle of crema or a sprinkle of queso fresco on top.",
        textEsMx:
          "Agrega un chorrito de crema o un poco de queso fresco encima.",
      },
    ],
    techniques: ["roasting", "warming-tortillas"],
    tags: ["plato-fuerte", "vegano", "mexicano", "tacos", "económico"],
    hero: {
      featured: false,
      shortTitleEsMx: "Tacos de Coliflor",
      oneLineHookEsMx: "Crujientes, especiados y sin carne",
      colorAccent: "herb",
    },
  },
  {
    slug: "egg-sandwich-mushroom-hash",
    titleEn: "Egg Sandwich with Mushroom Hash",
    titleEsMx: "Torta de Huevo con Champiñones",
    section: "breakfast",
    sourcePages: [16],
    totalCostUsd: "$2.20",
    totalCostMxn: "$39 MXN",
    costPerServingUsd: "$2.20",
    costPerServingMxn: "$39 MXN",
    yieldEn: "Serves 1",
    yieldEsMx: "Rinde 1 porción",
    commentaryEn:
      "A hearty breakfast sandwich loaded with sautéed mushrooms and a fried egg. Filling enough to power you through the morning.",
    commentaryEsMx:
      "Una torta sustanciosa de desayuno cargada de champiñones salteados y un huevo frito. Suficiente para darte energía toda la mañana.",
    ingredients: [
      { originalEn: "2 eggs", esMx: "2 huevos", amount: "2", item: "eggs" },
      {
        originalEn: "4 oz mushrooms, chopped",
        esMx: "115 g de champiñones, picados",
        amount: "4 oz",
        item: "mushrooms",
      },
      {
        originalEn: "1 small potato, diced small",
        esMx: "1 papa chica, picada en cubitos",
        amount: "1",
        item: "potato",
      },
      {
        originalEn: "1 tablespoon butter or oil",
        esMx: "1 cucharada de mantequilla o aceite",
        amount: "1 tbsp",
        item: "butter",
      },
      {
        originalEn: "1 bread roll or 2 slices bread",
        esMx: "1 bolillo o telera",
        amount: "1",
        item: "bread",
      },
    ],
    steps: [
      {
        order: 1,
        textEn:
          "Heat butter in a skillet over medium-high heat. Add diced potato and cook for 5 minutes until starting to brown.",
        textEsMx:
          "Calienta la mantequilla en un sartén a fuego medio-alto. Agrega la papa en cubitos y cocina por 5 minutos hasta que empiece a dorarse.",
        timers: [{ label: "Dorar papa", seconds: 300 }],
      },
      {
        order: 2,
        textEn:
          "Add mushrooms, salt, and pepper. Cook another 5 minutes until mushrooms are golden.",
        textEsMx:
          "Agrega los champiñones, sal y pimienta. Cocina otros 5 minutos hasta que los champiñones estén dorados.",
        timers: [{ label: "Cocinar champiñones", seconds: 300 }],
      },
      {
        order: 3,
        textEn:
          "Push the hash to one side and fry the eggs in the same pan.",
        textEsMx:
          "Empuja el picadillo a un lado y fríe los huevos en el mismo sartén.",
      },
      {
        order: 4,
        textEn:
          "Split the roll, layer with mushroom hash and fried eggs. Season and serve.",
        textEsMx:
          "Abre el bolillo, cubre con el picadillo de champiñones y los huevos fritos. Sazona y sirve.",
      },
    ],
    tips: [
      {
        type: "budget",
        textEn:
          "Mushrooms are often on sale — buy extra and sauté them for the week.",
        textEsMx:
          "Los champiñones suelen estar en oferta — compra de más y saltéalos para la semana.",
      },
      {
        type: "technique",
        textEn:
          "Don't stir mushrooms too often — let them sit to develop a golden crust.",
        textEsMx:
          "No revuelvas los champiñones muy seguido — déjalos quietos para que formen una costra dorada.",
      },
    ],
    techniques: ["pan-frying", "sautéing"],
    tags: ["desayuno", "vegetariano", "sustancioso", "champiñones", "torta"],
    hero: {
      featured: false,
      shortTitleEsMx: "Torta de Huevo",
      oneLineHookEsMx: "Desayuno completo en un bolillo",
      colorAccent: "paper",
    },
  },
];

export const sampleCookbook: Cookbook = {
  id: "good-and-cheap",
  titleEn: "Good and Cheap: Eat Well on $4/Day",
  titleEsMx: "Bueno y Barato: Come Bien con Menos de 80 Pesos al Día",
  author: "Leanne Brown",
  license: {
    name: "Creative Commons Attribution-NonCommercial-ShareAlike 4.0",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
    commercialUseAllowed: false,
    attributionRequired: true,
    shareAlikeRequired: true,
    attributionText:
      "Good and Cheap by Leanne Brown, licensed under CC BY-NC-SA 4.0",
  },
  sourcePdfPath: "/data/good-and-cheap.pdf",
  pages: [],
  recipes: sampleRecipes,
  sections: sampleSections,
};

export const recipes = sampleRecipes;
export const sections = sampleSections;

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return sampleRecipes.find((recipe) => recipe.slug === slug);
}

export function getFeaturedRecipes(): Recipe[] {
  return sampleRecipes.filter((recipe) => recipe.hero.featured);
}

export function getAllRecipes(): Recipe[] {
  return sampleRecipes;
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  for (const recipe of sampleRecipes) {
    for (const tag of recipe.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

export function getAllIngredients(): string[] {
  const items = new Set<string>();
  for (const recipe of sampleRecipes) {
    for (const ing of recipe.ingredients) {
      if (ing.item) items.add(ing.item);
    }
  }
  return Array.from(items).sort();
}

export function getRecipesBySection(sectionId: string): Recipe[] {
  return sampleRecipes.filter((r) => r.section === sectionId);
}

export function findRecipesByIngredients(userIngredients: string[]): Recipe[] {
  if (userIngredients.length === 0) return [];
  const normalizedInput = userIngredients.map((i) => i.toLowerCase().trim());
  return sampleRecipes
    .map((recipe) => {
      const matchCount = recipe.ingredients.filter((ing) =>
        normalizedInput.some(
          (ui) =>
            (ing.item && ing.item.toLowerCase().includes(ui)) ||
            ing.esMx.toLowerCase().includes(ui)
        )
      ).length;
      return { recipe, matchCount };
    })
    .filter(({ matchCount }) => matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .map(({ recipe }) => recipe);
}
