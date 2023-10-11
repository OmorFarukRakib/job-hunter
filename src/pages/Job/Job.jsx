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
    console.log("should go to new tab with new link", jobPortalLink);
    window.open(jobPortalLink, "_blank", "noopener");
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
                        Apply From Job-hunter
                      </Button>
                    </div>
                  ) : (
                    <Typography variant="h6" color="red">Login to Apply</Typography>
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

      {/* <div className={clsx(styles["job-page-wrapper"])}>
        <div className={clsx(styles["job-ad-wrapper"])}>
          <h1 style={{ textAlign: "center" }}>
            Job Title - Software Developer - {jobID}
          </h1>
          <div className={clsx(styles["job-ad-companyName"])}>
            Company Name - X infra tech
          </div>
          <div className={clsx(styles["job-ad-deadline"])}>
            Application deadline- 20-20-25
          </div>
          <div className={clsx(styles["job-ad-apply-btn-wrapper"])}>
            <Button
              variant="contained"
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
              Apply From Company Site
            </Button>
            <Button
              variant="contained"
              onClick={handleApplyJobFromJobSpace}
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
              Apply From Job-Space
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
                <div>$100k - $200k per year</div>
              </div>
              <div className={clsx(styles["job-ad-tag"])}>
                <div>
                  <ManageAccountsIcon fontSize="inherit" />
                  {` `}
                  Skill Required
                </div>
                <div>React</div>
              </div>
              <div className={clsx(styles["job-ad-tag"])}>
                <div>
                  <BusinessCenterIcon fontSize="inherit" />
                  {` `}
                  Job Type
                </div>
                <div>Full-Time</div>
              </div>
              <div className={clsx(styles["job-ad-tag"])}>
                <div>
                  <PersonSearchIcon fontSize="inherit" />
                  {` `}
                  Total Hiring
                </div>
                <div>4</div>
              </div>
              <div className={clsx(styles["job-ad-tag"])}>
                <div>
                  <WorkHistoryIcon fontSize="inherit" />
                  {` `}
                  Required Experience
                </div>
                <div>2+ years</div>
              </div>
            </div>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam,
            itaque explicabo. Soluta eius voluptas ipsa quos nihil fuga
            <br />
            consectetur magnam quasi consequatur nisi! Aperiam perferendis
            quidem neque! Aspernatur repudiandae quia, nisi asperiores quaerat,
            in quis aliquam aut at suscipit rerum hic consequuntur eligendi odio
            alias tenetur sit. Magni, sunt cum harum dolorum laudantium amet!
            <br />
            <br />
            consectetur magnam quasi consequatur nisi! Aperiam perferendis
            quidem neque! Aspernatur repudiandae quia, nisi asperiores quaerat,
            in quis aliquam aut at suscipit rerum hic consequuntur eligendi odio
            alias tenetur sit. Magni, sunt cum harum dolorum laudantium amet!
            <br />
            <br />
            consectetur magnam quasi consequatur nisi! Aperiam perferendis
            quidem neque! Aspernatur repudiandae quia, nisi asperiores quaerat,
            in quis aliquam aut at suscipit rerum hic consequuntur eligendi odio
            alias tenetur sit. Magni, sunt cum harum dolorum laudantium amet!
            <br />
            <br />
            consectetur magnam quasi consequatur nisi! Aperiam perferendis
            quidem neque! Aspernatur repudiandae quia, nisi asperiores quaerat,
            in quis aliquam aut at suscipit rerum hic consequuntur eligendi odio
            alias tenetur sit. Magni, sunt cum harum dolorum laudantium amet!
            <br />
            Reprehenderit sunt dolorum ad libero autem, ab mollitia quos
            commodi? Dolorem rem quis architecto alias neque, quas officiis
            dicta soluta voluptatem. Sapiente repellat, delectus eligendi quas
            cumque
            <br />
            perspiciatis, impedit explicabo, saepe ipsum numquam veniam
            assumenda minus.
            <br />
            Dignissimos eius praesentium molestiae distinctio quisquam! Aut nam
            provident beatae, dolores obcaecati vel illum adipisci totam!
            Eligendi
            <br />
            sequi voluptates totam exercitationem, sit voluptatibus alias vel
            distinctio minima dicta labore velit facilis molestiae quisquam ipsa
            porro perferendis? Quasi deleniti dicta delectus magni voluptate
            nulla sunt at pariatur molestias atque eius rem vero expedita id
            dolor
            <br />
            quisquam illum praesentium autem laudantium voluptates adipisci
            similique, omnis, provident perspiciatis? Sit voluptates
            exercitationem, excepturi accusamus veniam quaerat numquam similique
            a neque! Aspernatur repudiandae quia, nisi asperiores quaerat, in
            quis
            <br />
            aliquam aut at suscipit rerum hic consequuntur eligendi odio alias
            tenetur sit. Magni, sunt cum harum dolorum laudantium amet!
            Reprehenderit sunt dolorum ad libero autem, ab mollitia quos
            commodi? Dolorem rem quis architecto alias neque, quas officiis
            dicta soluta
            <br />
            voluptatem. Sapiente repellat, delectus eligendi quas cumque
            perspiciatis, impedit explicabo, saepe ipsum numquam veniam
            assumenda minus. Dignissimos eius praesentium molestiae distinctio
            quisquam! Aut
            <br />
            nam provident beatae, dolores obcaecati vel illum adipisci totam!
            Eligendi sequi voluptates totam exercitationem, sit voluptatibus
            alias vel distinctio minima dicta labore velit facilis molestiae
            quisquam
            <br />
            ipsa porro perferendis? Quasi deleniti dicta delectus magni
            voluptate nulla sunt at pariatur molestias atque eius rem vero
            expedita id dolor quisquam illum praesentium autem laudantium
            voluptates adipisci
            <br />
            similique, omnis, provident perspiciatis? Sit voluptates
            exercitationem, excepturi accusamus veniam quaerat numquam similique
            a amet non inventore sunt ex explicabo cum error tempore ipsam
            sapiente dignissimos doloremque possimus eveniet consequuntur dolor
            ratione
            <br />
            sequi? Debitis tempore nihil necessitatibus aut error, architecto
            deserunt sequi ea! Numquam earum, reprehenderit quisquam similique
            <br />
            quaerat aut eius perferendis recusandae vel ex unde veniam
            dignissimos sapiente ipsum dicta enim? Incidunt impedit atque sit,
            ab exercitationem molestiae. Maxime dolorum nobis soluta aspernatur.
            Rerum dolores blanditiis repellendus, dolorum adipisci similique
            unde.
            <br />
            Quas animi quis vero laudantium maxime provident voluptatem,
            doloremque mollitia alias omnis id cupiditate illum est magnam eum
            molestias ea facilis unde voluptates! Sapiente placeat molestias
            fuga
            <br />
            consequatur sequi quaerat ducimus possimus pariatur quae quos
            voluptates officia cupiditate, in corrupti perspiciatis quisquam id
            dolore quis ab mollitia esse voluptatem aperiam nam. Quam natus
            <br />
            excepturi tempora quaerat cumque iste? Earum, sit debitis fugiat
            ipsam vel maxime cupiditate incidunt tenetur officia consequuntur
            sint id, doloremque ex, dolores beatae rem consequatur nemo maiores!
            Ullam itaque officiis a dicta consequatur voluptatum. Quia odio
            cumque eos
            <br />
            vel unde tempore, at libero modi natus aliquid magnam illum sint! In
            architecto nisi saepe vero delectus beatae optio qui consectetur
            similique sequi, quae totam dignissimos modi ipsa cupiditate unde
            excepturi, aperiam aliquid quibusdam vitae dolore error possimus
            veniam recusandae! Saepe officia perferendis magnam. Natus vel fugit
            <br />
            cumque magnam ullam quos optio sit quis deleniti iure? Voluptate
            exercitationem mollitia possimus! Odio, commodi officiis natus ex
            impedit perspiciatis atque minus ea a labore veritatis at, eveniet
            ducimus debitis optio beatae. Expedita voluptas necessitatibus esse.
            Dolor odio dolores nostrum in sint adipisci, nulla reprehenderit
            inventore facere nobis corporis, nesciunt ipsum aliquam perferendis
            et aperiam dignissimos molestiae voluptas ullam eius. Excepturi sit
            consequatur soluta cumque, deserunt voluptatibus fugit natus esse
            necessitatibus aliquid, repudiandae dignissimos at perferendis unde
            iure libero, expedita facere! Est ab eius maiores, exercitationem ea
            quae nulla, cum recusandae soluta, debitis dolorum corporis ratione
            <br />
            rerum quaerat amet cumque! Dicta aut enim voluptates accusamus
            mollitia quo repellat esse minus ratione iure provident nostrum quas
            eaque dolor rem saepe sit reiciendis, maiores aperiam quis similique
            commodi ut cumque. Quidem.
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Job;
