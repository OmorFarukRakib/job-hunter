import React from "react";
import styles from "./statusDiv.module.css";
const StatusDiv = ({statusType}) => {
  if (statusType === "Pending") {
    return <div className={styles["statusDiv-pending"]}>PENDING</div>;
  }
  if (statusType === "Approved") {
    return <div className={styles["statusDiv-active"]}>ACTIVE</div>;
  }
  if (statusType === "Rejected") {
    return <div className={styles["statusDiv-rejected"]}>REJECTED</div>;
  }
};

export default StatusDiv;
