import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import AdminHeader from "../AdminHeader/AdminHeader";
import styles from "./adminBody.module.css";
import AdminDashboard from "../../tabs/AdminDashboard/AdminDashboard";
import AdminCompanytList from "../../tabs/AdminProductList/AdminCompanyList";
import AdminUserList from "../../tabs//AdminUserList/AdminUserList";
const AdminBody = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState(null);
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
