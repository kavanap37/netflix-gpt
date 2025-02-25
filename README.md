1. Create-react-app
2. Tailwind setup- tailwindcss.com website=> documentation for create-react-app framework
3. Router
4. Sign in/ Sign Up : useState and toggle function
5. useRef
6. Form validation:
   - regex
7. Authentication: Firebase
   - Manage Users, Password Authentication: Firebase documentation => Modular API
   - Add auth in firebase.js and use it by importing
8. Deploy: Firebase
9. Redux store: Store user info
   -create appStore
   -create slice(export slice and actions) and add to app store
   -provide store in App.js
   -Action dispatch through firebase onAuthStateChanged()- Added in root level(Body)
10. useNavigate() hook- to navigate to different page
11. Signout: dispatch action is handled by onAuthStateChanged()
12. User name: updateUserInfo()-> Manage User
13. UseSelector()
14. Moving useEffect() which refersh login user info to Header component. WHY? As Body component is a router parent and will not allow navigate to different routes, which is mainly should be done when user login or signup. REMOVE navigation from Login component.
15. Fix redirection of page through URL , when sign out.(Route restriction: Through navigate in authenticate function(onAuthChanged(), bcz everytime when login or logout this function will be called(as Header will be reload everytime) and navigate() in there will be called regardless of URL change))
16. Unsubsribing to onAuthChanged() callback(acts as eventlistener) when unmount Header. Handled through firebase unsubsribe return function
17. Constants file
18. Wrong Photo URL: no need to wrap PHOTO_URL in {}
19. name.current.value not working in Login component. REASON: due to slight differences in component rendering timing or user interaction,if there’s any delay or re-render between the time the user fills in the input and when Firebase’s async chain reads that value, it might end up null if the input unmounts or if the ref is reset. SOLUTION: const variable storage before async function call.
20. TMDB. WHY not netflix api? As API structure can be changed frequently.
21. Render happens twice because of StrictMode, this happens only in development phase not in production build
22. Movie data to redux store
23. Custom Hooks
24. Browse page planning:

- MainContainer
  - VideoBackground
  - VideoTitle
- SecondaryContainer
  - MovieList \* n
    - cards \* n

25. iframe error: JSX Attributes will be in camelcase
26. aspect-video css
27. MovieList, MovieCard
