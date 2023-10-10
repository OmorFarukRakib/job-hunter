import React, { useEffect, useState } from "react";
import AdminBody from "./components/AdminBody/AdminBody";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import AdminSidebar from "./components/AdminSidebar/AdminSidebar";
import styles from "./adminPage.module.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import AdminHeader from "./components/AdminHeader/AdminHeader";
const AdminPage = () => {
  const { adminID } = useParams();
  const location = useLocation();
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("JS_userData"))
  );
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Here I will check if jwt token exists or not and depending that i will set loggedIn true/false
    setUserData(JSON.parse(localStorage.getItem("JS_userData")));
    if (userData.success !== true) {
      localStorage.removeItem("JS_userData");
      navigate("/");
    } else {
      if (userData.data.userType !== "Admin") {
        console.log('ata hochche')
        navigate("/");
      }
    }
  }, []);
  return (
    <>
      <div className={styles["adminPage-wrapper"]}>
        <AdminSidebar />
        <AdminBody />
      </div>
      {/* {isLoading === true ? (
        <>LOADING</>
      ) : (
        <>
          {isLoggedIn === true ? (
            <>
              <div className={styles["adminPage-wrapper"]}>
                <AdminSidebar />
                <AdminBody />
              </div>
            </>
          ) : (
            <AdminLogin />
          )}
        </>
      )} */}
    </>
  );
};

export default AdminPage;
