import nc from 'next-connect';
import { SMTPClient } from 'emailjs';

const handler = nc();

handler.get(async (req, res) => {

  const client = new SMTPClient({
    user: 'bizdamn@gmail.com',
    password: 'Bizdamn1435@#$%',
    host: 'smtp.gmail.com',
    ssl: true
  });

  try {

console.log('Sended')
    client.send(
      {
        text: `A person is recognised with more than 90% accuracy.`,
        to: 'vermaapoorva0510@gmail.com',
        subject: `Criminal Detected`,
        from: 'bizdamn@gmail.com',
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