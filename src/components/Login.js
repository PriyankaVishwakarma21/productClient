import React from 'react'
import { Container, Card } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

export default function Login() {
    const loginSchema = yup.object({
        email: yup.string().required('Email is required'),
        password: yup.string().required('Password is required')
    })
    const handleLogin = async (values) => {
        try {
            const response = await axios.post(`http://localhost:4000/api/users/login`, values);
            if (response.data.status === 200) {

                secureLocalStorage.setItem("role", response.data.user.role);
                secureLocalStorage.setItem("token", response.data.token);

                alert(`${response.data.message}`);
            }
        } catch (error) {
            alert('Error: ', error);
        }
    }
    return (
        <Container align="center">
            <Card style={{ marginTop: 30, width: '25rem' }}>
                <Card.Body>
                    <Card.Title style={{ fontSize: 30 }}>Login</Card.Title>
                    <div>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={loginSchema}
                            onSubmit={(values, actions) => {
                                handleLogin(values);
                            }

                            }
                        >
                            {(props) => (
                                <Form onSubmit={props.handleSubmit}>
                                    <div >

                                        <label >Email: </label>
                                        <Form.Control
                                            aria-label="Default"
                                            aria-describedby="inputGroup-sizing-default"
                                            placeholder="Enter your email"
                                            name="email"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.email}
                                        />
                                        {props.errors.email && props.touched.email && (
                                            <div className="error">{props.errors.email}</div>
                                        )}
                                        <br />
                                    </div>
                                    <div>

                                        <label>password: </label>
                                        <Form.Control
                                            aria-label="Default"
                                            aria-describedby="inputGroup-sizing-default"
                                            placeholder="Enter password"
                                            name="password"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.password}
                                        />
                                        {props.errors.password && props.touched.password && (
                                            <div className="error">{props.errors.password}</div>
                                        )}
                                        <br />
                                    </div>

                                    <Button variant="primary" type="submit">
                                        LOGIN
                                    </Button>
                                    <br />
                                    <a href="/register">Register your account</a>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
}
