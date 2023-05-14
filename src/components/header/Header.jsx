// import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import logoImg from "../../../public/jobhunter.png";
import clsx from "clsx";

const Header = () => {
  const navigate = useNavigate()
  let { pathname } = useLocation();

  pathname = pathname.replace(/\//g, "").replace(/\//g, "");
  console.log(pathname);

  return (
    <header className={clsx(styles["header-wrapper"])}>
      <div className={clsx(styles["header-menu-wrapper"])}>
        <div className={clsx(styles["header-logo-wrapper"])}>
          <img src={logoImg} alt="My Image" />
        </div>
        <div
          className={clsx(
            pathname == "" ? [styles["header-menu-btn-active"]] : null,
            styles["header-menu-btn"]
          )}
          onClick={() => navigate("/")}
        >
          Home
        </div>
        <div
          className={clsx(
            pathname == "jobs" ? [styles["header-menu-btn-active"]] : null,
            styles["header-menu-btn"]
          )}
          onClick={() => navigate("/jobs")}
        >
          Find Jobs
        </div>
      </div>
      <div className={clsx(styles["header-menu-wrapper"])}>
        <div className={clsx(styles["header-menu-btn"])}>Sign in</div>
        {/* <div>Settings</div> */}
      </div>
    </header>
  );
};

export default Header;

{
  /* <ul>
  <li>
    <Link to="/">Home</Link>
  </li>
  <li>
    <Link to="/about">About</Link>
  </li>
  <li>
    <Link to="/jobs">Jobs</Link>
  </li>
  <li>
    <Link to="/user/1223">User1223</Link>
  </li>
  <li>
    <Link to="/user/3333?search=okok">User3333</Link>
  </li>
  <li>
    <Link to="/employer">Employer</Link>
  </li>
  <li>
    <Link to="/employer/123123">Employer121233</Link>
  </li>
</ul>; */
}
