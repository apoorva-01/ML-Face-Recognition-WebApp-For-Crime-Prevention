import nc from 'next-connect';
import PhysicalProduct from '../../../../models/PhysicalProduct';
import DigitalProduct from '../../../../models/DigitalProduct';
import db from '../../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const product = await PhysicalProduct.findById(req.query.id);
  await db.disconnect();
  res.send(product);
});


handler.post(async (req, res) => {
    await db.connect();
    const physical_product = await PhysicalProduct.find({storeID:req.body.ID});
    const digital_product = await DigitalProduct.find({storeID:req.body.ID});
    await db.disconnect();
    res.send({
        digitalProduct: digital_product,
        physicalProduct: physical_product,
        success: true,
    })

});

export default handler;
