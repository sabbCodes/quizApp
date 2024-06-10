import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '../firebase-config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleImg from '/Google.png';
import BookImg from '/Book.png';
import EyeSlash from '/eye-slash.png';
import Eye from '/eye.png';
import { DNA } from 'react-loader-spinner';

function LoginPage() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const signIn = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, userEmail, userPassword);

            // Check if email is verified
            const user = auth.currentUser;
            if (user && user.emailVerified) {
                toast.success('Signed in successfully!');
                setTimeout(() => {
                    setLoading(false);
                    navigate("/courseSelection");
                }, 5000); // Delay for 5 seconds
            } else {
                setLoading(false);
                toast.error('Please verify your email before logging in.');
            }
        } catch (error) {
            setLoading(false);
            toast.error(`${error.message}`);
        }
    };

    const provider = new GoogleAuthProvider();

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider);
            navigate("/courseSelection");
            toast.success('Signed in with Google successfully!');
        } catch (error) {
            toast.error(`${error.message}`);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <main className='bg-white font-Raleway h-full px-3.5 text-lg py-10 flex justify-center'>
            <div className='md:max-w-99 w-full max-w-sm'>
                <img src={BookImg} className='pb-4' alt="Book" />
                <form onSubmit={signIn}>
                    <button
                        type="button"
                        className='flex items-center justify-center h-12 py-4 gap-3 my-4 border-2 rounded-md w-full text-lg font-bold hover:text-grey'
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
                        className='border-2 rounded-md w-full h-12 py-4 text-lg bg-white my-2 px-2 text-black'
                        onChange={e => setUserEmail(e.target.value)}
                        required
                    />
                    <div className='relative'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password'
                            id='password'
                            className='border-2 rounded-md w-full h-12 py-4 text-lg bg-white my-2 px-2 text-black pr-10'
                            onChange={e => setUserPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={toggleShowPassword}
                            className='absolute inset-y-0 right-0 flex items-center px-4 focus:outline-none'
                        >
                            <img src={showPassword ? EyeSlash : Eye} alt="Toggle Password Visibility" />
                        </button>
                    </div>
                    <div className='text-right my-2'>
                        <Link to='/forgot-password' className='text-black hover:underline hover:text-biochem'>Forgot password?</Link>
                    </div>
                    <button
                        type='submit'
                        className='border-black rounded-md w-full h-12 py-4 text-lg bg-black my-2 px-2 text-white hover:bg-grey hover:text-black flex justify-center items-center'
                        disabled={loading}
                    >
                        {loading ? (
                            <div className='flex justify-center items-center'>
                                <DNA
                                    visible={true}
                                    height="30"
                                    width="30"
                                    ariaLabel="dna-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="dna-wrapper"
                                />
                            </div>
                        ) : "Log In"}
                    </button>
                    <p className='text-center text-lg font-medium'>Do not have an account? <Link to='/' className='hover:text-biochem hover:underline'>Sign Up</Link></p>
                </form>
            </div>
            <ToastContainer />
        </main>
    );
}

export default LoginPage;
