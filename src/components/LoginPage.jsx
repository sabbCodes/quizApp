import GoogleImg from '/Google.png';
import BookImg from '/Book.png';
import { Link } from 'react-router-dom';

function LoginPage() {
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
                        type='email'
                        placeholder='email'
                        className='border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black'
                    />
                    <input
                        type='text'
                        placeholder='password'
                        className='border-2 rounded-md w-full text-lg p-1 bg-yellow my-2 px-2 text-black'
                    />
                    <Link className='tex'>Forgot password?</Link>
                    <button className='border-black rounded-md w-full text-lg p-1 bg-black my-2 px-2 text-white hover:bg-white hover:text-black'>
                        Log In
                    </button>
                    <p className='text-center text-lg'>Do not have an account? <Link to='/courseSelection'>Sign Up</Link></p>
                </form>
            </div>
        </main>
    )
}

export default LoginPage;