//Import in all needed hooks and dependencies
import { Link }                from "react-router-dom";

//Import in bootstrap components
import Navbar         from 'react-bootstrap/Navbar';
import Container      from 'react-bootstrap/Container';
import Button         from 'react-bootstrap/Button';
import Form           from 'react-bootstrap/Form';
import Nav            from 'react-bootstrap/Nav';
import NavDropdown    from 'react-bootstrap/NavDropdown';
import Offcanvas      from 'react-bootstrap/Offcanvas';
//Import all assets
import logo       from '../assets/inventoryNestLogo.png';
import userAvatar from '../assets/userAvatar.png';




function OffcanvasExample( { ownerName }) {
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3" data-bs-theme="dark">
          <Container fluid>
            <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start"
                data-bs-theme="dark"
                >
                <Offcanvas.Header closeButton>
                    <img
                                alt="inventory nest logo"
                                src= {logo}
                                width="80"
                                height="80"
                                className="d-inline-block align-top"
                                />{' '}
                <Offcanvas.Title>Inventory Nest <br/><span style = {{fontSize:"15px"}}>The Only Tool You Need</span> </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link><Link to = "/" relative="path"> Return Home </Link></Nav.Link>
                    <Nav.Link><Link to = "/" relative="path"> User Manual </Link></Nav.Link>
                    <NavDropdown
                        title="Products"
                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">
                        Another action
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                            Products is where you can browse all products offered across all warehouses, 
                        </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown
                        title="Warehouses"
                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">
                        Another action
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">
                        Something else here
                        </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown
                        title="Customers"
                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">
                        Another action
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">
                        Something else here
                        </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown
                        title="Analytics"
                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">
                        Another action
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">
                        Something else here
                        </NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Link to='/' title="return Home" relative="path"  style={{ textDecoration: 'none' }}>
                    <Navbar.Brand>
                            <img
                            alt="inventory nest logo"
                            src= {logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            />{' '}
                            <span style={{margin:"0px 20px"}}>Inventory Nest </span>
                            <img
                            alt="inventory nest logo"
                            src= {logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            />{' '}
                        </Navbar.Brand>
            </Link>
            <Link to='/reporting' title="return Home" relative="path"  style={{ textDecoration: 'none' }}>
                    <Navbar.Text>
                    <span style={{margin:"0px 20px", marginTop:"40px"}}>  Signed in as: {ownerName} </span>
                        <img
                            alt="user icon"
                            src= {userAvatar}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            id="userIcon"
                        />{''}
                    </Navbar.Text>
            </Link>   
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;