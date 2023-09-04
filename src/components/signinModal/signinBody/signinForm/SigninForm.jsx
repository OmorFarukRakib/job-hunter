import { TextField, InputAdornment } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { FormControl } from "@mui/material";
import clsx from "clsx";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import styles from "./signinForm.module.css";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = (props) => {
  const navigate = useNavigate();
  const gotToForgotPasswordPage = () => {
    props.modalHideFun();
    navigate('/forgot_password')
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      // console.log("ok");
      // console.log(JSON.stringify(values, null, 2));
      // alert(JSON.stringify(values, null, 2));
      if (values.email === "company@gmail.com" && values.password === "12345") {
        props.modalHideFun();
        localStorage.setItem("authToken", "token");
        navigate("/company/123");
      } else if (
        values.email === "user@gmail.com" &&
        values.password === "12345"
      ) {
        props.modalHideFun();
        localStorage.setItem("authToken", "userToken");
        navigate("/user/123");
      } else {
        alert("Wrong login credentials");
      }
      setSubmitting(false);
      //   formik.resetForm();
    },
  });

  return (
    <FormControl
      className={clsx(styles["loginForm-control"])}
      component="form"
      onSubmit={formik.handleSubmit}
      fullWidth
    >
      <TextField
        fullWidth
        label="Email"
        id="email"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        error={formik.touched.email && !!formik.errors.email}
        helperText={formik.touched.email && formik.errors.email}
      />
      <br />
      <TextField
        fullWidth
        label="Password"
        type="password"
        id="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        error={formik.touched.password && !!formik.errors.password}
        helperText={formik.touched.password && formik.errors.password}
      />
      <br />
      <div className={styles["forgot_password_text"]} onClick={gotToForgotPasswordPage}>Forgot password?</div>
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={formik.isSubmitting}
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
        Log in
      </Button>
    </FormControl>
  );
};

export default LoginForm;
