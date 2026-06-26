import { describe, it, expect } from "vitest";

describe("Recetario Vivo", () => {
  it("should have correct budget constants", async () => {
    const { USD_TO_MXN_SNAPSHOT, ORIGINAL_DAILY_BUDGET_USD, DISPLAY_DAILY_BUDGET_MXN } = await import("@/lib/currency");
    expect(USD_TO_MXN_SNAPSHOT).toBe(17.6139);
    expect(ORIGINAL_DAILY_BUDGET_USD).toBe(4);
    expect(DISPLAY_DAILY_BUDGET_MXN).toBe(70);
  });

  it("should convert USD to MXN", async () => {
    const { usdToMxn } = await import("@/lib/currency");
    const result = usdToMxn(4);
    expect(result).toBeCloseTo(70.46, 1);
  });

  it("should have sample recipes", async () => {
    const { recipes } = await import("@/data/recipes");
    expect(recipes.length).toBeGreaterThanOrEqual(8);
  });

  it("should find recipe by slug", async () => {
    const { getRecipeBySlug } = await import("@/data/recipes");
    const recipe = getRecipeBySlug("tomato-scrambled-eggs");
    expect(recipe).toBeDefined();
    expect(recipe?.titleEsMx).toContain("Jitomate");
  });

  it("should have featured recipes", async () => {
    const { getFeaturedRecipes } = await import("@/data/recipes");
    const featured = getFeaturedRecipes();
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.every((r) => r.hero.featured)).toBe(true);
  });

  it("should search recipes", async () => {
    const { searchRecipes } = await import("@/lib/search");
    const results = searchRecipes("huevo");
    expect(results.length).toBeGreaterThan(0);
  });

  it("should find recipes by ingredients", async () => {
    const { findRecipesByIngredients } = await import("@/data/recipes");
    const results = findRecipesByIngredients(["eggs", "butter"]);
    expect(results.length).toBeGreaterThan(0);
  });

  it("should get all tags", async () => {
    const { getAllTags } = await import("@/data/recipes");
    const tags = getAllTags();
    expect(tags.length).toBeGreaterThan(0);
    expect(tags).toContain("desayuno");
  });

  it("should get recipes by section", async () => {
    const { getRecipesBySection } = await import("@/data/recipes");
    const breakfast = getRecipesBySection("breakfast");
    expect(breakfast.length).toBeGreaterThan(0);
    expect(breakfast.every((r) => r.section === "breakfast")).toBe(true);
  });
});
