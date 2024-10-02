import { useState, useEffect} from 'react';
import { Link} from 'react-router-dom';
import auth from '';

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
            
        }
    }
}