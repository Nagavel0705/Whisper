import React from "react";
import Navbar from "scenes/navbar";
import { Box } from "@mui/material";
import UserWidget from "../widgets/UserWidget";
import FlexBetween from "components/FlexBetween";
const HomePage = () => {
  return (
    <Box>
      <Navbar />
      <FlexBetween>
        <UserWidget userId={"64cc862adaa829b187ad4b23"} picturePath={"kawaii-cat-animal-cartoon-design-free-vector.jpg"}/>
      </FlexBetween>
    </Box>
  );
};

export default HomePage;
