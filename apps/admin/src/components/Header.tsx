import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function clickHandler() {
    try {
      logout();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <button>
        <Link to="/">Home</Link>
      </button>
      {!isAuthenticated ? (
        <button>
          <Link to="/login">Log in</Link>
        </button>
      ) : (
        <button onClick={clickHandler}>Log Out</button>
      )}
    </div>
  );
}

export default Header;
