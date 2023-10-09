import React, { useEffect, useState } from "react";
import {
  useParams,
  useSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";

import CompanySidebar from "./CompanySidebar/CompanySidebar";
import CompanyBody from "./CompanyBody/CompanyBody";
import clsx from "clsx";
import styles from "./companyPage.module.css";
const CompanyPage = () => {
  const { compID } = useParams();
  const location = useLocation();
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
    if (userData.data.userType === "Employee") {
      navigate("/");
    }
  }, []);
  // const [searchParams, setSearchParams] = useSearchParams();
  // useEffect(() => {
  //   if (
  //     searchParams.get("tab") !== "job-posts" &&
  //     searchParams.get("tab") !== "profile"
  //   ) {
  //     setSearchParams({
  //       ...searchParams,
  //       tab: "job-posts",
  //     });
  //   }
  // }, []);

  // console.log("on Company page", searchParams.get("tab"));
  return (
    <div className={clsx(styles["companyPage-wrapper"])}>
      <CompanySidebar />
      <CompanyBody />
    </div>
  );
};

export default CompanyPage;
