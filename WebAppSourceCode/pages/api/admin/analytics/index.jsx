import nc from 'next-connect';
import Order from '../../../../models/Order';
import db from '../../../../utils/db';
var ObjectId = require('mongodb').ObjectId;
const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const totalRevenue= await Order.aggregate([ { $match: {storeID:req.body.storeID} }, { $group:{_id : null, sum : { $sum: "$totalPrice" } }}])
  const totalShippingPrice= await Order.aggregate([ { $match: {storeID:req.body.storeID} }, { $group:{_id : null, sum : { $sum: "$shippingPrice" } }}])
  const orders = await Order.find({ storeID:req.body.storeID});
  const ordersDelivered = await Order.find({ storeID:req.body.storeID,isDelivered:true});
  const ordersRepeated = await Order.find({ storeID:req.body.storeID });
  
  res.send({
    totalOrders:orders.length,
    totalDeliveredOrders:ordersDelivered.length,
    totalRevenue: totalRevenue[0].sum,
    totalShippingPrice: totalShippingPrice[0].sum,
  });
});

export default handler;
