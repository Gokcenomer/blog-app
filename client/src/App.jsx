import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import styles from "./App.module.css";

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/posts");
      const jsonData = await response.json();
      setPosts(jsonData);
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </>
  );
}

export default App;
