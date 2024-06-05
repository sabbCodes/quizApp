import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase-config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { DNA } from 'react-loader-spinner';

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            await sendPasswordResetEmail(auth, email);
            setLoading(false);
            toast.success('Password reset email sent!');
        } catch (error) {
            toast.error(`Error sending password reset email: ${error.message}`);
        }
    };

    return (
        <main className='bg-yellow font-Raleway h-screen px-3.5 py-10 flex justify-center'>
            <div className='md:max-w-99'>
                <form onSubmit={handleResetPassword}>
                    <h2 className='text-center text-lg font-bold mb-4'>Reset Password</h2>
                    <input
                        type='email'
                        id='email'
                        placeholder='Email'
                        className='border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black'
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <button
                        type='submit'
                        className='border-black rounded-md w-full text-lg p-1 bg-black my-2 px-2 text-white hover:bg-white hover:text-black'
                        disabled={loading}
                    >
                        {loading ? (
                            <div className='flex justify-center items-center'>
                                <DNA
                                    visible={true}
                                    height="40"
                                    width="40"
                                    ariaLabel="dna-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="dna-wrapper"
                                />
                            </div>
                        ) : "Send Reset Email"}
                    </button>
                    <p className='text-center text-lg'><Link to='/login'>Back to Login</Link></p>
                </form>
            </div>
            <ToastContainer />
        </main>
    );
}

export default ForgotPassword;
