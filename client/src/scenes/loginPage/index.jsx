import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Form from "components/Form";
import React from "react";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <Box
        width={"100%"}
        bgcolor={theme.palette.background.alt}
        p={"1rem 6%"}
        textAlign={"center"}
      >
        <Typography
          fontWeight="bold"
          fontSize={{ xs: "1rem", sm: "2rem" }}
          color="primary"
        >
          Whisper
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "90%"}
        p={"2rem 3rem"}
        m={"2rem auto"}
        borderRadius={"1.5rem"}
        bgcolor={theme.palette.background.alt}
      >
        <Typography
          fontWeight={"400"}
          variant="h4"
          sx={{ marginBottom: "1.5rem" }}
          textAlign={"center"}
        >
          Welcome to Whisper, the more peaceful and less dramatic social media
          app
        </Typography>

        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
