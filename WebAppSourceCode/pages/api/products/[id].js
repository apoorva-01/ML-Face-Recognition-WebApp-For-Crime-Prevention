import nc from 'next-connect';
import PhysicalProduct from '../../../models/PhysicalProduct';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const product = await PhysicalProduct.findById(req.query.id);
  await db.disconnect();
  res.send(product);
});

export default handler;
