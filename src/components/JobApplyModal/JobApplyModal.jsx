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
import axios from "axios";
import apiConfig from "../../apiConfig";
const validationSchema = Yup.object().shape({
  pdfFile: Yup.mixed()
    .required("PDF file is required")
    .test(
      "fileSize",
      "File size should be less than 3MB",
      (value) => value && value.size <= 2000000
    ),
});


function JobApplyModal(props) {
  const [jobApplyFormData, setJobApplyFormData] = useState({
    firstName: "",
    lastName: "",
    lastEducationDegree: "",
    currentCompany: "",
    experience: "",
    totalExperienceInYear: "",
    expectedSalary: "",
    aboutMe: "",
    email: "",
    phoneNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cvPdfFile, setCvPdfFile] = useState(null);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleApplyFormDataChange = (e) => {
    const { name, value } = e.target;
    setJobApplyFormData({
      ...jobApplyFormData,
      [name]: value,
    });
  };
  useEffect(() => {
    setIsSubmitting(false);
    setError("");
    setSuccessMsg("");
    setJobApplyFormData({
      firstName: "",
      lastName: "",
      lastEducationDegree: "",
      currentCompany: "",
      experience: "",
      totalExperienceInYear: "",
      expectedSalary: "",
      aboutMe: "",
      email: "",
      phoneNumber: "",
    });
    setCvPdfFile(null);
  }, [props.show]);

  const handleApplyFormDataSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setIsSubmitting(true);
    console.log("formData", jobApplyFormData);
    console.log("cv data", cvPdfFile);
    if (cvPdfFile === null) {
      setError("No PDF File is uploaded");
    }
    const userData = JSON.parse(localStorage.getItem("JS_userData"));
    const token = userData.data.token.accessToken;
    console.log(cvPdfFile);
    const formData = new FormData();
    formData.append("cv", cvPdfFile);

    try {
      // const response = await axios({
      //   method: "POST",
      //   url:
      //     apiConfig.baseURL +
      //     apiConfig.employee.applyToJob +
      //     `?jobId=${props.jobId}&firstName=${jobApplyFormData.firstName}&lastName=${jobApplyFormData.lastName}&lastEducationDegree=${jobApplyFormData.lastEducationDegree}&currentCompany=${jobApplyFormData.currentCompany}&experience=${jobApplyFormData.experience}&totalExperienceInYear=${jobApplyFormData.totalExperienceInYear}&expectedSalary=${jobApplyFormData.expectedSalary}&aboutMe=${jobApplyFormData.aboutMe}&email=${jobApplyFormData.email}&phoneNumber=${jobApplyFormData.phoneNumber}`,
      // headers: {
      //   Authorization: `Bearer ${token}`,
      //   "Content-Type": "multipart/form-data",
      //   // data: formData,
      // },
      //   data: formData,
      // });
      const url =
        apiConfig.baseURL +
        apiConfig.employee.applyToJob +
        `?jobId=${props.jobId}&firstName=${jobApplyFormData.firstName}&lastName=${jobApplyFormData.lastName}&lastEducationDegree=${jobApplyFormData.lastEducationDegree}&currentCompany=${jobApplyFormData.currentCompany}&experience=${jobApplyFormData.experience}&totalExperienceInYear=${jobApplyFormData.totalExperienceInYear}&expectedSalary=${jobApplyFormData.expectedSalary}&aboutMe=${jobApplyFormData.aboutMe}&email=${jobApplyFormData.email}&phoneNumber=${jobApplyFormData.phoneNumber}`;

      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "multipart/form-data",
          // data: formData,
        },
      });
      console.log("job details api res", response);
      const res = response.data;
      if (res.success === true) {
        setError("");
        setSuccessMsg("Congratulations! The Job Application is submitted!");
      } else {
        if (res.errorCode === 701) {
          setError("Already Applied for this Job");
          setSuccessMsg("");

        } else {
          setError("Something Went Wrong! Please Try Again Later!");
          setSuccessMsg("");

        }
      }
    } catch (error) {
      console.log("error from catch", error);
      setError("Something Went Wrong! Please Try Again Later!");
      setSuccessMsg("");

    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    console.log(cvPdfFile?.size);
    if (cvPdfFile?.size >= "1012004") {
      setError("PDF file size can not exceed 1MB");
    } else {
      setError("");
    }
  }, [cvPdfFile]);
  // const formik = useFormik({
  //   initialValues: {
  //     firstName: "",
  //     lastName: "",
  //     lastEducationDegree: "",
  //     currentCompany: "",
  //     totalExperienceInYear: "",
  //     expectedSalary: "",
  //     aboutMe: "",
  //     email: "",
  //     phoneNumber: "",
  //     cvPdfFile: null,
  //   },
  //   validationSchema,
  //   onSubmit: (values, { setSubmitting }) => {
  //     console.log("ok");
  //     console.log(JSON.stringify(values, null, 2));
  //     alert(JSON.stringify(values, null, 2));
  //     console.log("pdf value", values.cvPdfFile);
  //     setSubmitting(false);
  //     //   formik.resetForm();
  //   },
  // });
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setCvPdfFile(selectedFile);
    console.log(selectedFile);
    // formik.setFieldValue("cvPdfFile", selectedFile);
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
          Job Apply Form 
          {/* - {props.jobId} */}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          className={clsx(styles["jobPostCreateForm-control"])}
          component="form"
          onSubmit={handleApplyFormDataSubmit}
          fullWidth
        >
          <TextField
            required
            fullWidth
            id="firstName"
            name="firstName"
            label="First Name"
            value={jobApplyFormData.firstName}
            onChange={handleApplyFormDataChange}
            // value={formik.values.firstName}
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            // error={formik.touched.firstName && !!formik.errors.firstName}
            // helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            required
            fullWidth
            id="lastName"
            name="lastName"
            label="Last Name"
            value={jobApplyFormData.lastName}
            onChange={handleApplyFormDataChange}
          />
          <TextField
            required
            fullWidth
            id="lastEducationDegree"
            name="lastEducationDegree"
            label="Last Education Degree"
            value={jobApplyFormData.lastEducationDegree}
            onChange={handleApplyFormDataChange}
          />
          <TextField
            required
            fullWidth
            id="currentCompany"
            name="currentCompany"
            label="Current Company"
            value={jobApplyFormData.currentCompany}
            onChange={handleApplyFormDataChange}
          />
          <TextField
            required
            fullWidth
            id="experience"
            name="experience"
            multiline
            rows={5}
            label="Share your experience"
            value={jobApplyFormData.experience}
            onChange={handleApplyFormDataChange}
          />
          <TextField
            required
            fullWidth
            id="totalExperienceInYear"
            name="totalExperienceInYear"
            label="Total Experience (year)"
            type="Number"
            value={jobApplyFormData.totalExperienceInYear}
            onChange={handleApplyFormDataChange}
          />
          <TextField
            required
            fullWidth
            type="Number"
            id="expectedSalary"
            name="expectedSalary"
            label="Expected Salary Per Month"
            value={jobApplyFormData.expectedSalary}
            onChange={handleApplyFormDataChange}
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
            name="aboutMe"
            label="About Me"
            multiline
            rows={10}
            value={jobApplyFormData.aboutMe}
            onChange={handleApplyFormDataChange}
          />
          <TextField
            required
            fullWidth
            id="email"
            name="email"
            type="email"
            label="Contact Email"
            value={jobApplyFormData.email}
            onChange={handleApplyFormDataChange}
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
            name="phoneNumber"
            label="Contact Phone Number"
            value={jobApplyFormData.phoneNumber}
            onChange={handleApplyFormDataChange}
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
          {error && (
            <Typography variant="h7" color="red" align="center">
              {error}
            </Typography>
          )}
          {successMsg && (
            <Typography variant="h7" color="green" align="center">
              {successMsg}
            </Typography>
          )}
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
            disabled={isSubmitting || error.length > 0}
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
