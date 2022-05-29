import Wishlist from '../../../models/Wishlist';
import db from '../../../utils/db';
import nc from 'next-connect';

const handler = nc();
handler.post(async (req, res) => {
  await db.connect();
  const wishlist = await Wishlist.find({customer:req.body.customerID,storeID:process.env.STORE_OBJECT_ID});
  await db.disconnect();
  res.send(wishlist)
});

export default handler;