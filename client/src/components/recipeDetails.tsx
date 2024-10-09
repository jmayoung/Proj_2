import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RecipeDetails.css';

const RecipeDetails = () => {
    const { id } = useParams<{ id: string }>();  
    const [ingredients, setIngredients] = useState<any[]>([]);
    const [recipeImage, setRecipeImage] = useState<string>('');  
    const [recipeTitle, setRecipeTitle] = useState<string>('');  
    const [recipeLink, setRecipeLink] = useState<string>('');    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            const apiKey = 'YOUR_SPOONACULAR_API_KEY';
            try {
                const response = await fetch(
                    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
                );
                const data = await response.json();
                setIngredients(data.extendedIngredients);  
                setRecipeImage(data.image);  
                setRecipeTitle(data.title); 
                setRecipeLink(data.sourceUrl);  
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            }
        };
        fetchRecipeDetails();
    }, [id]); 

    return (
        <div className="recipe-details-container">
            <button onClick={() => navigate(-1)} className="back-button">Back to Recipes</button> 
            
            <h1 className="recipe-title">{recipeTitle}</h1>  
            <img src={recipeImage} alt={recipeTitle} width="300" className="recipe-image" />  
            
            <h2 className="ingredients-title">Ingredients</h2>
            <ul className="ingredient-list">
                {ingredients.map((ingredient, index) => (
                    <li key={index} className="ingredient-item">{ingredient.original}</li>
                ))}
            </ul>

            {recipeLink && (
                <p>
                    <a href={recipeLink} target="_blank" rel="noopener noreferrer" className="recipe-link">
                        Does this sound good? Click here for cooking instructions!
                    </a>
                </p>
            )}
        </div>
    );
};

export default RecipeDetails;
