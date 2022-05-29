import nc from 'next-connect';
import Store from '../../../../models/Store';
import db from '../../../../utils/db';
 
const handler = nc();

handler.post(async (req, res) => {

    await db.connect();
    const filter = { storeID: req.body.storeID };
    const update = { categories: req.body.categories };
    let doc = await Store.findOneAndUpdate(filter, update);
    await db.disconnect();

    res.send(doc);

});

export default handler;
