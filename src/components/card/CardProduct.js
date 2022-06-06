import React from "react";
import { Link } from "react-router-dom";

import { Card } from "react-bootstrap";

// Skeleton
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { convertRupiah } from "../../utils/Utils";

export default function CardProduct({ id, image, nameProduct, price, qty }) {
  return (
    <>
      <Card as={Link} to={`/detail-product/${id}`} className="card-product " style={{ textDecoration: "none", color: "white" }}>
        <Card.Img variant="top" src={image} className="image-product" style={{ minHeight: "50px" }} />
        <Card.Body>
          <Card.Title className="text-var-red text-decoration-none">{`${nameProduct.slice(0, 13)}`}</Card.Title>
          <span>{`${convertRupiah.format(price)}`}</span>
          <br />
          <span>Stock : {qty}</span>
        </Card.Body>
      </Card>
    </>
  );
}
