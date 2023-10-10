import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";

import AdminHeader from "../AdminHeader/AdminHeader";
import styles from "./adminBody.module.css";
import AdminDashboard from "../../tabs/AdminDashboard/AdminDashboard";
import AdminCompanytList from "../../tabs/AdminCompanyList/AdminCompanyList";
import AdminUserList from "../../tabs//AdminUserList/AdminUserList";
import AdminJobList from "../../tabs/AdminJobList/AdminJobList";
const AdminBody = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState(null);
const navigate = useNavigate();
const { adminID } = useParams();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("JS_userData"));
    if (userData.data.userID === adminID) {
      console.log("milse");
    } else {
      console.log("mile nai");
      navigate(`/admin/${userData.data.userID}`);
    }
    console.log(adminID);
  }, [adminID]);

  useEffect(() => {
    setSelectedTab(searchParams.get("tab"));
  }, [searchParams]);

  const renderSelectedTab = () => {
    if (selectedTab === "dashboard") {
      return <AdminDashboard />;
    } else if (selectedTab === "companyList") {
      return <AdminCompanytList />;
    } else if (selectedTab === "userList") {
      return <AdminUserList />;
    } else if (selectedTab === "jobList") {
      return <AdminJobList />;
    } else {
      return <>SOMETHING WENT WRONG</>;
    }
  };

  return (
    <div className={styles["adminBody-wrapper"]}>
      <AdminHeader />
      {renderSelectedTab()}
    </div>
  );
};

export default AdminBody;
