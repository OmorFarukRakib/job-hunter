import { useState } from "react";
import { useParams } from "react-router-dom";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import SigninModal from "../../components/signinModal/SigninModal";
import JobApplyModal from "../../components/JobApplyModal/JobApplyModal";
import clsx from "clsx";
import styles from "./job.module.css";
import { Button, Typography, Grid } from "@mui/material";
import axios from "axios";
import apiConfig from "../../apiConfig";
import { useEffect } from "react";
import RiseLoader from "react-spinners/RiseLoader";

const Job = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showJobApplyModal, setShowJobApplyModal] = useState(false);
  const [jobDetails, setJobDetails] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { jobID } = useParams();
  const userData = JSON.parse(localStorage.getItem("JS_userData"));
  const handleApplyJobFromJobSpace = () => {
    // setShowJobApplyModal(true);
    if (localStorage.getItem("JS_userData")) {
      setShowJobApplyModal(true);
    } else {
      setShowSignInModal(true);
      // alert("u can not apply without login");
    }
  };
  const goToCompanyJobPortalSite = (jobPortalLink) => {
    // const jobPortalLink = "https://www.google.com";
    if (jobPortalLink.startsWith("http")) {
      window.open(jobPortalLink, "_blank");
    } else if (jobPortalLink.startsWith("www")) {
      window.open(`https://${jobPortalLink}`, "_blank");
    } else {
      window.open(`https://www.${jobPortalLink}`, "_blank");
    }
    // const link = "www.google.com/?gws_rd=ssl";
    // console.log("should go to new tab with new link", link);
    // window.open(link, "_blank", "noopener");
  };

  const fetchJobDetails = async (jobID) => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url:
          apiConfig.baseURL +
          apiConfig.public.fetchJobDetailsByID +
          `?jobId=${jobID}`,
      });
      console.log("job details api res", response);
      const res = response.data;
      if (res.success === true) {
        setJobDetails(res.data.job);
      } else {
        setErrorMsg("This Job Does Not Exist!");
      }
    } catch (error) {
      setErrorMsg("Something Went Wrong! Please Try Again Later!");
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchJobDetails(jobID);
  }, [jobID]);
  function formatDate(initialDate) {
    const date = new Date(initialDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add 1 to month since it's zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  return (
    <div className={clsx(styles["page-wrapper"])}>
      <JobApplyModal
        show={showJobApplyModal}
        onHide={setShowJobApplyModal}
        jobId={jobDetails.jobID}
      />
      <SigninModal show={showSignInModal} onHide={setShowSignInModal} />
      {isLoading === true ? (
        <>
          <Grid container justifyContent={"center"} mt={10}>
            <RiseLoader color="#F6953F" />
          </Grid>
        </>
      ) : (
        <>
          {errorMsg.length > 0 ? (
            <div>
              <Typography variant="h4" color="red" align="center" mt={10}>
                {errorMsg}
              </Typography>
            </div>
          ) : (
            <>
              <div className={clsx(styles["job-page-wrapper"])}>
                <div className={clsx(styles["job-ad-wrapper"])}>
                  {/* <div
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
                  </div> */}
                  <h1 style={{ textAlign: "center" }}>{jobDetails.title}</h1>
                  {/* <div className={clsx(styles["jobDetailsOptionBtn-wrapper"])}>
                    <JobDetailsOptionBtn
                      handleSelectOption={handleSelectOption}
                    />
                  </div> */}
                  <div className={clsx(styles["job-ad-companyName"])}>
                    {jobDetails.companyName}
                  </div>
                  <div className={clsx(styles["job-ad-deadline"])}>
                    Application deadline -{" "}
                    {formatDate(jobDetails.applicationDeadline)}
                  </div>
                  {userData?.data?.userType === "Employee" ? (
                    <div className={clsx(styles["job-ad-apply-btn-wrapper"])}>
                      <Button
                        variant="contained"
                        disabled={jobDetails.companyJobApplyUrl.length === 0}
                        onClick={() =>
                          goToCompanyJobPortalSite(
                            jobDetails.companyJobApplyUrl
                          )
                        }
                      >
                        Apply From Company Site
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleApplyJobFromJobSpace}
                      >
                        Apply From Job Space
                      </Button>
                    </div>
                  ) : (
                    <Typography variant="h6" color="red">
                      Login as a user to Apply
                    </Typography>
                  )}

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

    </div>
  );
};

export default Job;
