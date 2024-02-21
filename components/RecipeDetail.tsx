import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { Recipe } from './types';

interface RecipeDetailProps {
    title: string;
    ingredients: string[];
    instructions: string;
    image: string;
    missedIngredients: { name: string }[];
    usedIngredients: { name: string }[];
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ title, ingredients, instructions, image, missedIngredients, usedIngredients }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.heading}>Ingredients:</Text>
      {ingredients.map((ingredient, index) => (
        <Text key={index} style={styles.ingredient}>{ingredient}</Text>
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
      {missedIngredients.length > 0 ? (
        missedIngredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>{ingredient.name}</Text>
        ))
      ) : (
        <Text>No missed ingredients</Text>
      )}

      <Text style={styles.heading}>Used Ingredients:</Text>
      {usedIngredients.length > 0 ? (
        usedIngredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>{ingredient.name}</Text>
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
    fontWeight: 'bold',
    marginBottom: 12,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
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
    resizeMode: 'cover',
    marginBottom: 8,
  },
});

export default RecipeDetail;
