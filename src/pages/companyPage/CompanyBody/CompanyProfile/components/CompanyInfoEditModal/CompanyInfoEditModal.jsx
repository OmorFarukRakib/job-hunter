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
import styles from "./companyInfoEditModal.module.css";

const validationSchema = Yup.object({
  companyName: Yup.string()
    .required("Company name is required")
    .max(50, "First name can not be longer than 50 letters"),
  // industry: Yup.string()
  //   .required("Last name is required")
  //   .max(50, "Industry name can not be longer than 50 letters"),
  companyWebsite: Yup.string()
    .required("Last name is required")
    .max(50, "Last name can not be longer than 50 letters"),
  companyAddress: Yup.string()
    .required("Last name is required")
    .max(100, "Last name can not be longer than 100 letters"),
  contactPhone: Yup.string()
    .required("Last name is required")
    .max(16, "phone number is too big"),
  companyDescription: Yup.string()
    .required("Last name is required")
    .max(10000, "Last name can not be longer than 10000 letters"),
  companySize: Yup.string()
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
const companySizeOptions = [
  { value: "1", label: "Small [less than 50]" },
  { value: "2", label: "Medium [50-250]" },
  { value: "3", label: "Large [more than 250]" },
];



function CompanyInfoEditModal(props) {
    const formik = useFormik({
      initialValues: {
        companyName: props.companyData.companyName
          ? props.companyData.companyName
          : "",
        industry: props.companyData.industry ? props.companyData.industry : "",
        companyWebsite: props.companyData.companyWebsite
          ? props.companyData.companyWebsite
          : "",
        companyAddress: props.companyData.companyAddress
          ? props.companyData.companyAddress
          : "",
        companyDescription: props.companyData.companyDescription
          ? props.companyData.companyDescription
          : "",
        companySize: props.companyData.companySize
          ? props.companyData.companySize
          : "",
        contactPersonName: props.companyData.contactPersonName
          ? props.companyData.contactPersonName
          : "",
        contactEmail: props.companyData.contactEmail
          ? props.companyData.contactEmail
          : "",
        contactPhone: props.companyData.contactPhone
          ? props.companyData.contactPhone
          : "",
        // password: props.companyData.password ? props.companyData.password : "",
        // confirmPassword: props.companyData.confirmPassword
        //   ? props.companyData.confirmPassword
        //   : "",
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
          Company Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          className={clsx(styles["companyInfoEditModal-control"])}
          component="form"
          onSubmit={formik.handleSubmit}
          fullWidth
        >
          <TextField
            fullWidth
            label="Company Name"
            id="companyName"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.companyName && !!formik.errors.companyName}
            helperText={formik.touched.companyName && formik.errors.companyName}
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
              id="industry"
              name="industry"
              value={formik.values.industry}
              onChange={formik.handleChange}
              error={formik.touched.industry && Boolean(formik.errors.industry)}
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
            label="Company Description"
            multiline
            rows={10}
            id="companyDescription"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.companyDescription}
            error={
              formik.touched.companyDescription &&
              !!formik.errors.companyDescription
            }
            helperText={
              formik.touched.companyDescription &&
              formik.errors.companyDescription
            }
          />
          <FormControl fullWidth>
            <InputLabel id="company-label">Company Size</InputLabel>
            <Select
              labelId="Company Size"
              label="Company Size"
              id="companySize"
              name="companySize"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.companySize}
              error={
                formik.touched.companySize && Boolean(formik.errors.companySize)
              }
              helperText={
                formik.touched.companySize && formik.errors.companySize
              }
            >
              {companySizeOptions.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Company Address"
            id="companyAddress"
            multiline
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.companyAddress}
            error={
              formik.touched.companyAddress && !!formik.errors.companyAddress
            }
            helperText={
              formik.touched.companyAddress && formik.errors.companyAddress
            }
          />
          <TextField
            fullWidth
            label="Company Website"
            multiline
            id="companyWebsite"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.companyWebsite}
            error={
              formik.touched.companyWebsite && !!formik.errors.companyWebsite
            }
            helperText={
              formik.touched.companyWebsite && formik.errors.companyWebsite
            }
          />

          <TextField
            fullWidth
            label="Contact Person Name"
            id="contactPersonName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.contactPersonName}
            error={
              formik.touched.contactPersonName &&
              !!formik.errors.contactPersonName
            }
            helperText={
              formik.touched.contactPersonName &&
              formik.errors.contactPersonName
            }
          />
          <TextField
            fullWidth
            label="Contact Email"
            id="contactEmail"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.contactEmail}
            error={formik.touched.contactEmail && !!formik.errors.contactEmail}
            helperText={
              formik.touched.contactEmail && formik.errors.contactEmail
            }
          />
          {/* <PhoneInput
        id="contactPhone"
        placeholder="Enter phone number"
        // value={formik.values.contactPhone}
        // onChange={formik.handleChange}
        // error={formik.touched.contactPhone && !!formik.errors.contactPhone}
      /> */}
          <TextField
            fullWidth
            label="Contact Phone"
            id="contactPhone"
            type="number"
            // inputProps={{
            //   pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
            //   title: "Phone number format: XXX-XXX-XXXX",
            // }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.contactPhone}
            error={formik.touched.contactPhone && !!formik.errors.contactPhone}
            helperText={
              formik.touched.contactPhone && formik.errors.contactPhone
            }
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

export default CompanyInfoEditModal;
