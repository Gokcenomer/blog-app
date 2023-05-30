import React, { useState } from "react";
import styles from "./Login.module.css";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
const provider = new GoogleAuthProvider();

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");

  const handleLoginWithGoogle = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };
  const togglePassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  return (
    <>
      <div className={styles.container}>
        <main>
          <h1 className={styles.title}>Login</h1>
          <form action="#">
            <input
              className={styles.input__email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="Email"
            />
            <div className={styles.password__container}>
              <input
                className={styles.input__password}
                onChange={(e) => setPassword(e.target.value)}
                type={passwordType}
                name="password"
                placeholder="Password"
              />
              <button
                onClick={togglePassword}
                className={styles.button__show__password}
              >
                E
              </button>
            </div>
            <Link className={styles.link__forgot__password}>
              Forgot password?
            </Link>
            <button onClick={handleLogin} className={styles.button__login}>
              Log in
            </button>
            <p className={styles.create__account}>
              Don't you have an account?
              <Link
                onClick={() => {
                  navigate("/signup");
                }}
                className={styles.link__signup}
              >
                Signup
              </Link>
            </p>
          </form>
          <div className={styles.line__container}>
            <div className={styles.line}></div>
            <p className={styles.p__gray}>Or</p>
            <div className={styles.line}></div>
          </div>
          <div className={styles.container__google}>
            <button
              onClick={handleLoginWithGoogle}
              className={styles.button__google}
            >
              Log in with Google
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

export default Login;
