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
import { Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./userInfoEditModal.module.css";

import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useEffect } from "react";
import axios from "axios";
import apiConfig from "../../../../../../apiConfig";

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
  const [userFormData, setUserFormData] = useState({});

  useEffect(() => {
    setUserFormData({
      firstName: props.userData.firstName,
      lastname: props.userData.lastname,
      lastEducationDegree: props.userData.lastEducationDegree,
      aimedIndustry: props.userData.aimedIndustry,
      salaryExpMin: props.userData.salaryExpMin,
      address: props.userData.address,
      email: props.userData.email,
      phoneNumber: props.userData.phoneNumber,
    });
  }, [props]);
  useEffect(() => {
    setErrorMsg({
      ...setErrorMsg,
      userInfoChangeErrorMsg: "",
    });
    setSuccessMsg({
      ...successMsg,
      userInfoChangeSuccessMsg: "",
    });
  }, [props.show]);
  const [isLoading, setIsLoading] = useState({
    isUserFormDataSubmitting: false,
  });
  const [errorMsg, setErrorMsg] = useState({
    userInfoChangeErrorMsg: "",
  });
  const [successMsg, setSuccessMsg] = useState({
    userInfoChangeSuccessMsg: "",
  });
  const handleUserFormDataChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };

  const handleUserFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading({
      ...isLoading,
      isUserFormDataSubmitting: true,
    });
    const userData = JSON.parse(localStorage.getItem("JS_userData"));
    const token = userData.data.token.accessToken;
    try {
      const response = await axios({
        method: "PUT",
        url: apiConfig.baseURL + apiConfig.employee.updateInfo,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          userId: "string",
          userType: "string",
          // userId: userData.data.userID,
          // userType: userData.data.userType,
          firstName: userFormData.firstName,
          lastname: userFormData.lastname,
          lastEducationDegree: userFormData.lastEducationDegree,
          aimedIndustry: userFormData.aimedIndustry,
          salaryExpMin: userFormData.salaryExpMin,
          address: userFormData.address,
          email: userFormData.email,
          phoneNumber: userFormData.phoneNumber,
        },
      });
      console.log("user info change api res", response);
      const res = response.data;
      if (res.success === true) {
        setSuccessMsg({
          ...successMsg,
          userInfoChangeSuccessMsg: "User Information has been changed!",
        });
        props.setFetchAgainFlag((prev) => prev + 1);
      } else {
        setErrorMsg({
          ...errorMsg,
          userInfoChangeErrorMsg:
            "Could not Change the current information. Please Try Again Later!",
        });
      }
    } catch (error) {
      console.log("error from catch", error);
      setErrorMsg({
        ...errorMsg,
        userInfoChangeErrorMsg: "Something Went Wrong! Please Try Again Later!",
      });
    }
    setIsLoading({
      ...isLoading,
      isUserFormDataSubmitting: false,
    });
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
          user Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          className={clsx(styles["userInfoEditModal-control"])}
          component="form"
          onSubmit={handleUserFormSubmit}
          fullWidth
        >
          <TextField
            fullWidth
            label="First Name"
            id="firstName"
            name="firstName"
            value={userFormData.firstName}
            onChange={handleUserFormDataChange}
          />
          <TextField
            fullWidth
            label="Last Name"
            id="lastname"
            name="lastname"
            value={userFormData.lastname}
            onChange={handleUserFormDataChange}
          />
          {/* <FormControl fullWidth>
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
          </FormControl> */}
          <TextField
            fullWidth
            label="Education Qualification"
            id="lastEducationDegree"
            name="lastEducationDegree"
            value={userFormData.lastEducationDegree}
            onChange={handleUserFormDataChange}
          />
          <TextField
            fullWidth
            label="Aimed Industry"
            id="aimedIndustry"
            name="aimedIndustry"
            value={userFormData.aimedIndustry}
            onChange={handleUserFormDataChange}
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
          {/* <FormControl fullWidth>
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
          </FormControl> */}
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
            // rows={10}
            id="salaryExpMin"
            name="salaryExpMin"
            onChange={handleUserFormDataChange}
            value={userFormData.salaryExpMin}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Address"
            // rows={10}
            id="address"
            name="address"
            onChange={handleUserFormDataChange}
            value={userFormData.address}
          />

          <TextField
            fullWidth
            label="Email"
            id="email"
            name="email"
            disabled
            value={userFormData.email}
            onChange={handleUserFormDataChange}
          />
          <TextField
            fullWidth
            type="Number"
            label="Phone Number"
            id="phoneNumber"
            name="phoneNumber"
            onChange={handleUserFormDataChange}
            value={userFormData.phoneNumber}
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
          {successMsg.userInfoChangeSuccessMsg && (
            <Typography variant="h7" color="green" align="center">
              {successMsg.userInfoChangeSuccessMsg}
            </Typography>
          )}
          {errorMsg.userInfoChangeErrorMsg && (
            <Typography variant="h7" color="red" align="center">
              {errorMsg.userInfoChangeErrorMsg}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading.isUserFormDataSubmitting}
          >
            {isLoading.isUserFormDataSubmitting === true
              ? "Please Wait"
              : "Confirm the Changes"}
          </Button>
        </FormControl>
      </Modal.Body>
      {/* <Modal.Footer >
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default UserInfoEditModal;
