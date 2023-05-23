import React from "react";
import JobCard from "../JobCard/JobCard";
import { useState } from "react";
import styles from "./joblist.module.css";
const JobList = () => {
  const [jobs, setJobs] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  return (
    <div className={styles["job-list-wrapper"]}>
      {jobs.map((job , indx) => {
        return <JobCard id={job}/>;
      })}
    </div>
  );
};

export default JobList;
