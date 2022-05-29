import nc from 'next-connect';
import PhysicalProduct from '../../../../models/PhysicalProduct';
import DigitalProduct from '../../../../models/DigitalProduct';
import db from '../../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
    console.log(req.body.storeID)
    await db.connect();
    const physical_products = await PhysicalProduct.find({storeID:req.body.storeID});
    await db.disconnect();
    console.log(physical_products)
    res.send(physical_products)

});

export default handler;