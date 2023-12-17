import React from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mb="5px">
      <Typography
        variant="h4"
        color={colors.blueAccent[600]}
        fontWeight="bold"
      >
        {title}
      </Typography>
     
      <Typography
        variant="h6"
        color={colors.blueAccent[800]}
        fontWeight="bold"
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
