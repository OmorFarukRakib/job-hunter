import React, { useEffect } from "react";
import JobCard from "../JobCard/JobCard";
import { useState } from "react";
import styles from "./joblist.module.css";
import axios from "axios";
import apiConfig from "../../apiConfig";
import { Grid, Typography } from "@mui/material";
import RiseLoader from "react-spinners/RiseLoader";
const JobList = () => {
  const [jobs, setJobs] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [allJobPosts, setAllJobPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const fetchAllJobPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url: apiConfig.baseURL + apiConfig.public.fetchAllJobPosts,
      });
      console.log("all public job posts api res", response);
      const res = response.data;
      if (res.success === true) {
        setAllJobPosts(res.data.jobs);
      } else {
        setErrorMsg("Something Went Wrong! Please Try Again Later!");
      }
    } catch (error) {
      console.log("error from catch");
      setErrorMsg("Something Went Wrong! Please Try Again Later!");
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchAllJobPosts();
  }, []);
  return (
    <>
      {isLoading === true ? (
        <>
          <Grid container justifyContent={"center"} mt={5}>
            <RiseLoader color="#F6953F" />
          </Grid>
        </>
      ) : (
        <>
          <div className={styles["job-list-wrapper"]}>
            {allJobPosts.map((job) => {
              return <JobCard job={job} key={job.jobID} />;
            })}
          </div>
        </>
      )}
    </>
  );
};

export default JobList;
