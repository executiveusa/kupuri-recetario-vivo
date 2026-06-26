export type Locale = "en" | "es-MX";

export interface Cookbook {
  id: string;
  titleEn: string;
  titleEsMx: string;
  author: string;
  license: CookbookLicense;
  sourcePdfPath: string;
  pages: CookbookPage[];
  recipes: Recipe[];
  sections: CookbookSection[];
}

export interface CookbookLicense {
  name: string;
  url: string;
  commercialUseAllowed: boolean;
  attributionRequired: boolean;
  shareAlikeRequired: boolean;
  attributionText: string;
}

export interface CookbookSection {
  id: string;
  titleEn: string;
  titleEsMx: string;
  order: number;
}

export interface CookbookPage {
  pageNumber: number;
  imageSrc: string;
  section?: string;
  recipeSlugs: string[];
  extractedTextEn: string;
  extractedTextEsMx: string;
}

export interface Recipe {
  slug: string;
  titleEn: string;
  titleEsMx: string;
  section: string;
  sourcePages: number[];
  heroImageSrc?: string;
  pageImageSrc?: string;
  totalCostUsd?: string;
  totalCostMxn?: string;
  costPerServingUsd?: string;
  costPerServingMxn?: string;
  yieldEn?: string;
  yieldEsMx?: string;
  commentaryEn: string;
  commentaryEsMx: string;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  tips: RecipeTip[];
  techniques: string[];
  tags: string[];
  hero: RecipeHeroMeta;
}

export interface RecipeHeroMeta {
  featured: boolean;
  tilePosition?: "wide" | "tall" | "square";
  shortTitleEsMx: string;
  oneLineHookEsMx: string;
  colorAccent: "tomato" | "corn" | "herb" | "chile" | "paper";
}

export interface RecipeIngredient {
  originalEn: string;
  esMx: string;
  amount?: string;
  item?: string;
  checked?: boolean;
}

export interface RecipeStep {
  order: number;
  textEn: string;
  textEsMx: string;
  timers?: RecipeTimer[];
}

export interface RecipeTimer {
  label: string;
  seconds: number;
}

export interface RecipeTip {
  type: "budget" | "substitution" | "technique" | "safety" | "commentary";
  textEn: string;
  textEsMx: string;
}
