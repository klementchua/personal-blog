import { useState, useEffect } from 'react';
import type { PostType } from './Post';
import { Link } from 'react-router-dom';

function ManagePosts() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      try {
        const json = await fetch(`${import.meta.env.VITE_API_HOST}/posts`, {
          mode: 'cors',
        }).then((response) => response.json());
        setPosts(json);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getPosts();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    posts.map((post) => {
      return (
        <div key={post.id}>
          <Link to={`posts/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
          <Link to={`posts/${post.id}/comments`}>
            <button>Open Comments</button>
          </Link>
          <div>{post.isPublished ? 'Published' : 'Unpublished'}</div>
        </div>
      );
    })
  );
}

export default ManagePosts;
