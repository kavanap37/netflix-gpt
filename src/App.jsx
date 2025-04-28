import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/ReduxStore/appStore";
import Footer from "./components/Footer";
function App() {
  return (
    <Provider store={appStore}>
      <Body />
      <Footer />
    </Provider>
  );
}

export default App;
