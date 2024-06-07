import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';

const AuthObserver = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, navigate to the protected route
                navigate("/courseSelection");
            } else {
                // User is signed out, navigate to the login page
                navigate("/login");
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [navigate]);

    return children;
};

export default AuthObserver;
