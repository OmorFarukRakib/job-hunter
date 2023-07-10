import React from "react";
import { useState } from "react";
import styles from "./JobPostFormModal.module.css";
import clsx from "clsx";
import { Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";

import { TextField, InputAdornment } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl } from "@mui/material";
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
  const theme = useTheme();
  const formik = useFormik({
    initialValues: {
      jobTitle: props.formData === null ? "" : props.formData.jobTitle,
      jobType: props.formData === null ? "" : props.formData.jobType,
      jobDescription:
        props.formData === null ? "" : props.formData.jobDescription,
      salaryEstimationStart:
        props.formData === null ? "" : props.formData.salaryEstimationStart,
      salaryEstimationEnd:
        props.formData === null ? "" : props.formData.salaryEstimationEnd,
      applicationDeadline:
        props.formData === null ? "" : props.formData.applicationDeadline,
      skillReq: props.formData === null ? [] : props.formData.skillReq,
      totalHiringNumber:
        props.formData === null ? "" : props.formData.totalHiringNumber,
      requiredExperienceInYr:
        props.formData === null ? "" : props.formData.requiredExperienceInYr,
      jobLocation: props.formData === null ? "" : props.formData.jobLocation,
      companyJobApplyURL:
        props.formData === null ? "" : props.formData.companyJobApplyURL,
    },
    // validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log("ok");
      console.log(JSON.stringify(values, null, 2));
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      //   formik.resetForm();
    },
  });
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
          onSubmit={formik.handleSubmit}
          fullWidth
        >
          <TextField
            required
            fullWidth
            id="jobTitle"
            label="Job Title"
            value={formik.values.jobTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.jobTitle && !!formik.errors.jobTitle}
            helperText={formik.touched.jobTitle && formik.errors.jobTitle}
          />
          <FormControl fullWidth>
            <InputLabel id="jobType-label">Job Type *</InputLabel>
            <Select
              required
              labelId="jobType"
              label="Job Type *"
              id="jobType"
              name="jobType"
              value={formik.values.jobType}
              onChange={formik.handleChange}
              error={formik.touched.jobType && Boolean(formik.errors.jobType)}
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
            id="jobDescription"
            label="Job Description"
            value={formik.values.jobDescription}
            multiline
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.jobDescription && !!formik.errors.jobDescription
            }
            helperText={
              formik.touched.jobDescription && formik.errors.jobDescription
            }
          />
          <TextField
            fullWidth
            required
            type="Number"
            id="requiredExperienceInYr"
            label="Experience Required in years"
            value={formik.values.requiredExperienceInYr}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.requiredExperienceInYr &&
              !!formik.errors.requiredExperienceInYr
            }
            helperText={
              formik.touched.requiredExperienceInYr &&
              formik.errors.requiredExperienceInYr
            }
          />
          <TextField
            fullWidth
            type="Number"
            required
            id="salaryEstimationStart"
            label="Minimum Salary"
            value={formik.values.salaryEstimationStart}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.salaryEstimationStart &&
              !!formik.errors.salaryEstimationStart
            }
            helperText={
              formik.touched.salaryEstimationStart &&
              formik.errors.salaryEstimationStart
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            id="salaryEstimationEnd"
            required
            type="Number"
            label="Maximum Salary"
            value={formik.values.salaryEstimationEnd}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.salaryEstimationEnd &&
              !!formik.errors.salaryEstimationEnd
            }
            helperText={
              formik.touched.salaryEstimationEnd &&
              formik.errors.salaryEstimationEnd
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            // type="date"
            id="applicationDeadline"
            required
            label="Application Deadline"
            value={formik.values.applicationDeadline}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.applicationDeadline &&
              !!formik.errors.applicationDeadline
            }
            helperText={
              formik.touched.applicationDeadline &&
              formik.errors.applicationDeadline
            }
          />
          <FormControl fullWidth>
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
          </FormControl>
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
            id="totalHiringNumber"
            label="Total Number Hiring"
            value={formik.values.totalHiringNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.totalHiringNumber &&
              !!formik.errors.totalHiringNumber
            }
            helperText={
              formik.touched.totalHiringNumber &&
              formik.errors.totalHiringNumber
            }
          />
          <TextField
            required
            fullWidth
            id="jobLocation"
            label="Job Location"
            value={formik.values.jobLocation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.jobLocation && !!formik.errors.jobLocation}
            helperText={formik.touched.jobLocation && formik.errors.jobLocation}
          />
          <TextField
            fullWidth
            id="companyJobApplyURL"
            label="Company Job Portal Link"
            value={formik.values.companyJobApplyURL}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.companyJobApplyURL &&
              !!formik.errors.companyJobApplyURL
            }
            helperText={
              formik.touched.companyJobApplyURL &&
              formik.errors.companyJobApplyURL
            }
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
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={formik.isSubmitting}
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
