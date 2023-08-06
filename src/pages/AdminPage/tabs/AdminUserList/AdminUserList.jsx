import React from "react";
import styles from "./adminUserList.module.css";
import UserListTable from "./components/UserListTable/UserListTable";
import { Button } from "@mui/material";
const AdminUserList = () => {
  return (
    <div className={styles["adminUserList-wrapper"]}>
      {/* <div className={styles["addProduct-btn-wrapper"]}>
        <Button variant="contained">Add a product</Button>
      </div> */}
      <UserListTable />
    </div>
  );
};

export default AdminUserList;
