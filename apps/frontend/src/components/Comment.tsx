import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

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
  const { token, user, checkTokenExpiry } = useAuth();
  const navigate = useNavigate();
  const canManageComment = comment.user.username === user?.username;

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

  return (
    <div className="comment">
      {comment.user.username}: {comment.content}
      {canManageComment && (
        <div>
          <button onClick={deleteHandler}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default Comment;
