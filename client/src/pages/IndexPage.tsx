import Post from "./Post";
import { useEffect } from "react";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        console.log(posts);
      });
    });
  }, []);
  return <>{posts.legnth > 0 && posts.map((post) => <Post {...post} />)}</>;
}
