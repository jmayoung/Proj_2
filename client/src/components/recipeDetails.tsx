import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RecipeDetails = () => {
    const { id } = useParams<{ id: string }>();  // Get recipe ID from URL
    const [ingredients, setIngredients] = useState<any[]>([]);
    const [recipeImage, setRecipeImage] = useState<string>('');  // State for recipe image
    const [recipeTitle, setRecipeTitle] = useState<string>('');  // State for recipe title
    const [recipeLink, setRecipeLink] = useState<string>('');    // State for recipe link (sourceUrl)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            const apiKey = '512a655e48f54350ab4a1694077b9966';
            try {
                const response = await fetch(
                    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
                );
                const data = await response.json();
                setIngredients(data.extendedIngredients);  // Store ingredients
                setRecipeImage(data.image);  // Store recipe image
                setRecipeTitle(data.title);  // Store recipe title
                setRecipeLink(data.sourceUrl);  // Store recipe link (sourceUrl)
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            }
        };
        fetchRecipeDetails();
    }, [id]); 

    return (
        <>
            <button onClick={() => navigate(-1)}>Back to Recipes</button> 
            
            <h1>{recipeTitle}</h1>  
            <img src={recipeImage} alt={recipeTitle} width="300" />  
            
            <h2>Ingredients</h2>
            <ul>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.original}</li>
                ))}
            </ul>

            {recipeLink && (
                <p>
                    <a href={recipeLink} target="_blank" rel="noopener noreferrer">
                        Does think sound good? Click here for cooking instructions!
                    </a>
                </p>
            )}
        </>
    );
};

export default RecipeDetails;
