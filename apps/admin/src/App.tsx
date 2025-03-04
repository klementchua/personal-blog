import './App.css';
import Header from './components/Header';
import ManagePosts from './components/ManagePosts';
import { useAuth } from './hooks/AuthProvider';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Header />
      {!isAuthenticated ? (
        <h1>Log in to access the admin panel</h1>
      ) : (
        <ManagePosts />
      )}
    </>
  );
}

export default App;
