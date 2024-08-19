import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import * as yup from 'yup';
import { Formik, Field } from 'formik';
import axios from 'axios';

export default function AddProductModal({ visible, onClose, AddProductCallBack,
    productToEdit
}) {
    const colors = ['Yellow', 'Green', 'Pink', 'Red', 'Blue'];
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

    const initialValues = productToEdit || { name: '', description: '', price: '', colors: [], size: [] };

    const productSchema = yup.object({
        name: yup.string().required('Name is required'),
        description: yup.string().required('Description is required'),
        price: yup.number().required('Price is required'),
        color: yup.array()
            .of(yup.string().required('Color is required'))
            .min(1, 'At least one color is required')
            .required('Colors are required'),
        size: yup.array()
            .of(yup.string().required('Size is required'))
            .min(1, 'At least one size is required')
            .required('Size is required')
    });

    const handleAddProduct = async (values) => {
        try {
            const response = await axios.post(`http://localhost:4000/api/products/save`, values);
            if (response.data.status === 200) {
                alert('Product Added successfully');
                AddProductCallBack(response.data.data);
            }
        } catch (error) {
            alert('Error: ', error);
        }

    }

    const handleEditProduct = async (product, id) => {
        try {
            const response = await axios.put(`http://localhost:4000/api/products/update/${id}`, product);
            if (response.data.status === 200) {
                alert('Product Updated Successfully');
                AddProductCallBack(response.data.data, id);
            }
        } catch (error) {
            alert('Edit Error: ', error);
        }
    }

    return (
        <div>
            <Modal show={visible} onHide={onClose} backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>{productToEdit ? 'Edit Product' : 'Add Product'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={productSchema}
                        onSubmit={(values, actions) => {
                            // handleSubmitProduct(values);
                            if (productToEdit) {
                                // Call the update product callback
                                handleEditProduct(values, productToEdit._id);
                            } else {
                                // Call the add new product callback
                                handleAddProduct(values);
                            }

                            // Close the modal after submission
                            onClose();
                        }

                        }
                    >
                        {(props) => (
                            <Form onSubmit={props.handleSubmit}>
                                <label>Name: </label>
                                <Form.Control
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                    placeholder="Enter product name"
                                    name="name"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.name}
                                />
                                {props.errors.name && props.touched.name && (
                                    <div className="error">{props.errors.name}</div>
                                )}
                                <br />

                                <label>Description: </label>
                                <Form.Control
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                    placeholder="Enter product description"
                                    name="description"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.description}
                                />
                                {props.errors.description && props.touched.description && (
                                    <div className="error">{props.errors.description}</div>
                                )}
                                <br />

                                <label>Price: </label>
                                <Form.Control
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                    placeholder="Enter product price"
                                    name="price"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.price}
                                />
                                {props.errors.price && props.touched.price && (
                                    <div className="error">{props.errors.price}</div>
                                )}
                                <br />

                                <label htmlFor="checkbox-group">Color: </label>
                                <div role="group" aria-labelledby="checkbox-group">
                                    {colors.map((color, i) => (
                                        <label key={i}>
                                            <Field
                                                type="checkbox"
                                                name="color"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={color}
                                            />
                                            {color}
                                        </label>
                                    ))}
                                </div>
                                {props.errors.color && props.touched.color && (
                                    <div className="error">{props.errors.color}</div>
                                )}
                                <br />

                                <label htmlFor="checkbox-group">Sizes: </label>
                                <div role="group" aria-labelledby="checkbox-group">
                                    {sizes.map((size, i) => (
                                        <label key={i}>
                                            <Field
                                                type="checkbox"
                                                name="size"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={size}
                                            />
                                            {size}
                                        </label>
                                    ))}
                                </div>
                                {props.errors.size && props.touched.size && (
                                    <div className="error">{props.errors.size}</div>
                                )}
                                <br />

                                <Button variant="primary" type="submit">
                                    {productToEdit ? 'Update Product' : 'Add Product'}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
