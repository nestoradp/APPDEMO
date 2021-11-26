import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { useStyle } from "./FooterStyle";

function Footer() {
  const clases = useStyle();

  return (
    <Box className={clases.Principal} component="footer" mt={"auto"}>
      <Typography variant="h6" align="center" gutterBottom>
        Footer
      </Typography>
      <Typography variant="subtitle1" align="center" component="p">
        Something here to give the footer a purpose!
      </Typography>
    </Box>
  );
}

export default Footer;
