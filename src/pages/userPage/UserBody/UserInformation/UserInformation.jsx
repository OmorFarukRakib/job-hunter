import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./userInformation.module.css";
import clsx from "clsx";
import { Button, Divider } from "@mui/material";

import UserInfoEditModal from "./components/UserInfoEditModal/UserInfoEditModal";
import UserPassEditModal from "./components/UserPassEditModal/UserPassEditModal";
const userData = {
  firstName: "Mr Jhon",
  lastName: "Doe",
  skills: ["React", "Nodejs", "Mongodb"],
  educationQualification: "Graduated from EWU in CSE",
  interestedIndustry: "option1",
  salaryExpectationMin: "200",
  address: "221B Baker Street, London",
  email: "user@gmail.com",
  phoneNumber: "99999999999",
};

const UserInformation = () => {
  const { compID } = useParams();
  const [userInfoEditModalShow, setUserInfoEditModalShow] =
    useState(false);
  const [userPassEditModalShow, setUserPassEditModalShow] =
    useState(false);

  const userInfoEditHandler = () => {
    setUserInfoEditModalShow(true);
  };
  const userPassEditHandler = () => {
    setUserPassEditModalShow(true);
  };

  return (
    <>
      <UserInfoEditModal
        show={userInfoEditModalShow}
        onHide={setUserInfoEditModalShow}
        userData={userData}
      />
      <UserPassEditModal
        show={userPassEditModalShow}
        onHide={setUserPassEditModalShow}
      />
      <h3 className={clsx(styles["userProfile-tile"])}>user Information</h3>
      <div className={clsx(styles["userProfile-wrapper"])}>
        <div className={clsx(styles["userProfile-Info"])}>
          <div className={clsx(styles["userProfile-info-title"])}>
            First Name
          </div>
          <div className={clsx(styles["userProfile-info-value"])}>
            {userData.firstName}
          </div>
        </div>
        <div className={clsx(styles["userProfile-Info"])}>
          <div className={clsx(styles["userProfile-info-title"])}>
            Last Name
          </div>
          <div className={clsx(styles["userProfile-info-value"])}>
            {userData.lastName}
          </div>
        </div>
        <div className={clsx(styles["userProfile-Info"])}>
          <div className={clsx(styles["userProfile-info-title"])}>Skills</div>
          <div className={clsx(styles["userProfile-info-value"])}>
            {userData.skills.join(", ")}
          </div>
        </div>
        <div className={clsx(styles["userProfile-Info"])}>
          <div className={clsx(styles["userProfile-info-title"])}>
            Last Education Qualification
          </div>
          <div className={clsx(styles["userProfile-info-value"])}>
            {userData.educationQualification}
          </div>
        </div>
        <div className={clsx(styles["userProfile-Info"])}>
          <div className={clsx(styles["userProfile-info-title"])}>
            Aimed Industry
          </div>
          <div className={clsx(styles["userProfile-info-value"])}>
            {userData.interestedIndustry}
          </div>
        </div>
        <div className={clsx(styles["userProfile-Info"])}>
          <div className={clsx(styles["userProfile-info-title"])}>
            Salary Expectations(min)
          </div>
          <div className={clsx(styles["userProfile-info-value"])}>
            {userData.salaryExpectationMin}
          </div>
        </div>
        <div className={clsx(styles["userProfile-Info"])}>
          <div className={clsx(styles["userProfile-info-title"])}>Address</div>
          <div className={clsx(styles["userProfile-info-value"])}>
            {userData.address}
          </div>
        </div>
        <div className={clsx(styles["userProfile-Info"])}>
          <div className={clsx(styles["userProfile-info-title"])}>
            Contact Email
          </div>
          <div className={clsx(styles["userProfile-info-value"])}>
            {userData.email}
          </div>
        </div>
        <div className={clsx(styles["userProfile-Info"])}>
          <div className={clsx(styles["userProfile-info-title"])}>
            Contact Phone
          </div>
          <div className={clsx(styles["userProfile-info-value"])}>
            {userData.phoneNumber}
          </div>
        </div>
        <div className={clsx(styles["userProfile-actionbtn-wrapper"])}>
          <Button variant="contained" onClick={userInfoEditHandler}>
            Edit Information
          </Button>
          <Button variant="contained" onClick={userPassEditHandler}>
            Change Password
          </Button>
        </div>
      </div>
    </>
  );
};

export default UserInformation;
