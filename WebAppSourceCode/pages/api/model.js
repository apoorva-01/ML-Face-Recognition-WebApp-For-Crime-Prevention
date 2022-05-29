// let model = require('../../public/model.json');
import nc from 'next-connect';

import axios from 'axios'
const handler = nc();

handler.get(async (req, res) => {
  var model;
  try {
    await axios.get('http://frme.igscs.in/model.json').then(resp => {
      model=resp.data
      // console.log(resp.data);
  });
  } catch (error) {
    console.error(error)
  }

  res.send(model)
});

export default handler;