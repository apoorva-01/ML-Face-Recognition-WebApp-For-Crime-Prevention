import nc from 'next-connect';
import Order from '../../../../models/Order';
import db from '../../../../utils/db';
var ObjectId = require('mongodb').ObjectId;
const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const orders = await Order.find({ storeID:req.body.storeID});
  res.send(orders);
});

export default handler;
