import nc from 'next-connect';
import DigitalProduct from '../../../../../models/DigitalProduct';
import db from '../../../../../utils/db';

const handler = nc();
handler.post(async (req, res) => {
  await db.connect();
  const newProduct = new DigitalProduct({
    storeID:req.body.storeID,
    name: req.body.name,
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
    digitalAccessType: req.body.digitalAccessType,
  });
  const product = await newProduct.save();
  await db.disconnect();
  res.send({'message':'success','productTitle':product.title});

});

export default handler;
