import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import axios from "axios";

interface RecipeDetailProps {
  id: number;
  title: string;
  ingredients: string[];
  instructions: string;
  image: string;
  missedIngredients: { name: string }[];
  usedIngredients: { name: string }[];
}

interface Ingredient {
  name: string;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ id }) => {
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information`,
          {
            params: {
              apiKey: "650b74d799d849fca3baef6dd9b9cc6c", // Replace 'YOUR_API_KEY' with your actual Spoonacular API key
            },
          }
        );
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <Text>Loading...</Text>;
  }

  const {
    title,
    extendedIngredients,
    instructions,
    image,
    missedIngredients,
    analyzedInstructions,
  } = recipe;

  const ingredients: Ingredient[] = extendedIngredients.map(
    (ingredient: any) => ({ name: ingredient.name })
  );
  const usedIngredients: Ingredient[] = [];
  const allMissedIngredients: Ingredient[] = [];

  if (missedIngredients) {
    missedIngredients.forEach((ingredient: any) => {
      allMissedIngredients.push({ name: ingredient.name });
    });
  }

  if (analyzedInstructions && analyzedInstructions.length > 0) {
    analyzedInstructions[0].steps.forEach((step: any) => {
      if (step.ingredients) {
        step.ingredients.forEach((ingredient: any) => {
          usedIngredients.push({ name: ingredient.name });
        });
      }
    });
  }

  return (

    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.heading}>Ingredients:</Text>
      {ingredients.map((ingredient, index) => (
        <Text key={index} style={styles.ingredient}>
          {ingredient.name}
        </Text>
      ))}

      <Text style={styles.heading}>Instructions:</Text>
      <Text style={styles.instructions}>{instructions}</Text>

      {image && (
        <>
          <Text style={styles.heading}>Image:</Text>
          <Image source={{ uri: image }} style={styles.image} />
        </>
      )}

      <Text style={styles.heading}>Missed Ingredients:</Text>
      {allMissedIngredients.length > 0 ? (
        allMissedIngredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>
            {ingredient.name}
          </Text>
        ))
      ) : (
        <Text>No missed ingredients</Text>
      )}

      <Text style={styles.heading}>Used Ingredients:</Text>
      {usedIngredients.length > 0 ? (
        usedIngredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>
            {ingredient.name}
          </Text>
        ))
      ) : (
        <Text>No used ingredients</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 8,
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 4,
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: "cover",
    marginBottom: 8,
  },
});

export default RecipeDetail;
