import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useQuery } from "react-query";
import dateFormat from "dateformat";
import { convertRupiah } from "../utils/Utils";

import imgBlank from "../assets/img/Blank-Person.png";
import imgNoTransactions from "../assets/static/media/empty-transactions.svg";

import Navbar from "../components/Navbar";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";

const ProfilePage = () => {
  const title = "Profile";
  document.title = "Dumbmers | " + title;

  const navigate = useNavigate();

  const [state] = useContext(UserContext);
  console.log("State : ", state);

  let {
    isLoading,
    isError,
    data: transactions,
    refetch,
    error,
  } = useQuery("transactionCache", async () => {
    const config = {
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await API.get(`/transactions`, config);
    const data = response.data.data;
    const filterTransaction = await data.filter((item) => item.buyer.id === state.user.id);
    return filterTransaction;
  });

  let { data: user } = useQuery("userCache", async () => {
    const response = await API.get(`/user/${state.user.id}`);
    return response.data.user;
  });
  console.log("Data user : ", user);

  const handleEditProfile = (id) => {
    navigate(`/update-profile/${id}`);
  };

  return (
    <>
      <Navbar title={title} />
      <Container className="mt-3">
        <Row className="text-lg-start text-center ">
          <Col lg={4}>
            <h5 className="text-var-red mb-4">My Profile</h5>
            <img className="p-3" src={user?.profile?.image ? user.profile.image : imgBlank} alt="Profile" style={{ maxWidth: "100%" }} />
          </Col>

          <Col lg={4} className="mt-5">
            <div className="mb-3">
              <span className="text-var-red fw-bold">Name</span>
              <p>{user.name ? user.name : "-"}</p>
            </div>
            <div className="mb-3">
              <span className="text-var-red fw-bold">Email</span>
              <p>{user.email ? user.email : "-"}</p>
            </div>
            <div className="mb-3">
              <span className="text-var-red fw-bold">Phone</span>
              <p>{user.profile.phone ? user.profile.phone : "-"}</p>
            </div>
            <div className="mb-3">
              <span className="text-var-red fw-bold">Gender</span>
              <p>{user.profile.gender ? user.profile.gender : "-"}</p>
            </div>
            <div className="mb-3">
              <span className="text-var-red fw-bold">Address</span>
              <p>{user.profile.address ? user.profile.address : "-"} </p>
            </div>

            <button onClick={() => handleEditProfile(state.user.id)} className="btn-red fw-normal px-4 mb-4">
              Edit Profile
            </button>
          </Col>

          <Col lg={4} className="p-md-0 p-4">
            <h5 className="text-var-red mb-4"> My Transaction</h5>
            {!isError ? (
              <>
                {!isLoading ? (
                  <>
                    {transactions?.length > 0 ? (
                      <>
                        {transactions?.map((item, index) => (
                          <Row key={item.id} className="tabel-transaction text p-2 border-bottom rounded">
                            <Col xs={3} className="d-flex align-items-center justify-content-center">
                              <div>
                                <img src={item.product.image} className="image-transactions" alt="" />
                              </div>
                            </Col>

                            <Col xs={6}>
                              <div>
                                <span className="fw-bold text-var-red">{item.product.name}</span>
                                <small className="text-var-red d-block mb-3">{dateFormat(item.createdAt, "dddd, mmmm dS, yyyy, HH:MM ")} WIB</small>
                                <span className="d-inline-block">Price: {convertRupiah.format(item.product.price)}</span>
                              </div>
                            </Col>
                            <Col xs={3} className="py-3 px-1">
                              <div className={`status-transaction-${item.status} h-100 rounded d-flex justify-content-center align-items-center fw-bold`}>{item.status}</div>
                            </Col>
                          </Row>
                        ))}
                      </>
                    ) : (
                      <div className="text-center">
                        <img src={imgNoTransactions} style={{ width: "50%" }} />
                        <div className="mt-2 fs-5">No Transactions</div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="d-flex justify-content-center">
                    <div className="sk-chase p-2">
                      <div className="sk-chase-dot"></div>
                      <div className="sk-chase-dot"></div>
                      <div className="sk-chase-dot"></div>
                      <div className="sk-chase-dot"></div>
                      <div className="sk-chase-dot"></div>
                      <div className="sk-chase-dot"></div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="h-100 text-center align-middle">
                <h4>Please Refresh Browser</h4>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
