import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CocktailBody = () => {
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [cocktails, setCocktails] = useState<any[]>([]);
    const [inputValue, setInputValue] = useState<string>("");

    const navigate = useNavigate();

    const addIngredient = () => {
        const trimmedInput = inputValue.trim();
        if (trimmedInput !== "" && !ingredients.includes(trimmedInput)) {
            setIngredients([...ingredients, trimmedInput]);
            setInputValue("");
        }
    };

    const fetchCocktails = async () => {
        if (ingredients.length === 0) {
            alert("Please add at least one ingredient.");
            return;
        }
        const ingredientString = ingredients.join(',');
        try {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientString}`);
            const data = await response.json();
            console.log(data); // Log the response
            if (data.drinks && Array.isArray(data.drinks)) {
                setCocktails(data.drinks);
            } else {
                setCocktails([]);
            }
        } catch (error) {
            console.error("Error fetching cocktails:", error);
            setCocktails([]);
        }
    };

    return (
        <div>
            <h1>What's in your Bar?</h1>
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
            <button onClick={fetchCocktails}>Find Cocktails</button>

            <div className="cocktail-grid">
                {cocktails.length > 0 ? (
                    cocktails.map((cocktail) => (
                        <div 
                            className="cocktail-item" 
                            key={cocktail.idDrink} 
                            onClick={() => navigate(`/cocktail/${cocktail.idDrink}`)} // Navigate to cocktail details
                        >
                            <h3>{cocktail.strDrink}</h3>
                            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} width="100" />
                        </div>
                    ))
                ) : (
                    <p>No cocktails found.</p>
                )}
            </div>

            <button onClick={() => navigate('/')}>Back to Main Page</button>
        </div>
    );
};

export default CocktailBody;
