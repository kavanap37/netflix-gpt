import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validateLogin";
import { auth } from "../utils/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/ReduxStore/userSlice";
import { USER_AVATAR, proper_error_message } from "../utils/Constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  // const navigate = useNavigate();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };
  const handleButtonClick = () => {
    if (!isSignInForm && !name.current.value.trim()) {
      setErrorMessage("Display name cannot be empty.");
      return;
    }
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    // Manage User
    if (message) return;
    if (!isSignInForm) {
      // Signup Logic
      // console.log(isSignInForm);
      const nameValue = name.current.value; //name.current.value was turning null after createUserWithEmailAndPassword() call
      // console.log(nameValue);
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // console.log(userCredential);
          const user = userCredential.user;
          // console.log("BEFORE USER UPDATE");
          // console.log(user);
          // console.log(USER_AVATAR);
          // console.log("name: "+ name);

          updateProfile(user, {
            displayName: nameValue,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              // console.log("UPDATE PROFILE"+ auth.currentUser);
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // console.log("UPDATE_PROFILE"+error.message);
              setErrorMessage("Failed to update profile: " + error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          //const errorMessage = error.message;
          const errorMessage = proper_error_message(errorCode, error.message);
          // console.log("AFTER_UPDATE_PROFILE"+error.message);
          // setErrorMessage(errorCode + "-" + errorMessage);
          setErrorMessage(errorMessage);
        });
    } else {
      //SignIn logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          // const user = userCredential.user;
          // console.log(user);
          // navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = proper_error_message(errorCode, error.message);
          setErrorMessage(errorMessage);
        });
    }
  };
  const handleDemoLogin = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        "name@gmail.com",
        "Name@gmail.123"
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = proper_error_message(errorCode, error.message);
      setErrorMessage(errorMessage);
    }
  };
  return (
    <>
      <Header />
      <div className="loginscreen-bg flex justify-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className=" bg-black bg-opacity-80 mt-[15%]  relative md:m-auto p-8 md:w-[50%] w-[90%] text-white"
        >
          <h1 className="font-bold text-2xl mt-4 mb-2">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="p-4 my-4 w-full bg-gray-700"
            />
          )}
          <input
            type="text"
            ref={email}
            placeholder="Email Address"
            className="p-4 my-4 w-full bg-gray-700"
          />
          <input
            type="password"
            ref={password}
            placeholder="Password"
            className="p-4 my-4 w-full bg-gray-700"
          />

          <p className="text-red-500 font-semibold">{errorMessage}</p>
          {!isSignInForm && (
            <small className="text-gray-400">
              <strong>Password Rules:</strong>
              <ul className="list-disc pl-5">
                <li>Should be at least 8 characters long.</li>
                <li>Should contain at least one uppercase letter.</li>
                <li>Should contain at least one lowercase letter.</li>
                <li>Should contain at least one number</li>
              </ul>
            </small>
          )}
          <button
            className="p-4 my-6 bg-[#9D00FF] w-full rounded-lg"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <>
            {isSignInForm ? (
              <>
                New?{" "}
                <span
                  onClick={toggleSignInForm}
                  className="cursor-pointer text-blue-500"
                >
                  Sign Up Now
                </span>
                <div className="flex flex-col w-full max-w-full">
                  <span className="text-base font-semibold text-white mb-2">
                    <strong>Use button below to check out project</strong>
                  </span>
                  <button
                    className="p-4 my-6 bg-[#9D00FF] w-full rounded-lg"
                    onClick={handleDemoLogin}
                  >
                    Demo Login
                  </button>
                </div>
              </>
            ) : (
              <>
                Already registered?{" "}
                <span
                  onClick={toggleSignInForm}
                  className="cursor-pointer text-blue-500"
                >
                  Sign In Now
                </span>
              </>
            )}
          </>
        </form>
      </div>
    </>
  );
};

export default Login;
