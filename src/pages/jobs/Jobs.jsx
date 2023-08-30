import TextField from "@mui/material/TextField";
import styles from "./jobs.module.css";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { alpha, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useState } from "react";
import JobList from "../../components/JobList/JobList";
import { FormControl } from "@mui/material";

const CustomTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "red",
    borderRadius: "10px",
    // borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px solid black",
      borderRadius: "10px",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
      borderRadius: "10px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
      borderRadius: "10px",
    },
  },
});

const Jobs = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryParamValue = searchParams.get("type");
  console.log(queryParamValue);
  const [searchQuery, setSearchQuery] = useState({
    type: searchParams.get("type"),
    place: searchParams.get("place"),
  });

  const searchJobListByQueries = () => {
    navigate(`/jobs?type=${searchQuery.type}&place=${searchQuery.place}`);
  };
  return (
    <div>
      <div className={styles["job-search-bg-cover"]}>
        <div className={styles["job-search-wrapper"]}>
          <FormControl
            fullWidth
            component="form"
            onSubmit={() => console.log("search")}
          >
            <div className={styles["job-search-field-wrapper"]}>
              <CustomTextField
                id="outlined-basic"
                label="What?"
                value={searchQuery.type}
                placeholder="Job title, Keywords, or Company"
                variant="outlined"
                onChange={(e) =>
                  setSearchQuery({ ...searchQuery, type: e.target.value })
                }
                type="search"
                required
              />

              <CustomTextField
                id="filled-basic"
                label="Where?"
                value={searchQuery.where}
                placeholder="City, State, Contry, or Remote"
                variant="outlined"
                onChange={(e) =>
                  setSearchQuery({ ...searchQuery, place: e.target.value })
                }
                type="search"
                required
              />
            </div>
            <div className={styles["search-btn-wrapper"]}>
              <Button
                type="submit"
                variant="contained"
                onClick={() => searchJobListByQueries()}
                sx={{
                  padding: "0.7rem",
                  borderRadius: "20px",
                  background: "#643393",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#653393cf",

                    borderColor: "#0062cc",
                    boxShadow: "none",
                  },
                }}
                // disabled={searchQuery.type && searchQuery.place ? false : true}
              >
                Search
              </Button>
            </div>
          </FormControl>
        </div>
      </div>
      <div className={styles["job-list-component-wrapper"]}>
        <JobList />
      </div>
    </div>
  );
};

export default Jobs;
