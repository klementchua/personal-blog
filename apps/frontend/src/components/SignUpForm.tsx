import { useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const defaultFormState = {
  username: '',
  email: '',
  password: '',
};

function SignUpForm() {
  const [formData, setFormData] = useState(defaultFormState);
  const navigate = useNavigate();

  async function submitHandler() {
    try {
      await fetch(`${import.meta.env.VITE_API_HOST}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  }

  function inputHandler(field: string, target: EventTarget) {
    setFormData((formData) => ({
      ...formData,
      [field]: target.value,
    }));
  }

  return (
    <>
      <Header />
      <div>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              name={formData.username}
              onChange={(e) => inputHandler('username', e.target)}
            />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name={formData.email}
              onChange={(e) => inputHandler('email', e.target)}
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name={formData.password}
              onChange={(e) => inputHandler('password', e.target)}
            />
          </div>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </>
  );
}

export default SignUpForm;
