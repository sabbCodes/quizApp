import BookImg from '/Book.png';

function LoaderPage() {
    return (
        <main className='bg-white h-screen w-screen flex items-center justify-center'>
            <img src={BookImg} alt="Loading..." className='max-w-full max-h-full' />
        </main>
    );
}

export default LoaderPage;
