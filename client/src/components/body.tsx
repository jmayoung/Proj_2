import { useState } from 'react';
import results from './results';
import ".body.css";
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
        <div className="body-container">
            <h1 className="title">What's in your Kitchen?</h1>
            <h2 className="subtitle">Enter the ingredients you have, get personalized recipes and matching cocktails</h2>
            <input 
                type="text" 
                id="ingredients" 
                name="ingredients" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                className="input-field"
            />
            <button onClick={addIngredient} className="add-button">Add Ingredient</button>
            <ul className="ingredient-list">
                {ingredients.map((ingredient, index) => (
                    <li key={index} className="ingredient-item">{ingredient}</li>
                ))}
            </ul>
            <button onClick={fetchRecipes} className="fetch-button">Find Recipes</button>
            <ul className="recipe-list">
                {recipes.map((recipe, index) => (
                    <li key={index} className="recipe-item">
                        <h3 className="recipe-title">{recipe.title}</h3>
                        <img src={recipe.image} alt={recipe.title} width="100" className="recipe-image" />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Body;
