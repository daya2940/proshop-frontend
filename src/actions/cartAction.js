import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";
import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  console.log(id, qty);
  const { data } = await axios.get(`/api/products/${id}`);
  console.log(data);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.brand,
      image: data.image,
      price: data.price,
      countInStock: data.CountInStock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems)); //here cart is reducer and we are calling it to get the cartitems
};
