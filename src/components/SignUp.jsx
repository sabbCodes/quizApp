import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    sendEmailVerification,
    updateProfile
} from 'firebase/auth';
import { auth } from '../firebase-config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleImg from '/Google.png';
import BookImg from '/Book.png';
import { DNA } from 'react-loader-spinner';

function SignUp() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validatePasswords = useCallback(() => {
        if (!passwordTouched && !confirmPasswordTouched) return;

        let passwordErrorMessage = "";
        let confirmPasswordErrorMessage = "";

        if (userPassword !== confirmPassword) {
            confirmPasswordErrorMessage = "Passwords do not match";
        }

        if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(userPassword)) {
            passwordErrorMessage = "Password must be at least 8 characters long and include letters, numbers, and special characters like @#$%^*";
        }

        setPasswordError(passwordErrorMessage);
        setConfirmPasswordError(confirmPasswordErrorMessage);
    }, [userPassword, confirmPassword, passwordTouched, confirmPasswordTouched]);

    useEffect(() => {
        validatePasswords();
    }, [userPassword, confirmPassword, validatePasswords]);

    const clearFields = () => {
        setUserEmail("");
        setUserPassword("");
        setConfirmPassword("");
        setFirstName("");
        setLastName("");
        setPasswordTouched(false);
        setConfirmPasswordTouched(false);
    };

    const signUp = async (event) => {
        event.preventDefault();
        validatePasswords();
        if (passwordError || confirmPasswordError) return;
        setLoading(true);

        try {
            await createUserWithEmailAndPassword(auth, userEmail, userPassword);
            const user = auth.currentUser;
            await updateProfile(user, { displayName: `${firstName} ${lastName}` });
            await sendEmailVerification(user);
            clearFields();
            toast.success('Account created successfully! Please verify your email before logging in.');
            setTimeout(() => {
                setLoading(false);
                navigate('/login');
            }, 5000); // Delay for 5 seconds
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

    return (
        <main className='bg-white font-Raleway h-full px-3.5 py-10 flex justify-center'>
            <div className='md:max-w-99 w-full max-w-sm'>
                <img src={BookImg} className='pb-4' alt="Book" />
                <form id='signUpForm' onSubmit={signUp}>
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
                        type='text'
                        id='firstName'
                        placeholder='First Name'
                        className='border-2 rounded-md w-full text-lg p-1 bg-white my-2 px-2 text-black'
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        required
                    />
                    <input
                        type='text'
                        id='lastName'
                        placeholder='Last Name'
                        className='border-2 rounded-md w-full text-lg p-1 bg-white my-2 px-2 text-black'
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        required
                    />
                    <input
                        type='email'
                        id='email'
                        placeholder='Email'
                        className='border-2 rounded-md w-full text-lg p-1 bg-white my-2 px-2 text-black'
                        onChange={e => setUserEmail(e.target.value)}
                        value={userEmail}
                        required
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        className={`border-2 rounded-md w-full text-lg p-1 bg-white my-2 px-2 text-black ${userPassword !== "" && passwordTouched && (passwordError ? 'border-wrong' : 'border-correct')}`}
                        onChange={e => setUserPassword(e.target.value)}
                        onBlur={() => setPasswordTouched(true)}
                        value={userPassword}
                        required
                    />
                    {userPassword != "" && passwordTouched && passwordError && <p className="text-wrong text-xs">{passwordError}</p>}
                    {userPassword != "" && userPassword !== "" && !passwordError && passwordTouched && <p className="text-correct text-xs">Password is strong.</p>}
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        className={`border-2 rounded-md w-full text-lg p-1 bg-white my-2 px-2 text-black ${confirmPassword !== "" && confirmPasswordTouched && (confirmPasswordError ? 'border-wrong' : 'border-correct')}`}
                        onChange={e => setConfirmPassword(e.target.value)}
                        onBlur={() => setConfirmPasswordTouched(true)}
                        value={confirmPassword}
                        required
                    />
                    {confirmPassword != "" && confirmPasswordTouched && confirmPasswordError && <p className="text-wrong text-xs">{confirmPasswordError}</p>}
                    {confirmPassword != "" && !confirmPasswordError && confirmPasswordTouched && <p className="text-correct text-xs">Passwords match.</p>}
                    <button
                        type='submit'
                        className='border-black rounded-md w-full text-lg p-1 bg-black my-2 px-2 text-white hover:bg-grey hover:text-black flex justify-center items-center'
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
                        ) : "Create Account"}
                    </button>
                    <p className='text-center text-lg'>Already have an account? <Link to='/login' className='hover:text-biochem hover:underline'>Log In</Link></p>
                </form>
                <ToastContainer />
            </div>
        </main>
    );
}

export default SignUp;
