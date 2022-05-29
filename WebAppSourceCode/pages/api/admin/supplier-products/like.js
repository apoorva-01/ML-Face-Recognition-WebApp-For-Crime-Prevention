import nc from 'next-connect';
import SupplierProduct from '../../../../models/SupplierProduct';
import db from '../../../../utils/db';

const handler = nc();


handler.put(async (req, res) => {
    await db.connect();
    const product = await SupplierProduct.findById(req.body.productId);
    product.liked = req.body.liked;
    await product.save();
    await db.disconnect();

    res.send({message:'Success'});
  });

export default handler;
