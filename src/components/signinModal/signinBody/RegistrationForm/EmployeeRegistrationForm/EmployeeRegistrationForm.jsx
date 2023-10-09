import { TextField, InputAdornment, Grid } from "@mui/material";
import axios from "axios";
import EmailIcon from "@mui/icons-material/Email";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import clsx from "clsx";
import styles from "./employeeRegistrationForm.module.css";
import { Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import TermAndConditions from "../../../../TermsAndConditions/TermAndConditions";
import { useState } from "react";
import apiConfig from "../../../../../apiConfig";
// const validationSchema = Yup.object({
//   email: Yup.string()
//     .email("Invalid email address")
//     .required("Email is required"),
//   firstName: Yup.string()
//     .required("First name is required")
//     .max(50, "First name can not be longer than 50 letters"),
//   lastName: Yup.string()
//     .required("Last name is required")
//     .max(50, "Last name can not be longer than 50 letters"),
//   password: Yup.string()
//     .required("Password is required")
//     .min(6, "Password must be at least 8 characters"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password"), null], "Passwords must match")
//     .required("Confirm Password is required"),
// });

const EmployeeRegistrationForm = () => {
  const [openTermsAndConditions, setOpenTermsAndConditions] = useState(false);
  const [regiFormData, setRegiFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    authCode: "",
    password: "",
    confirmPassword: "",
  });
  const [isRegiFormSubmitting, setIsRegiFormSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState({
    verificationCodeLoading: false
  })
  const [errorMsg, setErrorMsg] = useState({
    emailCodeErrorMsg: "",
    regiErrorMsg: "",
  });
  const [successMsg, setSuccessMsg] = useState({
    emailCodeSuccessMsg: "",
    RegiSuccessMsg: "",
  });
  // const formik = useFormik({
  //   initialValues: {
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     password: "",
  //     confirmPassword: "",
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: async (values, { setSubmitting }) => {
  //     console.log("ok");
  //     console.log(JSON.stringify(values, null, 2));
  //     // alert(JSON.stringify(values, null, 2));
  //     try {
  //       // Make an Axios POST request with the form data
  //       const response = await axios.post(
  //         "https://api.example.com/submit",
  //         values
  //       );

  //       // Handle the response as needed
  //       console.log("Response:", response.data);

  //       // You can also perform other actions, such as navigating to a new page
  //     } catch (error) {
  //       // Handle errors here
  //       console.error("Error:", error);
  //     }
  //     setSubmitting(false);
  //     //   formik.resetForm();
  //   },
  // });

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setRegiFormData({
      ...regiFormData,
      [name]: value,
    });
  };
  const handleEmailCodeSent = async () => {
    setIsLoading({
      ...isLoading,
      verificationCodeLoading: true
    })
    setErrorMsg({
      ...errorMsg,
      emailCodeErrorMsg: "",
    });
    setSuccessMsg({
      ...successMsg,
      emailCodeSuccessMsg: "",
    });
    // Call Email Sent Code API
    try {
      const response = await axios({
        method: "post",
        url: apiConfig.baseURL + apiConfig.auth.sendVerificationCode + `?email=${regiFormData.email}`,
        // data: {
        //   email: regiFormData,
        // },
      });
      console.log('email sent code api res', response)
      const res = response.data;
      if (res.success === true) {
        setSuccessMsg({
          ...successMsg,
          emailCodeSuccessMsg:
            "Verification Code has been sent to your email! Please check!",
        });
      } else {
        setErrorMsg({
          ...errorMsg,
          emailCodeErrorMsg: "Something Went Wrong! Please Try Again!",
        });
      }
    } catch (error) {
      console.log('error from catch', error)
      setErrorMsg({
        ...errorMsg,
        emailCodeErrorMsg: "Something Went Wrong! Please Try Again!",
      });
    }
    setIsLoading({
      ...isLoading,
      verificationCodeLoading: false,
    });
    console.log("email code->");
  };
  const handleRegiFormSubmit = async (e) => {
    e.preventDefault();
    if (regiFormData.password !== regiFormData.confirmPassword) {
      setErrorMsg({
        ...errorMsg,
        regiErrorMsg: "Sorry Password Does Not Match! Please Try Again!",
      });
      return;
    }
    setIsRegiFormSubmitting(true);
    setErrorMsg({
      ...errorMsg,
      regiErrorMsg: "",
    });
    setSuccessMsg({
      ...successMsg,
      RegiSuccessMsg: "",
    });
    // Call API
    try {
      const response = await axios({
        method: "post",
        url: apiConfig.baseURL + apiConfig.auth.userRegi,
        data: {
          firstName: regiFormData.firstName,
          lastname: regiFormData.lastName,
          lastEducationDegree: "",
          aimedIndustry: "",
          salaryExpMin: 0,
          address: "",
          email: regiFormData.email,
          phoneNumber: "",
          password: regiFormData.password,
          authCode: regiFormData.authCode,
        },
      });
      const res = response.data 
      if(res.success === true) {
        setSuccessMsg({
          ...successMsg,
          RegiSuccessMsg: "Congratulations! Your account has been successfully created. Please login to continue",
        });
      }else {
        if (res.errorCode === 102) {
          setErrorMsg({
            ...errorMsg,
            regiErrorMsg: "Email Already registered! Try again with another email!",
          });
        } else {
          setErrorMsg({
            ...errorMsg,
            regiErrorMsg: "Something Went Wrong! Please Try Again Later!",
          });
        }
      }
      
    } catch (error) {
      setErrorMsg({
        ...errorMsg,
        regiErrorMsg: "Something Went Wrong! Please Try Again Later!",
      });
      
    }
    console.log("regi submited");
    setIsRegiFormSubmitting(false);
  };
  const handleOpenTermsAndConditions = () => {
    setOpenTermsAndConditions(true);
  };
  return (
    <>
      <TermAndConditions
        show={openTermsAndConditions}
        onHide={() => setOpenTermsAndConditions(false)}
      />
      <FormControl
        className={clsx(styles["employeeRegistrationForm-control"])}
        component="form"
        onSubmit={handleRegiFormSubmit}
        fullWidth
      >
        <TextField
          fullWidth
          label="First Name"
          id="firstName"
          name="firstName"
          required
          value={regiFormData.firstName}
          onChange={handleFormDataChange}
        />
        <TextField
          fullWidth
          required
          label="Last Name"
          id="lastName"
          name="lastName"
          onChange={handleFormDataChange}
          value={regiFormData.lastName}
        />
        <Grid
          container
          spacing={2}
          justifyContent={"start"}
          alignItems={"center"}
        >
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Email"
              id="email"
              name="email"
              type="email"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              value={regiFormData.email}
              onChange={handleFormDataChange}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="outlined"
              size="small"
              disabled={
                !regiFormData.email || isLoading.verificationCodeLoading
              }
              onClick={handleEmailCodeSent}
            >
              {isLoading.verificationCodeLoading === true
                ? "Sending Verification Code.."
                : "Send Code"}
            </Button>
          </Grid>
        </Grid>
        {successMsg.emailCodeSuccessMsg && (
          <Typography variant="h7" color="green" align="center">
            {successMsg.emailCodeSuccessMsg}
          </Typography>
        )}
        {errorMsg.emailCodeErrorMsg && (
          <Typography variant="h7" color="red" align="center">
            {errorMsg.emailCodeErrorMsg}
          </Typography>
        )}
        <TextField
          fullWidth
          label="Email Code"
          // type="password"
          id="authCode"
          name="authCode"
          required
          onChange={handleFormDataChange}
          value={regiFormData.authCode}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          id="password"
          name="password"
          required
          onChange={handleFormDataChange}
          value={regiFormData.password}
        />
        <TextField
          fullWidth
          label="ConfirmPassword"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={handleFormDataChange}
          value={regiFormData.confirmPassword}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <FormControlLabel
            required
            control={<Checkbox />}
            label="I have read and agree to the terms"
          />
          <div
            style={{
              textDecoration: "underline",
              color: "#643393",
              cursor: "pointer",
            }}
            onClick={handleOpenTermsAndConditions}
          >
            show terms & conditions
          </div>
        </div>
        {errorMsg.regiErrorMsg && (
          <Typography variant="h7" color="red" align="center">
            {errorMsg.regiErrorMsg}
          </Typography>
        )}
        {successMsg.RegiSuccessMsg && (
          <Typography variant="h7" color="green" align="center">
            {successMsg.RegiSuccessMsg}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isRegiFormSubmitting}
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
          {isRegiFormSubmitting === true ? "Please Wait..." : "Sign up"}
        </Button>
      </FormControl>
    </>
  );
};

export default EmployeeRegistrationForm;
