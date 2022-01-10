import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productAction";
import Message from "../components/Message";
import Loader from "../components/Loader";

import {
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(0);
  const dispatch = useDispatch();
  const productListDetails = useSelector((state) => state.productDetails); //Getting the part of the state where it gets stored using useselector hook.

  const { loading, error, product } = productListDetails;

  useEffect(() => {
    dispatch(listProductDetails(match?.params?.id));
  }, [dispatch, match]);

  const AddToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      <Link to="/" className="btn btn-dark my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product?.image} alt={product?.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h3>{product?.name}</h3>
              </ListGroupItem>
              <ListGroupItem>
                <Rating
                  value={product?.rating}
                  text={`${product?.numReviews} reviews`}
                />
              </ListGroupItem>
              <ListGroupItem>Price: ${product?.price}</ListGroupItem>
              <ListGroupItem>Description: {product?.description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product?.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product?.CountInStock >= 0
                          ? "In Stock"
                          : "Out Of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                {product?.CountInStock >= 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product?.CountInStock).keys()].map((x) => {
                            return (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}

                <ListGroupItem>
                  <Button
                    onClick={AddToCartHandler}
                    className="btn-block"
                    type="button"
                    disabled={product?.CountInStock > 0 ? false : true}
                  >
                    Add To Cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
