import nc from 'next-connect';
import Store from '../../../../models/Store';
import db from '../../../../utils/db';

const handler = nc();


handler.post(async (req, res) => {
    await db.connect();
    const store = await Store.updateOne({
        storeID: req.body.storeID, $set: {
            paymentProviders: {
                razorpay: {
                    key: req.body.key,
                    secret: req.body.secret,
                },
                CodAvailable:req.body.CodAvailable
            }
        }
    });
    await db.disconnect();
    res.send({ message: 'User Updated Successfully' });

});




export default handler;
