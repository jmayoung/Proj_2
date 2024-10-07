import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Body = () => {
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const [recipes, setRecipes] = useState<any[]>([]);
    const navigate = useNavigate();

    // Load recipes from sessionStorage on component mount
    useEffect(() => {
        const storedRecipes = sessionStorage.getItem('recipes');
        if (storedRecipes) {
            setRecipes(JSON.parse(storedRecipes));
        }
    }, []);

    const addIngredient = () => {
        if (inputValue.trim() !== "") {
            setIngredients([...ingredients, inputValue]);
            setInputValue("");
        }
    };

    const fetchRecipes = async () => {
        const apiKey = '512a655e48f54350ab4a1694077b9966';
        const ingredientsString = ingredients.join(',+');
        try {
            const response = await fetch(
                `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsString}&number=5&apiKey=${apiKey}`
            );
            const data = await response.json();
            setRecipes(data);  // Save recipes in state
            sessionStorage.setItem('recipes', JSON.stringify(data));  // Store in sessionStorage
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    const handleRecipeClick = (recipeId: number) => {
        navigate(`/recipe/${recipeId}`);
    };

    return (
        <>
            <h1>What's in your Kitchen?</h1>
            <input 
                type="text" 
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
                        <h3 onClick={() => handleRecipeClick(recipe.id)}>{recipe.title}</h3>
                        <img src={recipe.image} alt={recipe.title} width="100" />
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Body;
