import { BrowserRouter } from "react-router-dom";
import AppRouters from "./AppRouters";
import { Routes, Route } from "react-router-dom";
// Styles
import styles from "./App.module.css";
import Header from "./components/header/Header";
function App() {
  return (
    <>
      <BrowserRouter>
        <div className={styles["app-wrapper"]}>
          <Header />
          <div className={styles["route-wrapper"]}>
            <AppRouters />
          </div>
        </div>
        
      </BrowserRouter>
    </>
  );
}

export default App;
