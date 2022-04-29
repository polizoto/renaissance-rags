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
import Cart from '../components/Cart';
import './Vendor.css';
import { Grid } from "@material-ui/core"

function Vendor() {
  const color = {
    "white": "#816362",
    "hover": "white"
  }
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
      <Link className="backtoCostumes" style={{ color: color.white, textDecoration: "none", hover: color.hover }} to="/home">← Back to Costumes</Link>
      {filterVendor().map((costume) => (
            <div key={costume._id} className="card px-1 py-1">
                <h2 className="vendor">{costume.firstName} {costume.lastName}</h2>
                <div className="vendor-card">
                <img className="vendor-image"
                alt={`${costume.firstName} ${costume.lastName}`}
                src={`/images/${costume.image}`}/>
                <p className="vendor-info">{costume.bio}</p>
                <p className="vendor-info"><strong>Location: </strong> {costume.location}</p>
                <p className="vendor-info"><strong>Contact: </strong><a className="vendor-link" href={`mailto:${costume.email}`}>{costume.email}</a></p>
                </div>
                <h2 className="vendor-title">Costumes</h2>
                </div>

          ))}
      {state.costumes.length ? (
          <><Grid container spacing={4} direction="row"
          justifyContent="space-evenly"
          alignItems="stretch">
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
              vendor_id={costume.vendor._id} />
          ))}
        </Grid><Cart /></>
      ) : (
        <h3>This vendor doesn't have any costumes yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>

  );
}

export default Vendor;
