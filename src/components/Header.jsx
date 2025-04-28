import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/ReduxStore/userSlice";
import { SUPPORTED_LANGUAGES } from "../utils/Constants";
import { toggleGptSearchView } from "../utils/ReduxStore/gptSlice";
import { changeLanguage } from "../utils/ReduxStore/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, []);
  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute flex flex-col md:flex-row items-center w-full px-4 md:px-8 py-2  z-50 justify-between bg-transparent shadow-none">
      <div className="bg-black/60 px-4 py-2 rounded-lg">
        <h1 className="text-[#9D00FF] text-3xl md:text-6xl font-bold drop-shadow-[0_0_10px_#9D00FF] tracking-wider">
          Fliksy
        </h1>
      </div>
      {user && (
        <div className="flex items-center space-x-6 mt-4 md:mt:0">
          {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={handleGptSearchClick}
            className="py-2 px-4 mx-4 my-2 bg-[#9D00FF] text-white hover:shadow-[0_0_15px_#B84DFF] rounded-lg font-bold transition duration-300 ease-in-out"
          >
            {" "}
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <div className="flex items-center space-x-3">
            <img
              className="w-9 h-9 md:w-9 md:h-9 rounded-lg border-2 bg-[#C084FC] shadow-md"
              src={user?.photoURL}
              alt="user-icon"
            />
            <button onClick={handleSignOut} className="font-bold text-white ">
              Signout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
