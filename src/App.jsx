import { BrowserRouter } from "react-router-dom";
import AppRouters from "./AppRouters";
import { Routes, Route } from "react-router-dom";

// routes
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import NotFound from "./pages/notFound/NotFound";
import Jobs from "./pages/jobs/Jobs";
import Employer from "./pages/employer/Employer";
import User from "./pages/user/User";
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
