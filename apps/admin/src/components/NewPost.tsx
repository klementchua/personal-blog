import { SyntheticEvent, useState } from 'react';
import { useAuth } from '../hooks/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { token, user, checkTokenExpiry } = useAuth();
  const navigate = useNavigate();

  async function submitHandler(e: SyntheticEvent) {
    e.preventDefault();
    const tokenExpired = checkTokenExpiry();
    if (tokenExpired) return navigate('/');

    await fetch(`${import.meta.env.VITE_API_HOST}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        content,
        userId: user?.id,
      }),
    });

    navigate('/');
  }

  return (
    <div>
      <Header />
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <textarea
            name="content"
            placeholder="enter content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewPost;
