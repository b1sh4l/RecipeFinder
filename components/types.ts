export interface Recipe {
    id: string;
    title: string;
    ingredients: string[];
    instructions: string;
    image: string;
    missedIngredients: { name: string }[];
    usedIngredients: { name: string }[];
  }

  