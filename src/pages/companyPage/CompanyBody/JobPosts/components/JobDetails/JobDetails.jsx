import { useState } from "react";
import { useParams } from "react-router-dom";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import clsx from "clsx";
import styles from "./JobDetails.module.css";
import { Button, Grid, Typography } from "@mui/material";
import JobDetailsOptionBtn from "./jobDetailsOptionBtn/JobDetailsOptionBtn";
import JobApplicantModal from "../JobApplicantsModal/JobApplicantsModal";
import JobPostFormModal from "../JobPostFormModal/JobPostFormModal";
import JobPostRemoveModal from "../JobPostRemoveModal/JobPostRemoveModal";
import JobApplicantShortListedModal from "../JobApplicantShortListedModal/JobApplicantShortListedModal";
import { useEffect } from "react";
import axios from "axios";
import apiConfig from "../../../../../../apiConfig";
import RiseLoader from "react-spinners/RiseLoader";
import JobPostEditModal from "../JobPostEditModal/JobPostEditModal";

const Job = ({ jobID }) => {
  // const { jobID } = useParams();
  const [jobPostEditModalShow, setJobPostEditModalShow] = useState(false);
  const [jobPostRemoveModalShow, setJobPostRemoveModalShow] = useState(false);
  const [applicantModalShow, setApplicantModalShow] = useState(false);
  const [
    showJobApplicantShortListedModal,
    setShowJobApplicantShortListedModal,
  ] = useState(false);
  const [jobDetails, setJobDetails] = useState({});
  const [fetchAgain, setFetchAgain] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState({
    jobDetailsErrorMsg: "",
  });
  const fetchJobDetailsByID = async (jobID) => {
    const userData = JSON.parse(localStorage.getItem("JS_userData"));
    const token = userData.data.token.accessToken;
    setIsLoading(true);
    setErrorMsg({
      ...errorMsg,
      jobDetailsErrorMsg: "",
    });
    try {
      const response = await axios({
        method: "GET",
        url:
          apiConfig.baseURL +
          apiConfig.company.fetchJobDetailsByID +
          `?jobId=${jobID}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("job details api res", response);
      const res = response.data;
      if (res.success === true) {
        console.log(res);
        setJobDetails(res.data.job);
      } else {
        setErrorMsg({
          ...errorMsg,
          jobDetailsErrorMsg: "Sorry! This Job Does Not Exist!",
        });
      }
    } catch (error) {
      console.log("error from catch", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchJobDetailsByID(jobID);
    console.log(jobID);
    console.log(jobDetails)
  }, [jobID, fetchAgain]);

  const handleSelectOption = (selectedOption) => {
    console.log(selectedOption);
    if (selectedOption === "applicants") {
      setApplicantModalShow(true);
    } else if (selectedOption === "edit") {
      setJobPostEditModalShow(true);
    } else if (selectedOption === "short-listed-applicant") {
      // here will
      setShowJobApplicantShortListedModal(true);
    } else if (selectedOption === "remove") {
      setJobPostRemoveModalShow(true);
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
        jobID={jobDetails.jobID}
        setFetchAgain={setFetchAgain}
      />
      <JobApplicantShortListedModal
        show={showJobApplicantShortListedModal}
        onHide={() => setShowJobApplicantShortListedModal(false)}
        jobID={jobDetails.jobID}
      />
      {/* <JobPostFormModal
        setFetchAgain={setFetchAgain}
        show={jobPostEditModalShow}
        onHide={() => setJobPostEditModalShow(false)}
        formData={jobDetails}
      /> */}

      <JobPostEditModal
        setFetchAgain={setFetchAgain}
        show={jobPostEditModalShow}
        onHide={() => setJobPostEditModalShow(false)}
        formData={jobDetails}
      />
      <JobPostRemoveModal
        show={jobPostRemoveModalShow}
        onHide={() => setJobPostRemoveModalShow(false)}
        removePostID={jobDetails.jobID}
        setFetchAgain={setFetchAgain}
      />

      {isLoading === true ? (
        <>
          <Grid container justifyContent={"center"} mt={10}>
            <RiseLoader color="#F6953F" />
          </Grid>
        </>
      ) : (
        <>
          {errorMsg.jobDetailsErrorMsg.length > 0 ? (
            <div>
              <Typography variant="h4" color="red" align="center" mt={10}>
                {errorMsg.jobDetailsErrorMsg}
              </Typography>
            </div>
          ) : (
            <>
              <div className={clsx(styles["job-page-wrapper"])}>
                <div className={clsx(styles["job-ad-wrapper"])}>
                  <div
                    style={{
                      color: "#232758",
                      // color: "white",
                      fontWeight: "500",
                      display: "flex",
                      justifyContent: "center",
                      justifyItems: "center",
                      // width: '100%',
                      // textAlign: "center",
                      marginTop: "2.5rem",
                    }}
                  >
                    This is how your Job Ad will be shown to everyone
                  </div>
                  <h1 style={{ textAlign: "center" }}>{jobDetails.title}</h1>
                  <div className={clsx(styles["jobDetailsOptionBtn-wrapper"])}>
                    <JobDetailsOptionBtn
                      handleSelectOption={handleSelectOption}
                    />
                  </div>
                  <div className={clsx(styles["job-ad-companyName"])}>
                    {jobDetails.companyName}
                  </div>
                  <div className={clsx(styles["job-ad-deadline"])}>
                    Application deadline -{" "}
                    {formatDate(jobDetails.applicationDeadline)}
                  </div>
                  <div className={clsx(styles["job-ad-apply-btn-wrapper"])}>
                    <Button variant="contained" disabled>
                      Apply From Company Site
                    </Button>
                    <Button variant="contained" disabled>
                      Apply From Job-hunter
                    </Button>
                  </div>
                  <div className={clsx(styles["job-ad-description-wrapper"])}>
                    <div className={clsx(styles["job-ad-tags-wrapper"])}>
                      <div className={clsx(styles["job-ad-tag"])}>
                        <div>
                          <LocalAtmIcon fontSize="inherit" />
                          {` `}
                          Salary Estimation
                        </div>
                        <div>
                          ${jobDetails.salaryEstimationStart} - $
                          {jobDetails.salaryEstimationEnd} per year
                        </div>
                      </div>
                      {/* <div className={clsx(styles["job-ad-tag"])}>
                    <div>
                      <ManageAccountsIcon fontSize="inherit" />
                      {` `}
                      Skill Required
                    </div>
                    <div>{jobDetails.skillReq}</div>
                  </div> */}
                      <div className={clsx(styles["job-ad-tag"])}>
                        <div>
                          <BusinessCenterIcon fontSize="inherit" />
                          {` `}
                          Job Type
                        </div>
                        <div>{jobDetails.jobType}</div>
                      </div>
                      <div className={clsx(styles["job-ad-tag"])}>
                        <div>
                          <PersonSearchIcon fontSize="inherit" />
                          {` `}
                          Total Hiring
                        </div>
                        <div>{jobDetails.totalHiringNumber}</div>
                      </div>
                      <div className={clsx(styles["job-ad-tag"])}>
                        <div>
                          <WorkHistoryIcon fontSize="inherit" />
                          {` `}
                          Required Experience
                        </div>
                        <div>{jobDetails.totalExperienceInYears}</div>
                      </div>
                    </div>
                    <Typography variant="h6" color="initial" mt={5}>
                      Company Description
                    </Typography>
                    <Typography variant="h7" color="initial">
                      {jobDetails.companyDescription}
                    </Typography>
                    <Typography variant="h6" color="initial" mt={5}>
                      Company Address
                    </Typography>
                    <Typography variant="h7" color="initial">
                      {jobDetails.companyAddress}
                    </Typography>
                    <Typography variant="h6" color="initial" mt={5}>
                      Company Website
                    </Typography>
                    <Typography variant="h7" color="initial">
                      {jobDetails.companyURl}
                    </Typography>
                    <Typography variant="h6" color="initial" mt={5}>
                      Contact Email
                    </Typography>
                    <Typography variant="h7" color="initial">
                      {jobDetails.companyEmail}
                    </Typography>
                    <Typography variant="h6" color="initial" mt={5}>
                      Contact Phone
                    </Typography>
                    <Typography variant="h7" color="initial">
                      {jobDetails.companyPhoneNumber}
                    </Typography>
                    <Typography variant="h6" color="initial" mt={5}>
                      Job Description
                    </Typography>
                    <Typography variant="h7" color="initial">
                      {jobDetails.jobDescription}
                    </Typography>
                    <Typography variant="h6" color="initial" mt={5}>
                      Required Skills
                    </Typography>
                    <Typography variant="h7" color="initial">
                      {jobDetails.skillReq}
                    </Typography>
                    <Typography variant="h6" color="initial" mt={5}>
                      Job Location
                    </Typography>
                    <Typography variant="h7" color="initial">
                      {jobDetails.jobLocation}
                    </Typography>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Job;
