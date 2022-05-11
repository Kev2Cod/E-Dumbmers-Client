import React, { useState } from "react";
import Image from "../assets/img/Logo-Dumb-Merch.png";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import { Container, Row, Col } from "react-bootstrap";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);

  const switchRegister = () => {
    setIsRegister(true);
  };

  const switchLogin = () => {
    setIsRegister(false);
  };

  return (
    <>
      <Container >
        <Row className="vh-100 align-items-center justify-content-center py-md-0 py-5">
          <Col md={6} className="text-md-start text-center ">
            <img src={Image} style={{ maxWidth: "200px" }} alt=""/>
            <h2 className="mt-lg-2 mt-3 ">Easy, Fast and Reliable</h2>
            <p className="text-var-gray">
              Go shopping for merchandise, just go to dumb merch shopping. the biggest merchandise in <span className="text-var-gray fw-bold">Indonesia</span>
            </p>
            <div className="mt-lg-5 mt-2 mb-lg-0 mb-5 text-md-start text-center ">
              <button className="btn-red px-5 me-2" onClick={switchLogin}>
                Login
              </button>
              <button className="btn-transparent px-5 text-light " onClick={switchRegister}>
                Register
              </button>
            </div>
          </Col>
          <Col md={6}>{isRegister ? <Register /> : <Login />}</Col>
        </Row>
      </Container>
    </>
  );
};

export default Auth;
