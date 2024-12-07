// src/component/SignIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // React Router hook for navigation

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5001/api/users/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Sign in successful!');

                // Save UserId and username to localStorage
                localStorage.setItem('UserId', data.user.id);
                localStorage.setItem('username', data.user.username);

                // Redirect to profile page
                navigate('/my-profile');
            } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
            }
        } catch (error) {
            console.error('Error during sign in:', error);
            alert('An error occurred during sign in.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSignIn}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}

export default SignIn;
