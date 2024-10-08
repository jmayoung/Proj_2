import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CocktailDetails = () => {
    const { id } = useParams<{ id: string }>(); 
    const [cocktail, setCocktail] = useState<any>(null);
    const navigate = useNavigate(); // Use navigate for the back button

    useEffect(() => {
        const fetchCocktailDetails = async () => {
            try {
                const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
                const data = await response.json();
                console.log(data); // Log the response to debug
                setCocktail(data.drinks ? data.drinks[0] : null); // Ensure we handle the case where drinks is undefined
            } catch (error) {
                console.error('Error fetching cocktail details:', error);
            }
        };

        fetchCocktailDetails();
    }, [id]);

    if (!cocktail) return <div>Loading...</div>; 

    return (
        <div>
            <h1>{cocktail.strDrink}</h1>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} width="200" />
            <h3>Ingredients:</h3>
            <ul>
                {Object.keys(cocktail)
                    .filter(key => key.startsWith('strIngredient') && cocktail[key]) 
                    .map((key, index) => (
                        <li key={index}>{cocktail[key]}: {cocktail[`strMeasure${index + 1}`]}</li>
                    ))}
            </ul>
            <p>{cocktail.strInstructions}</p> 
            <button onClick={() => navigate('/cocktail')}>Back to Cocktails</button> {/* Update to navigate to /cocktail */}
        </div>
    );
};

export default CocktailDetails;
