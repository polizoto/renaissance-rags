import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { UPDATE_COSTUMES } from '../../utils/actions';
import { useSelector, useDispatch } from 'react-redux';
import CostumeItem from '../CostumeItem';
import { QUERY_COSTUMES } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';
import { idbPromise } from '../../utils/helpers';
import { Grid } from "@material-ui/core"

function CostumeList() {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_COSTUMES);

  useEffect(() => {
    if(data) {
      dispatch({
        type: UPDATE_COSTUMES,
        costumes: data.costumes
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
  }, [data, loading, dispatch]);
  
  function filterCostumes() {
    if (!currentCategory) {
      return state.costumes;
    }
    return state.costumes.filter(costume => costume.category._id === currentCategory);
  }

  console.log(currentCategory)

  return (
    <div>
      <h2>Our Costumes:</h2>
      {state.costumes.length ? (
          <Grid container spacing={4}   direction="row"
          justifyContent="space-evenly"
          alignItems="stretch">
          {filterCostumes().map((costume) => (
            <CostumeItem
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
       </Grid>
      ) : (
        <h3>You haven't added any costumes yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default CostumeList;
