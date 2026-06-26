"use client";

import React, { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, Egg, Wheat, Leaf, Soup } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Data types                                                         */
/* ------------------------------------------------------------------ */

interface SkillNode {
  id: string;
  label: string;
  difficulty: "basico" | "intermedio" | "avanzado";
  children?: SkillNode[];
}

interface SkillCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  skills: SkillNode[];
}

/* ------------------------------------------------------------------ */
/* Skill tree data                                                    */
/* ------------------------------------------------------------------ */

const skillCategories: SkillCategory[] = [
  {
    id: "huevos",
    label: "Huevos",
    icon: <Egg className="w-5 h-5" />,
    color: "#E9B949",
    skills: [
      {
        id: "hervir-huevo",
        label: "Hervir huevo",
        difficulty: "basico",
        children: [
          {
            id: "huevo-tibio",
            label: "Huevo tibio (6 min)",
            difficulty: "basico",
          },
          {
            id: "huevo-duro",
            label: "Huevo duro (12 min)",
            difficulty: "basico",
          },
        ],
      },
      {
        id: "huevo-estrellado",
        label: "Huevo estrellado",
        difficulty: "basico",
        children: [
          {
            id: "huevos-rancheros",
            label: "Huevos rancheros",
            difficulty: "intermedio",
          },
        ],
      },
      {
        id: "huevo-revuelto",
        label: "Huevo revuelto",
        difficulty: "basico",
        children: [
          {
            id: "huevo-con-chorizo",
            label: "Huevo con chorizo",
            difficulty: "intermedio",
          },
          {
            id: "migas",
            label: "Migas",
            difficulty: "intermedio",
          },
        ],
      },
      {
        id: "tortilla-espanola",
        label: "Tortilla espanola",
        difficulty: "avanzado",
      },
    ],
  },
  {
    id: "masa",
    label: "Masa",
    icon: <Wheat className="w-5 h-5" />,
    color: "#C4472D",
    skills: [
      {
        id: "hacer-masa",
        label: "Hacer masa",
        difficulty: "basico",
        children: [
          {
            id: "tortillas",
            label: "Tortillas de maiz",
            difficulty: "intermedio",
            children: [
              {
                id: "totopos",
                label: "Totopos caseros",
                difficulty: "intermedio",
              },
              {
                id: "chilaquiles",
                label: "Chilaquiles",
                difficulty: "intermedio",
              },
            ],
          },
          {
            id: "quesadillas",
            label: "Quesadillas de masa",
            difficulty: "intermedio",
          },
        ],
      },
      {
        id: "prensar",
        label: "Usar prensa de tortillas",
        difficulty: "basico",
      },
      {
        id: "gorditas",
        label: "Gorditas",
        difficulty: "avanzado",
      },
      {
        id: "tamales",
        label: "Tamales",
        difficulty: "avanzado",
      },
    ],
  },
  {
    id: "verduras",
    label: "Verduras",
    icon: <Leaf className="w-5 h-5" />,
    color: "#5E7C47",
    skills: [
      {
        id: "cortes-basicos",
        label: "Cortes basicos",
        difficulty: "basico",
        children: [
          {
            id: "picar-cebolla",
            label: "Picar cebolla",
            difficulty: "basico",
          },
          {
            id: "picar-ajo",
            label: "Picar ajo",
            difficulty: "basico",
          },
          {
            id: "juliana",
            label: "Corte juliana",
            difficulty: "intermedio",
          },
        ],
      },
      {
        id: "sofreir-verduras",
        label: "Sofreir verduras",
        difficulty: "basico",
        children: [
          {
            id: "sofrito",
            label: "Sofrito",
            difficulty: "intermedio",
          },
        ],
      },
      {
        id: "asar-verduras",
        label: "Asar verduras",
        difficulty: "intermedio",
        children: [
          {
            id: "nopales-asados",
            label: "Nopales asados",
            difficulty: "intermedio",
          },
          {
            id: "chiles-toreados",
            label: "Chiles toreados",
            difficulty: "intermedio",
          },
        ],
      },
    ],
  },
  {
    id: "caldos",
    label: "Caldos",
    icon: <Soup className="w-5 h-5" />,
    color: "#7A2E22",
    skills: [
      {
        id: "caldo-basico",
        label: "Caldo basico",
        difficulty: "basico",
        children: [
          {
            id: "sopa-de-fideo",
            label: "Sopa de fideo",
            difficulty: "basico",
          },
          {
            id: "caldo-de-pollo",
            label: "Caldo de pollo",
            difficulty: "intermedio",
          },
        ],
      },
      {
        id: "sopa-de-lentejas",
        label: "Sopa de lentejas",
        difficulty: "intermedio",
      },
      {
        id: "frijoles-de-olla",
        label: "Frijoles de olla",
        difficulty: "intermedio",
        children: [
          {
            id: "frijoles-refritos",
            label: "Frijoles refritos",
            difficulty: "intermedio",
          },
          {
            id: "frijoles-charros",
            label: "Frijoles charros",
            difficulty: "avanzado",
          },
        ],
      },
      {
        id: "pozole",
        label: "Pozole",
        difficulty: "avanzado",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Subcomponents                                                      */
/* ------------------------------------------------------------------ */

function DifficultyBadge({
  level,
}: {
  level: "basico" | "intermedio" | "avanzado";
}) {
  const config = {
    basico: { label: "B", color: "#5E7C47", title: "Basico" },
    intermedio: { label: "I", color: "#E9B949", title: "Intermedio" },
    avanzado: { label: "A", color: "#C4472D", title: "Avanzado" },
  };
  const c = config[level];
  return (
    <span
      title={c.title}
      className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold flex-shrink-0"
      style={{ backgroundColor: c.color + "25", color: c.color }}
    >
      {c.label}
    </span>
  );
}

function SkillNodeItem({
  node,
  categoryColor,
  depth,
}: {
  node: SkillNode;
  categoryColor: string;
  depth: number;
}) {
  const [expanded, setExpanded] = useState(depth < 1);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <button
        onClick={() => hasChildren && setExpanded(!expanded)}
        className={cn(
          "flex items-center gap-2 w-full text-left py-1.5 px-2 rounded-md",
          "hover:bg-white/50 transition-colors",
          hasChildren && "cursor-pointer",
          !hasChildren && "cursor-default"
        )}
        style={{ paddingLeft: `${depth * 20 + 8}px` }}
      >
        {/* Expand/collapse icon or connector */}
        {hasChildren ? (
          expanded ? (
            <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" style={{ color: categoryColor }} />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: categoryColor }} />
          )
        ) : (
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0 ml-1 mr-0.5"
            style={{ backgroundColor: categoryColor + "60" }}
          />
        )}

        {/* Difficulty badge */}
        <DifficultyBadge level={node.difficulty} />

        {/* Label */}
        <span className="text-sm" style={{ color: "#1F1B16" }}>
          {node.label}
        </span>
      </button>

      {/* Children */}
      {hasChildren && expanded && (
        <div className="relative">
          {/* Vertical connector line */}
          <div
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: `${depth * 20 + 20}px`,
              backgroundColor: categoryColor + "30",
            }}
          />
          {node.children!.map((child) => (
            <SkillNodeItem
              key={child.id}
              node={child}
              categoryColor={categoryColor}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                     */
/* ------------------------------------------------------------------ */

export default function SkillTree({ className }: { className?: string }) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    () => new Set(skillCategories.map((c) => c.id))
  );

  const toggleCategory = useCallback((id: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl overflow-hidden shadow-lg",
        "bg-[#F8F1E4] border border-[#D4C5A0]",
        className
      )}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ backgroundColor: "#7A2E22" }}
      >
        <Wheat className="w-5 h-5 text-[#E9B949]" />
        <h2 className="text-base font-semibold text-[#F8F1E4]">
          Arbol de Habilidades
        </h2>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 px-4 pt-3 pb-1">
        <div className="flex items-center gap-1.5">
          <DifficultyBadge level="basico" />
          <span className="text-xs" style={{ color: "#8B7355" }}>Basico</span>
        </div>
        <div className="flex items-center gap-1.5">
          <DifficultyBadge level="intermedio" />
          <span className="text-xs" style={{ color: "#8B7355" }}>Intermedio</span>
        </div>
        <div className="flex items-center gap-1.5">
          <DifficultyBadge level="avanzado" />
          <span className="text-xs" style={{ color: "#8B7355" }}>Avanzado</span>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-3 space-y-2">
        {skillCategories.map((cat) => {
          const isExpanded = expandedCategories.has(cat.id);
          return (
            <div
              key={cat.id}
              className="rounded-xl border overflow-hidden"
              style={{ borderColor: cat.color + "30" }}
            >
              {/* Category header */}
              <button
                onClick={() => toggleCategory(cat.id)}
                className={cn(
                  "flex items-center gap-3 w-full text-left px-4 py-3",
                  "hover:opacity-90 transition-opacity"
                )}
                style={{ backgroundColor: cat.color + "12" }}
              >
                <span style={{ color: cat.color }}>{cat.icon}</span>
                <span
                  className="text-sm font-bold flex-1"
                  style={{ color: cat.color }}
                >
                  {cat.label}
                </span>
                <span className="text-xs" style={{ color: "#A89B7E" }}>
                  {cat.skills.length} tecnicas
                </span>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" style={{ color: cat.color }} />
                ) : (
                  <ChevronRight className="w-4 h-4" style={{ color: cat.color }} />
                )}
              </button>

              {/* Skills tree */}
              {isExpanded && (
                <div className="pb-2 bg-white/30">
                  {cat.skills.map((skill) => (
                    <SkillNodeItem
                      key={skill.id}
                      node={skill}
                      categoryColor={cat.color}
                      depth={0}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
