// import jobMarketGif from "../../assets/jobMarket.gif";
import jobMarketGif from "../../assets/job-market.json";
import Lottie from "lottie-react";
import { Typewriter } from "react-simple-typewriter";
import styles from "./home.module.css";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import RegistrationForm from "../../components/signinModal/signinBody/RegistrationForm/EmployeeRegistrationForm/EmployeeRegistrationForm";

const CustomMUIBtn = styled(Button)({
  backgroundColor: "#4CAF50",
  padding: "0.7rem",
  borderRadius: "20px",
  "&:hover": {
    backgroundColor: "green",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={styles["home-wrapper"]}>
      <h1
        style={{
          textTransform: "uppercase",
        }}
      >
        Are you looking for {` `}
        <span style={{ color: "red", fontWeight: "bold" }}>
          {/* Style will be inherited from the parent element */}
          <Typewriter
            words={["Your Dream Job?", "an exceptional employee?"]}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={70}
            delaySpeed={2000}
          />
        </span>
      </h1>
      <div className={styles["jobMarketGif-wrapper"]}>
        <Lottie animationData={jobMarketGif} loop={true} />
      </div>
      <div>
        <CustomMUIBtn variant="contained" onClick={() => navigate("/jobs")}>
          Find Your Dream Job
        </CustomMUIBtn>
        <CustomMUIBtn
          variant="contained"
          onClick={() => navigate("/jobs")}
          style={{ marginLeft: "2rem" }}
        >
          Post a job circular
        </CustomMUIBtn>
      </div>
    </div>
  );
};

export default Home;
