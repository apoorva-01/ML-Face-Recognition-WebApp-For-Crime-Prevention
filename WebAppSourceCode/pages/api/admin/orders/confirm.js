import nc from 'next-connect';
import Order from '../../../../models/Order';
import Customer from '../../../../models/Customer';
import db from '../../../../utils/db';
import { SMTPClient } from 'emailjs';


const handler = nc();
handler.put(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.body.orderID);
  order.isConfirmed = true;
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
        text: `Your Order with Order Id:${order._id} is Confirmed.
        We will deliver it soon
        `,
        to:customer.email,
        subject: `Your Order is Confirmed !!`,
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



