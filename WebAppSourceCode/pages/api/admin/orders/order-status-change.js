import nc from 'next-connect';
import Order from '../../../../models/Order';
import Customer from '../../../../models/Customer';
import db from '../../../../utils/db';
import { SMTPClient } from 'emailjs';


const handler = nc();
handler.put(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.body.orderID);
  order.orderStatus = req.body.orderStatus;
  await order.save();
  const customer = await Customer.findById(order.customer);


  const client = new SMTPClient({
    user: 'bizdamn@gmail.com',
    password: 'Bizdamn1435@#$%',
    host: 'smtp.gmail.com',
    ssl: true
  });

  try {
    client.send(
      {
        text: `Order ID: ${order._id} 
        Order Status:${order.orderStatus} `,
        to:customer.email,
        subject: `Your Order Status !!`,
        from: 'bizdamn@gmail.com',
      }
    )
  }
  catch (e) {
    console.log(e)
    res.status(400).end(JSON.stringify({ message: e }))
    return;
  }

  await db.disconnect();



 
  res.send({message:'success'});
});

export default handler;



