import nc from 'next-connect';
import ShippingZone from '../../../../models/Shipping';
import db from '../../../../utils/db';
var ObjectId = require('mongodb').ObjectId;
const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const shipping = await ShippingZone.find({ storeID:req.body.storeID});
  console.log(shipping);
  res.send(shipping);
});

export default handler;
