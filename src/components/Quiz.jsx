import { useEffect, useState } from 'react';
import { useLocation, useParams, Link, useNavigate } from 'react-router-dom';
import AngleLeft from '/angle-left.png';
import AngleRight from '/angle-right.png';
import TickCircle from '/tick-circle.png';
import SadEmoji from '/emoji-sad.png';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore/lite';
import { DNA } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Quiz() {
    const location = useLocation();
    const { selectedTopics } = location.state || {};
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [gotRightAnswer, setGotRightAnswer] = useState(false);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedOptions, setSelectedOptions] = useState({});
    const { topic } = useParams();
    const navigate = useNavigate();

    const correctMessages = [
        "Nailed it! You're on fire! 🔥",
        "Spot on! Keep the streak going! 🎯",
        "Correct! You're a genius! 🧠✨",
        "Boom! You got it right! 💥",
        "Bingo! You’re rocking this! 🎉"
    ];

    const incorrectMessages = [
        "Oops! Not quite there. Try again! 😅",
        "Close, but no cigar. Better luck next time! 🍀",
        "Uh-oh! That’s not it. Keep pushing! 💪",
        "Don’t sweat it! You'll get the next one! 🌟",
        "Missed it! Brush it off and move on! 🚀"
    ];

    const getRandomMessage = (messages) => {
        return messages[Math.floor(Math.random() * messages.length)];
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            if (!selectedTopics || selectedTopics.length === 0) {
                setLoading(false);
                toast.error('No topics selected');
                return;
            }

            try {
                let allQuestions = [];
                for (let topic of selectedTopics) {
                    const topicRef = collection(db, topic);
                    const data = await getDocs(topicRef);
                    allQuestions = [...allQuestions, ...data.docs.map(doc => ({ ...doc.data(), id: doc.id }))];
                }
                if (allQuestions.length > 50) {
                    allQuestions = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 50);
                }
                setQuestions(allQuestions);
            } catch (err) {
                toast.error('Error fetching questions');
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [selectedTopics]);

    useEffect(() => {
        // Disable text selection
        document.body.style.userSelect = 'none';
        // Disable right-click
        const handleContextMenu = (event) => {
            event.preventDefault();
        };
        document.addEventListener('contextmenu', handleContextMenu);

        // Cleanup function
        return () => {
            document.body.style.userSelect = '';
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    useEffect(() => {
        // Load the selected option when the question index changes
        if (selectedOptions[currentQuestionIndex] !== undefined) {
            setSelectedOption(selectedOptions[currentQuestionIndex]);
        } else {
            setSelectedOption(null);
        }
    }, [currentQuestionIndex, selectedOptions]);

    const handleResponse = (option) => {
        setSelectedOption(option);
        setSelectedOptions(prevSelectedOptions => ({
            ...prevSelectedOptions,
            [currentQuestionIndex]: option
        }));
    };

    const handleSubmit = () => {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedOption === currentQuestion.correctOption) {
            setGotRightAnswer(true);
            setScore(prevScore => prevScore + 1);
            toast.success(getRandomMessage(correctMessages));
        } else {
            setGotRightAnswer(false);
            toast.error(getRandomMessage(incorrectMessages));
        }
        setHasAnswered(true);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setHasAnswered(false);
        } else {
            toast.info('You have reached the end of the quiz');
            navigate('/results', { state: { score, totalQuestions: questions.length } });
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setHasAnswered(false);
        } else {
            toast.info('This is the first question');
        }
    };

    return (
        <div className='md:max-w-2xl w-screen mx-auto flex flex-col justify-center select-none'>
            <nav className={`
                ${topic === 'biochemistry' ? 'bg-biochem' : topic === 'anatomy' ? 'bg-anatomy' : topic === 'pharmacology' ? 'bg-pharmacology' : 'bg-physiology'}
                h-20 p-5 flex justify-between items-center w-full md:max-w-7xl mt-3 text-center
            `}>
                <div className="flex items-center text-center w-full">
                    <h2 className='font-semibold font-archivo text-white text-2xl mx-auto capitalize'>{topic}</h2>
                </div>
            </nav>
            <main className='w-11/12 mx-auto'>
                {loading ? (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '70vh'
                    }}>
                        <DNA
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                        />
                    </div>
                ) : questions.length > 0 ? (
                    <div className='w-full flex mx-auto font-Raleway bg-lightGray px-4 py-5 my-2 rounded-xl '>
                        <p>{questions[currentQuestionIndex].question}</p>
                    </div>
                ) : (
                    <p className='mt-4'>
                        Ah snap!! We ran into an error there, but it is not your fault, please click
                        <Link to={`/courseSelection/${topic}`} className='text-biochem underline ml-1'>here!</Link>
                    </p>
                )}
                <div className='flex flex-col w-full mt-6'>
                    {!loading && questions.length > 0 && questions[currentQuestionIndex].options.map((option, index) => (
                        <div
                            key={index}
                            className={
                                `bg-lightGray rounded-lg py-1 px-2 flex justify-between my-1
                                ${selectedOption === option ? 'shadow shadow-black' : ''}
                                ${selectedOption === option && hasAnswered && gotRightAnswer ? 'shadow shadow-correct' : ''}
                                ${selectedOption === option && hasAnswered && !gotRightAnswer ? 'shadow shadow-wrong' : ''}`
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
                                        selectedOption === option ? (
                                            hasAnswered ? (
                                                gotRightAnswer ? 'accent-correct' : 'accent-wrong'
                                            ) : 'accent-selected'
                                        ) : 'disabled:gray-300'
                                    }`
                                }
                                disabled={hasAnswered}
                            />
                        </div>
                    ))}
                </div>
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
                        <img src={AngleLeft} alt='previous question' className='h-4' />
                        <span className='-mt-0.5'>Prev</span>
                    </button>
                    <span className='font-light text-sm text-biochem'>
                        {currentQuestionIndex + 1}/{questions.length}
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
            <ToastContainer />
        </div>
    );
}

export default Quiz;
