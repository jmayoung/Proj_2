import { useState } from 'react';
import { loginCheck, signupCheck } from "./Navbar";
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';

const App = () => (
    <Router>
        <Switch>
            <Route path="/Home" Component={Home} />
            <Route path="/" Component={Home} /> {}
        </Switch>
    </Router>
);
const Home = () => {
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const [recipes, setRecipes] = useState<any[]>([]);
    const addIngredient = () => {
        if (inputValue.trim() !== "") {
            setIngredients([...ingredients, inputValue]);
            setInputValue("");
        }
    };

ReactDOM.render(<App />, document.getElementById('root',
    const fetchRecipes = async () => {
        const apiKey = '512a655e48f54350ab4a1694077b9966';
        const ingredientsString = ingredients.join(',+');
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsString}&number=5&apiKey=${apiKey}`);
            const data = await response.json();
            setRecipes(data);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };
    return (
        <>
            <header>
                <button>Log in/Sign up</button>
                <h1>Adam, Isaiah, and Julia’s Recipe and Cocktail Pairer</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/Home">Home</Link>
                        </li>
                        {loginCheck ? (
                            <>
                                <li>
                                    <Link to="/Saved-Recipes">Saved Recipes</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/Contact-us">Contact Us</Link>
                                </li>
                            </>
                        )}
                        {!signupCheck}
                    </ul>
                </nav>
            </header>
            <h1>What's in your Kitchen?</h1>
            <h2>Enter the ingredients you have, get personalized recipes and matching cocktails</h2>
            <input
                type="text"
                id="ingredients"
                name="ingredients"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={addIngredient}>Add Ingredient</button>
            <ul>
                {ingredients.map((ingredient:any, index:any) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <button onClick={fetchRecipes}>Find Recipes</button>
            <ul>
                {recipes.map((recipe:any, index:any) => (
                    <li key={index}>
                        <h3>{recipe.title}</h3>
                        <img src={recipe.image} alt={recipe.title} width="100" />
                    </li>
                ))}
            </ul>
        </>
    );
};
export default Home;