import React, { useState, useRef } from 'react'
import Header from './Header'
import { checkValidData } from "../utils/validateLogin";
import { auth } from "../utils/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_URL, USER_AVATAR } from '../utils/Constants';


const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  // const navigate = useNavigate();
  const dispatch=useDispatch();
  const toggleSignInForm = () => {
      setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    // Manage User
    if (message) return;
    if (!isSignInForm) {
      // Signup Logic
      // console.log(isSignInForm);
      const nameValue=name.current.value; //name.current.value was turning null after createUserWithEmailAndPassword() call
      // console.log(nameValue);
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
        
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
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // console.log("AFTER_UPDATE_PROFILE"+error.message);
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
    else{
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
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  }

  return (
    <div>
     <Header/>
     <div className="absolute">
        <img 
        src={BG_URL}
        // srcset="https://assets.nflxext.com/ffe/siteui/vlv3/0cf2c109-3af1-4a9d-87d7-aecfac5fe881/web/IN-en-20250217-TRIFECTA-perspective_c3376e06-9aff-4657-aafb-91256a597b7c_large.jpg 2000w, https://assets.nflxext.com/ffe/siteui/vlv3/0cf2c109-3af1-4a9d-87d7-aecfac5fe881/web/IN-en-20250217-TRIFECTA-perspective_c3376e06-9aff-4657-aafb-91256a597b7c_medium.jpg 1279w, https://assets.nflxext.com/ffe/siteui/vlv3/0cf2c109-3af1-4a9d-87d7-aecfac5fe881/web/IN-en-20250217-TRIFECTA-perspective_c3376e06-9aff-4657-aafb-91256a597b7c_small.jpg 959w" 
        alt="logo" ></img>
    </div>
    <form 
     onSubmit={(e) => e.preventDefault()}
    className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">
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
        
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>

         <button className="p-4 my-6 bg-red-700 w-full rounded-lg"
         onClick={handleButtonClick}
         > 
         {isSignInForm ? "Sign In" : "Sign Up"}
         </button>
         <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now."}
        </p>
    </form>
    </div>
  )
}

export default Login
