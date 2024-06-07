import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import ArrowRight from '/arrow-right.png';
import ProfileIcon from '/profile-icon.jpg';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebase-config';

function CourseSelection() {
    const navigate = useNavigate();
    const { currentUser } = useAuth(); // Use the useAuth hook to get the current user
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const firstName = currentUser.displayName ? currentUser.displayName.split(' ')[0] : 'Champ';
    const role = currentUser.role || 'Medic';

    if (!currentUser) {
        return <p>Loading...</p>;
    }

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    return (
        <main className='py-9 font-Raleway px-4 h-screen flex flex-col items-center'>
            <div className='w-full md:max-w-96'>
                <div className='flex items-center justify-between w-full mb-4 p-2 border-b border-grey relative'>
                    <div className='flex items-center'>
                        {currentUser.photoURL ? (
                            <img src={currentUser.photoURL} alt="User Profile" className='w-12 h-12 rounded-full mr-4 cursor-pointer' onClick={toggleProfileMenu} />
                        ) : (
                            <img src={ProfileIcon} alt="User Profile" className='w-12 h-12 rounded-full mr-4 cursor-pointer' onClick={toggleProfileMenu} />
                        )}
                        <div>
                            <h2 className='text-xl font-bold'>Welcome, {firstName} &#x1F44B;!</h2>
                            <p className='text-sm text-gray-600'>{role} &#x1FA7A; &#x1F97C;</p>
                        </div>
                    </div>
                    {showProfileMenu && (
                        <div className="absolute right-0 mt-12 w-48 bg-white rounded-md shadow-lg z-10">
                            <div className="py-1">
                                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                            </div>
                        </div>
                    )}
                </div>
                <h1 className='font-archivo font-medium text-xl my-4'>Select a Course</h1>
                <article>
                     <h4 className='text-darkgrey'>Pre-clinical</h4>
                     <Link to='anatomy'>
                         <div className='flex items-center justify-between w-full mb-3 border-grey border p-2 rounded-lg hover:border-blue'>
                             <div>
                                 <h2 className='text-lg'>Anatomy</h2>
                                 <p className='text-xs'>Topics: 11</p>
                             </div>
                             <div>
                                 <img src={ArrowRight} alt='Right arrow' />
                             </div>
                         </div>
                     </Link>
                     <Link to='biochemistry'>
                         <div className='flex items-center justify-between w-full my-3 border-grey border p-2 rounded-lg hover:border-blue'>
                             <div>
                                 <h2 className='text-lg'>Biochemistry</h2>
                                 <p className='text-xs'>Topics: 10</p>
                             </div>
                             <div>
                                 <img src={ArrowRight} alt='Right arrow' />
                             </div>
                         </div>
                     </Link>
                     <Link to='physiology'>
                         <div className='flex items-center justify-between w-full my-3 border-grey border p-2 rounded-lg hover:border-blue'>
                             <div>
                                 <h2 className='text-lg'>Physiology</h2>
                                 <p className='text-xs'>Topics: 11</p>
                             </div>
                             <div>
                                 <img src={ArrowRight} alt='Right arrow' />
                             </div>
                         </div>
                     </Link>
                 </article>
                 <article>
                     <h4 className='text-darkgrey mt-9'>Clinical</h4>
                     <Link to='pathology'>
                         <div className='flex items-center justify-between w-full mb-3 border-grey border p-2 rounded-lg hover:border-blue'>
                             <div>
                                 <h2 className='text-lg'>Pathology</h2>
                                 <p className='text-xs'>Topics: 10</p>
                             </div>
                             <div>
                                 <img src={ArrowRight} alt='Right arrow' />
                             </div>
                         </div>
                     </Link>
                     <Link to='pharmacology'>
                         <div className='flex items-center justify-between w-full my-3 border-grey border p-2 rounded-lg hover:border-blue'>
                             <div>
                                 <h2 className='text-lg'>Pharmacology</h2>
                                 <p className='text-xs'>Topics: 10</p>
                             </div>
                             <div>
                                 <img src={ArrowRight} alt='Right arrow' />
                             </div>
                         </div>
                     </Link>
                     <Link to='microbiology'>
                         <div className='flex items-center justify-between w-full my-3 border-grey border p-2 rounded-lg hover:border-blue'>
                             <div>
                                 <h2 className='text-lg'>Microbiology</h2>
                                 <p className='text-xs'>Topics: 11</p>
                             </div>
                             <div>
                                 <img src={ArrowRight} alt='Right arrow' />
                             </div>
                         </div>
                     </Link>
                 </article>
             </div>
         </main>
     );
 }

export default CourseSelection;
