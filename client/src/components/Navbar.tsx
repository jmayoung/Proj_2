import { useState, useEffect} from 'react';
import { Link} from 'react-router-dom';
import auth from '';
import Header from './Header.tsx';
const Navbar = () => {

    const [loginCheck, setLoginCheck] = useState(false);
    const [signupCheck, setSignupCheck] = useState(false);

    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };
    useEffect(() => {
        checkLogin();
    }, [loginCheck]);

    const checkSignedup = () => {
        if() {
            if (auth.isSignedUp()) { 
                setSignupCheck(true);
            } else {
                setSignupCheck(false);
            }
        };
    
        }
    }
    return(
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
            {!signupCheck && (
                <li>
                    <Link to="/Contact-us">Contact Us</Link>
                </li>
            )}
        </ul>
    </nav>
);


export default Navbar;