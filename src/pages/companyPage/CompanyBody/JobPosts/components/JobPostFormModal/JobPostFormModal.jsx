import React from "react";
import { useState, useEffect } from "react";
import styles from "./JobPostFormModal.module.css";
import clsx from "clsx";
import { Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";

import { TextField, InputAdornment } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useFormik, Field } from "formik";
import * as Yup from "yup";

import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import apiConfig from "../../../../../../apiConfig";
import axios from "axios";
const validationSchema = Yup.object({
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
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const skillsSet = [
  "React",
  "Nodejs",
  "Mongodb",
  "Python",
  "Javascript",
  "Typescript",
  "Java",
  "Django",
  "Flutter",
  "Dart",
  "Android",
  "IOS",
  "MuleSoft",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const JobPostFormModal = (props) => {
  const [jobAddFormData, setJobAddFormData] = useState({
    // jobID: "",
    jobType: "",
    title: "",
    companyName: "",
    applicationDeadline: new Date(),
    industry: "",
    salaryEstimationStart: 0,
    salaryEstimationEnd: 0,
    requiredExperienceInYr: 0,
    skillReq: "",
    totalHiringNumber: 0,
    companyDescription: "",
    jobDescription: "",
    companyURl: "",
    companyAddress: "",
    jobLocation: "",
    companyEmail: "",
    companyPhoneNumber: "",
    companyJobApplyUrl: "",
    jobPostStatus: "",
    // createdAt: "2023-10-08T22:07:41.029Z",
    // updatedAt: "2023-10-08T22:07:41.029Z",
  });
  const [isLoading, setIsLoading] = useState({
    isFormSubmittingLoading: false,
  });
  const [errorMsg, setErrorMsg] = useState({
    jobCreateErrorMsg: "",
    jobEditErrorMsg: "",
  });
  const [successMsg, setSuccessMsg] = useState({
    jobAddSuccessMsg: "",
    jobEditSuccessMsg: "",
  });
  useEffect(() => {
    setErrorMsg({
      jobCreateErrorMsg: "",
      jobEditErrorMsg: "",
    });
    setSuccessMsg({
      jobAddSuccessMsg: "",
      jobEditSuccessMsg: "",
    });
  }, [props.show]);

  const handleAddPostFormDataChange = (e) => {
    const { name, value } = e.target;
    if (name === "applicationDeadline") {
      const localDate = new Date(value);
      const utcDate = new Date(
        localDate.getUTCFullYear(),
        localDate.getUTCMonth(),
        localDate.getUTCDate()
      );
      const formattedDate = utcDate.toISOString().split("T")[0];
      setJobAddFormData({
        ...jobAddFormData,
        [name]: formattedDate,
      });
      console.log(utcDate.toISOString());
    } else {
      setJobAddFormData({
        ...jobAddFormData,
        [name]: value,
      });
    }
  };
  const handleAddPostFormDataSubmit = async (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("JS_userData"));
    const token = userData.data.token.accessToken;
    setIsLoading({
      ...isLoading,
      isFormSubmittingLoading: true,
    });
    try {
      const response = await axios({
        method: "POST",
        url: apiConfig.baseURL + apiConfig.company.jobCreateByCompany,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          // jobID: "",
          jobType: jobAddFormData.jobType,
          title: jobAddFormData.title,
          companyName: jobAddFormData.companyName,
          applicationDeadline: jobAddFormData.applicationDeadline,
          industry: jobAddFormData.industry,
          salaryEstimationStart: jobAddFormData.salaryEstimationStart,
          salaryEstimationEnd: jobAddFormData.salaryEstimationEnd,
          skillReq: jobAddFormData.skillReq,
          totalHiringNumber: jobAddFormData.totalHiringNumber,
          companyDescription: jobAddFormData.companyDescription,
          jobDescription: jobAddFormData.jobDescription,
          companyURl: jobAddFormData.companyURl,
          companyAddress: jobAddFormData.companyAddress,
          jobLocation: jobAddFormData.jobLocation,
          companyEmail: jobAddFormData.companyEmail,
          companyPhoneNumber: jobAddFormData.companyPhoneNumber,
          companyJobApplyUrl: jobAddFormData.companyJobApplyUrl,
          jobPostStatus: jobAddFormData.jobPostStatus,
          // createdAt: "2023-10-08T22:07:41.029Z",
          // updatedAt: "2023-10-08T22:07:41.029Z",
        },
      });
      console.log("job add api res", response);
      const res = response.data;
      if (res.success === true) {
        setSuccessMsg({
          ...successMsg,
          jobAddSuccessMsg:
            "Successfully added the job! Waiting for adming to approve.",
        });
      } else {
        setErrorMsg({
          ...errorMsg,
          jobCreateErrorMsg:
            "Sorry! Job could not created! Please try again later!",
        });
      }
    } catch (error) {
      console.log("error in catch", error);
      setErrorMsg({
        ...errorMsg,
        jobCreateErrorMsg:
          "Sorry! Job could not created! Please try again later!",
      });
    }
    setIsLoading({
      ...isLoading,
      isFormSubmittingLoading: false,
    });
  };
  const [selectedSkillsSet, setSelectedSkillsSet] = useState([]);
  const handleSkillsSetChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedSkillsSet(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  useEffect(() => {
    setSelectedSkillsSet(
      props.formData === null ? [] : props.formData.skillReq
    );
  }, [props]);
  const theme = useTheme();

  return (
    <Modal
      {...props}
      // className={clsx(styles["singinBody-wrapper"])}
      //   size="sm"
      //   dialogClassName="modal-90w"
      dialogClassName="custom-modal"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      // dialogClassName="custom-modal-for-jobApplicant"
      backdrop="static"
      keyboard="false"
    >
      <Modal.Header className="px-4" closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="ms-auto">
          {props.formData === null ? (
            <div>Create Job Post</div>
          ) : (
            <div>Edit Job Post</div>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          className={clsx(styles["jobPostCreateForm-control"])}
          component="form"
          onSubmit={handleAddPostFormDataSubmit}
          fullWidth
        >
          <TextField
            required
            fullWidth
            id="title"
            name="title"
            label="Job Title"
            value={jobAddFormData.title}
            onChange={handleAddPostFormDataChange}
          />
          <FormControl fullWidth>
            <InputLabel id="jobType-label">Job Type *</InputLabel>
            <Select
              required
              labelId="jobType"
              label="Job Type *"
              id="jobType"
              name="jobType"
              value={jobAddFormData.jobType}
              onChange={handleAddPostFormDataChange}
            >
              {["Full-Time", "Part-Time", "Contractual"].map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            required
            id="industry"
            name="industry"
            label="Industry"
            value={jobAddFormData.industry}
            onChange={handleAddPostFormDataChange}
          />
          <TextField
            fullWidth
            required
            id="jobDescription"
            name="jobDescription"
            label="Job Description"
            value={jobAddFormData.jobDescription}
            multiline
            onChange={handleAddPostFormDataChange}
          />
          <TextField
            fullWidth
            required
            type="Number"
            id="requiredExperienceInYr"
            name="requiredExperienceInYr"
            label="Experience Required in years"
            value={jobAddFormData.requiredExperienceInYr}
            onChange={handleAddPostFormDataChange}
          />
          <TextField
            fullWidth
            type="Number"
            required
            id="salaryEstimationStart"
            name="salaryEstimationStart"
            label="Minimum Salary"
            value={jobAddFormData.salaryEstimationStart}
            onChange={handleAddPostFormDataChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            id="salaryEstimationEnd"
            name="salaryEstimationEnd"
            required
            type="Number"
            label="Maximum Salary"
            value={jobAddFormData.salaryEstimationEnd}
            onChange={handleAddPostFormDataChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          {/* <Typography variant="h8" color="initial" ml={1} mb={0}>
            {" "}
            Application Deadline
          </Typography> */}
          <TextField
            fullWidth
            // type="datetime-local"
            type="date"
            id="applicationDeadline"
            name="applicationDeadline"
            required
            label="Application Deadline"
            value={jobAddFormData.applicationDeadline}
            onChange={handleAddPostFormDataChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            // type="date"
            id="skillReq"
            name="skillReq"
            required
            label="Required skills, separated by commas"
            value={jobAddFormData.skillReq}
            onChange={handleAddPostFormDataChange}
          />
          {/* <FormControl fullWidth>
            <InputLabel id="skillReq-label">Skills set *</InputLabel>
            <Select
              required
              labelId="skillReq"
              multiple
              id="skillReq"
              name="skillReq"
              label="skills set"
              // labelWidth={100}
              value={selectedSkillsSet}
              onChange={handleSkillsSetChange}
              // onBlur={formik.handleBlur}
              // error={formik.touched.skillReq && !!formik.errors.skillReq}
              // helperText={formik.touched.skillReq && formik.errors.skillReq}
              input={
                <OutlinedInput id="select-multiple-chip" label="skills set *" />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {skillsSet.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, selectedSkillsSet, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          {/* <TextField
            fullWidth
            id="skillReq"
            label="Skills Required"
            value={formik.values.skillReq}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.skillReq && !!formik.errors.skillReq}
            helperText={formik.touched.skillReq && formik.errors.skillReq}
          /> */}
          <TextField
            fullWidth
            type="Number"
            required
            id="totalHiringNumber"
            name="totalHiringNumber"
            label="Total Number Hiring"
            value={jobAddFormData.totalHiringNumber}
            onChange={handleAddPostFormDataChange}
          />
          <TextField
            required
            fullWidth
            id="jobLocation"
            name="jobLocation"
            label="Job Location"
            value={jobAddFormData.jobLocation}
            onChange={handleAddPostFormDataChange}
          />
          <TextField
            required
            fullWidth
            id="companyName"
            name="companyName"
            label="Company Name"
            value={jobAddFormData.companyName}
            onChange={handleAddPostFormDataChange}
          />
          <TextField
            required
            fullWidth
            id="companyEmail"
            name="companyEmail"
            label="Company Email"
            value={jobAddFormData.companyEmail}
            onChange={handleAddPostFormDataChange}
          />
          <TextField
            required
            fullWidth
            type="Number"
            id="companyPhoneNumber"
            name="companyPhoneNumber"
            label="Company Phone Number"
            value={jobAddFormData.companyPhoneNumber}
            onChange={handleAddPostFormDataChange}
          />
          <TextField
            required
            fullWidth
            id="companyURl"
            name="companyURl"
            label="Company Website Address"
            value={jobAddFormData.companyURl}
            onChange={handleAddPostFormDataChange}
          />
          <TextField
            required
            fullWidth
            id="companyAddress"
            name="companyAddress"
            label="Company Address"
            value={jobAddFormData.companyAddress}
            onChange={handleAddPostFormDataChange}
          />
          <TextField
            required
            fullWidth
            id="companyDescription"
            name="companyDescription"
            label="Company Description"
            value={jobAddFormData.companyDescription}
            onChange={handleAddPostFormDataChange}
          />

          <TextField
            fullWidth
            id="companyJobApplyUrl"
            name="companyJobApplyUrl"
            label="Company Job Portal Link"
            value={jobAddFormData.companyJobApplyUrl}
            onChange={handleAddPostFormDataChange}
          />

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
          {successMsg.jobAddSuccessMsg && (
            <Typography variant="h7" color="green" align="center">
              {successMsg.jobAddSuccessMsg}
            </Typography>
          )}
          {errorMsg.jobCreateErrorMsg && (
            <Typography variant="h7" color="red" align="center">
              {errorMsg.jobCreateErrorMsg}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading.isFormSubmittingLoading}
          >
            {props.formData === null ? (
              <div>Create Job Ad</div>
            ) : (
              <div>Confirm Changes</div>
            )}
          </Button>
        </FormControl>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
      </Modal.Footer>
    </Modal>
  );
};
export default JobPostFormModal;
