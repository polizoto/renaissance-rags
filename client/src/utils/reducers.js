// import our actions
import {
    UPDATE_COSTUMES,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    UPDATE_CURRENT_COSTUME_ID,
    UPDATE_CURRENT_VENDOR_ID,
    UPDATE_VENDORS,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
  } from './actions';

const initialState = {
  costumes: [],
  cart: [],
  cartOpen: false,
  categories: [],
  currentCategory: '',
  currentCostume_ID: '',
  currentVendor_ID: '',
  vendors: []
  }
  
  export default function appReducer (state = initialState, action) {

    switch (action.type) {
      case UPDATE_COSTUMES:
        return {
          ...state,
          costumes: [...action.costumes]
        };
      case UPDATE_CATEGORIES:
        return {
          ...state,
          categories: [...action.categories]
        };
      case UPDATE_CURRENT_CATEGORY:
          return {
            ...state,
            currentCategory: action.currentCategory
          };
      case UPDATE_CURRENT_COSTUME_ID:
        return {
          ...state,
          currentCostume_ID: action.currentCostume_ID
        };
      case UPDATE_CURRENT_VENDOR_ID:
        return {
          ...state,
          currentVendor_ID: action.currentVendor_ID
        };
        case UPDATE_VENDORS:
          return {
            ...state,
            vendors: [...action.vendors]
          };
      case ADD_TO_CART:
          return {
            ...state,
            cartOpen: true,
            cart: [...state.cart, action.costume]
          };
          
          case ADD_MULTIPLE_TO_CART:
            return {
              ...state,
              cart: [...state.cart, ...action.costumes],
            };
      
            case REMOVE_FROM_CART:
            let newState = state.cart.filter(costume => {
              return costume._id !== action._id;
            });
      
            return {
              ...state,
              cartOpen: newState.length > 0,
              cart: newState
            };
      
            case UPDATE_CART_QUANTITY:
            return {
            ...state,
            cartOpen: true,
            cart: state.cart.map(costume => {
              if (action._id === costume._id) {
                costume.purchaseQuantity = action.purchaseQuantity;
              }
              return costume;
            })
            };
      
            case CLEAR_CART:
            return {
            ...state,
            cartOpen: false,
            cart: []
            };
            case TOGGLE_CART:
            return {
            ...state,
            cartOpen: !state.cartOpen
            };    
      default:
        return state;
    }
  };
  