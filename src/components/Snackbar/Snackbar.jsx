import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useEffect } from "react";
import { useState } from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// export default function CustomizedSnackbars(props) {
//   const [open, setOpen] = React.useState(true);
//   const [selectedType, setSelectedType] = useState("success");

// //   useEffect(() => {
// //     setOpen(props.show);
// //     setSelectedType(props.type);
// //   }, [props]);
//   //   const handleClick = () => {
//   //     setOpen(true);
//   //   };

//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }

//     setOpen(false);
//   };

//   const renderSelectedSnackbar = () => {
//     if (selectedType === "success") {
//       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//         <Alert
//           onClose={handleClose}
//           severity={selectedType}
//           sx={{ width: "100%" }}
//         >
//           {props.msg}
//         </Alert>
//       </Snackbar>;
//     } else if (selectedType === "error") {
//       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//         <Alert
//           onClose={handleClose}
//           severity={selectedType}
//           sx={{ width: "100%" }}
//         >
//           {props.msg}
//         </Alert>
//       </Snackbar>;
//     } else if (selectedType === "warning") {
//       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//         <Alert
//           onClose={handleClose}
//           severity={selectedType}
//           sx={{ width: "100%" }}
//         >
//           {props.msg}
//         </Alert>
//       </Snackbar>;
//     } else if (selectedType === "info") {
//       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//         <Alert
//           onClose={handleClose}
//           severity={selectedType}
//           sx={{ width: "100%" }}
//         >
//           {props.msg}
//         </Alert>
//       </Snackbar>;
//     }
//     else {
//         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//           <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
//             {props.msg}
//           </Alert>
//         </Snackbar>;
//     }
//   };

//   return (
//     <>
//       {/* <Button variant="outlined" onClick={handleClick}>
//         Open success snackbar
//       </Button> */}
//       {renderSelectedSnackbar()}
//     </>
//   );
// }
function CustomSnackbar({ open, message, severity, reset }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    useEffect(() => {
setSnackbarOpen(open)
    }, [open])
    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setSnackbarOpen(false);
      reset()
    }
  return (
    <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackbar;
