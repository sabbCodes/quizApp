import GoogleImg from '/Google.png';
import BookImg from '/Book.png';
import { Link } from 'react-router-dom';

function SignUp() {
    return(
        <main className='bg-yellow font-Raleway h-screen px-3.5 py-10 flex justify-center'>
            <div className='md:max-w-99'>
                <img src={BookImg} className='pb-4'/>
                <form>
                    <button className='flex items-center justify-center gap-3 my-4 border-2 rounded-md w-full text-lg font-bold p-1 hover:text-white'>
                        <img src={GoogleImg} />
                        Continue with Google
                    </button>
                    <p className='text-center'>Or</p>
                    <input
                        type='text'
                        placeholder='Firstname'
                        className='border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black'
                    />
                    <input
                        type='text'
                        placeholder='Surname'
                        className='border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black'
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        className='border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black'
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        className='border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black'
                    />
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        className='border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black'
                    />
                    <button className='border-black rounded-md w-full text-lg p-1 bg-black my-2 px-2 text-white hover:bg-white hover:text-black'>
                        Create Account
                    </button>
                    <p className='text-center text-lg'>Already have an account? <Link to='/login'>Log In</Link></p>
                </form>
            </div>
        </main>
    )
}

export default SignUp;