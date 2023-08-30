import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./jobCard.module.css";
import clsx from "clsx";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import { Button } from "@mui/material";
const JobCard = ({ id }) => {
  const navigate = useNavigate();
  return (
    <div className={clsx(styles["job-card-wrapper"])}>
      <div className={clsx(styles["job-card-title"])}>
        Job Title {id} - Software Developer
      </div>
      <div className={clsx(styles["job-card-companyName"])}>
        Company Name - X infra tech
      </div>
      <div className={clsx(styles["job-card-location"])}>
        location - USA, NY
      </div>
      <div className={clsx(styles["job-card-location"])}>
        Deadline - 20/20/30
      </div>
      <div className={clsx(styles["job-card-tags"])}>
        <div className={clsx(styles["job-card-tag"])}>
          <LocalAtmIcon fontSize="inherit" />
          {` `}Estimated $100k - $200k per year
        </div>
        <div className={clsx(styles["job-card-tag"])}>
          <ManageAccountsIcon fontSize="inherit" />
          {` `}
          React
        </div>
        <div className={clsx(styles["job-card-tag"])}>
          <BusinessCenterIcon fontSize="inherit" />
          {` `}Full-Time
        </div>
        <div className={clsx(styles["job-card-tag"])}>
          <PersonSearchIcon fontSize="inherit" />
          {` `}
          Hiring - 4
        </div>
        <div className={clsx(styles["job-card-tag"])}>
          <WorkHistoryIcon fontSize="inherit" />
          {` `}
          experience - 2+ years
        </div>
      </div>
      <div className={clsx(styles["job-card-description"])}>
        We are seeking a Full Stack Developer Intern to work with us throughout
        the school year. This internship will be a flexible schedule of 20-25
        hours a week during business hours. This will be 100% remote. Lorem
        ipsum dolor, sit amet consectetur adipisicing elit. Iste dolorem
        incidunt repudiandae optio veritatis delectus assumenda asperiores
        sequi, voluptatibus numquam ducimus rem architecto fuga consectetur
        accusamus eligendi. Consectetur, voluptates itaque. Lorem ipsum dolor,
        sit amet consectetur adipisicing elit. Iste dolorem incidunt repudiandae
        optio veritatis delectus assumenda asperiores sequi, voluptatibus
        numquam ducimus rem architecto fuga consectetur accusamus eligendi.
        Consectetur, voluptates itaque. Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Iste dolorem incidunt repudiandae optio veritatis
        delectus assumenda asperiores sequi, voluptatibus numquam ducimus rem
        architecto fuga consectetur accusamus eligendi. Consectetur, voluptates
        itaque. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
        dolorem incidunt repudiandae optio veritatis delectus assumenda
        asperiores sequi, voluptatibus numquam ducimus rem architecto fuga
        consectetur accusamus eligendi. Consectetur, voluptates itaque. Lorem
        ipsum dolor, sit amet consectetur adipisicing elit. Iste dolorem
        incidunt repudiandae optio veritatis delectus assumenda asperiores
        sequi, voluptatibus numquam ducimus rem architecto fuga consectetur
        accusamus eligendi. Consectetur, voluptates itaque. Lorem ipsum dolor,
        sit amet consectetur adipisicing elit. Iste dolorem incidunt repudiandae
        optio veritatis delectus assumenda asperiores sequi, voluptatibus
        numquam ducimus rem architecto fuga consectetur accusamus eligendi.
        Consectetur, voluptates itaque. Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Iste dolorem incidunt repudiandae optio veritatis
        delectus assumenda asperiores sequi, voluptatibus numquam ducimus rem
        architecto fuga consectetur accusamus eligendi. Consectetur, voluptates
        itaque. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
        dolorem incidunt repudiandae optio veritatis delectus assumenda
        asperiores sequi, voluptatibus numquam ducimus rem architecto fuga
        consectetur accusamus eligendi. Consectetur, voluptates itaque. Lorem
        ipsum dolor, sit amet consectetur adipisicing elit. Iste dolorem
        incidunt repudiandae optio veritatis delectus assumenda asperiores
        sequi, voluptatibus numquam ducimus rem architecto fuga consectetur
        accusamus eligendi. Consectetur, voluptates itaque.
      </div>
      <div className={clsx(styles["job-card-details-btn-wrapper"])}>
        <Button
          variant="contained"
          onClick={() => navigate(`/job/${id}`)}
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
      </div>
    </div>
  );
};

export default JobCard;
