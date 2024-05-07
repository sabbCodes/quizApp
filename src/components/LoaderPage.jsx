import BookImg from '/Book.png'

function LoaderPage() {
    return(
        <main className='bg-purple h-screen w-screen flex items-center justify-center'>
            <img src={BookImg} />
        </main>
    )
}

export default LoaderPage;