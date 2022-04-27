import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { idbPromise } from "../../utils/helpers";
import { useSelector, useDispatch } from 'react-redux';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { Grid, Card } from "@material-ui/core"


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
    vendor_lastName,
    vendor_id
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
      costume: { ...item, purchaseQuantity: 1 }
    });
    idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
  }
}

  return (
  <Grid container alignItems="stretch">
  <Grid item style={{display: 'flex'}}>
<Card style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}} variant="outlined">
<Link to={`/costumes/${_id}`}>
       <img
         alt={name}
         src={`/images/${image}`}
       />
       <p>{name}</p>
     </Link>
     <Link to={`/vendors/${vendor_id}`}>
       <p>sold by {vendor_firstName} {vendor_lastName}</p>
     </Link>
     <div>
       <div>{quantity} {pluralize("item", quantity)} in stock</div>
       <span>${price}</span>
     </div>
     <button onClick={addToCart}>Add to cart</button>
  </Card>
  </Grid>
</Grid>

);
}

export default CostumeItem;
