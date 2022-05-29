import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import Store from '../../../../models/Store';
import db from '../../../../utils/db';
import { signToken } from '../../../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const store = await Store.findOne({ email: req.body.email });
  await db.disconnect();
  if (store && bcrypt.compareSync(req.body.password, store.password)) {
    const token = signToken(store);
    res.send(store);
  } else {
    res.status(401).send({ message: 'Invalid email or password' });
  }


});

export default handler;
