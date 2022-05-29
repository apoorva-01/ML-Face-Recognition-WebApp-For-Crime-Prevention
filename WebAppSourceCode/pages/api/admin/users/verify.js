// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { SMTPClient } from 'emailjs';



export default function handler(req, res) {

  const { email } = req.body;
  const client = new SMTPClient({
    user: 'bizdamn@gmail.com',
    password: 'Bizdamn1435@#$%',
    host: 'smtp.gmail.com',
    ssl: true
  });

  try {


    client.send(
      {
        text:'fuck',
        from: 'bizdamn@gmail.com',
        to: 'bizdamn@gmail.com',
        subject: 'testing emailjs',

      }
    )
  }
  catch (e) {
    console.log(e)
    res.status(400).end(JSON.stringify({ message: e }))
    return;
  }

  res.status(200).end(JSON.stringify({ message: 'Send Mail' }))
}