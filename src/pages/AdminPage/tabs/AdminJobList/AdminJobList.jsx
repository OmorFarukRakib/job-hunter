import React from "react";
import styles from "./adminJobList.module.css";
import JobListTable from "./components/JobListTable/JobListTable";
import { Button } from "@mui/material";
const AdminJobList = () => {
  return (
    <div className={styles["adminJobList-wrapper"]}>
      {/* <div className={styles["addProduct-btn-wrapper"]}>
        <Button variant="contained">Add a product</Button>
      </div> */}
      <JobListTable />
    </div>
  );
};

export default AdminJobList;
