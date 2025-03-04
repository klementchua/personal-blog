import { useEffect, useState } from 'react';
import Comment, { CommentType } from './Comment';
import { useParams } from 'react-router-dom';
import NewComment from './NewComment';
import Header from './Header';

function CommentsContainer() {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentsIsLoading, setCommentsIsLoading] = useState(true);
  const [rerender, setRerender] = useState(false);
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
  }, [postId, rerender]);

  return (
    <>
      <Header />
      <div className="comments-container">
        <NewComment setRerender={setRerender} />
        {commentsIsLoading ? (
          <div>Loading comments...</div>
        ) : (
          comments.map((comment) => {
            return (
              <Comment
                comment={comment}
                setRerender={setRerender}
                key={comment.id}
              />
            );
          })
        )}
      </div>
    </>
  );
}

export default CommentsContainer;
