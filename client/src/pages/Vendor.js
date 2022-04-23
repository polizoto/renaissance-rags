import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { idbPromise } from "../utils/helpers";
import {
  UPDATE_COSTUMES,
  UPDATE_CURRENT_VENDOR_ID, UPDATE_VENDORS
} from '../utils/actions';
import { QUERY_COSTUMES, QUERY_VENDORS } from '../utils/queries';
import VendorItem from '../components/VendorItem';
import spinner from '../assets/spinner.gif';

function Vendor() {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  
  const { id } = useParams();

  const { loading, data } = useQuery(QUERY_COSTUMES);

  const { currentVendor_ID } = state;

  const vendors = useQuery(QUERY_VENDORS);

  useEffect(() => {
  if (vendors.data){
    dispatch({
      type: UPDATE_VENDORS,
      vendors: vendors.data.vendors
    });
  }
}, [vendors.data, dispatch]);

  useEffect(() => {
    if(data) {
      dispatch({
        type: UPDATE_COSTUMES,
        costumes: data.costumes
      });
      dispatch({
        type: UPDATE_CURRENT_VENDOR_ID,
        currentVendor_ID: id,
      });

      data.costumes.forEach((costume) => {
        idbPromise('costumes', 'put', costume);
      });

    } else if (!loading) {

      idbPromise('costumes', 'get').then((costumes) => {

        dispatch({
          type: UPDATE_COSTUMES,
          costumes: costumes
        });
      });
    }
  }, [data, loading, dispatch, id, currentVendor_ID]);
  
  function filterCostumes() {
    if (!id) {

      return state.costumes;

    }
    return state.costumes.filter(costume => costume.vendor._id === id);
  }

  function filterVendor() {
    if (!id) {

      return state.costumes;
    }
    return state.vendors.filter(vendor => vendor._id === id);
  }

  return (
    <div className="my-2">
      <Link to="/">← Back to Costumes</Link>
      {filterVendor().map((costume) => (
            <div key={costume._id} className="card px-1 py-1">
                <h2>{costume.firstName} {costume.lastName}'s Costumes:</h2>
                </div>
          ))}
      {state.costumes.length ? (
        <div className="flex-row">
          {filterCostumes().map((costume) => (
            <VendorItem
              key={costume._id}
              _id={costume._id}
              image={costume.image}
              name={costume.name}
              price={costume.price}
              quantity={costume.quantity}
              vendor_firstName={costume.vendor.firstName}
              vendor_lastName={costume.vendor.lastName}
              vendor_id={costume.vendor._id}
            />
          ))}
        </div>
      ) : (
        <h3>This vendor doesn't have any costumes yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default Vendor;
