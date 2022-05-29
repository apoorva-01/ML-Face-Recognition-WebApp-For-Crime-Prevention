import nc from 'next-connect';
import ShippingZone from '../../../../models/Shipping';
import db from '../../../../utils/db';

const handler = nc();



handler.post(async (req, res) => {
  await db.connect();
  // const shippingZone = await ShippingZone.updateOne({
  //     storeID: req.body.storeID, $set: {
  //       shippingZones: req.body.shippingZones
  //     }
  // });

  const filter = { storeID:req.body.storeID };
  const update = {
    shippingZones: req.body.shippingZones
  };
  let doc = await ShippingZone.findOneAndUpdate(filter, update);
  await db.disconnect();
  console.log(doc);
  res.send({ message: 'Zone Added Successfully' });

});




export default handler;
