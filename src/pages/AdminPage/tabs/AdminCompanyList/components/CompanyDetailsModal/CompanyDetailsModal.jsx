// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import SigninBody from "./signinBody/SigninBody";
import clsx from "clsx";
import styles from "./companyDetailsModal.module.css";
import { Button } from "@mui/material";
import StatusDiv from "../../../../../../components/StatusDiv/StatusDiv";
import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography } from "@mui/material";

import apiConfig from "../../../../../../apiConfig";
import RiseLoader from "react-spinners/RiseLoader";

function CompanyDetailsModal({ show, onHide, companyDetailsData }) {
  const [companyDetails, setCompanyDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchCompanyDetails = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url:
          apiConfig.baseURL +
          apiConfig.admin.getCompanyInfoByID +
          `?userID=${id}`,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   "Content-Type": "application/json",
        // },
      });
      console.log("company details fetch api res", response);
      const res = response.data;
      if (res.success === true) {
        setCompanyDetails(res.data.company);
      } else {
        console.log("success false");
      }
    } catch (error) {
      console.log("error in catch", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCompanyDetails(companyDetailsData.id);
  }, [companyDetailsData]);

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
          Company Information
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
            <div className={clsx(styles["companyProfile-wrapper"])}>
              <div className={clsx(styles["companyProfile-Info"])}>
                <div className={clsx(styles["companyProfile-info-title"])}>
                  Company Name
                </div>
                <div className={clsx(styles["companyProfile-info-value"])}>
                  {companyDetails.name}
                </div>
              </div>
              <div className={clsx(styles["companyProfile-Info"])}>
                <div className={clsx(styles["companyProfile-info-title"])}>
                  Status
                </div>
                <div className={clsx(styles["companyProfile-status-wrapper"])}>
                  <StatusDiv statusType={companyDetailsData.profileStatus} />
                </div>
              </div>

              <div className={clsx(styles["companyProfile-Info"])}>
                <div className={clsx(styles["companyProfile-info-title"])}>
                  Company Descriptions
                </div>
                <div className={clsx(styles["companyProfile-info-value"])}>
                  {companyDetails.description}
                </div>
              </div>
              <div className={clsx(styles["companyProfile-Info"])}>
                <div className={clsx(styles["companyProfile-info-title"])}>
                  Company Size
                </div>
                <div className={clsx(styles["companyProfile-info-value"])}>
                  {companyDetails.companySize}
                </div>
              </div>
              <div className={clsx(styles["companyProfile-Info"])}>
                <div className={clsx(styles["companyProfile-info-title"])}>
                  Company Address
                </div>
                <div className={clsx(styles["companyProfile-info-value"])}>
                  {companyDetails.address}
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
                    {companyDetails.webSite}
                  </a>
                </div>
              </div>
              <div className={clsx(styles["companyProfile-Info"])}>
                <div className={clsx(styles["companyProfile-info-title"])}>
                  Contact Person Name
                </div>
                <div className={clsx(styles["companyProfile-info-value"])}>
                  {companyDetails.contactPersonName}
                </div>
              </div>
              <div className={clsx(styles["companyProfile-Info"])}>
                <div className={clsx(styles["companyProfile-info-title"])}>
                  Email
                </div>
                <div className={clsx(styles["companyProfile-info-value"])}>
                  {companyDetails.email}
                </div>
              </div>
              <div className={clsx(styles["companyProfile-Info"])}>
                <div className={clsx(styles["companyProfile-info-title"])}>
                  Contact Number
                </div>
                <div className={clsx(styles["companyProfile-info-value"])}>
                  {companyDetails.phoneNumber}
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

export default CompanyDetailsModal;
