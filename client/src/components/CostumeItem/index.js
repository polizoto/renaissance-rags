import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { idbPromise } from "../../utils/helpers";
import { useSelector, useDispatch } from 'react-redux';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';

function CostumeItem(item) {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  const {
    image,
    name,
    _id,
    price,
    quantity,
    vendor_firstName,
    vendor_lastName
  } = item;

  const { cart } = state;

  const addToCart = () => {

  const itemInCart = cart.find((cartItem) => cartItem._id === _id);

  if (itemInCart) {
    dispatch({
      type: UPDATE_CART_QUANTITY,
      _id: _id,
      purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
    });
    idbPromise('cart', 'put', {
      ...itemInCart,
      purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
    });
  } else {
    dispatch({
      type: ADD_TO_CART,
      product: { ...item, purchaseQuantity: 1 }
    });
    idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
  }
}

  return (
    <div className="card px-1 py-1">
      <Link to={`/costumes/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <Link>
        <p>sold by {vendor_firstName} {vendor_lastName}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default CostumeItem;
