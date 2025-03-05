import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthProvider';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

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
    <header className={styles.headerContainer}>
      <div className={styles.blogLogo}>
        <h1>Thoughts from The Neverland</h1>
      </div>
      <div className={styles.hr} />
      <div className={styles.linksContainer}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.activeNavLink : '')}
        >
          Home
        </NavLink>
        {!isAuthenticated ? (
          <>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? styles.activeNavLink : ''
              }
            >
              Sign up
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? styles.activeNavLink : ''
              }
            >
              Log in
            </NavLink>
          </>
        ) : (
          <NavLink to="/" onClick={clickHandler}>
            Log out
          </NavLink>
        )}
      </div>
      <div className={styles.hr} />
    </header>
  );
}

export default Header;
