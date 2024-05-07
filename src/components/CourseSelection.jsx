import { Link } from 'react-router-dom';
import ArrowRight from '/arrow-right.png';

function CourseSelection(){
    return(
        <main className='py-9 font-Raleway px-4 h-screen flex justify-center'>
            <div className='w-full md:max-w-96'>
                <h1 className='font-bold text-3xl my-4'>Select a Course</h1>
                <article>
                    <h4 className='text-darkgrey'>Pre-clinical</h4>
                    <Link to='anatomy'>
                        <div className='flex items-center justify-between w-full mb-3 border-grey border-2 p-2 rounded-lg hover:border-blue'>
                            <div>
                                <h2 className='font-semibold text-lg'>Anatomy</h2>
                                <p className='text-xs'>Topics: 20</p>
                            </div>
                            <div>
                                <img src={ArrowRight} alt='Right arrow' />
                            </div>
                        </div>
                    </Link>
                    <Link to='biochemistry'>
                        <div className='flex items-center justify-between w-full my-3 border-grey border-2 p-2 rounded-lg hover:border-blue'>
                            <div>
                                <h2 className='font-semibold text-lg'>Biochemistry</h2>
                                <p className='text-xs'>Topics: 20</p>
                            </div>
                            <div>
                                <img src={ArrowRight} alt='Right arrow' />
                            </div>
                        </div>
                    </Link>
                    <Link to='physiology'>
                        <div className='flex items-center justify-between w-full my-3 border-grey border-2 p-2 rounded-lg hover:border-blue'>
                            <div>
                                <h2 className='font-semibold text-lg'>Physiology</h2>
                                <p className='text-xs'>Topics: 20</p>
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
                        <div className='flex items-center justify-between w-full mb-3 border-grey border-2 p-2 rounded-lg hover:border-blue'>
                            <div>
                                <h2 className='font-semibold text-lg'>Pathology</h2>
                                <p className='text-xs'>Topics: 20</p>
                            </div>
                            <div>
                                <img src={ArrowRight} alt='Right arrow' />
                            </div>
                        </div>
                    </Link>
                    <Link to='pharmacology'>
                        <div className='flex items-center justify-between w-full my-3 border-grey border-2 p-2 rounded-lg hover:border-blue'>
                            <div>
                                <h2 className='font-semibold text-lg'>Pharmacology</h2>
                                <p className='text-xs'>Topics: 20</p>
                            </div>
                            <div>
                                <img src={ArrowRight} alt='Right arrow' />
                            </div>
                        </div>
                    </Link>
                </article>
                <p>Check back for more courses...</p>
            </div>
        </main>
    )
}

export default CourseSelection;