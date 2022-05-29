import nc from 'next-connect';
import Store from '../../../../models/Store';
import db from '../../../../utils/db';

const handler = nc();


handler.post(async (req, res) => {
    await db.connect();
    const store = await Store.updateOne({
        storeID: req.body.storeID, $set: {
            checkoutCustomerAccount:req.body.checkoutCustomerAccount,
            formOptions: {
                companyName:req.body.companyName,
                lastName:req.body.lastName,
                addressLine2:req.body.addressLine2,
                shippingAddressPhone:req.body.shippingAddressPhone
            }
        }
    });
    await db.disconnect();
    console.log(store)
    console.log({
        checkoutCustomerAccount:req.body.checkoutCustomerAccount,
        formOptions: {
            companyName:req.body.companyName,
            lastName:req.body.lastName,
            addressLine2:req.body.addressLine2,
            shippingAddressPhone:req.body.shippingAddressPhone
        }
    })
    res.send({ message: 'Updated Successfully' });

});




export default handler;
