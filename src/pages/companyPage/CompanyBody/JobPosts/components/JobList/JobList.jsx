import React, { useEffect } from "react";
import JobCard from "../JobCard/JobCard";
import { useState } from "react";
import styles from "./joblist.module.css";
import NewJobCard from "../JobCard/NewJobCard";
import axios from "axios";
import apiConfig from "../../../../../../apiConfig";
import { Grid, Typography } from "@mui/material";
import RiseLoader from "react-spinners/RiseLoader";
const JobList = () => {
  const [jobs, setJobs] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [allJobsList, setAllJobsList] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(1)
  const [isLoading, setLoading] = useState(true);
  const fetchAllJobsList = async () => {
    setLoading(true);
    const userData = JSON.parse(localStorage.getItem("JS_userData"));
    const token = userData.data.token.accessToken;
    try {
      const response = await axios({
        method: "GET",
        url:
          apiConfig.baseURL +
          apiConfig.company.fetchAllJobsList +
          `?CompanyID=${userData.data.userID}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("company info change api res", response);
      const res = response.data;
      if (res.success === true) {
        setAllJobsList(res.data.jobs);
      }
    } catch (error) {
      console.log("error from catch", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchAllJobsList();
  }, [fetchAgain]);
  return (
    <>
      {isLoading === true ? (
        <>
          <Grid container justifyContent={"center"}>
            <RiseLoader color="#F6953F" />
          </Grid>
        </>
      ) : (
        <>
          {allJobsList.length === 0 && (
            <Grid container justifyContent={"center"}>
              <Typography variant="h6" color="initial">No Jobs has been created</Typography>
            </Grid>
          )}
          <div className={styles["job-list-wrapper"]}>
            {allJobsList.map((job) => {
              return (
                <NewJobCard
                  job={job}
                  key={job.jobID}
                  setFetchAgain={setFetchAgain}
                />
              );
            })}
            {/* {jobs.map((job , indx) => {
        return <JobCard id={job}/>;
      })} */}
          </div>
        </>
      )}
    </>
  );
};

export default JobList;
