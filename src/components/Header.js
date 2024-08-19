import React from 'react'
import { Container, Navbar, NavbarBrand, Nav, Dropdown, Badge, Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import secureLocalStorage from 'react-secure-storage';

const Header = () => {
    const logout = () => {
        secureLocalStorage.removeItem('role');
        secureLocalStorage.removeItem('token');
    }
    return (
        <>
            <Navbar bg="dark" variant='dark' style={{ height: 80 }}>
                <Container>
                    <NavbarBrand>
                        <a href='/'>Shopping Cart</a>
                    </NavbarBrand>
                    <Navbar.Text className='search'>
                    </Navbar.Text>
                    <Nav>
                        <Dropdown align="right">
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                <FaShoppingCart color="white" fontSize="25px" />
                                <Badge>{10}</Badge>
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={{ minWidth: 370 }}>
                                <span style={{ padding: 10 }}>Cart is Empty!</span>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                    <Button variant="primary" ><a href="/login">Sign In</a></Button>
                    <Button variant="primary" onClick={() => logout()}>Sign Out</Button>

                </Container>
            </Navbar>
        </>
    )
}

export default Header;
