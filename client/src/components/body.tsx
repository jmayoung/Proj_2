import React, { useState } from 'react';
const Body = () => {
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const [recipes, setRecipes] = useState<any[]>([]);
    const addIngredient = () => {
        if (inputValue.trim() !== "") {
            setIngredients([...ingredients, inputValue]);
            setInputValue("");
        }
    }

    const fetchRecipes = async () => {
        const apiKey = 'YOUR_SPOONACULAR_API_KEY';
        const ingredientsString = ingredients.join(',+');
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsString}&number=5&apiKey=${apiKey}`);
            const data = await response.json();
            setRecipes(data);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    }

    return(
            <>
                <h1> What's in your Kitchen?</h1>
                <h2> Enter the ingredients you have, get personalized recipes and matching cocktails</h2>
                <input 
                    type="text" 
                    id="ingredients" 
                    name="ingredients" 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                />
                <button onClick={addIngredient}>Add Ingredient</button>
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                <button onClick={fetchRecipes}>Find Recipes</button>
                <ul>
                    {recipes.map((recipe, index) => (
                        <li key={index}>
                            <h3>{recipe.title}</h3>
                            <img src={recipe.image} alt={recipe.title} width="100" />
                        </li>
                    ))}
                </ul>
            </>
        );
    }
    
    export default Body;