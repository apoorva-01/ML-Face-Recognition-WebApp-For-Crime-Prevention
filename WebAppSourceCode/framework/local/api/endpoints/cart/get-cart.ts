import Cart from '../../../models/Cart';
import db from '../../../utils/db';

const addItem = async ({
    res,
    body: { cartId, item },
    config,
  }) => {
    console.log('api/get-item')

  res.status(200).json({
    data:{
      lineItems:[{
        quantity: 2,
        product_id: Number('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU0NDczMjUwMjQ0MjA='),
        variant_id: Number('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU0NDczMjUwMjQ0MjAss='),
        option_selections: 0,
      },
      {
        quantity: 2,
        product_id: Number('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU0NDczMjUwMjQ0MjA='),
        variant_id: Number('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU0NDczMjUwMjQ0MjAss='),
        option_selections: 0,
      }]
    },
  })
  }
  
  export default addItem
  
