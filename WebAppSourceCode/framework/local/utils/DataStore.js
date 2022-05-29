import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const DataStore = createContext();
const initialState = {
  user: {
    username: 'apoo',
    name: '',
    bio: '',
    pic: '',
    email: '',
    phone: '',
    country: '',
  },
  product: {
    accessType:'download',
    title: '',
    slug: '',
    status: false,
    isFeatured:false,
    isDeleted:false,
    sku: '',
    barcode:'',
    type: '',
    description: '',
    categories: [],
    features: [],
    images: {},
    pricing: {},
    options: {},
    size: {},
    rating: 0,
    numReviews: 0,
    inventory: 0,
  },
  darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
  cart: {
    cartItems: Cookies.get('cartItems')
      ? JSON.parse(Cookies.get('cartItems'))
      : [],
    shippingAddress: Cookies.get('shippingAddress')
      ? JSON.parse(Cookies.get('shippingAddress'))
      : {},
    paymentMethod: Cookies.get('paymentMethod')
      ? Cookies.get('paymentMethod')
      : '',
  },
  storeInfo: Cookies.get('storeInfo')
    ? JSON.parse(Cookies.get('storeInfo'))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'DARK_MODE_ON':
      return { ...state, darkMode: true };
    case 'DARK_MODE_OFF':
      return { ...state, darkMode: false };

      case 'ADD_CATEGORY':
        return { ...state, storeInfo: {...state.storeInfo,categories:action.payload} };

    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    case 'CART_CLEAR':
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    case 'USER_LOGIN':
      return { ...state, storeInfo: action.payload };
  
    case 'USER_LOGOUT':
      return {
        ...state,
        storeInfo: null,
      };
      case 'UPDATE_PRODUCT':
        return { ...state, product: action.payload };

      case 'STORE_SEO':
        return { ...state, storeInfo: {...state.storeInfo,title: action.payload.title,metatitle: action.payload.metatitle,metadescription: action.payload.metadescription} };




    default:
      return state;
  }
}

export function DataStoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <DataStore.Provider value={value}>{props.children}</DataStore.Provider>;
}
