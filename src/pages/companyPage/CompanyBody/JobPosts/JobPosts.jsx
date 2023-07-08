import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styles from "./jobPosts.module.css";
import clsx from "clsx";
import JobPostCreate from "./components/jobPostCreate/JobPostCreate";
import JobPostsShowingComp from "./components/jobPostsShowingComp/JobPostsShowingComp";
import { useEffect } from "react";
import { useState } from "react";
import JobDetails from "./components/JobDetails/JobDetails";
const JobPosts = () => {
  const { compID } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobId, setJobId] = useState(null);
  useEffect(() => {
    if (searchParams.get("jobId")) {
      setJobId(searchParams.get("jobId"));
    } else {
      setJobId(null);
    }
  }, [searchParams]);

  return (
    <div className={clsx(styles["job-posts-wrapper"])}>
      {jobId === null ? (
        <>
          <JobPostCreate />
          <JobPostsShowingComp />
        </>
      ) : (
        <div>
          <JobDetails jobID={jobId} />
        </div>
      )}
    </div>
  );
};

export default JobPosts;
