// import jobMarketGif from "../../assets/jobMarket.gif";
import jobMarketGif from "../../assets/job-market.json";
import Lottie from "lottie-react";
import { Typewriter } from "react-simple-typewriter";
import styles from "./home.module.css";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Button, Grid } from "@mui/material";
import RegistrationForm from "../../components/signinModal/signinBody/RegistrationForm/EmployeeRegistrationForm/EmployeeRegistrationForm";
import { useEffect, useState } from "react";
import { FormControl, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useSearchParams } from "react-router-dom";
import JobList from "../../components/JobList/JobList";
import Divider from "@mui/material/Divider";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import SigninModal from "../../components/signinModal/SigninModal";
import LoginToCompanyAccountModal from "./components/LoginToCompanyAccountModal/LoginToCompanyAccountModal";
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
const CustomTextField = styled(TextField)({
  backgroundColor: "white",
  "& input": {
    height: "3.5rem", // Adjust the height as needed
    // borderRadius: '20%'
  },
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "red",
    borderRadius: "10px",
    // borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px solid black",
      borderRadius: "10px",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
      borderRadius: "10px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
      borderRadius: "10px",
    },
  },
});

const Home = () => {
  const [openSignInModal, setOpenSignInModal] = useState(false);
  const [openLoginToCompanyAccountModal, setOpenLoginToCompanyAccountModal] =
    useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  const [searchParams] = useSearchParams();
  const queryParamValue = searchParams.get("type");
  console.log(queryParamValue);
  const [searchQuery, setSearchQuery] = useState({
    type: searchParams.get("type"),
    place: searchParams.get("place"),
  });
  useEffect(() => {
    if (localStorage.getItem("JS_userData")) {
      setUserData(JSON.parse(localStorage.getItem("JS_userData")));
    }
  }, []);
  const searchJobListByQueries = (e) => {
    e.preventDefault();
    if (searchQuery.type && searchQuery.place) {
      // console.log('both exist')
      navigate(`/jobs?type=${searchQuery.type}&place=${searchQuery.place}`);
    } else if (searchQuery.type) {
      // console.log('search query naiw')
      navigate(`/jobs?type=${searchQuery.type}`);
    } else if (searchQuery.place) {
      navigate(`/jobs?place=${searchQuery.place}`);
    } else {
      return;
      // navigate(`/jobs`);
    }
    // navigate(`/jobs?type=${searchQuery.type}&place=${searchQuery.place}`);
  };
  const handleEmployeeJobPostButtonClick = () => {
    // console.log(userData.data.userType);
    if (localStorage.getItem("JS_userData")) {
      setUserData(JSON.parse(localStorage.getItem("JS_userData")));
      if (userData?.data?.userType === "Company") {
        navigate(`/company/${userData.data.userID}`);
      } else if (
        userData?.data?.userType === "Employee" ||
        userData?.data?.userType === "Admin"
      ) {
        setOpenLoginToCompanyAccountModal(true);
      }
    } else {
      setUserData("");
      setOpenSignInModal(true);
    }
  };
  return (
    <div className={styles["home-wrapper"]}>
      <SigninModal
        show={openSignInModal}
        onHide={() => setOpenSignInModal(false)}
      />
      <LoginToCompanyAccountModal
        show={openLoginToCompanyAccountModal}
        onHide={() => setOpenLoginToCompanyAccountModal(false)}
      />

      <div className={styles["job-search-wrapper"]}>
        <FormControl
          fullWidth
          component="form"
          onSubmit={searchJobListByQueries}
        >
          <Typography
            variant="h4"
            color="#C1BAEB"
            style={{
              fontFamily: "Proxima Nova",
              fontWeight: "bold",
              marginTop: "6rem",
              padding: "1rem",
            }}
          >
            Find the <span style={{ color: "white" }}>right</span> job.
          </Typography>
          <div className={styles["job-search-field-wrapper"]}>
            <CustomTextField
              id="outlined-basic"
              label="WHAT?"
              value={searchQuery.type}
              placeholder="Job title, skills or Keywords"
              variant="filled"
              onChange={(e) =>
                setSearchQuery({ ...searchQuery, type: e.target.value })
              }
              type="search"
              // required
              size="large"
              sx={{
                borderRight: "0.5px solid rgba(0, 0, 0, 0.315)",
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
              }}
            />
            {/* <Divider
              orientation="vertical"
              flexItem
              sx={{
                background: "rgba(0, 0, 0, 0.315)",
              }}
            /> */}
            {/* <div
              style={{
                background: "rgba(0, 0, 0, 0.315)",
                height: '10px'
              }}
            ></div> */}
            <CustomTextField
              id="filled-basic"
              label="WHERE?"
              value={searchQuery.place}
              placeholder="City, State, Contry, or Remote"
              variant="filled"
              onChange={(e) =>
                setSearchQuery({ ...searchQuery, place: e.target.value })
              }
              type="search"
              sx={{
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
              // required
            />
          </div>
          <div className={styles["search-btn-wrapper"]}>
            <Button
              type="submit"
              variant="contained"
              // onClick={() => searchJobListByQueries()}
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
              // disabled={searchQuery.type && searchQuery.place ? false : true}
            >
              Search
            </Button>
          </div>
        </FormControl>
        <Grid
          container
          justifyContent={"end"}
          sx={{
            margin: "1rem",
          }}
        >
          <Button
            variant="outlined"
            endIcon={<ArrowRightAltIcon />}
            sx={{
              padding: "0.7rem",
              borderColor: "#643393",
              // borderColor: "#F6953F",
              // borderRadius: "20px",
              // background: "#643393",
              color: "#F6953F",
              "&:hover": {
                // backgroundColor: "#653393cf",

                borderColor: "#f6943fbc",
                boxShadow: "none",
              },
            }}
            onClick={handleEmployeeJobPostButtonClick}
          >
            Employers / Post Job
          </Button>
        </Grid>
      </div>
    </div>
  );
};

export default Home;
