import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import Customer from '../../../models/Customer';
import db from '../../../utils/db';
import { signToken } from '../../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {

  await db.connect();
  const newCustomer = new Customer({
    storeID:process.env.STORE_OBJECT_ID,
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
  });
  const customer = await newCustomer.save();
  await db.disconnect();
  const token = signToken(customer);
  res.send({
    token,
    _id: customer._id,
    name: customer.name,
    email: customer.email,
  });
});

export default handler;
