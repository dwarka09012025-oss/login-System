import { Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Slide, toast, ToastContainer } from 'react-toastify';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const Login = () => {
    const [user, setUser] = useState([]);

    const ini = { email: '', password: '' }
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

    const handleLogin = (values, { resetForm }) => {
        if (values.email === '' || values.username === '') {
            toast.error("Please fill all the fields");
            return;
        }
        console.log(Object.keys(values));

        axios.get('https://generateapi.techsnack.online/api/loginapp', {
            headers: { Authorization: token }
        })
            .then((res) => {
                const allUsers = res.data.Data || [];

                const foundUser = allUsers.filter(
                    (item) =>
                        item.email === values.email &&
                        item.password.toString() === values.password.toString()
                );

                if (foundUser.length > 0) {
                    toast.success("Login Successfully!");
                    localStorage.setItem("isAuth", "true");
                    localStorage.setItem("username", foundUser[0].username);
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
        <>
            <Formik initialValues={ini} onSubmit={handleLogin}>
                <Form>
                    <Field name="email" label="Email" as={TextField} variant="outlined" /><br /><br />
                    <Field name="password" label="Password" type="password" as={TextField} variant="outlined" /><br /><br />

                    <Button type="submit" variant='contained'>
                        Submit
                    </Button><br /><br />
                </Form>
            </Formik>
            <Typography>
                Don't have an account?{' '}
                <Link href="/register" underline="hover">
                    Register
                </Link>
            </Typography>

            <ToastContainer position="bottom-right" transition={Slide} />

            {/* <table border={1} style={{ width: '100%', textAlign: 'center' }}>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((i, index) => (
                        <tr key={i._id || index}>
                            <td>{i.email}</td>
                            <td>{i.password}</td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </>
    )
}

export default Login