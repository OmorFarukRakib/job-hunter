import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import CompanySidebar from "./CompanySidebar/CompanySidebar";
import CompanyBody from "./CompanyBody/CompanyBody";
import clsx from "clsx";
import styles from "./companyPage.module.css";
const CompanyPage = () => {
  const { compID } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (
      searchParams.get("tab") !== "job-posts" &&
      searchParams.get("tab") !== "profile"
    ) {
      setSearchParams({
        ...searchParams,
        tab: "job-posts",
      });
    }
  }, []);

  console.log("on Company page", searchParams.get("tab"));
  return (
    <div className={clsx(styles["companyPage-wrapper"])}>
      <CompanySidebar />
      <CompanyBody />
    </div>
  );
};

export default CompanyPage;
