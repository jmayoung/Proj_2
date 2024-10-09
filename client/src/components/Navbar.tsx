import { Link } from 'react-router-dom';
import React from 'react';
import "./navbar.css"
interface NavbarProps {
    onLoginClick: () => void; 
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/cocktail">Cocktail Recipes</Link></li> 
                <li><Link to="/saved-recipes">Saved Recipes</Link></li>
                <li onClick={onLoginClick} style={{ cursor: 'pointer' }}>Log In</li>
            </ul>
        </nav>
    );
};

export default Navbar;
