import { RemoveRedEye } from "@mui/icons-material";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("Invalid Email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const intialValuesLogin = {
  email: "",
  password: "",
};

export default function Form() {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const handleFormSubmit = async (values, onSubmitProps) => {};

  return (
    <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? intialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
    >
        {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
        }) => (
            <form onSubmit={handleSubmit}>
                
            </form>
        )}
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
    </Formik>
  );
}
