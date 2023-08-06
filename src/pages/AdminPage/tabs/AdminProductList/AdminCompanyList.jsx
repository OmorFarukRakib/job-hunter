import React from "react";
import styles from "./adminCompanyList.module.css";
import CompanyListTable from "./components/CompanyListTable/CompanyListTable";
import { Button } from "@mui/material";
const AdminCompanyList = () => {
  return (
    <div className={styles["adminProductList-wrapper"]}>
      {/* <div className={styles["addProduct-btn-wrapper"]}>
        <Button variant="contained">Add a product</Button>
      </div> */}
      <CompanyListTable />
    </div>
  );
};

export default AdminCompanyList;
