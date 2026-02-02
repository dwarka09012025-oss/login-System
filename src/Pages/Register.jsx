import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    TextField,
    Button,
    Typography,
    Container,
    Box,
    Paper,
    Avatar,
    Link as MuiLink
} from '@mui/material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { Link } from 'react-router-dom';
import { Slide, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [user, setUser] = useState([]);
    const ini = { username: '', email: '', password: '' };
    const token = 'MYeZzKQ5JmDdUvG5';

    useEffect(() => {
        loginData();
    }, []);

    const loginData = () => {
        axios.get('https://generateapi.techsnack.online/api/loginapp', {
            headers: { Authorization: token }
        })
            .then((res) => {
                setUser(res.data.Data || []);
            })
            .catch((err) => console.error("Fetch error:", err));
    };

    const postData = (values, { resetForm }) => {
        if (!values.email || !values.password || !values.username) {
            toast.error("Please fill all the fields");
            return;
        }

        const existingUser = user.find((item) => item.email === values.email);
        if (existingUser) {
            toast.error("User with this email already exists");
            return;
        }

        axios.post("https://generateapi.techsnack.online/api/loginapp", values, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                toast.success("Registered Successfully!");
                resetForm();
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1000);
            })
            .catch((err) => {
                toast.error("Register Error");
                console.log(err);
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <PersonAddOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                        Create Account
                    </Typography>

                    <Formik initialValues={ini} onSubmit={postData}>
                        {() => (
                            <Form style={{ width: '100%' }}>
                                <Field
                                    name="username"
                                    label="User Name"
                                    as={TextField}
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                                <Field
                                    name="email"
                                    type="email"
                                    label="Email Address"
                                    as={TextField}
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                                <Field
                                    name="password"
                                    type="number"
                                    label="Password"
                                    as={TextField}
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 3, mb: 2, py: 1.2 }}
                                >
                                    Register
                                </Button>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="body2">
                                        Already have an account?{' '}
                                        <MuiLink
                                            component={Link}
                                            to="/login"
                                            underline="hover"
                                            sx={{ fontWeight: 'bold' }}
                                        >
                                            Login
                                        </MuiLink>
                                    </Typography>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Box>

            {/* <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((i, index) => (
                        <tr key={i._id || index}>
                            <td>{i.username}</td>
                            <td>{i.email}</td>
                            <td>{i.password}</td>
                        </tr>
                    ))}
                </tbody>
            </table> */}

            <ToastContainer position="bottom-right" transition={Slide} />
        </Container>
    );
}

export default Register;