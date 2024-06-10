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
import EyeSlash from '/eye-slash.png';
import Eye from '/eye.png';
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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <main className='bg-white font-Raleway h-full px-3.5 py-8 text-lg flex justify-center'>
            <div className='md:max-w-99 w-full max-w-sm'>
                <img src={BookImg} className='pb-4' alt="Book" />
                <form id='signUpForm' onSubmit={signUp}>
                    <button
                        type="button"
                        className='flex items-center justify-center gap-3 my-4 border-2 rounded-md w-full h-12 text-lg font-bold p-1 hover:text-grey'
                        onClick={signInWithGoogle}
                    >
                        <img src={GoogleImg} alt="Google" />
                        Continue with Google
                    </button>
                    <p className='text-center font-medium'>Or</p>
                    <input
                        type='text'
                        id='firstName'
                        placeholder='First Name'
                        className='border-2 rounded-md w-full h-12 text-lg py-4 bg-white my-2 px-2 text-black'
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        required
                    />
                    <input
                        type='text'
                        id='lastName'
                        placeholder='Last Name'
                        className='border-2 rounded-md w-full h-12 text-lg py-4 bg-white my-2 px-2 text-black'
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        required
                    />
                    <input
                        type='email'
                        id='email'
                        placeholder='Email'
                        className='border-2 rounded-md w-full h-12 text-lg py-4 bg-white my-2 px-2 text-black'
                        onChange={e => setUserEmail(e.target.value)}
                        value={userEmail}
                        required
                    />
                    <div className='relative'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password'
                            className={`border-2 rounded-md w-full h-12 text-lg py-4 bg-white my-2 px-2 text-black pr-10 ${userPassword !== "" && passwordTouched && (passwordError ? 'border-wrong' : 'border-correct')}`}
                            onChange={e => setUserPassword(e.target.value)}
                            onBlur={() => setPasswordTouched(true)}
                            value={userPassword}
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
                    {userPassword !== "" && passwordTouched && passwordError && <p className="text-wrong text-xs">{passwordError}</p>}
                    {userPassword !== "" && userPassword !== "" && !passwordError && passwordTouched && <p className="text-correct text-xs">Password is strong.</p>}
                    <div className='relative'>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder='Confirm Password'
                            className={`border-2 rounded-md w-full h-12 text-lg py-4 bg-white my-2 px-2 text-black pr-10 ${confirmPassword !== "" && confirmPasswordTouched && (confirmPasswordError ? 'border-wrong' : 'border-correct')}`}
                            onChange={e => setConfirmPassword(e.target.value)}
                            onBlur={() => setConfirmPasswordTouched(true)}
                            value={confirmPassword}
                            required
                        />
                        <button
                            type="button"
                            onClick={toggleShowConfirmPassword}
                            className='absolute inset-y-0 right-0 flex items-center px-4 focus:outline-none'
                        >
                            <img src={showConfirmPassword ? EyeSlash : Eye} alt="Toggle Confirm Password Visibility" />
                        </button>
                    </div>
                    {confirmPassword !== "" && confirmPasswordTouched && confirmPasswordError && <p className="text-wrong text-xs">{confirmPasswordError}</p>}
                    {confirmPassword !== "" && !confirmPasswordError && confirmPasswordTouched && <p className="text-correct text-xs">Passwords match.</p>}
                    <button
                        type='submit'
                        className='border-black rounded-md w-full h-12 text-lg py-4 bg-black my-2 px-2 font-medium text-white hover:bg-grey hover:text-black flex justify-center items-center'
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
                    <p className='text-center text-lg font-medium'>Already have an account? <Link to='/login' className='hover:text-biochem hover:underline'>Log In</Link></p>
                </form>
                <ToastContainer />
            </div>
        </main>
    );
}

export default SignUp;
