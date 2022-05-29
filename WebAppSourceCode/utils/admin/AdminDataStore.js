import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const AdminDataStore = createContext();
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
    shippingAddress: Cookies.get('shippingAddress')
      ? JSON.parse(Cookies.get('shippingAddress'))
      : {},
    paymentMethod: Cookies.get('paymentMethod')
      ? Cookies.get('paymentMethod')
      : '',
  },
  adminStoreInfo: Cookies.get('adminStoreInfo')
    ? JSON.parse(Cookies.get('adminStoreInfo'))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'DARK_MODE_ON':
      return { ...state, darkMode: true };
    case 'DARK_MODE_OFF':
      return { ...state, darkMode: false };

      case 'UPDATE_CATEGORY':
        console.log('HEY HEY')
        console.log(action.payload)
        return { ...state, adminStoreInfo: {...state.adminStoreInfo,categories: action.payload} };

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
      return { ...state, adminStoreInfo: action.payload };
    case 'USER_REGISTER':
      return { ...state, registerInfo: action.payload };
  
    case 'USER_LOGOUT':
      return {
        ...state,
        adminStoreInfo: null,
      };
      case 'UPDATE_PRODUCT':
        return { ...state, product: action.payload };

      case 'STORE_SEO':
        return { ...state, adminStoreInfo: {...state.adminStoreInfo,title: action.payload.title,metatitle: action.payload.metatitle,metadescription: action.payload.metadescription} };
      case 'STORE_DETAILS_ADD':
        return { ...state, adminStoreInfo: {...state.adminStoreInfo,  
        storeDetails:{
          storeIndustry:action.payload.storeIndustry,
          storeAudience:action.payload.storeAudience,
          companyName:action.payload.companyName,
        },} };
      case 'STORE_DETAILS_ADD_ADDRESS':
        return { ...state, adminStoreInfo: 
          {...state.adminStoreInfo,  
          address:{
            addressLine1:action.payload.addressLine1,
            addressLine2:action.payload.addressLine2,
            city:action.payload.city,
            country:action.payload.country,
            state:action.payload.state,
            pinCode:action.payload.pinCode,
            country:action.payload.country
          }} };

    default:
      return state;
  }
}

export function AdminDataStoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <AdminDataStore.Provider value={value}>{props.children}</AdminDataStore.Provider>;
}
