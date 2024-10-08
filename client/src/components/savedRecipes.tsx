import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SavedRecipes.css';

const SavedRecipes = () => {
    const [recipes, setRecipes] = useState<any[]>([]);
    const navigate = useNavigate();
    const username = 

    useEffect(() => {
        const fetchSavedRecipes = async () => {
            try {
                const response = await fetch(`/userRecipes/${username}`);
                const data = await response.json();
                setRecipes(data.recipes);
            } catch (error) {
                console.error('Error fetching saved recipes:', error);
            }
        };

        fetchSavedRecipes();
    }, []);

    return (
        <div className="saved-recipes-container">
            <h1>Saved Recipes</h1>
            <ul className="recipe-list">
                {recipes.map((recipeId, index) => (
                    <li key={index} className="recipe-item" onClick={() => navigate(`/recipe/${recipeId}`)}>
                        Recipe ID: {recipeId}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SavedRecipes;
