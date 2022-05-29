import nc from 'next-connect';
import PhysicalProduct from '../../../../../models/PhysicalProduct';
import db from '../../../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const newProduct = new PhysicalProduct({
    storeID:req.body.storeID,
    title: req.body.title,
    description: req.body.description,
    slug: req.body.slug,
    image: req.body.image,
    categories: req.body.categories,
    reviews: req.body.reviews,
    features: req.body.features,
    isFeatured: req.body.isFeatured,
    pricing: req.body.pricing,
    isDeleted: req.body.isDeleted,
    rating: req.body.rating,
    barcode: req.body.barcode,
    sku: req.body.sku,
    inventory:req.body.inventory, 
    size:req.body.size, 
    });
  const product = await newProduct.save();
  await db.disconnect();
  res.send({'message':'success','productTitle':product.title});

});

export default handler;
