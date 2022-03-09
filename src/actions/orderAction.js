import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from "../constants/orderConstants";
import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    // const token = JSON.parse(localStorage.getItem("userInfo")).token;
    // console.log(token);
    const {
      userLogin: { userInfo },
    } = getState();
    const { data } = await axios.post(`/api/order`, order, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error?.response?.data?.message
        ? error?.response?.data?.message
        : error?.message,
    });
  }
};
