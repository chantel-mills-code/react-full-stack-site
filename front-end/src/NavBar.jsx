import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export default function NavBar() {
    const isLoggedIn = false;
    const email = "ellePlaceholder@gmail.com"

    const navigate = useNavigate();

    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                <li>
                    <Link to='/articles'>Articles</Link>
                </li>
                {isLoggedIn && (
                    <li style={{color: 'white'}}>
                        Logged in as: {email}
                    </li>
                )}
                <li>
                    {isLoggedIn 
                        ? <button onClick={() => signOut(getAuth())}>Log Out</button>
                        : <button onClick={() => navigate('/login')}>Log In</button>
                    }
                </li>
            </ul>
        </nav>
    );
}