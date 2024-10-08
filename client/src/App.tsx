import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Body from './components/body';
import RecipeDetails from './components/recipeDetails';
import CocktailBody from './components/cocktailBody'; // Import CocktailBody
import CocktailDetails from './components/cocktailDetails'; // Import CocktailDetails

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Body />} />
                <Route path="/cocktail" element={<CocktailBody />} /> {/* Add route for CocktailBody */}
                <Route path="/cocktail/:id" element={<CocktailDetails />} /> {/* Add CocktailDetails route */}
                <Route path="/recipe/:id" element={<RecipeDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
