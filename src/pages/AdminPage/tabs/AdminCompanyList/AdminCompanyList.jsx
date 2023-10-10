import React, { useEffect } from "react";
import styles from "./adminCompanyList.module.css";
import CompanyListTable from "./components/CompanyListTable/CompanyListTable";
import { Button, Typography, Grid } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import apiConfig from "../../../../apiConfig";
import RiseLoader from "react-spinners/RiseLoader";

const AdminCompanyList = () => {
  const { adminID } = useParams();

  const [allCompanyData, setAllCompanyData] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchAllCompanyData = async () => {
    const userData = JSON.parse(localStorage.getItem("JS_userData"));
    const token = userData.data.token.accessToken;
    setIsLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url: apiConfig.baseURL + apiConfig.admin.fetchAllCompanyData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("admin all company list api res", response);
      const res = response.data;
      if (res.success === true) {
        setAllCompanyData(res.data.users);
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
    fetchAllCompanyData();
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
              <CompanyListTable
                allCompanyData={allCompanyData}
                setFetchAgain={setFetchAgain}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AdminCompanyList;
