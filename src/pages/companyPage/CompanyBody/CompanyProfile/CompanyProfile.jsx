import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./companyProfile.module.css";
import clsx from "clsx";
import { Button, Divider } from "@mui/material";

import CompanyInfoEditModal from "./components/CompanyInfoEditModal/CompanyInfoEditModal";
import CompanyPassEditModal from "./components/CompanyPassEditModal/CompanyPassEditModal";
const companyData = {
  companyName: "ABC company",
  industry: "option1",
  companyDescription:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet delectus corrupti velit itaque repellendus ipsa unde quo odio eligendi, fugiat consectetur blanditiis soluta quis hic corporis ipsum. Quo quod recusandae libero, error, molestias laudantium corrupti, dolorem sint explicabo voluptas eius. Ratione minus similique ea hic quasi libero alias impedit vero! Maxime expedita voluptate quam libero omnis obcaecati explicabo, accusamus asperiores amet pariatur fugiat. Sint incidunt beatae adipisci, maxime consectetur praesentium distinctio reiciendis natus quidem voluptatem officiis veniam iste iusto sunt in, similique vel nobis animi laudantium error. Consequatur quibusdam blanditiis autem est, ipsa ducimus iusto vel nemo nesciunt rerum molestias corrupti animi ratione",
  companySize: "2",
  companyAddress: "221B Baker Street, London",
  companyWebsite: "company.com",
  contactPersonName: "Mr. Brayan",
  contactEmail: "ABCompany@gmail.com",
  contactPhone: 880155555555,
};

const CompanyProfile = () => {
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

  return (
    <>
      <CompanyInfoEditModal
        show={companyInfoEditModalShow}
        onHide={setCompanyInfoEditModalShow}
        companyData={companyData}
      />
      <CompanyPassEditModal
        show={companyPassEditModalShow}
        onHide={setCompanyPassEditModalShow}
      />
      <div className={clsx(styles["companyProfile-wrapper"])}>
        <div className={clsx(styles["companyProfile-Info"])}>
          <div className={clsx(styles["companyProfile-info-title"])}>
            Company Name
          </div>
          <div className={clsx(styles["companyProfile-info-value"])}>
            ABC company
          </div>
        </div>
        <div className={clsx(styles["companyProfile-Info"])}>
          <div className={clsx(styles["companyProfile-info-title"])}>
            Industry
          </div>
          <div className={clsx(styles["companyProfile-info-value"])}>
            Software Developer Company
          </div>
        </div>
        <div className={clsx(styles["companyProfile-Info"])}>
          <div className={clsx(styles["companyProfile-info-title"])}>
            Company Descriptions
          </div>
          <div className={clsx(styles["companyProfile-info-value"])}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
            delectus corrupti velit itaque repellendus ipsa unde quo odio
            eligendi, fugiat consectetur blanditiis soluta quis hic corporis
            ipsum. Quo quod recusandae libero, error, molestias laudantium
            corrupti, dolorem sint explicabo voluptas eius. Ratione minus
            similique ea hic quasi libero alias impedit vero! Maxime expedita
            voluptate quam libero omnis obcaecati explicabo, accusamus
            asperiores amet pariatur fugiat. Sint incidunt beatae adipisci,
            maxime consectetur praesentium distinctio reiciendis natus quidem
            voluptatem officiis veniam iste iusto sunt in, similique vel nobis
            animi laudantium error. Consequatur quibusdam blanditiis autem est,
            ipsa ducimus iusto vel nemo nesciunt rerum molestias corrupti animi
            ratione
          </div>
        </div>
        <div className={clsx(styles["companyProfile-Info"])}>
          <div className={clsx(styles["companyProfile-info-title"])}>
            Company Size
          </div>
          <div className={clsx(styles["companyProfile-info-value"])}>
            Medium
          </div>
        </div>
        <div className={clsx(styles["companyProfile-Info"])}>
          <div className={clsx(styles["companyProfile-info-title"])}>
            Company Address
          </div>
          <div className={clsx(styles["companyProfile-info-value"])}>
            221B Baker Street, London
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
              company.com
            </a>
          </div>
        </div>
        <div className={clsx(styles["companyProfile-Info"])}>
          <div className={clsx(styles["companyProfile-info-title"])}>
            Contact Person Name
          </div>
          <div className={clsx(styles["companyProfile-info-value"])}>
            Mr. Brayan
          </div>
        </div>
        <div className={clsx(styles["companyProfile-Info"])}>
          <div className={clsx(styles["companyProfile-info-title"])}>
            Contact Email
          </div>
          <div className={clsx(styles["companyProfile-info-value"])}>
            ABCompany@gmail.com
          </div>
        </div>
        <div className={clsx(styles["companyProfile-Info"])}>
          <div className={clsx(styles["companyProfile-info-title"])}>
            Contact Phone
          </div>
          <div className={clsx(styles["companyProfile-info-value"])}>
            +880155555555
          </div>
        </div>
        <div className={clsx(styles["companyProfile-actionbtn-wrapper"])}>
          <Button variant="contained" onClick={companyInfoEditHandler}>
            Edit Information
          </Button>
          <Button variant="contained" onClick={companyPassEditHandler}>
            Change Password
          </Button>
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;
