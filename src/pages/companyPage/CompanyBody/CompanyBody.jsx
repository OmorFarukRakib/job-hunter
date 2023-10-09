import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import JobPosts from "./JobPosts/JobPosts";
import CompanyProfile from "./CompanyProfile/CompanyProfile";
import styles from './companyBody.module.css'
import clsx from "clsx";
import { useEffect } from "react";

const CompanyBody = () => {
  const [searchParams, setSearchParams] = useSearchParams();
   const navigate = useNavigate()
  const { compID } = useParams();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("JS_userData"));
    if (userData.data.userID === compID) {
      console.log("milse");
    } else {
      console.log("mile nai");
      navigate(`/company/${userData.data.userID}`);
    }
    console.log(compID)
  }, [compID]);

  return (
    <div className={clsx(styles['companyBody-wrapper'])}>
      {searchParams.get("tab") === "profile" ? (
        <CompanyProfile />
      ) : (
        <JobPosts />
      )}
    </div>
  );
};

export default CompanyBody;
