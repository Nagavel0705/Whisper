import {
  DarkMode,
  Help,
  LightMode,
  Message,
  Notifications,
  Search,
  Menu as MenuIcon,
  Close,
} from "@mui/icons-material";
import {
  Box,
  FormControl,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout, setMode } from "state";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();

  const neutralLight = theme.palette.neutral.light;
  const neutralDark = theme.palette.neutral.dark;

  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;

  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <FlexBetween p={"1rem 6%"} bgcolor={alt}>
      <FlexBetween gap={"3rem"}>
        <Typography
          fontWeight="bold"
          fontSize={{ xs: "1rem", sm: "2rem" }}
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Whisper
        </Typography>
        {isNonMobileScreen && (
          <FlexBetween
            bgcolor={neutralLight}
            borderRadius={"9px"}
            gap={"3rem"}
            p={"0.1rem 1.5rem"}
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* NAVBAR FOR DESKTOPS */}
      {isNonMobileScreen ? (
        <FlexBetween gap={"0.5rem"}>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "light" ? <DarkMode /> : <LightMode />}
          </IconButton>
          <IconButton>
            <Message />
          </IconButton>
          <IconButton>
            <Notifications />
          </IconButton>
          <IconButton>
            <Help />
          </IconButton>
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                bgcolor: neutralLight,
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <MenuIcon />
        </IconButton>
      )}

      {!isNonMobileScreen && isMobileMenuToggled && (
        <Box
          position={"fixed"}
          right={"0"}
          bottom={"0"}
          height={"100%"}
          maxWidth={"500px"}
          minWidth={"300px"}
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display={"flex"} justifyContent={"flex-end"} p={"1rem"}>
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween flexDirection={"column"}>
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "light" ? <DarkMode /> : <LightMode />}
            </IconButton>
            <IconButton>
              <Message />
            </IconButton>
            <IconButton>
              <Notifications />
            </IconButton>
            <IconButton>
              <Help />
            </IconButton>
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  bgcolor: neutralLight,
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(setLogout());
                    navigate("/");
                  }}
                >
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
