import React, { useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import clsx from "clsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import companyLogo from "../../../../public/xCompany.png";
// import companyLogo from "../../../../public/jobhunter.png";
import styles from "./companySidebar.module.css";
import { Hidden } from "@mui/material";

const CompanySidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState("");

  const menuItemStyle = {
    backgroundColor: "#FBFBFB",
    color: "black",
    ":hover": {
      backgroundColor: "#FBFBFB",
      color: "#1565C0",
    },
  };

  const selectedMenuItemStyle = {
    backgroundColor: "#1565C0",
    color: "white",
    "&:hover": {
      background: "#262424",
      color: "#1565C0",
    },
  };

  const handleMenuItemSelect = (tabValue) => {
    // navigate(`?tab=${tabValue}`)
    setSearchParams({
      ...searchParams,
      tab: tabValue,
    });
  };
  useEffect(() => {
    if (
      !searchParams.get("tab") ||
      (searchParams.get("tab") !== "job-posts" &&
        searchParams.get("tab") !== "profile")
    ) {
      setSearchParams({
        ...searchParams,
        tab: "job-posts",
      });
      setActiveTab("job-posts");
    } else {
      setActiveTab(searchParams.get("tab"));
    }
  }, [searchParams]);
  return (
    <div className={clsx(styles["companySidebar-wrapper"])}>
      <Sidebar
        rootStyles={{
          minHeight: "90vh",
          // overflowY: 'hidden',

          // width: "15vw",
          // background: "red",
          // height: '100vh'
        }}
      >
        <div className={clsx(styles["company-logo-wrapper"])}>
          <img src={companyLogo} alt="companylogo" />
        </div>
        <Menu className={clsx(styles["companySidebar-wrapper"])}>
          {/* <SubMenu label="Job section">
            <MenuItem active={activeItem === 'Home'} onClick={handleMenuItemSelect}> Job posts </MenuItem>
            <MenuItem active={activeItem === 'Dashboard'} onClick={handleMenuItemSelect}> Create new Job post </MenuItem>
          </SubMenu> */}
          <MenuItem
            onClick={() => handleMenuItemSelect("job-posts")}
            rootStyles={
              activeTab === "job-posts" ? selectedMenuItemStyle : menuItemStyle
            }
            // rootStyles={
            //   searchParams.get["tab"] == "job-posts"
            //     ? selectedMenuItemStyle
            //     : null
            // }
          >
            Job posts
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuItemSelect("profile")}
            rootStyles={
              activeTab === "profile" ? selectedMenuItemStyle : menuItemStyle
            }
          >
            {" "}
            Company Information{" "}
          </MenuItem>
          {/* <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <MenuItem> Calendar </MenuItem> */}
        </Menu>
      </Sidebar>
    </div>
  );
};

export default CompanySidebar;
