import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/login.css";
import auth from "../firebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setUser, unsetUser, selectUser } from "../state/reducers/user";

const Login = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginWithGoogle = () => {
    console.log(user);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // const userInfo = result.user;
        const userInfo = {
          name: result.user.displayName,
          email: result.user.email,
        };
        dispatch(setUser(userInfo));
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signup = () => {
    console.log(email + " " + password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const login = () => {
    console.log(email + " " + password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div>
      <div className="loginBox">
        <img
          className="user"
          src="https://i.ibb.co/yVGxFPR/2.png"
          height="100px"
          width="100px"
        ></img>
        <h3>Sign in here {user.name}</h3>
        <div>
          <div className="inputBox">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="uname"
              type="text"
              name="Username"
              placeholder="Username"
            ></input>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="pass"
              type="password"
              name="Password"
              placeholder="Password"
            ></input>
          </div>
          <input onClick={login} type="submit" name="" value="Login"></input>
          <input onClick={signup} type="submit" name="" value="Sign Up"></input>
        </div>
      </div>
    </div>
  );
};

export default Login;
