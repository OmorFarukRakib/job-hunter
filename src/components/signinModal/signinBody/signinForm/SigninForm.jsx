import { TextField, InputAdornment } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { FormControl } from "@mui/material";
import clsx from "clsx";
import { Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import styles from "./signinForm.module.css";
import { useState } from "react";
import axios from "axios";
import apiConfig from "../../../../apiConfig";
// const validationSchema = Yup.object({
//   email: Yup.string()
//     .email("Invalid email address")
//     .required("Email is required"),
//   password: Yup.string().required("Password is required"),
// });

const LoginForm = (props) => {
  const navigate = useNavigate();
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState({
    isLogginSubmitting: false,
  });
  const [errorMsg, setErrorMsg] = useState({
    loginErrorMsg: "",
  });
  const gotToForgotPasswordPage = () => {
    props.modalHideFun();
    navigate("/forgot_password");
  };
  // const formik = useFormik({
  //   initialValues: {
  //     email: "",
  //     password: "",
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: (values, { setSubmitting }) => {
  //     // console.log("ok");
  //     // console.log(JSON.stringify(values, null, 2));
  //     // alert(JSON.stringify(values, null, 2));
  //     if (values.email === "company@gmail.com" && values.password === "12345") {
  //       props.modalHideFun();
  //       localStorage.setItem("authToken", "token");
  //       navigate("/company/123");
  //     } else if (
  //       values.email === "user@gmail.com" &&
  //       values.password === "12345"
  //     ) {
  //       props.modalHideFun();
  //       localStorage.setItem("authToken", "userToken");
  //       navigate("/user/123");
  //     } else {
  //       alert("Wrong login credentials");
  //     }
  //     setSubmitting(false);
  //     //   formik.resetForm();
  //   },
  // });

  const handleLoginFormChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };
  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading({
      isLogginSubmitting: true,
    });
    setErrorMsg({
      loginErrorMsg: "",
    });
    // API call
    try {
      const response = await axios({
        method: "post",
        url: apiConfig.baseURL + apiConfig.auth.login,
        data: {
          email: loginFormData.email,
          password: loginFormData.password,
        },
      });
      const res = response.data;
      if (res.success === true) {
        if (res.data.profileStatus === "Approved"){
           localStorage.setItem("JS_userData", JSON.stringify(res));
           props.modalHideFun();
           if (res.data.userType === "Company") {
             navigate(`/company/${res.data.userID}`);
           } else if (res.data.userType === "Employee") {
             navigate(`/user/${res.data.userID}`);
           } else if (res.data.userType === "Admin") {
             navigate(`/admin/${res.data.userID}`);
           }

        }else{
          setErrorMsg({
            loginErrorMsg:
              "The Acount is not Approved by the Admin! Please wait or contact the Admin",
          });
        }
         
      } else {
        setErrorMsg({
          loginErrorMsg:
            "Email or Password is invalid! Please Try Again later!",
        });
      }
    } catch (error) {
      setErrorMsg({
        loginErrorMsg: "Something Went Wrong! Please Try Again later!",
      });
    }
    setIsLoading({
      isLogginSubmitting: false,
    });
  };

  return (
    <FormControl
      className={clsx(styles["loginForm-control"])}
      component="form"
      onSubmit={handleLoginFormSubmit}
      fullWidth
    >
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
        onChange={handleLoginFormChange}
        value={loginFormData.email}
      />
      <br />
      <TextField
        fullWidth
        label="Password"
        type="password"
        id="password"
        name="password"
        required
        onChange={handleLoginFormChange}
        value={loginFormData.password}
      />
      <br />
      <div
        className={styles["forgot_password_text"]}
        onClick={gotToForgotPasswordPage}
      >
        Forgot password?
      </div>
      {errorMsg.loginErrorMsg && (
        <Typography variant="h7" color="red" align="center">
          {errorMsg.loginErrorMsg}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isLoading.isLogginSubmitting}
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
        {isLoading.isLogginSubmitting === true ? "Please Wait.." : "Log in"}
      </Button>
    </FormControl>
  );
};

export default LoginForm;
