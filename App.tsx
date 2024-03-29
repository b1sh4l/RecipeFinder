import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SearchScreen from './components/SearchScreen';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import axios from 'axios';
import { Recipe } from './components/types';

const API_KEY = '650b74d799d849fca3baef6dd9b9cc6c';

export default function TabOneScreen() {
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleSearch = async (query: string) => {
    try {
      const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
        params: {
          apiKey: API_KEY,
          query: query,
        },
      });
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleRecipeSelect = async (recipe: Recipe) => {
    try {
      console.log(recipe.id);
      const response = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information`, {
        params: {
          apiKey: API_KEY,
        },
      });
      setSelectedRecipe(response.data);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };
  
  
  return (
    <View style={styles.container}>
      <SearchScreen onSearch={handleSearch} />
      <RecipeList recipes={searchResults} onSelectRecipe={handleRecipeSelect} />
      {selectedRecipe && (
        <RecipeDetail
          title={selectedRecipe.title}
          ingredients={selectedRecipe.extendedIngredients.map((ingredient: any) => ingredient.name)}
          instructions={selectedRecipe.instructions || ''}
          image={selectedRecipe.image || ''}
          missedIngredients={selectedRecipe.missedIngredients || []}
          usedIngredients={selectedRecipe.usedIngredients || []} 
          id={parseInt(selectedRecipe.id)}      
        />
      )}
    </View>
  );
  
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
