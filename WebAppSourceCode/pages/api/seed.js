import nc from 'next-connect';
import Cart from '../../models/Cart';
import PhysicalProduct from '../../models/PhysicalProduct';
import db from '../../utils/db';
import data from '../../utils/data';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await PhysicalProduct.deleteMany();
  await PhysicalProduct.insertMany(data.products);
  // await Cart.deleteMany();
  // await Cart.insertMany(data.cart);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
});

export default handler;
