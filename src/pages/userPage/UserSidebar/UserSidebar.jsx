import React, { useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import clsx from "clsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import companyLogo from "../../../../public/xCompany.png";
// import companyLogo from "../../../../public/jobhunter.png";
import styles from "./userSidebar.module.css";
import { Hidden } from "@mui/material";

const UserSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState("job-applied");

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
    if (!searchParams.get("tab") || (searchParams.get("tab"))!== 'job-applied' &&  searchParams.get("tab") !== 'profile') {
      setSearchParams({
        ...searchParams,
        tab: "job-applied",
      });
      setActiveTab("job-applied");
    } else {
      setActiveTab(searchParams.get("tab"));
    }
  }, [searchParams]);
  return (
    <div className={clsx(styles["userSidebar-wrapper"])}>
      <Sidebar
        rootStyles={{
          minHeight: "90vh",
          // overflowY: 'hidden',

          // width: "15vw",
          // background: "red",
          // height: '100vh'
        }}
      >
        {/* <div className={clsx(styles["user-logo-wrapper"])}>
          <img src={companyLogo} alt="companylogo" />
        </div> */}
        <Menu className={clsx(styles["userSidebar-wrapper"])}>
          {/* <SubMenu label="Job section">
            <MenuItem active={activeItem === 'Home'} onClick={handleMenuItemSelect}> Job posts </MenuItem>
            <MenuItem active={activeItem === 'Dashboard'} onClick={handleMenuItemSelect}> Create new Job post </MenuItem>
          </SubMenu> */}
          <MenuItem
            onClick={() => handleMenuItemSelect("job-applied")}
            rootStyles={
              activeTab === "job-applied"
                ? selectedMenuItemStyle
                : menuItemStyle
            }
            // rootStyles={
            //   searchParams.get["tab"] == "job-posts"
            //     ? selectedMenuItemStyle
            //     : null
            // }
          >
            Jobs Applied
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuItemSelect("profile")}
            rootStyles={
              activeTab === "profile" ? selectedMenuItemStyle : menuItemStyle
            }
          >
            {" "}
            User Information{" "}
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default UserSidebar;
