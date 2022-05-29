import nc from 'next-connect';
import PhysicalProduct from '../../../models/PhysicalProduct';
import db from '../../../utils/db';
import data from '../../../utils/data';
import Store from '../../../models/Store';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await Store.deleteMany();
  await Store.insertMany(data.stores);
  await PhysicalProduct.deleteMany();
  await PhysicalProduct.insertMany(data.products);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
});

export default handler;
