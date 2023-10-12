import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./jobCard.module.css";
import clsx from "clsx";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Link } from "react-router-dom";
import { Button, Card, Typography } from "@mui/material";
const JobCard = ({ job }) => {
  const navigate = useNavigate();
  function formatDate(initialDate) {
    const date = new Date(initialDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add 1 to month since it's zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  return (
    <Card
      sx={{
        borderRadius: "20px",
      }}
    >
      <div className={clsx(styles["job-card-wrapper"])}>
        <div className={clsx(styles["job-card-title"])}>{job.title}</div>
        <div className={clsx(styles["job-card-companyName"])}>
          Company Name - {job.companyName}
        </div>
        <div className={clsx(styles["job-card-location"])}>
          location - {job.jobLocation}
        </div>
        <div className={clsx(styles["job-card-location"])}>
          Deadline - {formatDate(job.applicationDeadline)}
        </div>
        <div className={clsx(styles["job-card-tags"])}>
          <div className={clsx(styles["job-card-tag"])}>
            <LocalAtmIcon fontSize="inherit" />
            {` `}Estimated ${job.salaryEstimationStart} - $
            {job.salaryEstimationEnd} per year
          </div>
          {/* <div className={clsx(styles["job-card-tag"])}>
          <ManageAccountsIcon fontSize="inherit" />
          {` `}
          React
        </div> */}
          <div className={clsx(styles["job-card-tag"])}>
            <BusinessCenterIcon fontSize="inherit" />
            {` `}
            {job.jobType}
          </div>
          <div className={clsx(styles["job-card-tag"])}>
            <PersonSearchIcon fontSize="inherit" />
            {` `}
            Hiring - {job.totalHiringNumber}
          </div>
          <div className={clsx(styles["job-card-tag"])}>
            <WorkHistoryIcon fontSize="inherit" />
            {` `}
            experience - {job.totalExperienceInYears}+ years
          </div>
        </div>
        <div className={clsx(styles["job-card-description"])}>
          <Typography variant="h6" color="initial">
            Job Description
          </Typography>
          <Typography variant="h7" color="initial">
            {job.jobDescription}
          </Typography>
        </div>
        <div className={clsx(styles["job-card-details-btn-wrapper"])}>
          <Link to={`/job/${job.jobID}`}>
            <Button
              variant="contained"
              // onClick={() => (window.location.href = `/job/${job.jobID}`)}
              // onClick={() => navigate(`/job/${job.jobID}`)}
              sx={{
                padding: "0.7rem",
                borderRadius: "20px",
                background: "#232758",
                color: "white",
                "&:hover": {
                  backgroundColor: "#232758c7",

                  borderColor: "#0062cc",
                  boxShadow: "none",
                },
              }}
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
