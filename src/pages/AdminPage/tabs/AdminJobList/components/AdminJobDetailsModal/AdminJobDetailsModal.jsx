// import Button from "react-bootstrap/Button";
import { useState } from "react";

import Modal from "react-bootstrap/Modal";
// import SigninBody from "./signinBody/SigninBody";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import clsx from "clsx";
import styles from "./adminJobDetailsModal.module.css";
import JobDetailsOptionBtn from './jobDetailsOptionBtn/JobDetailsOptionBtn'
import JobApplicantModal from '../JobApplicantsModal/JobApplicantsModal'
import JobApplicantShortListedModal from "../JobApplicantShortListedModal/JobApplicantShortListedModal";
import Typography from '@mui/material/Typography'

function AdminJobDetailsModal({ show, onHide, jobDetailsData }) {
const [applicantModalShow, setApplicantModalShow] = useState(false);
const [showJobApplicantShortListedModal, setShowJobApplicantShortListedModal] =
  useState(false);


  const handleSelectOption = (selectedOption) => {
    console.log(selectedOption);
    if (selectedOption === "applicants") {
      setApplicantModalShow(true);
    }  else if (selectedOption === "short-listed-applicant") {
      // here will
      setShowJobApplicantShortListedModal(true);
    } 
  };
   function formatDate(initialDate) {
     const date = new Date(initialDate);
     const year = date.getFullYear();
     const month = String(date.getMonth() + 1).padStart(2, "0"); // Add 1 to month since it's zero-based
     const day = String(date.getDate()).padStart(2, "0");

     return `${year}-${month}-${day}`;
   }
  return (
    <>
      <JobApplicantModal
        show={applicantModalShow}
        onHide={() => setApplicantModalShow(false)}
        jobID={jobDetailsData.jobID}
      />
      <JobApplicantShortListedModal
        show={showJobApplicantShortListedModal}
        onHide={() => setShowJobApplicantShortListedModal(false)}
        jobID={jobDetailsData.jobID}
      />
      <Modal
        show={show}
        onHide={onHide}
        // className={styles["adminJobDetailsModal-custom"]}
        //   size="sm"
        //   dialogClassName="modal-90w"
        dialogClassName="custom-modal-for-companyDetails"
        // dialogClassName={clsx(styles["adminJobDetailsModalcustom"])}
        aria-labelledby="contained-modal-title-vcenter"
        centered={"true"}
        backdrop="static"
        keyboard="false"
      >
        <Modal.Header className="px-4" closeButton>
          <Modal.Title
            className="ms-auto"
            id="contained-modal-title-vcenter"
            centered
          >
            Job Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={clsx(styles["job-page-wrapper"])}>
            <div className={clsx(styles["job-ad-wrapper"])}>
              <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
                Job Title - {jobDetailsData.title}
              </h1>
              <div className={clsx(styles["jobDetailsOptionBtn-wrapper"])}>
                <JobDetailsOptionBtn handleSelectOption={handleSelectOption} />
              </div>
              <div className={clsx(styles["job-ad-companyName"])}>
                Company Name - {jobDetailsData.companyName}
              </div>
              <div className={clsx(styles["job-ad-deadline"])}>
                Application deadline-{" "}
                {formatDate(jobDetailsData.applicationDeadline)}
              </div>
              {/* <div className={clsx(styles["job-ad-apply-btn-wrapper"])}>
              <Button variant="contained">Apply From Company Site</Button>
              <Button variant="contained">
              Apply From Job-Space
              </Button>
            </div> */}
              <div className={clsx(styles["job-ad-description-wrapper"])}>
                <div className={clsx(styles["job-ad-tags-wrapper"])}>
                  <div className={clsx(styles["job-ad-tag"])}>
                    <div>
                      <LocalAtmIcon fontSize="inherit" />
                      {` `}
                      Salary Estimation
                    </div>
                    <div>
                      ${jobDetailsData.salaryEstimationStart}k - $
                      {jobDetailsData.salaryEstimationEnd}k per year
                    </div>
                  </div>
                  {/* <div className={clsx(styles["job-ad-tag"])}>
                    <div>
                      <ManageAccountsIcon fontSize="inherit" />
                      {` `}
                      Skill Required
                    </div>
                    <div>React</div>
                  </div> */}
                  <div className={clsx(styles["job-ad-tag"])}>
                    <div>
                      <BusinessCenterIcon fontSize="inherit" />
                      {` `}
                      Job Type
                    </div>
                    <div>{jobDetailsData.jobType}</div>
                  </div>
                  <div className={clsx(styles["job-ad-tag"])}>
                    <div>
                      <PersonSearchIcon fontSize="inherit" />
                      {` `}
                      Total Hiring
                    </div>
                    <div>{jobDetailsData.totalHiringNumber}</div>
                  </div>
                  <div className={clsx(styles["job-ad-tag"])}>
                    <div>
                      <WorkHistoryIcon fontSize="inherit" />
                      {` `}
                      Required Experience
                    </div>
                    <div>{jobDetailsData.totalExperienceInYears}+ years</div>
                  </div>
                </div>
                <Typography variant="h6" color="initial" mt={5}>
                  Company Description
                </Typography>
                <Typography variant="h7" color="initial">
                  {jobDetailsData.companyDescription}
                </Typography>
                <Typography variant="h6" color="initial" mt={5}>
                  Company Address
                </Typography>
                <Typography variant="h7" color="initial">
                  {jobDetailsData.companyAddress}
                </Typography>
                <Typography variant="h6" color="initial" mt={5}>
                  Company Website
                </Typography>
                <Typography variant="h7" color="initial">
                  {jobDetailsData.companyURl}
                </Typography>
                <Typography variant="h6" color="initial" mt={5}>
                  Contact Email
                </Typography>
                <Typography variant="h7" color="initial">
                  {jobDetailsData.companyEmail}
                </Typography>
                <Typography variant="h6" color="initial" mt={5}>
                  Contact Phone
                </Typography>
                <Typography variant="h7" color="initial">
                  {jobDetailsData.companyPhoneNumber}
                </Typography>
                <Typography variant="h6" color="initial" mt={5}>
                  Job Description
                </Typography>
                <Typography variant="h7" color="initial">
                  {jobDetailsData.jobDescription}
                </Typography>
                <Typography variant="h6" color="initial" mt={5}>
                  Required Skills
                </Typography>
                <Typography variant="h7" color="initial">
                  {jobDetailsData.skillReq}
                </Typography>
                <Typography variant="h6" color="initial" mt={5}>
                  Job Location
                </Typography>
                <Typography variant="h7" color="initial">
                  {jobDetailsData.jobLocation}
                </Typography>
              </div>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default AdminJobDetailsModal;
