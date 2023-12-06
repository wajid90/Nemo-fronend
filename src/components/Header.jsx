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
        color={colors.grey[100]}
        fontWeight="bold"
      >
        {title}
      </Typography>
     
    </Box>
  );
};

export default Header;
