import React from "react";
import styles from "./adminCompanyList.module.css";
import CompanyListTable from "./components/CompanyListTable/CompanyListTable";
import { Button } from "@mui/material";
import { useState } from "react";
const AdminCompanyList = () => {
 

  return (
    <div className={styles["adminProductList-wrapper"]}>
      <CompanyListTable />
    </div>
  );
};

export default AdminCompanyList;
