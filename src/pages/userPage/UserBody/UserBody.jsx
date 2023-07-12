import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import JobApplied from "./JobApplied/JobApplied";
import UserInformation from "./UserInformation/UserInformation";
import styles from "./userBody.module.css";
import clsx from "clsx";

const UserBody = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { compID } = useParams();

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
