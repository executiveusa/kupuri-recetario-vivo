import Fuse, { type IFuseOptions } from "fuse.js";
import type { Recipe } from "./types";
import { sampleRecipes } from "@/data/recipes";

const fuseOptions: IFuseOptions<Recipe> = {
  keys: [
    { name: "titleEn", weight: 1.0 },
    { name: "titleEsMx", weight: 1.0 },
    { name: "hero.shortTitleEsMx", weight: 0.8 },
    { name: "ingredients.originalEn", weight: 0.5 },
    { name: "ingredients.esMx", weight: 0.5 },
    { name: "ingredients.item", weight: 0.4 },
    { name: "tags", weight: 0.7 },
    { name: "section", weight: 0.3 },
    { name: "techniques", weight: 0.3 },
  ],
  threshold: 0.35,
  includeScore: true,
  minMatchCharLength: 2,
  ignoreLocation: true,
};

let fuseInstance: Fuse<Recipe> | null = null;

function getIndex(recipes?: Recipe[]): Fuse<Recipe> {
  const data = recipes ?? sampleRecipes;
  if (!fuseInstance || recipes) {
    fuseInstance = new Fuse(data, fuseOptions);
  }
  return fuseInstance;
}

export interface SearchResult {
  recipe: Recipe;
  score: number;
}

export function searchRecipes(
  query: string,
  recipes?: Recipe[]
): SearchResult[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const fuse = getIndex(recipes);
  const results = fuse.search(trimmed);

  return results.map((result) => ({
    recipe: result.item,
    score: result.score ?? 1,
  }));
}

export function resetSearchIndex(): void {
  fuseInstance = null;
}
