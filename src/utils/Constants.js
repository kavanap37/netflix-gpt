export const LOGO =
"https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";


export const USER_AVATAR =
  "https://occ-0-4994-2186.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png";

// export const BG_URL="https://assets.nflxext.com/ffe/siteui/vlv3/0cf2c109-3af1-4a9d-87d7-aecfac5fe881/web/IN-en-20250217-TRIFECTA-perspective_c3376e06-9aff-4657-aafb-91256a597b7c_large.jpg"

export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: "Bearer "+ process.env.REACT_APP_TMDB_KEY, 
  }
};
export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";

export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "spanish", name: "Spanish" },
];

export const OPENAI_KEY=process.env.REACT_APP_OPENAI_KEY;
export const GEMINIAI_KEY=process.env.REACT_APP_GEMINI_KEY;
export const proper_error_message=(errorCode, defaultMessage)=>{
  //Managing all firebase error with proper user understandable message
  const errorMessages = {
    "auth/email-already-in-use": "This email is already registered.",
    "auth/invalid-credential":
      "Invalid credentials. Please check your login details or try signing in again.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/weak-password": "Password should be at least 8 characters.",
    "auth/user-disabled":
      "This account has been disabled by the administrator.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/network-request-failed":
      "Network error. Please check your connection.",
    "auth/too-many-requests":
      "Too many attempts. Please try again later or reset your password.",
    "auth/operation-not-allowed": "Sign-in is disabled for this account.",
  };
  return errorMessages[errorCode] || defaultMessage;
}