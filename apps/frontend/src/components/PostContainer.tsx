import { useState, useEffect } from 'react';
import type { PostType } from './Post';
import { Link } from 'react-router-dom';

function PostContainer() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      try {
        const json = await fetch(`${import.meta.env.VITE_API_HOST}/posts`, {
          mode: 'cors',
        }).then((response) => response.json());
        const publishedPosts = json.filter(
          (post: PostType) => post.isPublished
        );
        setPosts(publishedPosts);
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
        <Link key={post.id} to={`posts/${post.id}`}>
          <h2>{post.title}</h2>
        </Link>
      );
    })
  );
}

export default PostContainer;
