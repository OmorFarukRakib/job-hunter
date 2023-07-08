import React from "react";
import styles from "./jobPostsShowingComp.module.css";
import clsx from "clsx";
import JobList from "../JobList/JobList"

const JobPostsShowingComp = () => {
  return (
    <div className={clsx(styles["jobPostsShowingComp-wrapper"])}>
      <h3 className={clsx(styles["jobPostsShowingComp-header"])}>
        All Job Lists
      </h3>
      <JobList/>
    </div>
  );
};

export default JobPostsShowingComp;
