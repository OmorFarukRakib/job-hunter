import { TextField, InputAdornment } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import clsx from "clsx";
import styles from "./employeeRegistrationForm.module.css";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  firstName: Yup.string()
    .required("First name is required")
    .max(50, "First name can not be longer than 50 letters"),
  lastName: Yup.string()
    .required("Last name is required")
    .max(50, "Last name can not be longer than 50 letters"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const EmployeeRegistrationForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log("ok");
      console.log(JSON.stringify(values, null, 2));
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      //   formik.resetForm();
    },
  });
  return (
    <FormControl
      className={clsx(styles["employeeRegistrationForm-control"])}
      component="form"
      onSubmit={formik.handleSubmit}
      fullWidth
    >
      <TextField
        fullWidth
        label="First Name"
        id="firstName"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.firstName && !!formik.errors.firstName}
        helperText={formik.touched.firstName && formik.errors.firstName}
      />
      <TextField
        fullWidth
        label="Last Name"
        id="lastName"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastName}
        error={formik.touched.lastName && !!formik.errors.lastName}
        helperText={formik.touched.lastName && formik.errors.lastName}
      />
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
      <TextField
        fullWidth
        label="ConfirmPassword"
        type="password"
        id="confirmPassword"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.confirmPassword}
        error={
          formik.touched.confirmPassword && !!formik.errors.confirmPassword
        }
        helperText={
          formik.touched.confirmPassword && formik.errors.confirmPassword
        }
      />
      <FormControlLabel
        required
        control={<Checkbox />}
        label="I have read and agree to the terms"
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={formik.isSubmitting}
      >
        Sign up
      </Button>
    </FormControl>
  );
};

export default EmployeeRegistrationForm;
