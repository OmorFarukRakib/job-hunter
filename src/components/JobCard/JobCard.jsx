import React from "react";
import styles from "./jobCard.module.css";
import clsx from "clsx";
const JobCard = () => {
  return (
    <div
      className={clsx(styles["job-card-wrapper"])}>
      JobCard
    </div>
  );
};

export default JobCard;
