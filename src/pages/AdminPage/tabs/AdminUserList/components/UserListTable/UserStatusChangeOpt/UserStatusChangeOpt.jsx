import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ChecklistIcon from "@mui/icons-material/Checklist";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import PauseIcon from "@mui/icons-material/Pause";
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function CustomizedMenus(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (option) => {
    setAnchorEl(null);
    props.handleSelectOption(option);
  };
  const changeStatus = (newStatus) => {
    setAnchorEl(null);

    console.log('this will be the new status', newStatus)
    console.log("User name", props.userID);
  }

  const ActionOptions = (currentStatus) => {
    if (currentStatus === "pending") {
      return (
        <div>
          <MenuItem onClick={() => changeStatus("active")} disableRipple>
            <CheckIcon />
            Accept
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={() => changeStatus("reject")} disableRipple>
            <ClearIcon />
            Reject
          </MenuItem>
        </div>
      );
    } else if (currentStatus === "active") {
      return (
        <div>
          <MenuItem onClick={() => changeStatus("reject")} disableRipple>
            <ClearIcon />
            Reject
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />

          <MenuItem onClick={() => changeStatus("pending")} disableRipple>
            <PauseIcon />
            Pending
          </MenuItem>
        </div>
      );
    } else if (currentStatus === "rejected") {
      return (
        <div>
          <MenuItem onClick={() => changeStatus("active")} disableRipple>
            <CheckIcon />
            Accept
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />

          <MenuItem onClick={() => changeStatus("pending")} disableRipple>
            <PauseIcon />
            Pending
          </MenuItem>
        </div>
      );
    }
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        action
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {ActionOptions(props.currentStatus)}
        {/* {props.currentStatus === "prending" ? (
          <>
            <MenuItem onClick={() => handleClose("applicants")} disableRipple>
              <CheckIcon />
              Accept
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem
              onClick={() => handleClose("short-listed-applicant")}
              disableRipple
            >
              <ClearIcon />
              Rejected
            </MenuItem>
          </>
        ) : (
          <></>
        )} */}

        {/* <MenuItem onClick={() => handleClose("remove")} disableRipple>
          <DeleteForeverIcon />
          Remove
        </MenuItem> */}
        {/* <MenuItem onClick={handleClose} disableRipple>
          <MoreHorizIcon />
          More
        </MenuItem> */}
      </StyledMenu>
    </div>
  );
}
