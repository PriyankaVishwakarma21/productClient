import React from 'react'
import { Card, ListGroup, ListGroupItem, Button, Form } from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';

export default function SingleProduct({ product, onEdit, role, addToCart }) {
    const [color, setColor] = React.useState(null);
    const [size, setSize] = React.useState(null);
    const add = () => {
        const token = secureLocalStorage.getItem('token');
        if (token === null) {
            return alert('Login to the system');
        }
        if (color === null || size === null) {
            return alert('Please select the color and size');
        }
        addToCart({ productId: product._id, name: product.name, pice: product.price, color: color, size: size });
    }
    return (
        <div className='product-card'>
            <Card style={{ width: '18rem', marginBottom: '20px', height: '100%' }}>
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text className="product-description">
                        {product.description.substring(0, 40)}{product.description.length > 20 ? '...' : ''}
                    </Card.Text>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem><strong>Price:</strong> ${product.price}</ListGroupItem>
                        <ListGroupItem><strong>Colors:</strong>
                            {
                                product.color.length > 0 && product.color.map((c, i) => (
                                    <Form.Check type='radio' key={i} label={c} onClick={() => setColor(c)} />
                                ))
                            }
                        </ListGroupItem>
                        <ListGroupItem><strong>Sizes:</strong>
                            {
                                product.size.length > 0 && product.size.map((s, i) => (
                                    <Form.Check type='radio' key={i} label={s} onClick={() => setSize(s)} />
                                ))
                            }
                        </ListGroupItem>
                    </ListGroup>
                    {role !== 'admin' && (
                        <Button onClick={() => add()}>Add To Cart</Button>
                    )}
                    {role === 'admin' && (<Card.Footer>
                        <Button onClick={() => onEdit(product)}>Edit</Button>
                    </Card.Footer>)}
                </Card.Body>
            </Card>
        </div>
    )
}
