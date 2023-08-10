import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import Form from './Form';

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  return (
    <Box>
      <Box
        width='100%'
        backgroundColor={theme.palette.background.alt}
        p='1rem 6%'        
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <img
          width='5%'
          height='auto'
          alt='logo'
          src='http://localhost:3000/assets/logo.png'
          style={{ borderRadius: '0.75rem', margin: '0.75rem 1rem' }}
        />
        <Typography fontWeight='bold' fontSize='32px' color='primary'>
          Memestack
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
        >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            Bienvenido a Memestack, la Red Social para Programadores!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
