import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { idbPromise } from "../../utils/helpers";
import { useSelector, useDispatch } from 'react-redux';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { Grid, Card, CardMedia, CardContent } from "@material-ui/core"

function VendorItem(item) {
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
    <Grid item style={{display: 'flex', justifyContent: 'space-between'}}>
    <Card variant="outlined">
    <Link style={{ textDecoration: 'none' }} to={`/costumes/${_id}`}>
    <CardMedia
                    
                    component="img"
                    image={`/images/${image}`}
                    alt={name}
                    title={name}
                />
       {/* <img
         alt={name}
         src={`/images/${image}`}
       /> */}
    <CardContent>
    <p tabIndex="0" className="costume-link">{name}</p>
    </CardContent>
     </Link>
     <Link style={{ textDecoration: 'none'}} to={`/vendors/${vendor_id}`}>
       <p className="costume-vendor">{vendor_firstName} {vendor_lastName}</p>
     </Link>
     <div className="costume-info">
       <div>{quantity} {pluralize("item", quantity)} in stock</div>
       <span>${price}</span>
     </div>
     <div className="add-to-Cart">
     <button onClick={addToCart}>Add to cart</button>
     </div>
  </Card>
  </Grid>
  );
}

export default VendorItem;
