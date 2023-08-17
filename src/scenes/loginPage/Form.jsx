import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,  
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../state';
import Dropzone from 'react-dropzone';
import FlexBetween from '../../components/FlexBetween';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const registerSchema = yup.object().shape({
  name: yup.string().required('Obligatorio'),
  email: yup.string().email("Usa un email válido").required('Obligatorio'),
  password: yup.string().min(5).matches(passwordRules, { message: "Por favor crea una contraseña más robusta" }).required('Obligatorio'),
  password2: yup.string().oneOf([yup.ref("password"), null], "Las contraseñas no coinciden").required('Obligatorio'),
  myFile: yup.string(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Obligatorio'),
  password: yup.string().required('Obligatorio'),
});

const initialValuesRegister = {
  name: '',
  email: '',
  password: '',
  password2: '',
  myFile: '',
};

const initialValuesLogin = {
  email: '',
  password: '',
};

const Form = () => {
  const [pageType, setPageType] = useState('login');
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const isLogin = pageType === 'login';
  const isRegister = pageType === 'register';

  const register = async (values, onSubmitProps) => {
    console.log(values)
    console.log(onSubmitProps)
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    // if (values.myFile){
    //   formData.append('avatar', values.myFile.name);
    // }    
    console.log(formData);
    const savedUserResponse = await fetch('http://localhost:8080/users/', {
      method: 'POST',
      body: formData,
    });
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();
    console.log(savedUser)
    if (savedUser) {
      setPageType('login');
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch('http://localhost:8080/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate('/home');
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);    
  };
  
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (        
        <form onSubmit={handleSubmit}>
          <Box
            display='grid'
            gap='30px'
            gridTemplateColumns='repeat(4, minmax(0, 1fr))'
            sx={{
              '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label='Nombre'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name='name'
                  error={Boolean(touched.name) && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: 'span 4' }}
                />
                <Box
                  gridColumn='span 4'
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius='5px'
                  p='1rem'
                >
                  <Dropzone
                    acceptedFiles='.jpg,.jpeg,.png'
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue('myFile', acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p='1rem'
                        sx={{ '&:hover': { cursor: 'pointer' } }}
                      >
                        <input {...getInputProps()} />
                        {!values.myFile ? (
                          <p>Añade tu imagen de perfil aquí</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.myFile.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone> 
                </Box>
              </>
            )}

            <TextField
              label='Email'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name='email'
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: 'span 4' }}
            />
            <TextField
              label='Password'
              type='password'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name='password'
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: 'span 4' }}
            />
            {isRegister && (
              <>
                <TextField
                  label='Repeat Password'
                  type='password'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password2}
                  name='password2'
                  error={Boolean(touched.password2) && Boolean(errors.password2)}
                  helperText={touched.password2 && errors.password2}
                  sx={{ gridColumn: 'span 4' }}
                />
              </>
            )}
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type='submit'
              sx={{
                m: '2rem 0',
                p: '1rem',
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                '&:hover': { color: palette.primary.main },
              }}
            >
              {isLogin ? 'LOGIN' : 'REGISTRO'}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? 'register' : 'login');
                resetForm();
              }}
              sx={{
                textDecoration: 'underline',
                color: palette.primary.main,
                '&:hover': {
                  cursor: 'pointer',
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? 'No tienes cuenta? Regístrate aquí.'
                : 'Ya tienes una cuenta? Haz Login aquí.'}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
