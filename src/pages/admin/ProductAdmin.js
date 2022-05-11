import React, { useState, useEffect, useContext } from "react";
import "../../assets/static/css/loading.css";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../../components/NavbarAdmin";
import imgEmpty from "../../assets/static/media/empty.svg";
import { convertRupiah } from "../../utils/Utils";
import { useQuery, useMutation } from "react-query";
import { UserContext } from "../../context/userContext";

import { API } from "../../config/api";
import DeleteData from "../../components/modal/DeleteData";

const ProductAdmin = () => {
  const navigate = useNavigate();

  const [state] = useContext(UserContext);

  const title = "Products";
  document.title = "Dumbmers | " + title;

  // Fetching data products
  let {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useQuery("productCache", async () => {
    const response = await API.get("/products");
    let data = response.data.data;
    data = await data.filter((item) => item.seller?.id === state.user.id);
    return data;
  });

  console.log(products);

  // Delete data product
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const addProduct = () => {
    navigate("/add-product");
  };

  const deleteById = useMutation(async (id) => {
    try {
      const config = {
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
      };
      await API.delete(`/product/${id}`, config);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      // close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  const handleUpdate = (id) => {
    navigate(`/update-product/${id}`);
  };

  return (
    <>
      <NavbarAdmin title={title} />
      <div className="container mt-3 mb-5">
        <div className="d-flex">
          <h4>List Product</h4>
          <button onClick={addProduct} className="btn bg-var-dark-gray text-white ms-auto px-4">
            Add
          </button>
        </div>
        {products?.length !== 0 ? (
          <table className="table table-dark table-striped mt-3 ">
            <thead>
              <tr className="text-center">
                <th scope="col">No</th>
                <th scope="col">Photo</th>
                <th scope="col">Product Name</th>
                <th scope="col">Product Desc</th>
                <th scope="col">Price</th>
                <th scope="col">Qty</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {!isError ? (
                <>
                  {!isLoading ? (
                    <>
                      {products?.map((item, index) => (
                        <tr key={item.id} className="align-middle text-center">
                          <th scope="row">{`${index + 1}`}</th>
                          <td>
                            <img src={item.image} alt="" className="image-list-product" />
                          </td>
                          <td> {`${item.name.slice(0, 16)}...`}</td>
                          <td>{`${item.desc.slice(0, 16)}`}</td>
                          <td>{convertRupiah.format(item.price)}</td>
                          <td>{item.qty}</td>
                          <td className="text-center">
                            <button onClick={() => handleUpdate(item.id)} className="btn bg-var-green text-white fw-bold " style={{ width: "6rem" }}>
                              Edit
                            </button>

                            <button to="/delete-product" onClick={() => handleDelete(item.id)} className="btn bg-var-red text-white fw-bold m-1" style={{ width: "6rem" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <>
                      <tr>
                        <th colSpan={7} className="p-3 ">
                          <div className="sk-chase m-auto">
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                          </div>
                        </th>
                      </tr>
                    </>
                  )}
                </>
              ) : (
                <>
                  <tr className="align-middle text-center ">
                    <th colSpan={7}>
                      <span className="fw-light">Connection error, Please refresh browser....</span>
                    </th>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-5">
            <img src={imgEmpty} style={{ width: "30%" }} alt="empty" />
            <h5 className="mt-4">No Data Product</h5>
          </div>
        )}
        <DeleteData setConfirmDelete={setConfirmDelete} show={show} handleClose={handleClose} />
      </div>
    </>
  );
};

export default ProductAdmin;
