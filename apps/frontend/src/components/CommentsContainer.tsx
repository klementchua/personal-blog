import { useEffect, useState } from 'react';
import { CommentType } from './Comment';
import { useParams } from 'react-router-dom';
import Comment from './Comment';

function CommentsContainer() {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentsIsLoading, setCommentsIsLoading] = useState(true);
  const { postId } = useParams() as { postId: string };

  useEffect(() => {
    async function getComments(postId: number) {
      try {
        const json = await fetch(
          `${import.meta.env.VITE_API_HOST}/posts/${postId}/comments`,
          {
            mode: 'cors',
          }
        ).then((response) => response.json());
        setComments(json);
        setCommentsIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getComments(parseInt(postId));
  }, [postId]);

  return (
    <div className="comments-container">
      {commentsIsLoading ? (
        <div>Loading comments...</div>
      ) : (
        comments.map((comment) => {
          return <Comment comment={comment} key={comment.id} />;
        })
      )}
    </div>
  );
}

export default CommentsContainer;
