import { useLocation, Link } from 'react-router-dom';
import Confetti from 'react-confetti';

function Results() {
    const location = useLocation();
    const { score, totalQuestions } = location.state || {};

    const getPerformanceMessage = () => {
        const percentage = (score / totalQuestions) * 100;
        if (percentage === 100) {
            return "Perfect score! You're a superstar! 🌟";
        } else if (percentage >= 80) {
            return "Great job! You're amazing! 🎉";
        } else if (percentage >= 50) {
            return "Good effort! Keep pushing! 💪";
        } else {
            return "Don't give up! Practice makes perfect! 🌱";
        }
    };

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-lightGray'>
            {score / totalQuestions >= 0.8 && <Confetti />}
            <h1 className='text-3xl font-bold mb-4'>Quiz Results</h1>
            <p className='text-xl mb-2'>You scored {score} out of {totalQuestions}!</p>
            <p className='text-lg mb-4'>{getPerformanceMessage()}</p>
            <Link to='/courseSelection' className='bg-biochem text-white py-2 px-4 rounded hover:scale-105 transition-transform'>Back to Home</Link>
        </div>
    );
}

export default Results;
