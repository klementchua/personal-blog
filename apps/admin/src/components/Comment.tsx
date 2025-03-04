import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

export type CommentType = {
  id: number;
  content: string;
  dateTimePublished: string;
  dateUpdated: string | null;
  postId: number;
  userId: number;
  user: {
    username: string;
  };
};

type CommentProps = {
  comment: CommentType;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
};

function Comment({ comment, setRerender }: CommentProps) {
  const [commentContent, setCommentContent] = useState(comment.content);
  const [isEditing, setIsEditing] = useState(false);

  const { token, checkTokenExpiry } = useAuth();
  const navigate = useNavigate();

  async function deleteHandler() {
    const tokenExpired = checkTokenExpiry();
    if (tokenExpired) return navigate('/');

    await fetch(
      `${import.meta.env.VITE_API_HOST}/posts/${comment.postId}/comments/${
        comment.id
      }`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setRerender((prev) => !prev);
  }

  async function submitHandler() {
    const tokenExpired = checkTokenExpiry();
    if (tokenExpired) return navigate('/');

    await fetch(
      `${import.meta.env.VITE_API_HOST}/posts/${comment.postId}/comments/${
        comment.id
      }`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: commentContent,
        }),
      }
    );
    setRerender((prev) => !prev);
  }

  return (
    <div className="comment">
      {comment.user.username}:
      {!isEditing ? (
        commentContent
      ) : (
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      )}
      <div>
        <button onClick={deleteHandler}>Delete</button>
        <button onClick={() => setIsEditing((prev) => !prev)}>Edit</button>
      </div>
    </div>
  );
}

export default Comment;
