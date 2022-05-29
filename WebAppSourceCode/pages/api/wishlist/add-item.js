import Wishlist from '../../../models/Wishlist';
import db from '../../../utils/db';
import nc from 'next-connect';

const handler = nc();


handler.post(async (req, res) => {
  await db.connect();
  const newCart = new Wishlist({
    lineItems:[{}]})
  const cart = await newCart.save();
  await db.disconnect();
  res.send(cart)

});

export default handler;



  
