import React, { useEffect, useState } from "react";
import AdminBody from "./components/AdminBody/AdminBody";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import AdminSidebar from "./components/AdminSidebar/AdminSidebar";
import styles from "./adminPage.module.css";
import AdminHeader from "./components/AdminHeader/AdminHeader";
const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Here I will check if jwt token exists or not and depending that i will set loggedIn true/false
    const jwtExists = true;
    if (jwtExists === true) {
      setIsLoading(true);
      setIsLoading(false);
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  }, []);
  return (
    <>
      {isLoading === true ? (
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
      )}
    </>
  );
};

export default AdminPage;
