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

const NewJobCard = ({ job }) => {
  const [jobStatus, setJobStatus] = React.useState("open");
  const [jobCreatedDate, setJobCreatedDate] = useState("");
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
  const handleChange = (event) => {
    setJobStatus(event.target.value);
  };

  useEffect(() => {
    function convertUTCDateToLocalDate(date) {
      var newDate = new Date(
        date.getTime() + date.getTimezoneOffset() * 60 * 1000
      );

      var offset = date.getTimezoneOffset() / 60;
      var hours = date.getHours();

      newDate.setHours(hours - offset);

      return newDate;
    }

    setJobCreatedDate(convertUTCDateToLocalDate(new Date(job.createdAt)));
  }, [job]);

  return (
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
          {job.createdAt}
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
        <div className={styles["newJobCard-item"]}>{job.totalHiringNumber}</div>
      </div>
      <div className={styles["newJobCard-items-wrapper"]}>
        <div
          className={
            (styles["newJobCard-item"], styles["newJobCard-item-title"])
          }
        >
          {"Total Applied"}
        </div>
        <div className={styles["newJobCard-item"]}>{"10"}</div>
      </div>
      <div className={styles["newJobCard-items-wrapper"]}>
        <div
          className={
            (styles["newJobCard-item"], styles["newJobCard-item-title"])
          }
        >
          {"Total Short Listed"}
        </div>
        <div className={styles["newJobCard-item"]}>{"5"}</div>
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
          {job.applicationDeadline}
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
              value={jobStatus}
              label="Job Status"
              onChange={handleChange}
            >
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
              <MenuItem value={"open"}>
                {" "}
                <div>
                  Open <AiOutlineCheckCircle style={{ color: "green" }} />
                </div>
              </MenuItem>
              <MenuItem value={"closed"}>
                <div>
                  Close <AiOutlineCloseCircle style={{ color: "red" }} />
                </div>
              </MenuItem>
              <MenuItem value={"paused"}>
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
  );
};

export default NewJobCard;
