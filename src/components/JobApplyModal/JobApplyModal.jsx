import Modal from "react-bootstrap/Modal";
import clsx from "clsx";
import styles from "./jobApplyModal.module.css";
import * as Yup from "yup";
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";


import { TextField, InputAdornment, Input, Typography } from "@mui/material";

import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useFormik, Field } from "formik";

import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

const validationSchema = Yup.object().shape({
  pdfFile: Yup.mixed()
    .required("PDF file is required")
    .test(
      "fileSize",
      "File size should be less than 3MB",
      (value) => value && value.size <= 2000000
    ),
});
// jobTitle: Yup.string()
//   .required("Job Title is required")
//   .max(30, "Job Title can not be longer than 30 letters"),
// lastName: Yup.string()
//   .required("Last name is required")
//   .max(50, "Last name can not be longer than 50 letters"),
// password: Yup.string()
//   .required("Password is required")
//   .min(8, "Password must be at least 8 characters"),
// confirmPassword: Yup.string()
//   .oneOf([Yup.ref("password"), null], "Passwords must match")
//   .required("Confirm Password is required"),
// });

function JobApplyModal(props) {
  const [cvPdfFile, setCvPdfFile] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    console.log(cvPdfFile?.size)
    if (cvPdfFile?.size >= "4012004") {
      setError("PDF file size can not exceed 4MB");
    }else{
        setError("");
    }
  }, [cvPdfFile]);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      lastEducationDegree: "",
      currentCompany: "",
      totalExperience: "",
      expectedSalary: "",
      aboutMe: "",
      email: "",
      phoneNumber: "",
      cvPdfFile: null,
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log("ok");
      console.log(JSON.stringify(values, null, 2));
      alert(JSON.stringify(values, null, 2));
      console.log("pdf value", values.cvPdfFile);
      setSubmitting(false);
      //   formik.resetForm();
    },
  });
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setCvPdfFile(selectedFile);
    console.log(selectedFile);
    formik.setFieldValue("cvPdfFile", selectedFile);
  };
  return (
    <Modal
      {...props}
      // className={clsx(styles["singinBody-wrapper"])}
      //   size="sm"
      //   dialogClassName="modal-90w"
      dialogClassName="custom-modal"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard="false"
    >
      <Modal.Header className="px-4" closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="ms-auto">
          Apply Form
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          className={clsx(styles["jobPostCreateForm-control"])}
          component="form"
          onSubmit={formik.handleSubmit}
          fullWidth
        >
          <TextField
            required
            fullWidth
            id="firstName"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && !!formik.errors.firstName}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && !!formik.errors.lastName}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            required
            fullWidth
            id="lastEducationDegree"
            label="Last Education Degree"
            value={formik.values.lastEducationDegree}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.lastEducationDegree &&
              !!formik.errors.lastEducationDegree
            }
            helperText={
              formik.touched.lastEducationDegree &&
              formik.errors.lastEducationDegree
            }
          />
          <TextField
            required
            fullWidth
            id="currentCompany"
            label="Current Company"
            value={formik.values.currentCompany}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.currentCompany && !!formik.errors.currentCompany
            }
            helperText={
              formik.touched.currentCompany && formik.errors.currentCompany
            }
          />
          <TextField
            required
            fullWidth
            id="totalExperience"
            label="Total Experience (year)"
            type="Number"
            value={formik.values.totalExperience}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.totalExperience && !!formik.errors.totalExperience
            }
            helperText={
              formik.touched.totalExperience && formik.errors.totalExperience
            }
          />
          <TextField
            required
            fullWidth
            type="Number"
            id="expectedSalary"
            label="Expected Salary"
            value={formik.values.expectedSalary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.expectedSalary && !!formik.errors.expectedSalary
            }
            helperText={
              formik.touched.expectedSalary && formik.errors.expectedSalary
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <TextField
            required
            fullWidth
            id="aboutMe"
            label="About Me"
            multiline
            rows={10}
            value={formik.values.aboutMe}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.aboutMe && !!formik.errors.aboutMe}
            helperText={formik.touched.aboutMe && formik.errors.aboutMe}
          />
          <TextField
            required
            fullWidth
            id="email"
            label="Contact Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            fullWidth
            type="Number"
            id="phoneNumber"
            label="Contact Phone Number"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="outlined" component="label">
            Upload CV (pdf)
            <input
              hidden
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              accept="application/pdf"
              //   inputProps={{ accept: "application/pdf" }}
            />
          </Button>
          {cvPdfFile ? <>{cvPdfFile.name} has been uploaded</> : ""}
          <br />
          {error && <div style={{ color: "red" }}>{error}</div>}
          {/* <FormControl>
            <InputLabel htmlFor="file-upload">Select PDF File</InputLabel>
            <Input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              inputProps={{ accept: "application/pdf" }}
            />
            {formik.errors.cvPdfFile && formik.touched.cvPdfFile && (
              <Typography color="error">{formik.errors.cvPdfFile}</Typography>
            )}
          </FormControl> */}
          <FormControlLabel
            required
            control={<Checkbox />}
            label="I have read and agree to the terms"
            style={{
              display: "flex",
              justifyItems: "center",
              justifyContent: "center",
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={formik.isSubmitting || error.length > 0}
          >
            Apply
          </Button>
        </FormControl>
      </Modal.Body>
      {/* <Modal.Footer >
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default JobApplyModal;
