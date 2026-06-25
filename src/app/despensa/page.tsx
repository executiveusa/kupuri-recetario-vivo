import { ShoppingBasket } from "lucide-react";

const pantryCategories = [
  {
    name: "Granos y Cereales",
    color: "#E9B949",
    items: [
      { name: "Arroz", tip: "Compra a granel. Un kilo rinde para muchas comidas." },
      { name: "Frijol seco", tip: "Pinto, negro o bayo. Más barato que enlatado." },
      { name: "Avena", tip: "El desayuno más económico que existe." },
      { name: "Pasta / Fideo", tip: "Espagueti, coditos o fideo para sopa." },
      { name: "Tortillas de maíz", tip: "Base de la alimentación mexicana." },
      { name: "Harina de trigo", tip: "Para tortillas de harina, pan, espesar salsas." },
    ],
  },
  {
    name: "Proteínas Económicas",
    color: "#C4472D",
    items: [
      { name: "Huevos", tip: "La proteína más versátil y accesible." },
      { name: "Lentejas", tip: "Proteína vegetal completa, se cocina rápido." },
      { name: "Atún enlatado", tip: "Busca ofertas de 3x2 en el súper." },
      { name: "Pollo (muslos)", tip: "Más baratos que la pechuga y con más sabor." },
    ],
  },
  {
    name: "Verduras Básicas",
    color: "#5E7C47",
    items: [
      { name: "Jitomate", tip: "Base de salsas y guisos. Compra cuando estén baratos y haz salsa." },
      { name: "Cebolla", tip: "Dura semanas. Indispensable en todo." },
      { name: "Ajo", tip: "Una cabeza de ajo rinde mucho." },
      { name: "Chile serrano / jalapeño", tip: "Para salsa y sazón." },
      { name: "Papa", tip: "Llenadoras, baratas y versátiles." },
      { name: "Zanahoria", tip: "Para sopas, guisos, ensaladas." },
      { name: "Col", tip: "La verdura más barata y duradera." },
      { name: "Limón", tip: "Para todo: tacos, aguas, aderezos." },
    ],
  },
  {
    name: "Condimentos y Especias",
    color: "#7A2E22",
    items: [
      { name: "Sal", tip: "El condimento más importante." },
      { name: "Aceite vegetal", tip: "Para cocinar y freír." },
      { name: "Comino", tip: "Sabor mexicano instantáneo." },
      { name: "Orégano seco", tip: "Para salsas, frijoles, arroz." },
      { name: "Canela", tip: "Para avena, atole, postres." },
      { name: "Piloncillo", tip: "Endulzante natural, más sabor que el azúcar." },
    ],
  },
];

export default function DespensaPage() {
  return (
    <main className="min-h-screen pt-20 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold mt-8 mb-2" style={{ fontFamily: "Raleway, sans-serif" }}>
          Despensa Básica
        </h1>
        <p className="text-lg mb-2" style={{ color: "#1F1B16", opacity: 0.7 }}>
          Cómo armar una despensa mexicana económica
        </p>
        <p className="text-sm mb-8 p-3 rounded-lg" style={{ backgroundColor: "#FFF8EA", color: "#7A2E22" }}>
          Conversión aproximada del presupuesto original de US$4. Los precios reales pueden variar por ciudad, temporada y año.
        </p>

        <div className="space-y-8">
          {pantryCategories.map((cat) => (
            <section key={cat.name}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: cat.color }}>
                  <ShoppingBasket className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold" style={{ fontFamily: "Raleway, sans-serif" }}>
                  {cat.name}
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className="p-4 rounded-xl border"
                    style={{ borderColor: "#EFE2C6", backgroundColor: "white" }}
                  >
                    <h3 className="font-semibold mb-1">{item.name}</h3>
                    <p className="text-sm" style={{ color: "#1F1B16", opacity: 0.7 }}>
                      {item.tip}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
