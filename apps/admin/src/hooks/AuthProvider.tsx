import { createContext, useState, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

type User = {
  id: number;
  username: string;
  email: string;
};

type ContextValue = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: {
    username: string;
    password: string;
  }) => Promise<boolean>;
  logout: () => void;
  checkTokenExpiry: () => boolean | undefined;
};

const AuthContext = createContext<ContextValue>({
  token: null,
  user: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  checkTokenExpiry: () => false,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  async function login(credentials: { username: string; password: string }) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (data.token && data.user.role === 'ADMIN') {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
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
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  }

  function checkTokenExpiry() {
    if (!token) return;

    const decoded = jwtDecode(token);
    if (!decoded.exp || decoded.exp * 1000 < Date.now()) {
      logout();
      return true;
    }
    return false;
  }

  const authContextValue = {
    token,
    isAuthenticated,
    user,
    login,
    logout,
    checkTokenExpiry,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
