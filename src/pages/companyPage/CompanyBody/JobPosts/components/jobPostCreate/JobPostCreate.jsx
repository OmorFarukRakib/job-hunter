import React from "react";
import styles from "./jobPostCreate.module.css";
import clsx from "clsx";
import { Button } from "@mui/material";
const JobPostCreate = () => {
  return (
    <div className={clsx(styles["jobPostCreate-wrapper"])}>
      <Button variant="contained" size="large">
        Add a new Job Circular
      </Button>
    </div>
  );
};

export default JobPostCreate;
