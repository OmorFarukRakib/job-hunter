import React, { useEffect } from "react";
import JobCard from "../JobCard/JobCard";
import { useState } from "react";
import styles from "./joblist.module.css";
import axios from "axios";
import apiConfig from "../../apiConfig";
import { Grid, Typography } from "@mui/material";
import RiseLoader from "react-spinners/RiseLoader";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const JobList = () => {
  // const location = useLocation();
  const [searchParams] = useSearchParams();

  // const searchParams = new URLSearchParams(location.search);
  // const typeParam = searchParams.get("type");
  // const where = searchParams.get("place");
  const [searchQuery, setSearchQuery] = useState({
    type: searchParams.get("type"),
    place: searchParams.get("place"),
  });
  const [allJobPosts, setAllJobPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    setSearchQuery({
      type: searchParams.get("type"),
      place: searchParams.get("place"),
    });
  }, [searchParams]);

  const fetchAllJobPosts = async () => {
    let searchQRL = "";
    if (searchQuery.type && searchQuery.place) {
      // console.log('both exist')
      searchQRL =
        apiConfig.baseURL +
        apiConfig.public.fetchAllJobPosts +
        `?what=${searchQuery.type}&where=${searchQuery.place}`;
    } else if (searchQuery.type) {
      // console.log('search query naiw')
      searchQRL =
        apiConfig.baseURL +
        apiConfig.public.fetchAllJobPosts +
        `?what=${searchQuery.type}`;
    } else if (searchQuery.place) {
      searchQRL =
        apiConfig.baseURL +
        apiConfig.public.fetchAllJobPosts +
        `?where=${searchQuery.place}`;
    }
    else{
      searchQRL = apiConfig.baseURL + apiConfig.public.fetchAllJobPosts;
    }

    console.log(searchQRL);
    setIsLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url: searchQRL,
        // url: apiConfig.baseURL + apiConfig.public.fetchAllJobPosts,
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
  }, [searchParams, searchQuery]);
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
          {allJobPosts.length === 0 && errorMsg.length === 0 && (
            <Typography variant="h6" align="center" color="red">
              No Job Exists with search keywords!
            </Typography>
          )}
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
