import React from "react";
import styles from "./adminUserList.module.css";
import UserListTable from "./components/UserListTable/UserListTable";
import { Button, Typography, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import RiseLoader from "react-spinners/RiseLoader";

import axios from "axios";
import apiConfig from "../../../../apiConfig";
import { useState, useEffect } from "react";

const AdminUserList = () => {
  const { adminID } = useParams();

  const [allUserData, setAllUserData] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

const fetchAllUserData = async () => {
  const userData = JSON.parse(localStorage.getItem("JS_userData"));
  const token = userData.data.token.accessToken;
  setIsLoading(true);
  try {
    const response = await axios({
      method: "GET",
      url: apiConfig.baseURL + apiConfig.admin.fetchAllUserData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("admin all user list api res", response);
    const res = response.data;
    if (res.success === true) {
      setAllUserData(res.data.users);
    } else {
      setErrorMsg("Something Went Wrong!");
    }
  } catch (error) {
    setErrorMsg("Something Went Wrong!");
  }
  setIsLoading(false);

  console.log("admin ID", adminID);
};

useEffect(() => {
  setErrorMsg("");
  fetchAllUserData();
}, [adminID, fetchAgain]);

  return (
    <>
      {" "}
      {isLoading === true ? (
        <>
          <Grid container justifyContent={"center"} mt={5}>
            <RiseLoader color="#F6953F" />
          </Grid>
        </>
      ) : (
        <>
          {errorMsg && (
            <Typography variant="h6" color="red" align="center">
              {errorMsg}
            </Typography>
          )}
          {!errorMsg && (
            <div className={styles["adminProductList-wrapper"]}>
              <UserListTable
                allUserData={allUserData}
                setFetchAgain={setFetchAgain}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AdminUserList;
