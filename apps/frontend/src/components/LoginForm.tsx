import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

function LoginForm() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  async function submitHandler(e: SyntheticEvent) {
    e.preventDefault();
    try {
      const success = await login({ username, password });
      if (success) {
        navigate('/');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error(err);
    }
  }

  return (
    <>
      <div>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Log in</button>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>
    </>
  );
}

export default LoginForm;
