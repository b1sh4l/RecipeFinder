import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import RecipeList from './RecipeList';
import RecipeDetail from './RecipeDetail';
import { Recipe } from './types';

const ParentComponent: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const onSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  // Sample recipe data
  const recipes: Recipe[] = [];

  return (
    <View style={styles.container}>
      <RecipeList recipes={recipes} onSelectRecipe={onSelectRecipe} />
      {selectedRecipe && (
        <RecipeDetail
                  title={selectedRecipe.title}
                  ingredients={selectedRecipe.ingredients}
                  instructions={selectedRecipe.instructions} image={''} missedIngredients={[]} usedIngredients={[]}        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ParentComponent;
