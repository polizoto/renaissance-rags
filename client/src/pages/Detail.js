import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { idbPromise } from "../utils/helpers";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_COSTUMES,
  UPDATE_CURRENT_COSTUME_ID
} from '../utils/actions';
import { QUERY_COSTUMES } from '../utils/queries';
import Cart from '../components/Cart';
import spinner from '../assets/spinner.gif';

function Detail() {
  const color = {
    "white": "#816362"
  }
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  const { id } = useParams();

  const [currentCostume, setCurrentCostume] = useState({});

  const { loading, data } = useQuery(QUERY_COSTUMES);

  const { costumes, cart, currentCostume_ID } = state;

  useEffect(() => {

    if (costumes.length) {
      dispatch({
        type: UPDATE_CURRENT_COSTUME_ID,
        currentCostume_ID: id,
      });
      setCurrentCostume(costumes.find(costume => costume._id === currentCostume_ID));
    } 

    else if (data) {
      dispatch({
        type: UPDATE_COSTUMES,
        costumes: data.costumes
      });
  
      data.costumes.forEach((costume) => {
        idbPromise('costumes', 'put', costume);
      });
    }
    else if (!loading) {
      idbPromise('costumes', 'get').then((indexedCostumes) => {
        dispatch({
          type: UPDATE_COSTUMES,
          costumes: indexedCostumes
        });
      });
    }
  }, [costumes, data, loading, dispatch, id, currentCostume_ID]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id)
  
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        costume: { ...currentCostume, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...currentCostume, purchaseQuantity: 1 });
    }
  }

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentCostume._id
    });

    idbPromise('cart', 'delete', { ...currentCostume });
  };

function filterCostume() {
  if (!id) {
    return state.costumes;

  }
  return state.costumes.filter(costume => costume._id === currentCostume_ID);
}

  return (
    <>
      {currentCostume ? (
        <div>
          <Link style={{ color: color.white, textDecoration: "none" }} to="/">← Back to Costumes</Link>

          <h2 className="costume-title">{currentCostume.name}</h2>

          <p>{currentCostume.description}</p>

          <p>
            <strong>Price:</strong>${currentCostume.price}{' '}
            <button onClick={addToCart}>Add to cart</button>
            <button className="removeCart"
            disabled={!cart.find(p => p._id === currentCostume._id)} 
            onClick={removeFromCart}
            >
            Remove from Cart
            </button>

          </p>

          <img
            src={`/images/${currentCostume.image}`}
            alt={currentCostume.name}
          />
          {filterCostume().map((costume) => (
            <div key={costume._id} className="card px-1 py-1">
                  <Link style={{ textDecoration: 'none'}} to={`/vendors/${costume.vendor._id}`}>
                  <p className="costume-vendor">{costume.vendor.firstName} {costume.vendor.lastName}</p>
                </Link>
                </div>
          ))}
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;