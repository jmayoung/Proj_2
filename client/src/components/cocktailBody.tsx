import { useState } from 'react';

const CocktailBody = () => {
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [cocktails, setCocktails] = useState<any[]>([]);
    const [inputValue, setInputValue] = useState<string>("");

    const addIngredient = () => {
        if (inputValue.trim() !== "") {
            setIngredients([...ingredients, inputValue]);
            setInputValue("");
        }
    };

    const fetchCocktails = async () => {
        const ingredientString = ingredients.join(',');
        try {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientString}`);
            const data = await response.json();
            setCocktails(data.drinks);
        } catch (error) {
            console.error("Error fetching cocktails:", error);
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
                {cocktails.map((cocktail, index) => (
                    <div className="cocktail-item" key={index}>
                        <h3>{cocktail.strDrink}</h3>
                        <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} width="100" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CocktailBody;
