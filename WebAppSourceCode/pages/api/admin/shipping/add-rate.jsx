import nc from 'next-connect';
import ShippingZone from '../../../../models/Shipping';
import { isAuth } from '../../../../utils/auth';
import db from '../../../../utils/db';
const handler = nc();


handler.post(async (req, res) => {
  await db.connect();

  const filter = { storeID:req.body.storeID };
  const update = { rateName: req.body.rateName, price: req.body.price};
  let doc = await ShippingZone.findOneAndUpdate(filter, update);
  await db.disconnect();

  res.send({success:true});

});

export default handler;
