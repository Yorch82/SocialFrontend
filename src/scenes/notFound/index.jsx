import { Box, Typography, useMediaQuery } from "@mui/material";

const NotFound = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box
        width='100%'
        padding='2rem 6%'
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap='0.5rem'
        justifyContent='center'
        mt='10rem'
      >
        <Typography variant="h1">
          404 Not Found
        </Typography>
      </Box>
  );
};

export default NotFound;
