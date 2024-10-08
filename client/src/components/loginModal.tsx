import React, { useState, FormEvent } from 'react';
import './loginModal.css';

interface LoginModalProps {
    show: boolean;
    handleClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ show, handleClose }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isSignUp, setIsSignUp] = useState<boolean>(false);  // Track whether the user is signing up or logging in

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const endpoint = isSignUp ? '/auth/register' : '/auth/login';  // Switch between login and signup
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            console.log(response);
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                handleClose();
            } else {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (error) {
            console.error(`Error ${isSignUp ? 'signing up' : 'logging in'}:`, error);
        }
    };

    if (!show) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <div className="modal-content">
                    <button onClick={handleClose} className="close-button">X</button>

                    {/* Toggle between Login and Sign Up */}
                    <div className="toggle-buttons">
                        <button 
                            className={isSignUp ? '' : 'active'} 
                            onClick={() => setIsSignUp(false)}
                        >
                            Login
                        </button>
                        <button 
                            className={isSignUp ? 'active' : ''} 
                            onClick={() => setIsSignUp(true)}
                        >
                            Sign Up
                        </button>
                    </div>

                    <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
