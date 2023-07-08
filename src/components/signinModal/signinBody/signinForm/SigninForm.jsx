import { TextField, InputAdornment } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { FormControl } from "@mui/material";
import clsx from "clsx";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import styles from "./signinForm.module.css";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
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
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={formik.isSubmitting}
      >
        Log in
      </Button>
    </FormControl>
  );
};

export default LoginForm;
