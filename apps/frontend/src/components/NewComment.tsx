import { SyntheticEvent, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useParams } from 'react-router-dom';

type CommentProps = {
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
};

function NewComment({ setRerender }: CommentProps) {
  const [comment, setComment] = useState('');
  const { token, user, isAuthenticated } = useAuth();
  const { postId } = useParams();

  async function submitHandler(e: SyntheticEvent) {
    e.preventDefault();
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
