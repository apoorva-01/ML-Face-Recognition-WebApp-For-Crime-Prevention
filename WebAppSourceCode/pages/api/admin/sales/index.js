import nc from 'next-connect';
import Order from '../../../../models/Order';
import { isAuth } from '../../../../utils/auth';
import db from '../../../../utils/db';
import { onError } from '../../../../utils/error';
var ObjectId = require('mongodb').ObjectId;
const handler = nc({onError});
handler.use(isAuth);


handler.post(async (req, res) => {
  await db.connect();
  var o_id = new ObjectId('61b89026bc6d0e7f44bfab88');
  const orders = await Order.find({ storeID:o_id});


  res.send(orders);
});

export default handler;