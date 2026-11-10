import type { Recipe } from "@/lib/types";

/** Transcribed and adapted from the two recipe photographs supplied by the user.
 * The photographed recipe cites Food.com recipe 23821 (2017).
 * This entry is separate from the Good and Cheap cookbook source.
 */
export const noBakeChocolatePeanutButterCookies: Recipe = {
  slug: "no-bake-chocolate-peanut-butter-oat-cookies",
  titleEn: "No-Bake Chocolate Peanut Butter Oat Cookies",
  titleEsMx: "Galletas de Chocolate, Cacahuate y Avena sin Horno",
  section: "desserts",
  sourcePages: [],
  yieldEn: "24 cookies",
  yieldEsMx: "24 galletas",
  commentaryEn: "Classic stovetop chocolate-peanut butter oatmeal cookies. Prep: 5 minutes; boiling: 1 minute; allow additional time to cool and set. Adapted from the recipe photographed by the contributor.",
  commentaryEsMx: "Galletas clásicas de chocolate, crema de cacahuate y avena que no necesitan horno. Preparación: 5 minutos; hervor: 1 minuto; deja tiempo adicional para enfriar y cuajar. Adaptadas de la receta fotografiada por quien la compartió.",
  ingredients: [
    { originalEn: "½ cup butter", esMx: "½ taza de mantequilla", item: "butter" },
    { originalEn: "1½ cups white sugar", esMx: "1½ tazas de azúcar blanca", item: "white sugar" },
    { originalEn: "½ cup packed brown sugar", esMx: "½ taza de azúcar morena compactada", item: "brown sugar" },
    { originalEn: "½ cup milk", esMx: "½ taza de leche", item: "milk" },
    { originalEn: "4 tablespoons cocoa powder", esMx: "4 cucharadas de cocoa en polvo sin azúcar", item: "cocoa" },
    { originalEn: "Pinch of kosher salt", esMx: "1 pizca de sal kosher", item: "salt" },
    { originalEn: "½ cup creamy peanut butter", esMx: "½ taza de crema de cacahuate cremosa", item: "peanut butter" },
    { originalEn: "2 teaspoons vanilla extract", esMx: "2 cucharaditas de extracto de vainilla", item: "vanilla" },
    { originalEn: "3 cups dry quick-cooking oats", esMx: "3 tazas de avena de cocción rápida, seca", item: "oats" },
  ],
  steps: [
    { order: 1, textEn: "Combine butter, both sugars, milk, cocoa and salt in a large saucepan (about 4 quarts / 3.8 liters).", textEsMx: "Pon la mantequilla, ambos azúcares, la leche, la cocoa y la sal en una cacerola grande (de unos 3.8 litros)." },
    { order: 2, textEn: "Bring to a full rolling boil, then boil for exactly 1 minute.", textEsMx: "Deja que hierva intensamente y mantén el hervor durante exactamente 1 minuto.", timers: [{ label: "Hervor / Boil", seconds: 60 }] },
    { order: 3, textEn: "Remove the saucepan from heat. Stir in peanut butter until melted, then mix in vanilla.", textEsMx: "Retira la cacerola del fuego. Incorpora la crema de cacahuate hasta que se derrita y después añade la vainilla." },
    { order: 4, textEn: "Stir in the dry oats until every oat is coated.", textEsMx: "Agrega la avena seca y revuelve hasta cubrirla por completo." },
    { order: 5, textEn: "Drop tablespoon-sized portions onto wax paper. Let cool until firm.", textEsMx: "Coloca porciones de una cucharada sobre papel encerado. Déjalas enfriar hasta que se endurezcan." },
  ],
  tips: [
    { type: "technique", textEn: "The exact boil time matters: too little can leave soft cookies, while too much can make them dry.", textEsMx: "El tiempo de hervor importa: si es corto las galletas pueden quedar blandas; si es largo, secas." },
    { type: "substitution", textEn: "Quick oats give a softer texture. Old-fashioned oats may require a different quantity.", textEsMx: "La avena de cocción rápida da una textura más suave. La avena tradicional puede requerir ajustar la cantidad." },
    { type: "technique", textEn: "Chunky peanut butter can make the texture drier and more crumbly.", textEsMx: "La crema de cacahuate con trozos puede dejarlas más secas y quebradizas." },
    { type: "substitution", textEn: "Optional: replace ½ teaspoon vanilla with ½ teaspoon almond extract, using 1½ teaspoons vanilla and ½ teaspoon almond extract total.", textEsMx: "Opcional: usa 1½ cucharaditas de vainilla y ½ cucharadita de extracto de almendra en lugar de las 2 cucharaditas de vainilla." },
  ],
  techniques: ["boiling", "mixing", "no-bake"],
  tags: ["postres", "galletas", "chocolate", "avena", "cacahuate", "sin horno", "dessert", "cookies"],
  hero: { featured: false, shortTitleEsMx: "Galletas sin Horno", oneLineHookEsMx: "Chocolate, cacahuate y avena, sin prender el horno", colorAccent: "chile" },
};
