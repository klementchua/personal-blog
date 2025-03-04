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

function Comment({ comment }: { comment: CommentType }) {
  const { user } = useAuth();
  const canManageComment = comment.user.username === user?.username;

  return (
    <div className="comment">
      {comment.user.username}: {comment.content}
      {canManageComment && (
        <div>
          <button>Delete</button>
        </div>
      )}
    </div>
  );
}

export default Comment;
