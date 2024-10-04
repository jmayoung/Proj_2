
import React from 'react';
import {loginCheck, signupCheck} from "./Navbar"
import { Link } from 'react-router-dom';
const Header = () => { 

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
    </>
);
};
