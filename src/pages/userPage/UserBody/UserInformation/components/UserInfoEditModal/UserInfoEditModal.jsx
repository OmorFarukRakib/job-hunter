import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  TextField,
  InputAdornment,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import Checkbox from "@mui/material/Checkbox";
import clsx from "clsx";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./userInfoEditModal.module.css";

import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useEffect } from "react";



const validationSchema = Yup.object({
  userName: Yup.string()
    .required("user name is required")
    .max(50, "First name can not be longer than 50 letters"),
  // industry: Yup.string()
  //   .required("Last name is required")
  //   .max(50, "Industry name can not be longer than 50 letters"),
  userWebsite: Yup.string()
    .required("Last name is required")
    .max(50, "Last name can not be longer than 50 letters"),
  userAddress: Yup.string()
    .required("Last name is required")
    .max(100, "Last name can not be longer than 100 letters"),
  contactPhone: Yup.string()
    .required("Last name is required")
    .max(16, "phone number is too big"),
  userDescription: Yup.string()
    .required("Last name is required")
    .max(10000, "Last name can not be longer than 10000 letters"),
  userSize: Yup.string()
    .required("Last name is required")
    .max(10000, "Last name can not be longer than 10000 letters"),
  contactPersonName: Yup.string()
    .required("Last name is required")
    .max(50, "Last name can not be longer than 50 letters"),
  contactEmail: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const industryOptions = [
  { value: "option1", label: "Technology" },
  { value: "option2", label: "Finance and Banking" },
  { value: "option4", label: "Healthcare and Pharmaceuticals" },
  { value: "option5", label: "Automotive" },
  { value: "option6", label: "Energy and Utilities" },
  { value: "option7", label: "Retail and E-commerce" },
  { value: "option8", label: "Telecommunications" },
  { value: "option9", label: "Aerospace and Defense" },
  { value: "option10", label: "Media and Entertainment" },
  { value: "option11", label: "Others" },
];

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

const skills = [
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

const UserInfoEditModal = (props) => {
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
setSelectedSkillsSet(props.userData === null ? [] : props.userData.skills);
  }, [props])
  const theme = useTheme();
  const formik = useFormik({
    initialValues: {
      firstName: props.userData.firstName ? props.userData.firstName : "",
      lastName: props.userData.lastName ? props.userData.lastName : "",
      // skills: props.userData === null ? [] : props.userData.skills,
      educationQualification: props.userData.educationQualification
        ? props.userData.educationQualification
        : "",
      interestedIndustry: props.userData.interestedIndustry
        ? props.userData.interestedIndustry
        : "",
      salaryExpectationMin: props.userData.salaryExpectationMin
        ? props.userData.salaryExpectationMin
        : "",
      address: props.userData.address ? props.userData.address : "",
      email: props.userData.email ? props.userData.email : "",
      phoneNumber: props.userData.phoneNumber ? props.userData.phoneNumber : "",
      // password: props.userData.password ? props.userData.password : "",
      // confirmPassword: props.userData.confirmPassword
      //   ? props.userData.confirmPassword
      //   : "",
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
      backdrop="static"
      keyboard="false"
    >
      <Modal.Header className="px-4" closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="ms-auto">
          user Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          className={clsx(styles["userInfoEditModal-control"])}
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
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && !!formik.errors.lastName}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <FormControl fullWidth>
            <InputLabel id="skills-label">Skills set *</InputLabel>
            <Select
              required
              labelId="skills"
              multiple
              id="skills"
              name="skills"
              label="skills set"
              // labelWidth={100}
              value={selectedSkillsSet}
              // value={selectedSkillsSet}
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
              {skills.map((name) => (
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
          <TextField
            fullWidth
            label="Education Qualification"
            id="educationQualification"
            value={formik.values.educationQualification}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.educationQualification &&
              !!formik.errors.educationQualification
            }
            helperText={
              formik.touched.educationQualification &&
              formik.errors.educationQualification
            }
          />
          {/* <TextField
        select
        fullWidth
        label="Industry"
        id="industry"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.industry}
        error={formik.touched.industry && !!formik.errors.industry}
        helperText={formik.touched.industry && formik.errors.industry}
      >
        {industryOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField> */}
          <FormControl fullWidth>
            <InputLabel id="industry-label">Industry</InputLabel>
            <Select
              labelId="Industry"
              multiline
              label="Industry"
              id="interestedIndustry"
              name="interestedIndustry"
              value={formik.values.interestedIndustry}
              onChange={formik.handleChange}
              error={
                formik.touched.interestedIndustry &&
                Boolean(formik.errors.interestedIndustry)
              }
            >
              {industryOptions.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <TextField
        fullWidth
        label="Industry"
        id="industry"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.industry}
        error={formik.touched.industry && !!formik.errors.industry}
        helperText={formik.touched.industry && formik.errors.industry}
      /> */}
          <TextField
            fullWidth
            label="Salary Expectation"
            type="number"
            multiline
            // rows={10}
            id="salaryExpectationMin"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.salaryExpectationMin}
            error={
              formik.touched.salaryExpectationMin &&
              !!formik.errors.salaryExpectationMin
            }
            helperText={
              formik.touched.salaryExpectationMin &&
              formik.errors.salaryExpectationMin
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Address"
            multiline
            // rows={10}
            id="address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            error={formik.touched.address && !!formik.errors.address}
            helperText={formik.touched.address && formik.errors.address}
          />

          <TextField
            fullWidth
            label="Email"
            id="email"
            multiline
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            label="Phone Number"
            multiline
            id="phoneNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
            error={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />

          {/* <TextField
            fullWidth
            type="password"
            label="Password"
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
          /> */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={formik.isSubmitting}
          >
            Confirm the Changes
          </Button>
        </FormControl>
      </Modal.Body>
      {/* <Modal.Footer >
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default UserInfoEditModal;
