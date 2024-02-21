export interface Recipe {
    [x: string]: any;
    id: string;
    title: string;
    ingredients: string[];
    instructions: string;
    image: string;
    missedIngredients: { name: string }[];
    usedIngredients: { name: string }[];
  }

  