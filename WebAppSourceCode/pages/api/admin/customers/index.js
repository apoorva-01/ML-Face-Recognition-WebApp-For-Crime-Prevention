import nc from 'next-connect';
import Customer from '../../../../models/Customer';
import db from '../../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
    await db.connect();
    const customers = await Customer.find({storeID:req.body.storeID});
    await db.disconnect();
    // return the products
    res.send({
        message: customers,
        success: true,
    })

});

export default handler;