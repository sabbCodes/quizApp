// import GoogleImg from '/Google.png';
// import BookImg from '/Book.png';
// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebase-config';

// function SignUp() {
//     const [userEmail, setUserEmail] = useState("");
//     const [userPassword, setUserPassword] = useState("");
//     // const [userFirstname, setUserFirstname] = useState("");
//     // const [userLastname, setUserLastname] = useState("");

//     const signUp = async (event) => {
//         event.preventDefault();
//         try {
//             const userCredential = await createUserWithEmailAndPassword(
//                 auth,
//                 userEmail,
//                 userPassword
//             );
//             const user = userCredential.user;
//             console.log(user);
//         } catch (error) {
//             console.error("Error signing up:", error);
//         }
//     };

//     const signInWithGoogle = async () => {
//         signInWithPopup(auth, provider)
//         .then((result) => {
//             // This gives you a Google Access Token. You can use it to access the Google API.
//             const credential = GoogleAuthProvider.credentialFromResult(result);
//             const token = credential.accessToken;
//             // The signed-in user info.
//             const user = result.user;
//             // IdP data available using getAdditionalUserInfo(result)
//             // ...
//         }).catch((error) => {
//             // Handle Errors here.
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // The email of the user's account used.
//             const email = error.customData.email;
//             // The AuthCredential type that was used.
//             const credential = GoogleAuthProvider.credentialFromError(error);
//             // ...
//         });
//     }

//     return(
//         <main className='bg-yellow font-Raleway h-screen px-3.5 py-10 flex justify-center'>
//             <div className='md:max-w-99'>
//                 <img src={BookImg} className='pb-4'/>
//                 <form id='signUpFOrm'>
//                     <button
//                         className='flex items-center justify-center gap-3 my-4 border-2 rounded-md w-full text-lg font-bold p-1 hover:text-white'
//                         onClick={signInWithGoogle}
//                     >
//                         <img src={GoogleImg} />
//                         Continue with Google
//                     </button>
//                     <p className='text-center'>Or</p>
//                     {/* <input
//                         type='text'
//                         placeholder='Firstname'
//                         className='border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black'
//                         onChange={e => {
//                             setUserFirstname(e.target.value)
//                         }}
//                     /> */}
//                     {/* <input
//                         type='text'
//                         placeholder='Surname'
//                         className='border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black'
//                         onChange={e => {
//                             setUserLastname(e.target.value)
//                         }}
//                     /> */}
//                     <input
//                         type='email'
//                         placeholder='Email'
//                         id='email'
//                         className='border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black'
//                         onChange={e => {
//                             setUserEmail(e.target.value);
//                         }}
//                     />
//                     <input
//                         type='password'
//                         placeholder='Password'
//                         id='password'
//                         className='border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black'
//                         onChange={e => {
//                             setUserPassword(e.target.value);
//                         }}
//                     />
//                     {/* <input
//                         type='password'
//                         placeholder='Confirm Password'
//                         className='border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black'
//                     /> */}
//                     <button
//                         className='border-black rounded-md w-full text-lg p-1 bg-black my-2 px-2 text-white hover:bg-white hover:text-black'
//                         onClick={signUp}
//                     >
//                         Create Account
//                     </button>
//                     <p className='text-center text-lg'>Already have an account? <Link to='/login'>Log In</Link></p>
//                 </form>
//             </div>
//         </main>
//     )
// }

// export default SignUp;


// import GoogleImg from '/Google.png';
// import BookImg from '/Book.png';
// import { Link, useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import {
//     createUserWithEmailAndPassword,
//     signInWithPopup,
//     signInWithRedirect,
//     GoogleAuthProvider,
// } from 'firebase/auth';
// import { auth } from '../firebase-config';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function SignUp() {
//     const [userEmail, setUserEmail] = useState("");
//     const [userPassword, setUserPassword] = useState("");
//     const navigate = useNavigate();
//     const provider = new GoogleAuthProvider();

//     const signUp = async (event) => {
//         event.preventDefault();
//         try {
//             const userCredential = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
//             const user = userCredential.user;
//             console.log(user);
//             toast.success('Account created successfully!');
//             navigate('/courseSelection', { state: { user: { email: user.email, displayName: user.displayName, photoURL: user.photoURL } } });
//         } catch (error) {
//             console.error("Error signing up:", error);
//             toast.error(`Error signing up: ${error.message}`);
//         }
//     };

//     const signInWithGoogle = async () => {
//         try {
//             const result = await signInWithPopup(auth, provider);
//             const user = result.user;
//             console.log(user);
//             toast.success('Signed in with Google successfully!');
//             navigate('/courseSelection', { state: { user: { email: user.email, displayName: user.displayName, photoURL: user.photoURL } } });
//         } catch (error) {
//             if (error.code === 'auth/popup-blocked') {
//                 try {
//                     await signInWithRedirect(auth, provider);
//                 } catch (redirectError) {
//                     console.error("Error signing in with Google:", redirectError);
//                     toast.error(`Error signing in with Google: ${redirectError.message}`);
//                 }
//             } else {
//                 console.error("Error signing in with Google:", error);
//                 toast.error(`Error signing in with Google: ${error.message}`);
//             }
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
//                         type='email'
//                         placeholder='Email'
//                         id='email'
//                         className='border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black'
//                         onChange={e => setUserEmail(e.target.value)}
//                         required
//                     />
//                     <input
//                         type='password'
//                         placeholder='Password'
//                         id='password'
//                         className='border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black'
//                         onChange={e => setUserPassword(e.target.value)}
//                         required
//                     />
//                     <button
//                         type='submit'
//                         className='border-black rounded-md w-full text-lg p-1 bg-black my-2 px-2 text-white hover:bg-white hover:text-black'
//                     >
//                         Create Account
//                     </button>
//                     <p className='text-center text-lg'>Already have an account? <Link to='/login'>Log In</Link></p>
//                 </form>
//             </div>
//             <ToastContainer />
//         </main>
//     );
// }

// export default SignUp;




import { useContext } from 'react';
import GoogleImg from '/Google.png';
import BookImg from '/Book.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '../firebase-config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../UserContext';

function SignUp() {
    const { setUser } = useContext(UserContext);
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const navigate = useNavigate();

    const signUp = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
            const user = userCredential.user;
            setUser(user);
            toast.success('Account created successfully!');
            navigate('/courseSelection');
        } catch (error) {
            console.error("Error signing up:", error);
            toast.error(`Error signing up: ${error.message}`);
        }
    };

    const provider = new GoogleAuthProvider();

    const signInWithGoogle = async () => {
        try {
            if (window.innerWidth <= 768) {
                await signInWithRedirect(auth, provider);
            } else {
                const result = await signInWithPopup(auth, provider);
                const user = result.user;
                setUser(user);
                navigate("/courseSelection");
                toast.success('Signed in with Google successfully!');
            }
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
                        type='email'
                        placeholder='Email'
                        id='email'
                        className='border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black'
                        onChange={e => setUserEmail(e.target.value)}
                        required
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        id='password'
                        className='border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black'
                        onChange={e => setUserPassword(e.target.value)}
                        required
                    />
                    <button
                        type='submit'
                        className='border-black rounded-md w-full text-lg p-1 bg-black my-2 px-2 text-white hover:bg-white hover:text-black'
                    >
                        Create Account
                    </button>
                    <p className='text-center text-lg'>Already have an account? <Link to='/login'>Log In</Link></p>
                </form>
            </div>
            <ToastContainer />
        </main>
    );
}

export default SignUp;
