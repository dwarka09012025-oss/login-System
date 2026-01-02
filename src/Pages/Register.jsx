import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Slide, toast, ToastContainer } from 'react-toastify';

const Register = () => {

    const [user, setUser] = useState([]);
    const ini = { username: '', email: '', password: '' }
    const token = 'MYeZzKQ5JmDdUvG5';

    useEffect(() => {
        loginData();
    }, []);

    const loginData = () => {
        axios.get('https://generateapi.techsnack.online/api/loginapp', {
            headers: { Authorization: token } 
        })
            .then((res) => {
                console.log(res);
                setUser(res.data.Data || []);
            })
            .catch((err) => console.error("Fetch error:", err));
    };

    const postData = (values, { resetForm }) => {
        if (values.email === '' || values.password === '' || values.username === '') {
            toast.error("Please fill all the fields");
            return;
        }

        const existingUser = user.find((item) => item.email === values.email);
        if (existingUser) {
            toast.error("User with this email already exists");
            resetForm();
            return;
        }

        axios.post("https://generateapi.techsnack.online/api/loginapp", values, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                // console.log("Registered");
                toast.success("Register Successfully!");
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
        <>
            <Formik initialValues={ini} onSubmit={postData} >
                <Form>
                    <Field name="username" label="User Name" as={TextField} variant="outlined" /><br /><br />
                    <Field name="email" type="email" label="Email" as={TextField} variant="outlined" /><br /><br />
                    <Field name="password" type="number" label="Password" as={TextField} variant="outlined" /><br /><br />

                    <Button type="submit" variant='contained'>
                        Submit
                    </Button><br /><br />
                </Form>
            </Formik>

            <Typography>
                Already have an account?{' '}
                <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
                    Login
                </Link>
            </Typography>

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
        </>
    )
}

export default Register;