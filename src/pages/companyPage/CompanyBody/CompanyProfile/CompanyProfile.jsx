import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./companyProfile.module.css";
import clsx from "clsx";
import { Button, Divider } from "@mui/material";

import CompanyInfoEditModal from "./components/CompanyInfoEditModal/CompanyInfoEditModal";
import CompanyPassEditModal from "./components/CompanyPassEditModal/CompanyPassEditModal";
import { useEffect } from "react";
import apiConfig from "../../../../apiConfig";
import axios from "axios";
// const companyData = {
//   companyName: "ABC company",
//   industry: "option1",
//   companyDescription:
//     "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet delectus corrupti velit itaque repellendus ipsa unde quo odio eligendi, fugiat consectetur blanditiis soluta quis hic corporis ipsum. Quo quod recusandae libero, error, molestias laudantium corrupti, dolorem sint explicabo voluptas eius. Ratione minus similique ea hic quasi libero alias impedit vero! Maxime expedita voluptate quam libero omnis obcaecati explicabo, accusamus asperiores amet pariatur fugiat. Sint incidunt beatae adipisci, maxime consectetur praesentium distinctio reiciendis natus quidem voluptatem officiis veniam iste iusto sunt in, similique vel nobis animi laudantium error. Consequatur quibusdam blanditiis autem est, ipsa ducimus iusto vel nemo nesciunt rerum molestias corrupti animi ratione",
//   companySize: "2",
//   companyAddress: "221B Baker Street, London",
//   companyWebsite: "company.com",
//   contactPersonName: "Mr. Brayan",
//   contactEmail: "ABCompany@gmail.com",
//   contactPhone: 880155555555,
// };

const CompanyProfile = () => {
  const [companyData, setCompanyData] = useState({});
  const [fetchAgainFlag, setFetchAgainFlag] = useState(1);
  const { compID } = useParams();
  const [companyInfoEditModalShow, setCompanyInfoEditModalShow] =
    useState(false);
  const [companyPassEditModalShow, setCompanyPassEditModalShow] =
    useState(false);

  const companyInfoEditHandler = () => {
    setCompanyInfoEditModalShow(true);
  };
  const companyPassEditHandler = () => {
    setCompanyPassEditModalShow(true);
  };
  const navigate = useNavigate();
  const fetchCompanyInfo = async () => {
    const userData = JSON.parse(localStorage.getItem("JS_userData"));
    const token = userData.data.token.accessToken;
    try {
      const response = await axios({
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        // url: "https://be.jobspace.org.uk/api/v1/User/getCompanyInfo",
        url: apiConfig.baseURL + apiConfig.company.getInfoByToken,
      });
      const res = response.data;
      if (res.success === true) {
        setCompanyData(res.data.company);
      }
    } catch (error) {
      console.log("error in catch");
    }
  };

  useEffect(() => {
    console.log("this is company profile page for company id", compID);

    fetchCompanyInfo();
  }, [compID, fetchAgainFlag]);

  return (
    <>
      <CompanyInfoEditModal
        show={companyInfoEditModalShow}
        onHide={setCompanyInfoEditModalShow}
        companyData={companyData}
        setFetchAgainFlag={setFetchAgainFlag}
      />
      <CompanyPassEditModal
        show={companyPassEditModalShow}
        onHide={setCompanyPassEditModalShow}
        setFetchAgainFlag={setFetchAgainFlag}
      />
      <h3 className={clsx(styles["companyProfile-tile"])}>
        Company Information
      </h3>
      <div className={clsx(styles["companyProfile-wrapper"])}>
        <div className={clsx(styles["companyProfile-Info"])}>
          <div className={clsx(styles["companyProfile-info-title"])}>
            Company Name
          </div>
          <div className={clsx(styles["companyProfile-info-value"])}>
            {companyData.name}
          </div>
        </div>
        {/* <div className={clsx(styles["companyProfile-Info"])}>
          <div className={clsx(styles["companyProfile-info-title"])}>
            Industry
          </div>
          <div className={clsx(styles["companyProfile-info-value"])}>
            Software Developer Company
          </div>
        </div> */}
        <div className={clsx(styles["companyProfile-Info"])}>
          <div className={clsx(styles["companyProfile-info-title"])}>
            Company Descriptions
          </div>
          <div className={clsx(styles["companyProfile-info-value"])}>
            {companyData.description}
          </div>
        </div>
        <div className={clsx(styles["companyProfile-Info"])}>
          <div className={clsx(styles["companyProfile-info-title"])}>
            Company Size
          </div>
          <div className={clsx(styles["companyProfile-info-value"])}>
            {companyData.companySize}
          </div>
        </div>
        <div className={clsx(styles["companyProfile-Info"])}>
          <div className={clsx(styles["companyProfile-info-title"])}>
            Company Address
          </div>
          <div className={clsx(styles["companyProfile-info-value"])}>
            {companyData.address}
          </div>
        </div>
        <div className={clsx(styles["companyProfile-Info"])}>
          <div className={clsx(styles["companyProfile-info-title"])}>
            Company Website
          </div>
          <div className={clsx(styles["companyProfile-info-value"])}>
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              {companyData.webSite}
            </a>
          </div>
        </div>
        <div className={clsx(styles["companyProfile-Info"])}>
          <div className={clsx(styles["companyProfile-info-title"])}>
            Contact Person Name
          </div>
          <div className={clsx(styles["companyProfile-info-value"])}>
            {companyData.contactPersonName}
          </div>
        </div>
        <div className={clsx(styles["companyProfile-Info"])}>
          <div className={clsx(styles["companyProfile-info-title"])}>
            Contact Email
          </div>
          <div className={clsx(styles["companyProfile-info-value"])}>
            {companyData.email}
          </div>
        </div>
        <div className={clsx(styles["companyProfile-Info"])}>
          <div className={clsx(styles["companyProfile-info-title"])}>
            Contact Phone
          </div>
          <div className={clsx(styles["companyProfile-info-value"])}>
            {companyData.phoneNumber}
          </div>
        </div>
        <div className={clsx(styles["companyProfile-actionbtn-wrapper"])}>
          <Button
            variant="contained"
            onClick={companyInfoEditHandler}
            sx={{
              padding: "0.7rem",
              borderRadius: "20px",
              background: "#F6953F",
              color: "white",
              "&:hover": {
                backgroundColor: "#f6943fbc",

                borderColor: "#0062cc",
                boxShadow: "none",
              },
            }}
          >
            Edit Information
          </Button>
          <Button
            variant="contained"
            onClick={companyPassEditHandler}
            sx={{
              padding: "0.7rem",
              borderRadius: "20px",
              background: "#643393",
              color: "white",
              "&:hover": {
                backgroundColor: "#653393cf",

                borderColor: "#0062cc",
                boxShadow: "none",
              },
            }}
          >
            Change Password
          </Button>
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;
