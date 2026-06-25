import { ChefHat } from "lucide-react";

const techniqueGroups = [
  {
    category: "Huevos",
    color: "#E9B949",
    techniques: [
      { name: "Huevos revueltos", difficulty: "Principiante", description: "La base: huevos movidos suavemente en un sartén con mantequilla." },
      { name: "Huevos estrellados", difficulty: "Principiante", description: "Freír sin romper la yema. El secreto es fuego medio y paciencia." },
      { name: "Omelette", difficulty: "Intermedio", description: "Huevos batidos cocidos en una capa fina, rellenos y doblados." },
    ],
  },
  {
    category: "Masa y Pan",
    color: "#EFE2C6",
    techniques: [
      { name: "Tortillas de maíz", difficulty: "Intermedio", description: "Masa de maíz presionada y cocida en comal caliente." },
      { name: "Tortillas de harina", difficulty: "Intermedio", description: "Masa con harina, manteca y agua, estirada con rodillo." },
    ],
  },
  {
    category: "Verduras",
    color: "#5E7C47",
    techniques: [
      { name: "Sofreír", difficulty: "Principiante", description: "Cocinar verduras en poco aceite a fuego medio-alto, moviéndolas constantemente." },
      { name: "Asar en comal", difficulty: "Principiante", description: "Tostar jitomates, chiles y cebollas directamente en un comal seco." },
      { name: "Picar finamente", difficulty: "Principiante", description: "Cortar en cubos pequeños y parejos para cocción uniforme." },
    ],
  },
  {
    category: "Caldos y Sopas",
    color: "#C4472D",
    techniques: [
      { name: "Caldo base", difficulty: "Principiante", description: "Hervir huesos o verduras en agua por tiempo prolongado para extraer sabor." },
      { name: "Sopa de fideo", difficulty: "Principiante", description: "Dorar el fideo, agregar salsa y caldo. Técnica clásica mexicana." },
    ],
  },
  {
    category: "Frijoles",
    color: "#7A2E22",
    techniques: [
      { name: "Frijoles de olla", difficulty: "Principiante", description: "Cocinar frijoles secos en agua con cebolla y ajo hasta que estén suaves." },
      { name: "Frijoles refritos", difficulty: "Intermedio", description: "Machacar frijoles cocidos en manteca o aceite caliente." },
    ],
  },
];

export default function TecnicasPage() {
  return (
    <main className="min-h-screen pt-20 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold mt-8 mb-2" style={{ fontFamily: "Raleway, sans-serif" }}>
          Técnicas de Cocina
        </h1>
        <p className="text-lg mb-8" style={{ color: "#1F1B16", opacity: 0.7 }}>
          Aprende las técnicas básicas para cocinar con confianza
        </p>

        <div className="space-y-8">
          {techniqueGroups.map((group) => (
            <section key={group.category}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: group.color }}>
                  <ChefHat className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold" style={{ fontFamily: "Raleway, sans-serif" }}>
                  {group.category}
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {group.techniques.map((tech) => (
                  <div
                    key={tech.name}
                    className="p-4 rounded-xl border transition-shadow hover:shadow-md"
                    style={{ borderColor: "#EFE2C6", backgroundColor: "white" }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{tech.name}</h3>
                      <span
                        className="text-xs px-2 py-1 rounded-full font-medium"
                        style={{
                          backgroundColor: tech.difficulty === "Principiante" ? "#5E7C4720" : "#E9B94920",
                          color: tech.difficulty === "Principiante" ? "#5E7C47" : "#7A2E22",
                        }}
                      >
                        {tech.difficulty}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: "#1F1B16", opacity: 0.7 }}>
                      {tech.description}
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
