import React from "react";
import styles from "./jobAppliedShowingComp.module.css";
import clsx from "clsx";
import JobList from "../JobList/JobList";

const JobAppliedShowingComp = () => {
  return (
    <div className={clsx(styles["jobAppliedShowingComp-wrapper"])}>
      <h3 className={clsx(styles["jobAppliedShowingComp-header"])}>
        All Applied Job List
      </h3>
      <JobList />
    </div>
  );
};

export default JobAppliedShowingComp;
