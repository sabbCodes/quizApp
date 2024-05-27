import { createContext, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Add PropTypes validation
UserProvider.propTypes = {
    children: PropTypes.node // Validate children prop
};
