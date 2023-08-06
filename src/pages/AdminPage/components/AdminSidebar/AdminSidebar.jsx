import React, { useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import clsx from "clsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import companyLogo from "../../../../../public/jobsearch.jpeg";
// import companyLogo from "../../../../public/jobhunter.png";
import styles from "./adminSidebar.module.css";
import { Hidden } from "@mui/material";
import { LuLayoutDashboard } from 'react-icons/lu';
import { GrProductHunt } from "react-icons/gr";
import { MdProductionQuantityLimits } from "react-icons/md";
const AdminSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState("");

  const menuItemStyle = {
    // backgroundColor: "#FBFBFB",
    color: "white",
    "&:hover": {
      background: "#313338",
      color: "black",
    },
  };

  const selectedMenuItemStyle = {
    backgroundColor: "#1565C0",
    color: "white",
    "&:hover": {
      background: "#313338",
      color: "black",
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
      (searchParams.get("tab") !== "dashboard" &&
        searchParams.get("tab") !== "companyList" &&
        searchParams.get("tab") !== "userList")
    ) {
      setSearchParams({
        ...searchParams,
        tab: "dashboard",
      });
      setActiveTab("dashboard");
    } else {
      setActiveTab(searchParams.get("tab"));
    }
  }, [searchParams]);
  return (
    <div className={clsx(styles["adminSidebar-wrapper"])}>
      <Sidebar
        rootStyles={{
          minHeight: "100vh",
          // overflowY: 'hidden',

          // width: "15vw",
          // backgroundcolor: "#1E1F22",
          // height: '100vh'
        }}
      >
        <div className={clsx(styles["admin-logo-wrapper"])}>
          {/* <img src={companyLogo} alt="companylogo" /> */}
          <h2 style={{ color: "white" }}>Admin Panel</h2>
        </div>
        <Menu className={clsx(styles["adminSidebar-wrapper"])}>
          {/* <SubMenu label="Job section">
            <MenuItem active={activeItem === 'Home'} onClick={handleMenuItemSelect}> Job posts </MenuItem>
            <MenuItem active={activeItem === 'Dashboard'} onClick={handleMenuItemSelect}> Create new Job post </MenuItem>
          </SubMenu> */}
          <MenuItem
            onClick={() => handleMenuItemSelect("dashboard")}
            icon={<LuLayoutDashboard />}
            rootStyles={
              activeTab === "dashboard" ? selectedMenuItemStyle : menuItemStyle
            }
            // rootStyles={
            //   searchParams.get["tab"] == "job-posts"
            //     ? selectedMenuItemStyle
            //     : null
            // }
            // rootStyles={{
            //   "&:hover": {
            //     background: "#313338",
            //     color: "black",
            //   },
            // }}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuItemSelect("companyList")}
            icon={<GrProductHunt />}
            rootStyles={
              activeTab === "companyList"
                ? selectedMenuItemStyle
                : menuItemStyle
            }
          >
            {" "}
            Company List
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuItemSelect("userList")}
            icon={<MdProductionQuantityLimits />}
            rootStyles={
              activeTab === "userList" ? selectedMenuItemStyle : menuItemStyle
            }
          >
            {" "}
            User List
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

export default AdminSidebar;
