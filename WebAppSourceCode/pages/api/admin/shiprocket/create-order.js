import axios from 'axios'
import nc from 'next-connect';
const handler = nc();
var data = JSON.stringify({
  "order_id": "224-447",
  "order_date": "2019-07-24 11:11",
  "pickup_location": "Jammu",
  "channel_id": "",
  "comment": "Reseller: M/s Goku",
  "billing_customer_name": "Naruto",
  "billing_last_name": "Uzumaki",
  "billing_address": "House 221B, Leaf Village",
  "billing_address_2": "Near Hokage House",
  "billing_city": "New Delhi",
  "billing_pincode": "110002",
  "billing_state": "Delhi",
  "billing_country": "India",
  "billing_email": "naruto@uzumaki.com",
  "billing_phone": "9876543210",
  "shipping_is_billing": true,
  "shipping_customer_name": "",
  "shipping_last_name": "",
  "shipping_address": "",
  "shipping_address_2": "",
  "shipping_city": "",
  "shipping_pincode": "",
  "shipping_country": "",
  "shipping_state": "",
  "shipping_email": "",
  "shipping_phone": "",
  "order_items": [
    {
      "name": "Kunai",
      "sku": "chakra123",
      "units": 10,
      "selling_price": "900",
      "discount": "",
      "tax": "",
      "hsn": 441122
    }
  ],
  "payment_method": "Prepaid",
  "shipping_charges": 0,
  "giftwrap_charges": 0,
  "transaction_charges": 0,
  "total_discount": 0,
  "sub_total": 9000,
  "length": 10,
  "breadth": 15,
  "height": 20,
  "weight": 2.5
});




handler.get(async (req, res) => {
    var config = {
        method: 'post',
        url: 'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIyMzYzMjYsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjQxMDQ1Njg1LCJleHAiOjE2NDE5MDk2ODUsIm5iZiI6MTY0MTA0NTY4NSwianRpIjoiekNJRktkZ013ZnNkQmQ4UyJ9.VZaWEsNk0jqdIaMw1685hTx_Rvlsl-W8KmzV8usmdqU'
        },
        data : data
      };
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      res.send({success: true});
    })
    .catch(function (error) {
      console.log(error);
      res.send({success: false});
    });

   
})
  

export default handler;

