import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './hooks/AuthProvider.tsx';
import './index.css';
import App from './App.tsx';
import LoginForm from './components/LoginForm.tsx';
import Post from './components/Post.tsx';
import CommentsContainer from './components/CommentsContainer.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/posts/:postId',
    element: <Post />,
  },
  {
    path: '/posts/:postId/comments',
    element: <CommentsContainer />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
