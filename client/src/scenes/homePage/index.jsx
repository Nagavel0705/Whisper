import React from "react";
import Navbar from "scenes/navbar";
import { Box, useMediaQuery } from "@mui/material";
import UserWidget from "../widgets/UserWidget";
import FlexBetween from "components/FlexBetween";
import { useSelector } from "react-redux";

const HomePage = () => {
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width={"100%"}
        padding={isNonMobileScreen ? "2rem 2%" : "2rem 6%"}
        display={isNonMobileScreen ? "flex" : "block"}
        gap={"0.5rem"}
        justifyContent={"space-between"}
      >
        <Box flexBasis={isNonMobileScreen ? "25%" : undefined}>
          <UserWidget
            userId={_id}
            picturePath={picturePath}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
