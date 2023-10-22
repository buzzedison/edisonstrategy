
import { client } from '../api/graphql';

function BlogIndex() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    async function fetchPosts() {
      const query = `
        query {
          posts {
            nodes {
              id
              title
              slug
            }
          }
        }
      `;

      const data = await client.request(query);
      setPosts(data.posts.nodes);
    }

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <a href={`/blog/${post.slug}`}>Read more</a>
        </div>
      ))}
    </div>
  );
}

export default BlogIndex;