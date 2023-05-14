import { BrowserRouter } from "react-router-dom";
import AppRouters from "./AppRouters";
// Styles
import "./App.css";
import Header from "./components/header/Header";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <AppRouters />
      </BrowserRouter>
    </>
  );
}

export default App;
