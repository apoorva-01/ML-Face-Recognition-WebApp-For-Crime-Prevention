import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import Customer from '../../../models/Customer';
import db from '../../../utils/db';
import { signToken, isAuth } from '../../../utils/auth';

const handler = nc();
handler.use(isAuth);

handler.put(async (req, res) => {
  await db.connect();
  const customer = await Customer.findById(req.customer._id);
  customer.name = req.body.name;
  customer.email = req.body.email;
  customer.password = req.body.password
    ? bcrypt.hashSync(req.body.password)
    : customer.password;
  await customer.save();
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
