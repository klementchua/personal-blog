import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './hooks/AuthProvider.tsx';
import './index.css';
import App from './App.tsx';
import PostContainer from './components/PostContainer/PostContainer.tsx';
import Post from './components/Post.tsx';
import LoginForm from './components/LoginForm.tsx';
import SignUpForm from './components/SignUpForm.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <PostContainer />,
      },
      {
        path: '/posts/:postId',
        element: <Post />,
      },
      {
        path: '/signup',
        element: <SignUpForm />,
      },
      {
        path: '/login',
        element: <LoginForm />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
