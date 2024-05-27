import { useEffect, useState } from 'react';
import ArrowLeft from '/arrow-left.png';
import Shuffle from '/shuffle.png';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore/lite';
import { DNA } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Topics() {
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const { topic } = useParams();
    const navigate = useNavigate();

    const topicsRef = collection(db, `${topic}`);

    const notify = message => toast.error(message);

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const data = await getDocs(topicsRef);
                setTopics(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            } catch (err) {
                let errorMessage = 'Failed to fetch topics. Please check your internet connection and try again.';
                if (err.code === 'resource-exhausted') {
                    errorMessage = 'Quota exceeded. Please try again later.';
                }
                notify(errorMessage);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getQuestions();
    }, [topicsRef]);

    const handleCheck = (event, topicBranch) => {
        if (event.target.checked) {
            setSelectedTopics(prevSelected => [...prevSelected, topicBranch]);
        } else {
            setSelectedTopics(prevSelected => prevSelected.filter(branch => branch !== topicBranch));
        }
    };

    const handleStartQuiz = () => {
        navigate(`/courseSelection/${topic}/quiz`, { state: { selectedTopics } });
    };

    return (
        <div className='md:max-w-2xl font-Raleway mx-auto flex flex-col justify-center'>
            <nav className={`
                ${topic === 'biochemistry' ? 'bg-biochem' : topic === 'anatomy' ? 'bg-anatomy' : topic === 'pharmacology' ? 'bg-pharmacology' : 'bg-physiology'}
                h-20 p-5 flex justify-between items-center w-full md:max-w-7xl mt-3 text-center
            `}>
                <div className="flex items-center text-center w-full">
                    <Link to='/courseSelection'>
                        <img src={ArrowLeft} alt="arrow left" />
                    </Link>
                    <h2 className='font-semibold text-white font-archivo text-2xl mx-auto capitalize'>{topic}</h2>
                </div>
            </nav>
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
            ) : (
                <main className='my-4 mx-8'>
                    {topics.map(topic => (
                        <label key={topic.id} className='capitalize flex gap-3 border-2 border-grey rounded-lg p-3 mb-2'>
                            <input
                                type="checkbox"
                                onChange={(event) => handleCheck(event, topic.branch)}
                                checked={selectedTopics.includes(topic.branch)}
                                disabled={selectedTopics.length > 1 && !selectedTopics.includes(topic.branch)}
                            />
                            {topic.branch}
                        </label>
                    ))}
                </main>
            )}
            <footer className='bottom-6 left-0 right-0'>
                <div className='w-full flex flex-col items-center justify-center'>
                    <button
                        onClick={handleStartQuiz}
                        disabled={selectedTopics.length === 0}
                        className='rounded-md md:max-w-52 w-60 h-10 mb-1 bg-startBtn text-white p-2 hover:duration-1000 hover:scale-105 transition-all disabled:bg-gray disabled:text-darkgray disabled:cursor-not-allowed'
                    >
                        Start Quiz
                    </button>
                    <button
                        className='py-2 px-10 gap-2 rounded-md md:max-w-52 w-60 h-10 my-2 border-blue text-blue border p-2 flex items-center hover:duration-1000 hover:scale-105 transition-all'
                    >
                        Shuffle Questions
                        <img src={Shuffle} alt='shuffle icon' />
                    </button>
                </div>
            </footer>
            <ToastContainer />
        </div>
    );
}

export default Topics;