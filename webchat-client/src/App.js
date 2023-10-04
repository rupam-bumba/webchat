import jsCookie from "js-cookie";
import Template from "./Template";
import Entry from "./entry/Entry";
import AppBar from "./components/AppBar";


function App() {
  console.log(process.env.REACT_APP_BASE_URL);

  let isLogin = jsCookie.get("isLogin");

  return isLogin ? (
    <>
      <AppBar />
      <Template />
    </>
  ) : (
    <>
      <Entry />
    </>
  );
}

export default App;
