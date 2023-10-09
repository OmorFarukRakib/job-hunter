import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import JobApplied from "./JobApplied/JobApplied";
import UserInformation from "./UserInformation/UserInformation";
import styles from "./userBody.module.css";
import clsx from "clsx";

const UserBody = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const { userID } = useParams();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("JS_userData"));
    if (userData.data.userID === userID) {
      console.log("milse");
    } else {
      console.log("mile nai");
      navigate(`/user/${userData.data.userID}`);
    }
    console.log(userID);
  }, [userID]);

  return (
    <div className={clsx(styles["userBody-wrapper"])}>
      {searchParams.get("tab") === "profile" ? (
        <UserInformation />
      ) : (
        <JobApplied />
      )}
    </div>
  );
};

export default UserBody;
