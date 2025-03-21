import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentsContainer from '../CommentsContainer';
import styles from './Post.module.css';

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
  const [postContent, setPostContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { postId } = useParams() as { postId: string };

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
        setPostContent(json.content);
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

  return isLoading ? (
    <div className={styles.loading}>
      <h1>Loading...</h1>
    </div>
  ) : (
    <div>
      <div className={styles.postContainer}>
        <h1>{post?.title}</h1>
        <p className={styles.postDates}>
          published on <span>{datePublished}</span>, last updated on{' '}
          <span>{dateUpdated}</span>.
        </p>
        <div
          className={styles.postContent}
          dangerouslySetInnerHTML={{ __html: postContent }}
        ></div>
      </div>
      <div className={styles.hr} />
      <div className={styles.commentsContainer}>
        <CommentsContainer />
      </div>
    </div>
  );
}

export default Post;
