// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import SigninBody from "./signinBody/SigninBody";
import clsx from "clsx";
import styles from "./userDetailsModal.module.css";
import { Button } from "@mui/material";
import StatusDiv from "../../../../../../components/StatusDiv/StatusDiv";
import { useState } from "react";
import { Grid, Typography } from "@mui/material";

import axios from "axios";
import apiConfig from "../../../../../../apiConfig";
import RiseLoader from "react-spinners/RiseLoader";
import { useEffect } from "react";

function UserDetailsModal({ show, onHide, userData }) {
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserDetails = async (id) => {
    setIsLoading(true);
    console.log(id)
    const userData = JSON.parse(localStorage.getItem("JS_userData"));
    const token = userData.data.token.accessToken;
    console.log('token', token)
    try {
      const response = await axios({
        method: "GET",
        url:
          apiConfig.baseURL +
          apiConfig.admin.getEmployeeInfoByID +
          `?userID=${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("user details fetch api res", response);
      const res = response.data;
      if (res.success === true) {
        setUserDetails(res.data.user);
      } else {
        console.log("success false");
      }
    } catch (error) {
      console.log("error in catch", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserDetails(userData.id);
  }, [userData]);
  return (
    <Modal
      show={show}
      onHide={onHide}
      // className={clsx(styles["singinBody-wrapper"])}
      //   size="sm"
      //   dialogClassName="modal-90w"
      dialogClassName="custom-modal-for-companyDetails"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard="false"
    >
      <Modal.Header className="px-4" closeButton>
        <Modal.Title
          className="ms-auto"
          id="contained-modal-title-vcenter"
          centered
        >
          User Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading === true ? (
          <>
            <Grid container justifyContent={"center"} mt={5}>
              <RiseLoader color="#F6953F" />
            </Grid>
          </>
        ) : (
          <>
            <div className={clsx(styles["userProfile-wrapper"])}>
              <div className={clsx(styles["userProfile-Info"])}>
                <div className={clsx(styles["userProfile-info-title"])}>
                  First Name
                </div>
                <div className={clsx(styles["userProfile-info-value"])}>
                  {userDetails.firstName}
                </div>
              </div>
              <div className={clsx(styles["userProfile-Info"])}>
                <div className={clsx(styles["userProfile-info-title"])}>
                  First Name
                </div>
                <div className={clsx(styles["userProfile-info-value"])}>
                  {userDetails.lastname}
                </div>
              </div>
              
              <div className={clsx(styles["userProfile-Info"])}>
                <div className={clsx(styles["userProfile-info-title"])}>
                  Status
                </div>
                <div className={clsx(styles["userProfile-status-wrapper"])}>
                  <StatusDiv statusType={userData.profileStatus} />
                </div>
              </div>
              {/* <div className={clsx(styles["userProfile-Info"])}>
                <div className={clsx(styles["userProfile-info-title"])}>
                  Skills
                </div>
                <div className={clsx(styles["userProfile-info-value"])}>OK</div>
              </div> */}
              <div className={clsx(styles["userProfile-Info"])}>
                <div className={clsx(styles["userProfile-info-title"])}>
                  Last Education Qualification
                </div>
                <div className={clsx(styles["userProfile-info-value"])}>
                  {userDetails.lastEducationDegree}
                </div>
              </div>
              <div className={clsx(styles["userProfile-Info"])}>
                <div className={clsx(styles["userProfile-info-title"])}>
                  Aimed Industry
                </div>
                <div className={clsx(styles["userProfile-info-value"])}>
                  {userDetails.aimedIndustry}
                </div>
              </div>
              <div className={clsx(styles["userProfile-Info"])}>
                <div className={clsx(styles["userProfile-info-title"])}>
                  Salary Expectations(min)
                </div>
                <div className={clsx(styles["userProfile-info-value"])}>
                  {userDetails.salaryExpMin}
                </div>
              </div>
              <div className={clsx(styles["userProfile-Info"])}>
                <div className={clsx(styles["userProfile-info-title"])}>
                  Address
                </div>
                <div className={clsx(styles["userProfile-info-value"])}>
                  {userDetails.address}
                </div>
              </div>
              <div className={clsx(styles["userProfile-Info"])}>
                <div className={clsx(styles["userProfile-info-title"])}>
                  Contact Email
                </div>
                <div className={clsx(styles["userProfile-info-value"])}>
                  {userDetails.email}
                </div>
              </div>
              <div className={clsx(styles["userProfile-Info"])}>
                <div className={clsx(styles["userProfile-info-title"])}>
                  Contact Phone
                </div>
                <div className={clsx(styles["userProfile-info-value"])}>
                  {userDetails.phoneNumber}
                </div>
              </div>
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="outlined" size="large" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserDetailsModal;
