import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentsContainer from './CommentsContainer';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import Header from './Header';

export type PostType = {
  id: number;
  title: string;
  content: string;
  datePublished: string | null;
  dateUpdated: string | null;
  isPublished: boolean;
  userId: number;
};

function Post() {
  const [post, setPost] = useState<PostType>();
  const [isLoading, setIsLoading] = useState(true);
  const { postId } = useParams() as { postId: string };
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    async function getPost(postId: number) {
      try {
        const json = await fetch(
          `${import.meta.env.VITE_API_HOST}/posts/${postId}`,
          {
            mode: 'cors',
          }
        ).then((response) => response.json());
        setPost(json);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getPost(parseInt(postId));
  }, [postId]);

  const datePublished = post?.datePublished
    ? post.datePublished.slice(0, 10).split('-').reverse().join('/')
    : 'unpublished';
  const dateUpdated = post?.dateUpdated
    ? post.dateUpdated.slice(0, 10).split('-').reverse().join('/')
    : 'unpublished';

  if (!isAuthenticated) {
    return (
      <div>
        You are not allowed to access this page.
        <br />
        <Link to="/">Home</Link>
      </div>
    );
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <Header />
      <div className="blog-post">
        <div className="post-container">
          <h1>{post?.title}</h1>
          <p>
            Published on {datePublished}, last updated on {dateUpdated}
          </p>
          <hr />
          <p>{post?.content}</p>
          <hr />
        </div>
        <CommentsContainer />
      </div>
    </>
  );
}

export default Post;
