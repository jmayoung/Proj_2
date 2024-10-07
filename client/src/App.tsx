import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Body from './components/body';  
import RecipeDetails from './components/recipeDetails'; 

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Body />} /> 
                <Route path="/recipe/:id" element={<RecipeDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
