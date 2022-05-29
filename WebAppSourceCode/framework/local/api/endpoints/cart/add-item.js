import Cart from '../../../models/Cart';
import db from '../../../utils/db';
import nc from 'next-connect';

const handler = nc();


handler.post(async (req, res) => {
console.log('aaaaaaaaa')
  res.send({'message':'success'});

});

export default handler;



  
