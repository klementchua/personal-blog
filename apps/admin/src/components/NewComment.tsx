import { SyntheticEvent, useState } from 'react';
import { useAuth } from '../hooks/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';

type NewCommentProps = {
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
};

function NewComment({ setRerender }: NewCommentProps) {
  const [comment, setComment] = useState('');
  const { token, user, isAuthenticated, checkTokenExpiry } = useAuth();
  const { postId } = useParams();
  const navigate = useNavigate();

  async function submitHandler(e: SyntheticEvent) {
    e.preventDefault();
    const tokenExpired = checkTokenExpiry();
    if (tokenExpired) return navigate('/');

    await fetch(`${import.meta.env.VITE_API_HOST}/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: comment,
        userId: user?.id,
      }),
    });
    setComment('');
    setRerender((prev) => !prev);
  }

  if (!isAuthenticated) return <div>You must be logged in to comment.</div>;

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="comment">Enter your comment here: </label>
          <textarea
            name="comment"
            placeholder="Bananas are yellow..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default NewComment;
