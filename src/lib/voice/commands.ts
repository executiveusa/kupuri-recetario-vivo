export interface VoiceCommand {
  pattern: RegExp;
  action: string;
  params?: string[];
}

export const voiceCommands: VoiceCommand[] = [
  {
    pattern: /siguiente\s*p[áa]gina/i,
    action: "nextPage",
  },
  {
    pattern: /p[áa]gina\s*siguiente/i,
    action: "nextPage",
  },
  {
    pattern: /p[áa]gina\s*anterior/i,
    action: "prevPage",
  },
  {
    pattern: /anterior\s*p[áa]gina/i,
    action: "prevPage",
  },
  {
    pattern: /ir\s*a\s*(?:la\s*)?p[áa]gina\s*(\d+)/i,
    action: "goToPage",
    params: ["pageNumber"],
  },
  {
    pattern: /leer\s*(?:la\s*)?receta/i,
    action: "readRecipe",
  },
  {
    pattern: /lee(?:me)?\s*(?:los\s*)?ingredientes/i,
    action: "readIngredients",
  },
  {
    pattern: /lee(?:me)?\s*(?:los\s*)?pasos/i,
    action: "readSteps",
  },
  {
    pattern: /lee(?:me)?\s*(?:el\s*)?paso\s*(\d+)/i,
    action: "readStep",
    params: ["stepNumber"],
  },
  {
    pattern: /buscar?\s+(.+)/i,
    action: "search",
    params: ["query"],
  },
  {
    pattern: /iniciar?\s*(?:el\s*)?temporizador/i,
    action: "startTimer",
  },
  {
    pattern: /(?:parar|detener|cancelar)\s*(?:el\s*)?temporizador/i,
    action: "stopTimer",
  },
  {
    pattern: /temporizador\s*(?:de\s*)?(\d+)\s*minutos?/i,
    action: "setTimer",
    params: ["minutes"],
  },
  {
    pattern: /temporizador\s*(?:de\s*)?(\d+)\s*segundos?/i,
    action: "setTimerSeconds",
    params: ["seconds"],
  },
  {
    pattern: /(?:parar|detener|callar|silencio|calla(?:te)?)/i,
    action: "stopSpeaking",
  },
  {
    pattern: /repetir/i,
    action: "repeat",
  },
  {
    pattern: /volver\s*(?:al\s*)?inicio/i,
    action: "goHome",
  },
  {
    pattern: /abrir?\s+(.+)/i,
    action: "openRecipe",
    params: ["recipeName"],
  },
  {
    pattern: /(?:marcar|tachar)\s*(?:el\s*)?ingrediente\s*(\d+)/i,
    action: "checkIngredient",
    params: ["ingredientIndex"],
  },
  {
    pattern: /desmarcar\s*(?:el\s*)?ingrediente\s*(\d+)/i,
    action: "uncheckIngredient",
    params: ["ingredientIndex"],
  },
  {
    pattern: /(?:cu[áa]nto\s*cuesta|precio|costo)/i,
    action: "readCost",
  },
  {
    pattern: /(?:qu[ée]\s*)?consejos?/i,
    action: "readTips",
  },
  {
    pattern: /modo\s*(?:de\s*)?cocina/i,
    action: "enableCookMode",
  },
  {
    pattern: /salir\s*(?:de\s*)?(?:modo\s*)?cocina/i,
    action: "disableCookMode",
  },
];

export interface ParsedCommand {
  action: string;
  params: Record<string, string>;
  raw: string;
}

export function parseVoiceInput(input: string): ParsedCommand | null {
  const normalized = input.trim().toLowerCase();

  for (const command of voiceCommands) {
    const match = normalized.match(command.pattern);
    if (match) {
      const params: Record<string, string> = {};
      if (command.params) {
        command.params.forEach((paramName, index) => {
          const captureGroup = match[index + 1];
          if (captureGroup) {
            params[paramName] = captureGroup.trim();
          }
        });
      }
      return {
        action: command.action,
        params,
        raw: input,
      };
    }
  }

  return null;
}
