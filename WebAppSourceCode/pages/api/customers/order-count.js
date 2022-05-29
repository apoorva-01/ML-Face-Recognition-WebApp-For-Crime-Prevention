import nc from 'next-connect';
import Customer from '../../../models/Customer';
import db from '../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const customer = await Customer.findById(req.body.customerInfo._id);
  customer.orders_count =customer.orders_count+1;
  await customer.save();
  await db.disconnect();

  res.send({message:'New Order'});
});

export default handler;
