import React, { useState } from "react";
import styles from "./SignUp.module.css";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
const provider = new GoogleAuthProvider();

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
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
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;

        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const passwordValidation = () => {
    if (password == confirmPassword) return true;
    return false;
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!passwordValidation()) return;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        updateProfile(user, { displayName: username });
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn(errorCode, errorMessage);
      });
  };

  const [passwordType, setPasswordType] = useState("password");
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
          <h1 className={styles.title}>Signup</h1>
          <form action="#">
            <input
              className={styles.input__email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="Email"
            />
            <input
              className={styles.input__username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              name="username"
              placeholder="Username"
            />
            <input
              className={styles.input__password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="Password"
            />
            <div className={styles.password__container}>
              <input
                className={styles.input__password}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={passwordType}
                name="password"
                placeholder="Confirm Password"
              />
              <button
                onClick={togglePassword}
                className={styles.button__show__password}
              >
                E
              </button>
            </div>

            <button onClick={handleSignUp} className={styles.button__login}>
              Signup
            </button>
            <p className={styles.create__account}>
              Already have an account?
              <Link className={styles.link__signup}>Login</Link>
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

export default SignUp;
