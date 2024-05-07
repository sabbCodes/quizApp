import { useState } from 'react';
import ArrowLeft from '/arrow-left.png';
import AngleLeft from '/angle-left.png';
import AngleRight from '/angle-right.png';
import TickCircle from '/tick-circle.png';
import SadEmoji from '/emoji-sad.png';
import quizQuestions from '../quizQuestions';
import { useParams } from 'react-router-dom';

function Quiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [gotRightAnswer, setGotRightAnswer] = useState(false);
    const { course } = useParams();

    function handleResponse(option) {
        setSelectedOption(option);
    }

    function handleSubmit() {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        if (selectedOption === currentQuestion.correctOption) {
            console.log('Correct');
            setGotRightAnswer(true);
        } else {
            console.log('Wrong');
            setGotRightAnswer(false);
        }
        setHasAnswered(true);
    }

    function handleNextQuestion() {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setHasAnswered(false);
            setSelectedOption(null);
        } else {
            console.log('Quiz completed');
        }
    }

    function handlePrevQuestion() {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setHasAnswered(false);
            setSelectedOption(null);
        } else {
            console.log('Quiz completed');
        }
    }

    return (
        <div className='md:max-w-2xl w-screen mx-auto flex flex-col justify-center'>
            <nav className="bg-biochem h-20 p-5 flex justify-between items-center w-full md:max-w-7xl mt-3 text-center">
                <div className="flex items-center  text-center w-full">
                    <img src={ArrowLeft} alt="arrow left" className="" />
                    <h2 className='font-semibold font-archivo text-white text-2xl mx-auto'>Biochemistry</h2>
                </div>
            </nav>
            <main className='w-11/12 mx-auto'>
                <div className='w-full flex mx-auto font-Raleway bg-lightGray px-4 py-5 my-2 rounded-xl '>
                    <p>{quizQuestions[currentQuestionIndex].question}</p>
                </div>
                <div className='flex flex-col w-full mt-6'>
                    {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                        <div
                            key={index}
                            className={
                                `${selectedOption === option ? 'shadow shadow-black' : ''}
                                ${selectedOption === option && hasAnswered && gotRightAnswer ? 'shadow shadow-correct' : ''}
                                ${selectedOption === option && hasAnswered && !gotRightAnswer ? 'shadow shadow-wrong' : ''}
                                bg-lightGray rounded-lg py-1 px-2 flex justify-between my-1`
                            }
                        >
                            <label className='flex gap-2 font-Raleway' htmlFor={`option${index}`}>
                                <span>{String.fromCharCode(65 + index)}.</span>
                                {option}
                            </label>
                            <input
                                type='radio'
                                name='response'
                                id={`option${index}`}
                                onChange={() => handleResponse(option)}
                                checked={selectedOption === option}
                                className={
                                    `appearance-auto cursor-pointer rounded-full bg-transparent border-2 ${
                                        hasAnswered && gotRightAnswer ? 'disabled:accent-correct'
                                        : hasAnswered && !gotRightAnswer ? 'disabled:accent-wrong'
                                        : 'disabled:gray-300'
                                    }`
                                }
                                disabled={hasAnswered}
                            />
                        </div>
                    ))}
                </div>
                {hasAnswered ? (
                    <div className='px-4 py-2'>
                        <h2 className='text-biochem text-xl font-Raleway'>Explanation:</h2>
                        <p className='text-correct font-Raleway'>
                            {quizQuestions[currentQuestionIndex].explanation}
                        </p>
                    </div>
                ) : ''}
            </main>
            <article className='mt-10'>
                <div className='flex w-11/12 items-center mx-auto justify-between'>
                    <button
                        className={
                            `h-10 text-white w-full mt-2 rounded-md flex items-center justify-center
                            ${hasAnswered && gotRightAnswer ? 'bg-correct' : hasAnswered && !gotRightAnswer ? 'bg-wrong' : 'bg-submitBtn'}
                            px-3 py-1 hover:duration-1000 hover:scale-105 transition-all gap-2 font-Raleway
                            disabled:bg-gray disabled:text-darkgray disabled:cursor-not-allowed`
                        }
                        disabled={!selectedOption}
                        onClick={handleSubmit}
                    >
                       {hasAnswered && gotRightAnswer ? (
                            <>
                                Correct <img src={TickCircle} alt='Tick icon' />
                            </>
                        ) : hasAnswered && !gotRightAnswer ? (
                            <>
                                Not quite <img src={SadEmoji} alt='Sad icon' />
                            </>
                        ) : (
                            'Submit'
                        )}
                    </button>
                </div>
                <div className='flex w-11/12 items-center mx-auto mt-4 justify-between my-2 font-Raleway'>
                    <button
                        onClick={handlePrevQuestion}
                        className='h-10 w-24 flex items-center gap-1 border-biochem border rounded-md text-lg text-biochem px-3 py-1 hover:duration-1000 hover:scale-105'
                    >
                        <img src={AngleLeft} alt='next question' className='h-4' />
                        <span className='-mt-0.5'>Prev</span>
                    </button>
                    <span className='font-light text-sm text-biochem'>
                        {currentQuestionIndex + 1}/{quizQuestions.length}
                    </span>
                    <button
                        className='h-10 w-24 flex items-center gap-1 border-biochem border rounded-md text-lg text-biochem px-3 py-1 hover:duration-1000 hover:scale-105'
                        onClick={handleNextQuestion}
                    >
                        <span className='-mt-0.5'>Next</span>
                        <img src={AngleRight} alt='next question' className='h-4' />
                    </button>
                </div>
            </article>
        </div>
    );
}

export default Quiz;