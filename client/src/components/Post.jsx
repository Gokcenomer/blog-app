import React from "react";
import styles from "./Post.module.css";
import { useNavigate } from "react-router-dom";
import { transformDate } from "../utilities/transformDate";

function Post(props) {
  const navigate = useNavigate();
  const { title, body, id } = props.post;

  const showPost = (title) => {
    navigate(`${title}`);
  };

  return (
    <>
      <div onClick={() => showPost(id)} className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.body__container}>
          <p className={styles.body}>{body}</p>
        </div>
        <p className={styles.createdBy}>@{props.post.createdBy}</p>
        <p className={styles.createdAt}>
          {transformDate(props.post.createdAt)}
        </p>
      </div>
    </>
  );
}

export default Post;
