import { useState, useEffect} from 'react';
import { Link} from 'react-router-dom';
import auth from '../utils/auth';

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
        //if(auth.signedUp()) {
        //    setSignupCheck(true);
        //}
    };
    useEffect(() => {
        checkSignedup();
    }, [signupCheck]);

    return (
        <div>
            <h1>
                Authentication 
            </h1>
            <div>
                {
                    !loginCheck ? (
                        <button className = "btn" type = "button">
                            <Link to = '/login' relative='path'>Login</Link>
                        </button>
                    ): (
                        <button className = "btn" type = 'button' onClick={() => {
                            auth.logout();
                        }}>Logout</button>
                    )
                }
            </div>
        </div>
    )
}
//export {loginCheck, signupCheck};
export default Navbar;