import Cart from '../../../models/Cart';
import db from '../../../utils/db';
import nc from 'next-connect';

const handler = nc();
handler.get(async (req, res) => {
  await db.connect();
  const cart = await Cart.find({});
  await db.disconnect();
  res.send({data:cart})
});

export default handler;
  
