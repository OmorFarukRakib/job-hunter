import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styles from "./jobApplied.module.css";
import clsx from "clsx";
// import JobPostCreate from "./components/jobPostCreate/JobPostCreate";
// import JobPostsShowingComp from "./components/jobPostsShowingComp/JobPostsShowingComp";
import JobAppliedShowingComp from "./components/JobAppliedShowingComp/JobAppliedShowingComp";
import { useEffect } from "react";
import { useState } from "react";
import JobDetails from "./components/JobDetails/JobDetails";
const JobApplied = () => {
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
    <div className={clsx(styles["job-applied-wrapper"])}>
      {jobId === null ? (
        <>
          {/* <div>MY APPLIED JOB LIST</div> */}
          {/* <JobPostsShowingComp /> */}
          <JobAppliedShowingComp/>
        </>
      ) : (
        <div>
            {/* Indi Job details */}
          <JobDetails jobID={jobId} />
        </div>
      )}
    </div>
  );
};

export default JobApplied;
