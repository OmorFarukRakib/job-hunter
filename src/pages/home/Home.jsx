// import jobMarketGif from "../../assets/jobMarket.gif";
import jobMarketGif from "../../assets/job-market.json";
import Lottie from "lottie-react";
import { Typewriter } from "react-simple-typewriter";
import styles from "./home.module.css";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import RegistrationForm from "../../components/signinModal/signinBody/RegistrationForm/EmployeeRegistrationForm/EmployeeRegistrationForm";
import { useEffect, useState } from "react";

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
  const [userData, setUserData] = useState("");
  useEffect(() => {
    if (localStorage.getItem("JS_userData")) {
      setUserData(JSON.parse(localStorage.getItem("JS_userData")));
    }
  }, []);
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
        <Link to={'/jobs'}>
          <Button
            variant="contained"
            // onClick={() => navigate("/jobs")}
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
            Find Your Dream Job
          </Button>
        </Link>
        <Button
          variant="contained"
          disabled={userData?.data?.userType !== "Company"}
          onClick={() => navigate(`/company/${userData?.data?.userID}`)}
          style={{ marginLeft: "2rem" }}
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
          Post a job circular
        </Button>
        {/* <CustomMUIBtn variant="contained" onClick={() => navigate("/jobs")}>
          Find Your Dream Job
        </CustomMUIBtn>
        <CustomMUIBtn
          variant="contained"
          onClick={() => navigate("/jobs")}
          style={{ marginLeft: "2rem" }}
        >
          Post a job circular
        </CustomMUIBtn> */}
      </div>
    </div>
  );
};

export default Home;
