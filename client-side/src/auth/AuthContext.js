import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';
import { url } from '../utils/tools'

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // State to manage authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch the authentication status from the backend when the component mounts
  useEffect(() => {
    async function checkAuthentication() {
      try {
        const response = await axios.get(`${url}/auth/status`, { withCredentials: true });

        if (response.status === 200) {
          // Assuming your server responds with JSON data like { isAuthenticated: true }
          const data = response.data;
          console.log(' Yes Its Authntcated ')
          console.log(data)
          setIsAdmin(data.isAdmin);
          setIsAuthenticated(data.isAuthenticated);
          // Check if isAuthenticated is true in the response data
        } else {
          console.log(' NOOOOT Authntcated ')
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
        setIsAuthenticated(false);
      }
    }

    checkAuthentication();
  }, []);

  // Function to handle logout
  const logout = async () => {
    try {
      // Send a request to the logout route on the server
      await fetch(`${url}/auth/logout`, {
        credentials: 'include',
      });

      // Reset the authentication status to false
      setIsAuthenticated(false);
      setIsAdmin(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAdmin, isAuthenticated, setIsAdmin, setIsAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}