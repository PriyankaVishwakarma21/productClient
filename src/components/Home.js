import React from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';
import SingleProduct from './SingleProduct';
import './styles.css';
import AddProductModal from './AddProductModal';
// import secureLocalStorage from 'react-secure-storage';
import UserContext from '../context.js/UserContext';

export default function Home() {

    const [products, setProducts] = React.useState([]);
    const [show, setShow] = React.useState(false);
    const [productToEdit, setProductToEdit] = React.useState(null);
    const { user } = React.useContext(UserContext);

    const getInitialData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/products`);
            const responseData = response.data;

            if (responseData?.status === 200) {
                setProducts(responseData?.data);
            }

        } catch (error) {
            alert('Error: ', error);
        }
    }
    React.useEffect(() => {
        getInitialData();
    }, []);

    const AddProductCallBack = (product, id) => {
        if (id) {
            setProducts(products.map(p => p._id === id ? product : p));
        } else {
            setProducts([...products, product]);
        }
        setShow(false);
    }

    const handleEditProduct = (product) => {
        setProductToEdit(product);
        setShow(true);
    }
    const handleCloseModal = () => {
        setShow(false);
        setProductToEdit(null);
    }

    const handleAddToCart = async (data) => {
        try {
            const response = await axios.post(`http://localhost:4000/api/cart/addToCart`, data, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (response.data.status === 200) {
                alert(`${response.data.message}`);
            }

        } catch (error) {
            alert('Error: ', error);
        }

    }


    return (
        <div>
            <div style={{ padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row' }}>
                    {user.role === 'admin' && (<Button onClick={() => setShow(true)}>Add Product</Button>)}
                </div>
                {products.length > 0 ? (
                    <Row>
                        {products.map((product, i) => (
                            <Col key={i} xs={12} sm={6} md={4} lg={3}>
                                <SingleProduct product={product} onEdit={() => handleEditProduct(product)} role={user.role} addToCart={handleAddToCart} />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <div>No products available at this moment</div>
                )}

                {show && user.role === 'admin' && (<AddProductModal visible={show} onClose={handleCloseModal} AddProductCallBack={AddProductCallBack}
                    productToEdit={productToEdit} role={user.role}
                />)}
            </div>
        </div>

    )
}
