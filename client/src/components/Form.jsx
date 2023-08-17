import { RemoveRedEye } from "@mui/icons-material";
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("Invalid Email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required")
});

export default function Form() {
  return (
    <Box>
      <TextField
        variant="outlined"
        placeholder="Email"
        sx={{ width: "100%", marginBottom: "2rem" }}
      />
      <TextField
        variant="outlined"
        placeholder="Password"
        sx={{ width: "100%" }}
        type="password"
      />
    </Box>
  );
}
