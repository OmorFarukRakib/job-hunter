import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styles from "./jobCard.module.css";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import axios from "axios";
import apiConfig from "../../../../../../apiConfig";
const NewJobCard = ({ job, setFetchAgain }) => {
  const [jobStatus, setJobStatus] = React.useState("open");
  const navigate = useNavigate();
  const handleJobDetailBtn = (jobID) => {
    // setSearchParams({
    //   ...searchParams,
    //   jobID: id,
    // });
    navigate({
      // pathname: "",
      search: `?tab=job-posts&jobId=${jobID}`,
    });
  };
  const handleChange = async (event) => {
    setJobStatus(event.target.value);
    console.log(event.target.value);
    const userData = JSON.parse(localStorage.getItem("JS_userData"));
    const token = userData.data.token.accessToken;

    try {
      const response = await axios({
        method: "PUT",
        url:
          apiConfig.baseURL +
          apiConfig.company.updateJobStatus +
          `?jobId=${job.jobID}&JobStatus=${event.target.value}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("job status up api res", response);
      const res = response.data;
      if (res.success === true) {
        setFetchAgain((prev) => prev + 1);
      }
    } catch (error) {
      console.log('error from catch', error)
    }
  };
  function formatDate(initialDate) {
    const date = new Date(initialDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add 1 to month since it's zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const handleJobStatusChange = () => {};

  return (
    <>
      <div className={styles["newJobCard-wrapper"]}>
        <div className={styles["newJobCard-items-wrapper"]}>
          <div
            className={
              (styles["newJobCard-item"], styles["newJobCard-item-title"])
            }
            style={{ color: "#643393" }}
          >
            {/* {"Software Developer"} */}
            {job.title}
          </div>
          <div className={styles["newJobCard-item"]}>{job.companyName}</div>
          <div
            className={styles["newJobCard-item"]}
            style={{ color: "rgba(0, 0, 0, 0.6)" }}
          >
            {/* {job.createdAt} */}
            {"Posted: "}
            {/* {jobCreatedDate} */}
            {formatDate(job.createdAt)}
            {/* {job.createdAt} */}
          </div>
        </div>
        <div className={styles["newJobCard-items-wrapper"]}>
          <div
            className={
              (styles["newJobCard-item"], styles["newJobCard-item-title"])
            }
          >
            {"Total Hiring"}
          </div>
          <div className={styles["newJobCard-item"]}>
            {job.totalHiringNumber}
          </div>
        </div>
        <div className={styles["newJobCard-items-wrapper"]}>
          <div
            className={
              (styles["newJobCard-item"], styles["newJobCard-item-title"])
            }
          >
            {"Total Applied"}
          </div>
          <div className={styles["newJobCard-item"]}>{job.totalApplied}</div>
        </div>
        <div className={styles["newJobCard-items-wrapper"]}>
          <div
            className={
              (styles["newJobCard-item"], styles["newJobCard-item-title"])
            }
          >
            {"Total Short Listed"}
          </div>
          <div className={styles["newJobCard-item"]}>
            {job.totalShortListed}
          </div>
        </div>
        <div className={styles["newJobCard-items-wrapper"]}>
          <div
            className={
              (styles["newJobCard-item"], styles["newJobCard-item-title"])
            }
          >
            {"Deadline"}
          </div>
          <div className={styles["newJobCard-item"]}>
            {formatDate(job.applicationDeadline)}
            {/* {job.applicationDeadline} */}
          </div>
        </div>
        <div className={styles["newJobCard-items-wrapper"]}>
          {/* <div className={styles["newJobCard-item"]}>{"Job Status"}</div> */}
          <div className={styles["newJobCard-item"]}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Job Status</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={job.jobStatus}
                label="Job Status"
                onChange={handleChange}
              >
                {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
                <MenuItem value={"Open"}>
                  {" "}
                  <div>
                    Open <AiOutlineCheckCircle style={{ color: "green" }} />
                  </div>
                </MenuItem>
                <MenuItem value={"Close"}>
                  <div>
                    Close <AiOutlineCloseCircle style={{ color: "red" }} />
                  </div>
                </MenuItem>
                <MenuItem value={"Pause"}>
                  <div>
                    Pause <AiOutlineClockCircle style={{ color: "blue" }} />
                  </div>
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className={styles["newJobCard-items-wrapper"]}>
          {/* <div className={styles["newJobCard-item"]}>{"Options"}</div> */}
          <div className={styles["newJobCard-item"]}>
            <Button
              variant="contained"
              onClick={() => handleJobDetailBtn(job.jobID)}
              sx={{
                padding: "0.7rem",
                borderRadius: "20px",
                background: "#F6953F",
                color: "white",
                "&:hover": {
                  backgroundColor: "#f6943fbc",

                  borderColor: "#0062cc",
                  boxShadow: "none",
                },
              }}
            >
              <div>
                Details <OpenInNewIcon fontSize="small" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewJobCard;
