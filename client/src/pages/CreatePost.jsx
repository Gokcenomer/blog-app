import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { auth } from "../firebase";
import styles from "./CreatePost.module.css";
import useAutosizeTextArea from "../hooks/useAutosizeTextArea";

function CreatePost() {
  const textAreaRef = useRef(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useAutosizeTextArea(textAreaRef.current, body);

  const handleChange = (e) => {
    const val = e.target?.value;

    setBody(val);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const data = {
      title: title,
      body: body,
      createdBy: auth.currentUser.displayName,
    };
    const requestData = JSON.stringify(data);
    try {
      const response = await fetch("http://localhost:3000/api/posts", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: requestData,
      });
      const responseText = await response.text();
      console.log(responseText);
    } catch (ex) {
      console.error("POST error!");
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <form className={styles.form__create_post}>
          <input
            type="text"
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className={styles.textarea}
            onChange={handleChange}
            placeholder="Share your opinion!"
            ref={textAreaRef}
            rows={1}
            value={body}
          ></textarea>
          <button onClick={handleCreatePost} className={styles.button__post}>
            Post!
          </button>
        </form>
      </div>
    </>
  );
}

export default CreatePost;
