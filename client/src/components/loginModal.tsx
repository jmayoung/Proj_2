import React, { useState, FormEvent } from 'react';
import './loginModal.css';

interface LoginModalProps {
    show: boolean;
    handleClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ show, handleClose }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch('/auth/login', {
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
                alert(data.message);
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    if (!show) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <div className="modal-content">
                <h2>Login</h2>
                <button onClick={handleClose} className="close-button">X</button>
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
                    <button type="submit">Login</button>
                </form>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
