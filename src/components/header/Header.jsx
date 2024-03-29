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
import AccountMenuForAdmin from "../AccountMenuForAdmin/AccountMenuForAdmin";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
const Header = () => {
  const [signinModalShow, setsigninModalShow] = useState(false);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("JS_userData"))
  );
  const navigate = useNavigate();
  let { pathname } = useLocation();

  pathname = pathname.replace(/\//g, "").replace(/\//g, "");
  console.log(pathname);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("JS_userData")));
  }, [localStorage.getItem("JS_userData")]);

  const renderUserMenu = (userData) => {
    if (userData.data.userType === "Company") {
      return <AccountMenuForCompany />;
    } else if (userData.data.userType === "Employee") {
      return <AccountMenuForUser />;
    } else if (userData.data.userType === "Admin") {
      return <AccountMenuForAdmin />;
    }
  };
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
          {pathname !== "" && (
            <div
              className={clsx(
                pathname == "" ? [styles["header-menu-btn-active"]] : null,
                styles["header-menu-btn"]
              )}
              // onClick={() => navigate("/")}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
                to={"/"}
              >
                <Typography variant="h6" color="#643393">
                  HOME
                </Typography>
              </Link>
            </div>
          )}

          {/* <div
            className={clsx(
              pathname == "jobs" ? [styles["header-menu-btn-active"]] : null,
              styles["header-menu-btn"]
            )}
            // onClick={() => navigate("/jobs")}
          >
            <Link
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
              to={"/jobs"}
            >
              Find Jobs
            </Link>
          </div> */}
        </div>
        <div className={clsx(styles["header-menu-wrapper"])}>
          {userData?.success === true ? (
            <>{renderUserMenu(userData)}</>
          ) : (
            <>
              <Button
                sx={{
                  padding: "0.7rem",
                  borderRadius: "20px",
                  background: "#F6953F",
                  // background: "rgb(246,149,63)",
                  // background: "linear-gradient(90deg, rgba(246,149,63,1) 0%, rgba(100,51,147,1) 65%)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#f6943fbc",

                    borderColor: "#0062cc",
                    boxShadow: "none",
                  },
                }}
                onClick={() => setsigninModalShow(true)}
              >
                Sign in / Sign up
              </Button>
              {/* <div
                className={clsx(styles["header-menu-btn"])}
                onClick={() => setsigninModalShow(true)}
              >
                Sign in/Registration
              </div> */}
            </>
          )}
          {/* {localStorage.getItem("authToken") === "token" ? (
            <AccountMenuForCompany />
          ) : (
            <>
              {localStorage.getItem("authToken") === "userToken" ? (
                <AccountMenuForUser />
              ) : (
                <div
                  className={clsx(styles["header-menu-btn"])}
                  onClick={() => setsigninModalShow(true)}
                >
                  Sign in/Registration
                </div>
              )}
            </>
          )} */}
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
