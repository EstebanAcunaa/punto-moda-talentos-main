import { createContext, useContext, useState, useEffect } from 'react';
import { userAPI } from '../services/api';

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser debe ser usado dentro de UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Cargar usuario desde localStorage al montar
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (err) {
                console.error('Error parsing stored user:', err);
                localStorage.removeItem('user');
            }
        }
    }, []);

    const login = async (userData) => {
        setLoading(true);
        setError(null);

        try {
            // TODO: Implementar autenticación real
            // Por ahora solo guardamos el usuario en el estado
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return true;
        } catch (err) {
            setError(err.message);
            console.error('Error logging in:', err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const register = async (userData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await userAPI.create(userData);
            const newUser = response.data;

            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
            return true;
        } catch (err) {
            setError(err.message);
            console.error('Error registering:', err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (userData) => {
        if (!user) return false;

        setLoading(true);
        setError(null);

        try {
            const response = await userAPI.update(user.id, userData);
            const updatedUser = response.data;

            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            return true;
        } catch (err) {
            setError(err.message);
            console.error('Error updating user:', err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        logout,
        register,
        updateUser,
        isAuthenticated: !!user
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
