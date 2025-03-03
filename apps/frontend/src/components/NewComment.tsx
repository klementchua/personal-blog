import { SyntheticEvent, useState } from 'react';
import { useAuth } from '../context/AuthProvider';

function NewComment() {
  const [comment, setComment] = useState('');
  const { user, isAuthenticated } = useAuth();

  function submitHandler(e: SyntheticEvent) {
    e.preventDefault();
  }

  if (!isAuthenticated) return <div>You must be logged in to comment.</div>;
  console.log(user);

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
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewComment;
