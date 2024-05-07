import { useState } from 'react';
import ArrowLeft from '/arrow-left.png';
import Shuffle from '/shuffle.png';
import { Link } from 'react-router-dom';

function Topics(){
    const [isSelected, setIsSelected] = useState(false)

    function handleCheck(){
        setIsSelected(!isSelected)
    }

    return(
        <div className='md:max-w-2xl font-Raleway mx-auto flex flex-col justify-center'>
            <nav className="bg-biochem p-5 flex justify-between items-center w-full md:max-w-7xl mt-12 text-center">
                <div className="flex items-center  text-center w-full">
                    <img src={ArrowLeft} alt="arrow left" className="" />
                    <h2 className='font-semibold text-white text-2xl mx-auto'>Biochemistry</h2>
                </div>
            </nav>
            <main className='my-4 mx-8'>
                <label className='flex gap-3 border-2 border-grey rounded-lg p-3 my-1'>
                    <input
                        type="checkbox"
                        onChange={handleCheck}
                    />
                    Cell Biology
                </label>
                <label className='flex gap-3 border-2 border-grey rounded-lg p-3 my-1'>
                    <input
                        type="checkbox"
                    />
                    Chemistry of Carbohydrates
                </label>
                <label className='flex gap-3 border-2 border-grey rounded-lg p-3 my-1'>
                    <input
                        type="checkbox"
                    />
                    Chemistry of Proteins & Amino Acids
                </label>
                <label className='flex gap-3 border-2 border-grey rounded-lg p-3 my-1'>
                    <input
                        type="checkbox"
                    />
                    Chemistry of Lipids
                </label>
                <label className='flex gap-3 border-2 border-grey rounded-lg p-3 my-1'>
                    <input
                        type="checkbox"
                    />
                    Chemistry of Nucleic Acids
                </label>
                <label className='flex gap-3 border-2 border-grey rounded-lg p-3 my-1'>
                    <input
                        type="checkbox"
                    />
                    Metabolism of Carbohydrates
                </label>
                <label className='flex gap-3 border-2 border-grey rounded-lg p-3 my-1'>
                    <input
                        type="checkbox"
                    />
                    Metabolism of Proteins & Amino Acids
                </label>
                <label className='flex gap-3 border-2 border-grey rounded-lg p-3 my-1'>
                    <input
                        type="checkbox"
                    />
                    Metabolism of Lipids
                </label>
                <label className='flex gap-3 border-2 border-grey rounded-lg p-3 my-1'>
                    <input
                        type="checkbox"
                    />
                    Metabolism of Nucleic Acids
                </label>
            </main>
            <footer className='fixed bottom-6 left-0 right-0'>
                <div className='w-full  flex flex-col items-center justify-center'>
                    <Link to='/courseSelection/biochemistry/quiz' className=' w-5/12'>
                        <button
                            disabled={!isSelected}
                            className='rounded-md md:max-w-52 w-full mb-1 bg-startBtn text-white p-2 hover:duration-1000 hover:scale-105 transition-all disabled:bg-gray disabled:text-darkgray disabled:cursor-not-allowed'
                        >
                            Start Quiz
                        </button>
                    </Link>
                    <button
                        className='rounded-md md:max-w-52 w-5/12 mt-1 border-blue text-blue border p-2 flex justify-between items-center px-5 hover:duration-1000 hover:scale-105 transition-all'
                    >
                        Shuffle Questions
                        <img src={Shuffle} alt='shuffle icon' />
                    </button>
                </div>
            </footer>
        </div>
    )
}

export default Topics;