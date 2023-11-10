//Import in all needed hooks and dependencies
import { Link }                from "react-router-dom";

//Import in bootstrap components
import Navbar         from 'react-bootstrap/Navbar';
import Container      from 'react-bootstrap/Container';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip        from 'react-bootstrap/Tooltip';
//Import all assets
import logo       from '../assets/inventoryNestLogo.png';
import userAvatar from '../assets/userAvatar.png';


function HorizontalNavbar( { ownerName }) {
    //make links have a tooltip
    const HoverLink = ({ id, children, title, to }) => (
      <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
        <Link to={to} relative="path">{children}</Link>
      </OverlayTrigger>
    ); 
    return (
        <Navbar className="bg-body-tertiary" data-bs-theme="dark">
            <Container> 
                <HoverLink title="Return Home" id="home" to="/" >
                    <Navbar.Brand>
                        <img
                        alt="inventory nest logo"
                        src= {logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        />{' '}
                        Inventory Nest
                    </Navbar.Brand>
                </HoverLink>
                <HoverLink title="View Analytics" id="analytics" to="/reporting" >
                    <Navbar.Brand>
                        Signed in as: {ownerName} 
                        <img
                            alt="user icon"
                            src= {userAvatar}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            id="userIcon"
                        />{''}
                    </Navbar.Brand>
                </HoverLink>                   
            </Container>
      </Navbar>
    );
}

export default HorizontalNavbar;