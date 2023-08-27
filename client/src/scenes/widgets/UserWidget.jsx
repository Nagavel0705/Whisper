import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Box, Divider, Typography } from "@mui/material";
import {
  EditOutlined,
  LocationOnOutlined,
  ManageAccountsOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap={"0.5rem"}
        onClick={() => navigate(`/profile/${userId}`)}
        flexDirection={"column"}
      >
        <FlexBetween gap={"1rem"} mb={"0.5rem"}>
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight={"500"}
              sx={{
                "&: hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
          <ManageAccountsOutlined />
        </FlexBetween>

        <Divider sx={{ width: "100%" }} />

        {/* SECOND ROW */}
        <Box p={"1rem 0rem"} display={"flex"} gap={"2rem"}>
          <Box display={"flex"} alignItems={"center"} gap={"0.5rem"}>
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{location}</Typography>
          </Box>
          <Box display={"flex"} alignItems={"center"} gap={"0.5rem"}>
            <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{occupation}</Typography>
          </Box>
        </Box>

        <Divider sx={{ width: "100%" }} />

        {/* THIRD ROW */}
        <Box p={"1rem 0"} width={"100%"}>
          <FlexBetween mb={"0.5rem"}>
            <Typography color={medium}>Who's viewed your profile</Typography>
            <Typography color={main} fontWeight={"500"}>
              {viewedProfile}
            </Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography color={medium}>Impressions of your post</Typography>
            <Typography color={main} fontWeight={"500"}>
              {impressions}
            </Typography>
          </FlexBetween>
        </Box>

        <Divider sx={{ width: "100%" }} />

        {/* FOURTH ROW */}
        <Box p={"0.5rem 0"} width={"100%"}>
          <Typography
            fontSize={"1rem"}
            color={main}
            fontWeight={"500"}
            mb={"1rem"}
          >
            Social Profiles
          </Typography>
          <FlexBetween gap={"1rem"} mb={"0.5rem"}>
            <FlexBetween gap={"1rem"}>
              <img src="../assets/twitter.png" alt="twitter" />
              <Typography color={main} fontWeight={500}>Twitter</Typography>
            </FlexBetween>
            <EditOutlined />
          </FlexBetween>
          <FlexBetween gap={"1rem"} mb={"0.5rem"}>
            <FlexBetween gap={"1rem"}>
              <img src="../assets/linkedin.png" alt="linkedin" /> 
              <Typography color={main} fontWeight={500}>LinkedIn</Typography>
            </FlexBetween>
            <EditOutlined />
          </FlexBetween>
        </Box>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default UserWidget;
