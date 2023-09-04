import React from "react";
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

const NewJobCard = ({ id }) => {
  const [jobStatus, setJobStatus] = React.useState("open");
  const navigate = useNavigate();
  const handleJobDetailBtn = (id) => {
    // setSearchParams({
    //   ...searchParams,
    //   jobID: id,
    // });
    navigate({
      // pathname: "",
      search: `?tab=job-posts&jobId=${id}`,
    });
  };
  const handleChange = (event) => {
    setJobStatus(event.target.value);
  };

  return (
    <div className={styles["newJobCard-wrapper"]}>
      <div className={styles["newJobCard-items-wrapper"]}>
        <div
          className={
            (styles["newJobCard-item"], styles["newJobCard-item-title"])
          }
          style={{ color: "#643393" }}
        >
          {"Software Developer"}
        </div>
        <div className={styles["newJobCard-item"]}>{"ABC Company Limited"}</div>
        <div
          className={styles["newJobCard-item"]}
          style={{ color: "rgba(0, 0, 0, 0.6)" }}
        >
          {"Posted: August 14, 2023"}
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
        <div className={styles["newJobCard-item"]}>{"2"}</div>
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
        <div className={styles["newJobCard-item"]}>{"12-12-23"}</div>
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
            onClick={() => handleJobDetailBtn(id)}
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
