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
  return (
    <div className="comment">
      {comment.user.username}: {comment.content}
    </div>
  );
}

export default Comment;
