import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import styles from "./adminHeader.module.css";
const AdminHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className={styles["adminHeader-wrapper"]}>
      <h1>
        {searchParams.get("tab") !== null
          ? searchParams.get("tab").toLocaleUpperCase()
          : ""}
      </h1>
    </div>
  );
};

export default AdminHeader;
