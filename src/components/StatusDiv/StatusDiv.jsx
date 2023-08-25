import React from "react";
import styles from "./statusDiv.module.css";
const StatusDiv = ({statusType}) => {
  if (statusType === "pending") {
    return <div className={styles["statusDiv-pending"]}>PENDING</div>;
  }
  if (statusType === "active") {
    return <div className={styles["statusDiv-active"]}>ACTIVE</div>;
  }
  if (statusType === "rejected") {
    return <div className={styles["statusDiv-rejected"]}>REJECTED</div>;
  }
};

export default StatusDiv;
