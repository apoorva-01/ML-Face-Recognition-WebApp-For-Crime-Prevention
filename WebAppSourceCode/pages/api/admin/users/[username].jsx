import db from '../../../../utils/db';
import Store from '../../../../models/Store';
export default function userHandler(req, res) {
  const {
    query: { username },
    method,
  } = req

  switch (method) {
    case 'GET':{
      return getUser(req, res);
    }
    case 'PUT':{
      return updateUser(req, res);
    }

    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}



async function getUser(req,res){
  const {query: { username }} = req
  try {
    await db.connect();
    const users = await User.find({'username':username});
    await db.disconnect();
      // return the products
      return res.json({
          message: JSON.parse(JSON.stringify(users)),
          success: true,
      });
  } catch (error) {
      // return the error
      return res.json({
          message: new Error(error).message,
          success: false,
      });
  }
}


async function updateUser(req,res){
  const {query: { username }} = req
  try {
    await db.connect();
    const users = await User.updateMany({'username':username});
    user_data={ $set:
      {
        quantity: 500,
        details: { model: "14Q3", make: "xyz" },
        tags: [ "coats", "outerwear", "clothing" ]
      }
   }
    await db.disconnect();
      // return the products
      return res.json({
          message: JSON.parse(JSON.stringify(users)),
          success: true,
      });
  } catch (error) {
      // return the error
      return res.json({
          message: new Error(error).message,
          success: false,
      });
  }
}
