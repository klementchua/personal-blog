import { createContext, useState } from 'react';

type ContextValue = {
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: {
    username: string;
    password: string;
  }) => Promise<boolean>;
  logout: () => void;
};

export const AuthContext = createContext<ContextValue>(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  async function login(credentials: { username: string; password: string }) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    }
  }

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
  }

  const authContextValue = { token, isAuthenticated, login, logout };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
