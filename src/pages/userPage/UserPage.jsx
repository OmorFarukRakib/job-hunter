import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import UserBody from './UserBody/UserBody'
import UserSidebar from './UserSidebar/UserSidebar'
import styles from './userPage.module.css'
import clsx from "clsx";
import { useEffect, useState } from "react";


const UserPage = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const mySearchParam = searchParams.get("search");
  // const { userID } = useParams();
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("JS_userData"))
  );
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(compID);
    // const currentRoute = location.pathname;
    // console.log("current route", location.currentRoute);

    setUserData(JSON.parse(localStorage.getItem("JS_userData")));
    if (userData.success !== true) {
      localStorage.removeItem("JS_userData");
      navigate("/");
    }
    if (userData.data.userType !== "Employee") {
      navigate("/");
    }
  }, []);
  return (
    <div className={clsx(styles['userPage-wrapper'])}>
      <UserSidebar/>
      <UserBody/>
    </div>
  );
};

export default UserPage;
