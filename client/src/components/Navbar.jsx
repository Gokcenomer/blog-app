import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import styles from "./Navbar.module.css";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);
  const handleCreatePost = () => {
    navigate("/createpost");
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {});
  };
  return (
    <nav className={styles.navbar}>
      <header>
        <h1 onClick={() => navigate("/")} className={styles.title}>
          Blog
        </h1>
      </header>
      {isAuth ? (
        <div className={styles.container}>
          <button onClick={handleCreatePost}> + </button>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : null}
    </nav>
  );
}

export default Navbar;
