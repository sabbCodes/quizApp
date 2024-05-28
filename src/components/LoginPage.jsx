import { useContext, useState } from 'react';
import GoogleImg from '/Google.png';
import BookImg from '/Book.png';
import { Link, useNavigate } from 'react-router-dom';
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '../firebase-config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../UserContext';

function LoginPage() {
    const { setUser } = useContext(UserContext);
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const navigate = useNavigate();

    const signIn = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, userEmail, userPassword);
            const user = userCredential.user;

            // Check if email is verified
            if (user.emailVerified) {
                setUser(user);
                toast.success('Signed in successfully!');
                setTimeout(() => {
                    navigate("/courseSelection");
                }, 5000); // Delay for 5 seconds
            } else {
                toast.error('Please verify your email before logging in.');
            }
        } catch (error) {
            console.error("Error signing in:", error);
            toast.error(`Error signing in: ${error.message}`);
        }
    };

    const provider = new GoogleAuthProvider();

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setUser(user);
            toast.success('Signed in with Google successfully!');
            setTimeout(() => {
                navigate("/courseSelection");
            }, 5000); // Delay for 5 seconds
        } catch (error) {
            console.error("Error signing in with Google:", error);
            toast.error(`Error signing in with Google: ${error.message}`);
        }
    };

    return (
        <main className='bg-yellow font-Raleway h-screen px-3.5 py-10 flex justify-center'>
            <div className='md:max-w-99'>
                <img src={BookImg} className='pb-4' alt="Book" />
                <form onSubmit={signIn}>
                    <button
                        type="button"
                        className='flex items-center justify-center gap-3 my-4 border-2 rounded-md w-full text-lg font-bold p-1 hover:text-white'
                        onClick={signInWithGoogle}
                    >
                        <img src={GoogleImg} alt="Google" />
                        Continue with Google
                    </button>
                    <p className='text-center'>Or</p>
                    <input
                        type='email'
                        placeholder='Email'
                        id='email'
                        className='border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black'
                        onChange={e => setUserEmail(e.target.value)}
                        required
                    />
                    <input
                        type='password'
                        placeholder='Ppassword'
                        id='password'
                        className='border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black'
                        onChange={e => setUserPassword(e.target.value)}
                        required
                    />
                    <div className='text-right my-2'>
                        <Link to='/forgot-password' className='text-black hover:underline hover:text-white'>Forgot password?</Link>
                    </div>
                    <button
                        type='submit'
                        className='border-black rounded-md w-full text-lg p-1 bg-black my-2 px-2 text-white hover:bg-white hover:text-black'
                    >
                        Log In
                    </button>
                    <p className='text-center text-lg'>Do not have an account? <Link to='/' className='hover:text-white hover:underline'>Sign Up</Link></p>
                </form>
            </div>
            <ToastContainer />
        </main>
    );
}

export default LoginPage;
