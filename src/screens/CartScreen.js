import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { addToCart } from "../actions/cartAction";

const CartScreen = ({ match, location, history }) => {
  const productId = match?.params?.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty)); //api call
    }
  }, [dispatch, productId, qty]);
  return <div>cartscreen</div>;
};

export default CartScreen;
