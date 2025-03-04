import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';
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
  const [rerender, setRerender] = useState(false);
  const { postId } = useParams() as { postId: string };
  const { token, isAuthenticated, checkTokenExpiry } = useAuth();
  const navigate = useNavigate();

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
  }, [postId, rerender]);

  const datePublished = post?.datePublished
    ? post.datePublished.slice(0, 10).split('-').reverse().join('/')
    : 'unpublished';
  const dateUpdated = post?.dateUpdated
    ? post.dateUpdated.slice(0, 10).split('-').reverse().join('/')
    : 'unpublished';

  async function handlePublish() {
    const tokenExpired = checkTokenExpiry();
    if (tokenExpired) return navigate('/');

    const publishOrNot = post?.isPublished ? 'unpublish' : 'publish';
    await fetch(
      `${import.meta.env.VITE_API_HOST}/posts/${postId}/${publishOrNot}`,
      {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setRerender((prev) => !prev);
  }

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
      </div>
      <div className="manage-post">
        <button onClick={handlePublish}>
          {post?.isPublished ? 'Unpublish' : 'Publish'}
        </button>
      </div>
    </>
  );
}

export default Post;
