// import { useContext, useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//     createUserWithEmailAndPassword,
//     signInWithPopup,
//     GoogleAuthProvider,
//     sendEmailVerification,
//     updateProfile
// } from 'firebase/auth';
// import { auth } from '../firebase-config';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { UserContext } from '../UserContext';
// import GoogleImg from '/Google.png';
// import BookImg from '/Book.png';

// function SignUp() {
//     const { setUser } = useContext(UserContext);
//     const [userEmail, setUserEmail] = useState("");
//     const [userPassword, setUserPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [passwordError, setPasswordError] = useState("");
//     const [confirmPasswordError, setConfirmPasswordError] = useState("");
//     const [passwordTouched, setPasswordTouched] = useState(false);
//     const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         validatePasswords();
//     }, [userPassword, confirmPassword]);

//     const validatePasswords = () => {
//         if (!passwordTouched && !confirmPasswordTouched) return;

//         let passwordErrorMessage = "";
//         let confirmPasswordErrorMessage = "";

//         if (userPassword !== confirmPassword) {
//             confirmPasswordErrorMessage = "Passwords do not match";
//         }

//         if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(userPassword)) {
//             passwordErrorMessage = "Password must be at least 8 characters long and include letters, numbers, and special characters";
//         }

//         setPasswordError(passwordErrorMessage);
//         setConfirmPasswordError(confirmPasswordErrorMessage);
//     };

//     const clearFields = () => {
//         setUserEmail("");
//         setUserPassword("");
//         setConfirmPassword("");
//         setFirstName("");
//         setLastName("");
//         setPasswordTouched(false);
//         setConfirmPasswordTouched(false);
//     };

//     const signUp = async (event) => {
//         event.preventDefault();
//         validatePasswords();
//         if (passwordError || confirmPasswordError) return;

//         try {
//             const userCredential = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
//             const user = userCredential.user;
//             await updateProfile(user, { displayName: `${firstName} ${lastName}` });
//             await sendEmailVerification(user);
//             setUser(user);
//             clearFields();
//             toast.success('Account created successfully! Please verify your email before logging in.');
//             //navigate('/login');
//         } catch (error) {
//             console.error("Error signing up:", error);
//             toast.error(`Error signing up: ${error.message}`);
//         }
//     };

//     const provider = new GoogleAuthProvider();

//     const signInWithGoogle = async () => {
//         try {
//             const result = await signInWithPopup(auth, provider);
//             const user = result.user;
//             setUser(user);
//             navigate("/courseSelection");
//             toast.success('Signed in with Google successfully!');
//         } catch (error) {
//             console.error("Error signing in with Google:", error);
//             toast.error(`Error signing in with Google: ${error.message}`);
//         }
//     };

//     return (
//         <main className='bg-yellow font-Raleway h-screen px-3.5 py-10 flex justify-center'>
//             <div className='md:max-w-99'>
//                 <img src={BookImg} className='pb-4' alt="Book" />
//                 <form id='signUpForm' onSubmit={signUp}>
//                     <button
//                         type="button"
//                         className='flex items-center justify-center gap-3 my-4 border-2 rounded-md w-full text-lg font-bold p-1 hover:text-white'
//                         onClick={signInWithGoogle}
//                     >
//                         <img src={GoogleImg} alt="Google" />
//                         Continue with Google
//                     </button>
//                     <p className='text-center'>Or</p>
//                     <input
//                         type='text'
//                         placeholder='First Name'
//                         className='border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black'
//                         onChange={e => setFirstName(e.target.value)}
//                         value={firstName}
//                         required
//                     />
//                     <input
//                         type='text'
//                         placeholder='Last Name'
//                         className='border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black'
//                         onChange={e => setLastName(e.target.value)}
//                         value={lastName}
//                         required
//                     />
//                     <input
//                         type='email'
//                         placeholder='Email'
//                         className='border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black'
//                         onChange={e => setUserEmail(e.target.value)}
//                         value={userEmail}
//                         required
//                     />
//                     <input
//                         type='password'
//                         placeholder='Password'
//                         className={`border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black ${userPassword !== "" && passwordTouched && (passwordError ? 'border-wrong' : 'border-correct')}`}
//                         onChange={e => setUserPassword(e.target.value)}
//                         onBlur={() => setPasswordTouched(true)}
//                         value={userPassword}
//                         required
//                     />
//                     {passwordTouched && passwordError && <p className="text-wrong">{passwordError}</p>}
//                     {userPassword !== "" && !passwordError && passwordTouched && <p className="text-correct">Password is strong.</p>}
//                     <input
//                         type='password'
//                         placeholder='Confirm Password'
//                         className={`border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black ${confirmPasswordTouched && (confirmPasswordError ? 'border-wrong' : 'border-correct')}`}
//                         onChange={e => setConfirmPassword(e.target.value)}
//                         onBlur={() => setConfirmPasswordTouched(true)}
//                         value={confirmPassword}
//                         required
//                     />
//                     {confirmPasswordTouched && confirmPasswordError && <p className="text-wrong">{confirmPasswordError}</p>}
//                     {!confirmPasswordError && confirmPasswordTouched && <p className="text-correct">Passwords match.</p>}
//                     <button
//                         type='submit'
//                         className='border-black rounded-md w-full text-lg p-1 bg-black my-2 px-2 text-white hover:bg-white hover:text-black'
//                     >
//                         Create Account
//                     </button>
//                     <p className='text-center text-lg'>Already have an account? <Link to='/login'>Log In</Link></p>
//                 </form>
//                 <ToastContainer />
//             </div>
//         </main>
//     );
// }

