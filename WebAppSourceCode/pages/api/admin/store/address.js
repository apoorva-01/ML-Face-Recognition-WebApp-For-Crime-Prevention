import nc from 'next-connect';
import Store from '../../../../models/Store';
import db from '../../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {

    await db.connect();
    const filter = { storeID:req.body.storeID };
    const update = {
     
        address:{
            addressLine1:req.body.addressLine1,
            addressLine2:req.body.addressLine2,
            city:req.body.city,
            country:req.body.country,
            state:req.body.state,
            pinCode:req.body.pinCode 
        }
    };
    let doc = await Store.findOneAndUpdate(filter, update);
    await db.disconnect();

    res.send({success:true});

});

export default handler;
