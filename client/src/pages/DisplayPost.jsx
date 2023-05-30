import React from "react";
import { useState, useEffect, useRef } from "react";
import styles from "./DisplayPost.module.css";
import { transformDate } from "../utilities/transformDate";
import { useNavigate, useParams } from "react-router-dom";
import useAutosizeTextArea from "../hooks/useAutosizeTextArea";
import Navbar from "../components/Navbar";

function DisplayPost() {
  const [isEditing, setIsEditing] = useState(false);
  const [post, setPost] = useState([]);
  const [body, setBody] = useState("");

  const navigate = useNavigate();
  let params = useParams();
  const textAreaRef = useRef(null);

  useAutosizeTextArea(textAreaRef.current, body);

  const handleChange = (e) => {
    const val = e.target?.value;

    setBody(val);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/api/posts/${params.id}`
      );
      const jsonData = await response.json();
      setPost(jsonData);
      setBody(jsonData.body);
    };
    fetchData();
  }, []);

  const updatePost = async () => {
    const data = {
      body: body,
    };
    const requestData = JSON.stringify(data);
    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${params.id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: requestData,
        }
      );
      const responseText = await response.text();
      setIsEditing(false);
      navigate("/");
      console.log(responseText);
    } catch (ex) {
      console.error("POST error!");
    }
  };

  const deletePost = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${params.id}`,
        {
          method: "DELETE",
        }
      );
      const responseText = await response.text();
      navigate("/");
      console.log(responseText);
    } catch (ex) {
      console.error("POST error!");
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header__container}>
          <h3 className={styles.title}>{post.title}</h3>
          <div className={styles.button__container}>
            {isEditing ? (
              <button onClick={updatePost}>Save</button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className={styles.button__edit}
              >
                Edit
              </button>
            )}
            <button onClick={deletePost} className={styles.button__delete}>
              X
            </button>
          </div>
        </div>

        <div className={styles.body__container}>
          <textarea
            className={styles.textarea}
            onChange={handleChange}
            placeholder="Share your opinion!"
            ref={textAreaRef}
            rows={1}
            value={isEditing ? body : post.body}
          ></textarea>
        </div>
        <p className={styles.createdBy}>@{post.createdBy}</p>
        <p className={styles.createdAt}>{transformDate(post.createdAt)}</p>
      </div>
    </>
  );
}

export default DisplayPost;
