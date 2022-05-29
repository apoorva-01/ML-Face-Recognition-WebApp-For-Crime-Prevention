import nc from 'next-connect';
import { SMTPClient } from 'emailjs';

const handler = nc();

handler.post(async (req, res) => {

  const client = new SMTPClient({
    user: 'bizdamn@gmail.com',
    password: 'Bizdamn1435@#$%',
    host: 'smtp.gmail.com',
    ssl: true
  });

  try {


    client.send(
      {
        text: `Total Items: ${req.body.orderItems.length}
Payment Method: ${req.body.paymentMethod}
Total Amount: ${req.body.totalPrice}`,
        to: req.body.storeEmail,
        subject: `New Order of amount ${req.body.totalPrice}`,
        from: 'makemycommerce@gmail.com',
      }
    )
  }
  catch (e) {
    console.log(e)
    res.status(400).end(JSON.stringify({ message: e }))
    return;
  }

  res.status(200).end(JSON.stringify({ message: 'Send Mail' }))
});

export default handler;