// import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import logoImg from "../../../public/jobsearch.jpeg";
// import logoImg from "../../../public/jobhunter.png";
import clsx from "clsx";
import SigninModal from "../signinModal/SigninModal";
import { useEffect } from "react";
import AccountMenuForCompany from "../AccountMenuForCompany/AccountMenuForCompany";
import AccountMenuForUser from "../AccountMenuForUser/AccountMenuForUser";
const Header = () => {
  const [signinModalShow, setsigninModalShow] = useState(false);
  const navigate = useNavigate();
  let { pathname } = useLocation();

  pathname = pathname.replace(/\//g, "").replace(/\//g, "");
  console.log(pathname);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    // console.log(data);
  }, []);

  return (
    <>
      <SigninModal
        show={signinModalShow}
        onHide={() => setsigninModalShow(false)}
      />
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
          {localStorage.getItem("authToken") === "token" ? (
            <AccountMenuForCompany />
          ) : (
            <>
              {localStorage.getItem("authToken") === "userToken" ? (
                <AccountMenuForUser/>
              ) : (
                <div
                  className={clsx(styles["header-menu-btn"])}
                  onClick={() => setsigninModalShow(true)}
                >
                  Sign in/Registration
                </div>
              )}
            </>
          )}
        </div>
      </header>
    </>
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
