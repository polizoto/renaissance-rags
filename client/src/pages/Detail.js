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
} from '../utils/actions';
import { QUERY_COSTUMES } from '../utils/queries';
import Cart from '../components/Cart';
import spinner from '../assets/spinner.gif';

function Detail() {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  const { id } = useParams();

  const [currentCostume, setCurrentCostume] = useState({});

  const { loading, data } = useQuery(QUERY_COSTUMES);

  const { costumes, cart } = state;

  useEffect(() => {

    if (costumes.length) {
      setCurrentCostume(costumes.find(costume => costume._id === id));
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
  }, [costumes, data, loading, dispatch, id]);

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

  console.log(currentCostume.vendor)

  return (
    <>
      {currentCostume ? (
        <div className="container my-1">
          <Link to="/">← Back to Costumes</Link>

          <h2>{currentCostume.name}</h2>

          <p>{currentCostume.description}</p>

          <p>
            <strong>Price:</strong>${currentCostume.price}{' '}
            <button onClick={addToCart}>Add to cart</button>
            <button 
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
        <Link to="/">
        <p>sold by {currentCostume.name}</p>
      </Link>
        </div>
        
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
