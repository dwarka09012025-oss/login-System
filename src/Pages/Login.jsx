import { Field, Form, Formik } from 'formik';
// import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    TextField,
    Button,
    Link,
    Typography,
    Container,
    Box,
    Paper,
    Avatar
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Slide, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    // const [user, setUser] = useState([]);
    const ini = { email: '', password: '' };
    const token = 'MYeZzKQ5JmDdUvG5';

    const handleLogin = (values, { resetForm }) => {
        if (!values.email || !values.password) {
            toast.error("Please fill all the fields");
            return;
        }

        axios.get('https://generateapi.techsnack.online/api/loginapp', {
            headers: { Authorization: token }
        })
            .then((res) => {
                const allUsers = res.data.Data || [];
                const foundUser = allUsers.find(
                    (item) =>
                        item.email === values.email &&
                        item.password.toString() === values.password.toString()
                );

                if (foundUser) {
                    toast.success("Login Successfully!");
                    localStorage.setItem("isAuth", "true");
                    localStorage.setItem("username", foundUser.username);
                    localStorage.setItem("loginData", JSON.stringify(foundUser));
                    resetForm();
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 1000);
                } else {
                    toast.error("Invalid Email or Password");
                }
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                toast.error("Server error");
            });
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper
                    elevation={6}
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: 2,
                        width: '100%'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                        Login
                    </Typography>

                    <Formik initialValues={ini} onSubmit={handleLogin}>
                        {() => (
                            <Form style={{ width: '100%' }}>
                                <Field
                                    name="email"
                                    as={TextField}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    label="Email Address"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <Field
                                    name="password"
                                    as={TextField}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, py: 1.2 }}
                                >
                                    Login
                                </Button>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="body2">
                                        Don't have an account?{' '}
                                        <Link href="/register" underline="hover" sx={{ fontWeight: 'bold' }}>
                                            Register
                                        </Link>
                                    </Typography>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Box>

            <ToastContainer position="bottom-right" transition={Slide} />
        </Container>
    );
}

export default Login;