// export default SignUp;



import { useContext, useState, useEffect, useCallback } from 'react';
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
import { UserContext } from '../UserContext';
import GoogleImg from '/Google.png';
import BookImg from '/Book.png';

function SignUp() {
    const { setUser } = useContext(UserContext);
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
    const navigate = useNavigate();

    const validatePasswords = useCallback(() => {
        if (!passwordTouched && !confirmPasswordTouched) return;

        let passwordErrorMessage = "";
        let confirmPasswordErrorMessage = "";

        if (userPassword !== confirmPassword) {
            confirmPasswordErrorMessage = "Passwords do not match";
        }

        if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(userPassword)) {
            passwordErrorMessage = "Password must be at least 8 characters long and include letters, numbers, and special characters";
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

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
            const user = userCredential.user;
            await updateProfile(user, { displayName: `${firstName} ${lastName}` });
            await sendEmailVerification(user);
            setUser(user);
            clearFields();
            toast.success('Account created successfully! Please verify your email before logging in.');
            setTimeout(() => {
                navigate('/login');
            }, 5000); // Delay for 5 seconds
        } catch (error) {
            console.error("Error signing up:", error);
            toast.error(`Error signing up: ${error.message}`);
        }
    };

    const provider = new GoogleAuthProvider();

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setUser(user);
            navigate("/courseSelection");
            toast.success('Signed in with Google successfully!');
        } catch (error) {
            console.error("Error signing in with Google:", error);
            toast.error(`Error signing in with Google: ${error.message}`);
        }
    };

    return (
        <main className='bg-yellow font-Raleway h-screen px-3.5 py-10 flex justify-center'>
            <div className='md:max-w-99'>
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
                        placeholder='First Name'
                        className='border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black'
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        required
                    />
                    <input
                        type='text'
                        placeholder='Last Name'
                        className='border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black'
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        required
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        className='border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black'
                        onChange={e => setUserEmail(e.target.value)}
                        value={userEmail}
                        required
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        className={`border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black ${userPassword !== "" && passwordTouched && (passwordError ? 'border-wrong' : 'border-correct')}`}
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
                        className={`border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black ${confirmPassword !== "" && confirmPasswordTouched && (confirmPasswordError ? 'border-wrong' : 'border-correct')}`}
                        onChange={e => setConfirmPassword(e.target.value)}
                        onBlur={() => setConfirmPasswordTouched(true)}
                        value={confirmPassword}
                        required
                    />
                    {confirmPassword != "" && confirmPasswordTouched && confirmPasswordError && <p className="text-wrong text-xs">{confirmPasswordError}</p>}
                    {confirmPassword != "" && !confirmPasswordError && confirmPasswordTouched && <p className="text-correct text-xs">Passwords match.</p>}
                    <button
                        type='submit'
                        className='border-black rounded-md w-full text-lg p-1 bg-black my-2 px-2 text-white hover:bg-white hover:text-black'
                    >
                        Create Account
                    </button>
                    <p className='text-center text-lg'>Already have an account? <Link to='/login'>Log In</Link></p>
                </form>
                <ToastContainer />
            </div>
        </main>
    );
}

export default SignUp;
