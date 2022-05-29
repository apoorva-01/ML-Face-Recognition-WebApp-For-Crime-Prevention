import Cart from '../../../models/Cart';
import db from '../../../utils/db';
import nc from 'next-connect';

const handler = nc();


handler.post(async (req, res) => {
  await db.connect();
  const newCart = new Cart({
    lineItems:[{
      quantity: 2,
      path: 'ff',
      name: 'Name',
      variant: {
        listPrice:34,
        price:34,
        image:{
          url:'',
          altText:''
        }
      },
      product_id: Number('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU0NDczMjUwMjQ0MjA='),
      variant_id: Number('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU0NDczMjUwMjQ0MjAss='),
      option_selections: 0,
    }],
    subtotalPrice:34,
    totalPrice:34,
    currency:{
      code:'INR'
    }
  
  })
  const cart = await newCart.save();
  await db.disconnect();
  res.send(cart)

});

export default handler;



  
