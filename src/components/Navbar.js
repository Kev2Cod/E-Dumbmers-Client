import { React, useContext } from "react";
import ImgDumbMers from "../assets/img/icon/icon-dumb-merch.png";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { Container, Navbar as NavbarComp, Nav } from "react-bootstrap";

const Navbar = (props) => {
  const navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate('/auth')
  };
  
  return (
    <>
      <NavbarComp variant="dark" expand="lg">
        <Container>
          <NavbarComp.Brand as={Link} to="/">
            <img alt="Icon Dumbmers" src={ImgDumbMers} width="50" height="50" className="d-inline-block align-top" />
          </NavbarComp.Brand>
          <NavbarComp.Toggle aria-controls="basic-navbar-nav" />
          <NavbarComp.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto text-center ">
              <Nav.Link as={Link} to="/complain" className={ props?.title == "Complain" ? `text-navbar-active`:`text-navbar`}>Complain</Nav.Link>
              <Nav.Link as={Link} to="/" className={props?.title == "Products" ? `text-navbar-active`:`text-navbar`}>Products</Nav.Link>
              <Nav.Link as={Link} to="/profile" className={props?.title == "Profile"? `text-navbar-active`:`text-navbar`}>Profile</Nav.Link>
              <Nav.Link onClick={logout} className="text-navbar">Logout</Nav.Link>
            </Nav>
          </NavbarComp.Collapse>
        </Container>
      </NavbarComp>
    </>
  );
};

export default Navbar;
