import nc from 'next-connect';
import PhysicalProduct from '../../../../../models/PhysicalProduct';
import db from '../../../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const newProduct = new PhysicalProduct({
    storeID:req.body.storeID,
    name: req.body.name,
    vendor: req.body.vendor,
    path: `/${req.body.slug}`,
    slug: req.body.slug,
    price: req.body.price,
    listPrice: req.body.listPrice,
    descriptionHtml: req.body.descriptionHtml,
    images: req.body.images,
    variants: req.body.variants,
    options: req.body.options,
    status: req.body.status,
    isFeatured: req.body.isFeatured,
    isDeleted: req.body.isDeleted,
    type: req.body.type,
    categories: req.body.categories,
    features: req.body.features,
    reviews: req.body.reviews,
    rating: req.body.rating,
    sku: req.body.sku,
    barcode: req.body.barcode,
    inventory:req.body.inventory, 
    size:req.body.size, 
    });
  const product = await newProduct.save();
  await db.disconnect();
  res.send({'message':'success','productTitle':product.title});

});

export default handler;
