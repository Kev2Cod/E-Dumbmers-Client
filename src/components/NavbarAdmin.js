import { React, useState, useContext } from "react";
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
          <NavbarComp.Brand as={Link} to="/products-admin">
            <img alt="Icon Dumbmers" src={ImgDumbMers} width="50" height="50" className="d-inline-block align-top" />
          </NavbarComp.Brand>
          <NavbarComp.Toggle aria-controls="basic-navbar-nav" />
          <NavbarComp.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto text-center ">
              <Nav.Link as={Link} to="/complain-admin" className={props?.title === "Complain Admin" ? `text-navbar-active`:`text-navbar`}>
                Complain
              </Nav.Link>
              <Nav.Link as={Link} to="/products-admin" className={props?.title === "Products"? `text-navbar-active`:`text-navbar`}>
                Products
              </Nav.Link>
              <Nav.Link as={Link} to="/category-admin" className={props?.title === "Category"? `text-navbar-active`:`text-navbar`}>
                Category
              </Nav.Link>
              <Nav.Link onClick={logout} className="text-navbar">
                Logout
              </Nav.Link>
            </Nav>
          </NavbarComp.Collapse>
        </Container>
      </NavbarComp>
    </>
  );
};

export default Navbar;
