import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SigninForm from "./signinForm/SigninForm";
import RegistrationForm from "./RegistrationForm/RegistrationForm";
import styles from "./signinBody.module.css";
// import RegistrationForm from "./RegistrationForm/EmployeeRegistrationForm/EmployeeRegistrationForm";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SigninBody(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* <Box sx={{ width: "100%", height: "50vh", overflow: "hidden" }}> */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Registation" {...a11yProps(1)} />
          {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      {/* <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      > */}
      <TabPanel value={value} index={0} component="div">
        <SigninForm modalHideFun={props.modalHideFun} />
        {/* <div className={styles["signinForm-wrapper"]}>
          </div> */}
      </TabPanel>
      {/* </div> */}

      <TabPanel value={value} index={1}>
        <div>
          <RegistrationForm />
        </div>
      </TabPanel>
    </Box>
  );
}
