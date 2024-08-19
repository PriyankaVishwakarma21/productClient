import React from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

export default function Register() {
    const registerSchema = yup.object({
        name: yup.string().required('Name is required'),
        email: yup.string().required('Email is required').email('Must be valid'),
        mobileno: yup.string().required('Mobile no is required'),
        password: yup.string().required('Password is required')
    })
    const handleSubmit = async (values) => {
        try {
            const response = await axios.post(`http://localhost:4000/api/users/create`, values);
            if (response.data.status === 200) {
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
                    <Card.Title style={{ fontSize: 30 }}>Register</Card.Title>
                    <div>
                        <Formik
                            initialValues={{ name: '', email: '', mobileno: '', password: '' }}
                            validationSchema={registerSchema}
                            onSubmit={(values, actions) => {
                                handleSubmit(values);
                            }}
                        >
                            {(props) => (
                                <Form onSubmit={props.handleSubmit}>
                                    <div >

                                        <label >Name: </label>
                                        <Form.Control
                                            aria-label="Default"
                                            aria-describedby="inputGroup-sizing-default"
                                            placeholder="Enter your name"
                                            name="name"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.name}
                                        />
                                        {props.errors.name && props.touched.name && (
                                            <div className="error">{props.errors.name}</div>
                                        )}
                                        <br />
                                    </div>
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
                                    <div >

                                        <label >Mobileno: </label>
                                        <Form.Control
                                            aria-label="Default"
                                            aria-describedby="inputGroup-sizing-default"
                                            placeholder="Enter your mobile number"
                                            name="mobileno"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.mobileno}
                                        />
                                        {props.errors.mobileno && props.touched.mobileno && (
                                            <div className="error">{props.errors.mobileno}</div>
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
                                        Register
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
}
