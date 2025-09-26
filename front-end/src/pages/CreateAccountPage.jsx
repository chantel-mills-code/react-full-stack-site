import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default function CreateAccountPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function createAccount() {
        if (password !== confirmPassword) {
            setError("Password and Confirm Password do not match!");
            return;
        }
        try {
            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles')
        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <>
            <h1>Create Account</h1>
            {error && <p>{error}</p>}
            <input 
                placeholder="Your Email Address" 
                value={email} 
                onChange={e => setEmail(e.target.value)} />
            
            <input 
                placeholder="Your Password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                type="password" />
            
            <input 
                placeholder="Confirm Password" 
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)}
                type="password" />
            
            <button onClick={createAccount}>
                Create Account
            </button>

            <Link to='/login'>Already have an account? Log in here</Link>
        </>
    )
}