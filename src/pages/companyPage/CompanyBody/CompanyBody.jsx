import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import JobPosts from "./JobPosts/JobPosts";
import CompanyProfile from "./CompanyProfile/CompanyProfile";
import styles from './companyBody.module.css'
import clsx from "clsx";

const CompanyBody = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { compID } = useParams();

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
