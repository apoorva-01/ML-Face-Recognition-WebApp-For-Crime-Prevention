import mongoose from 'mongoose';

const shippingZoneSchema = new mongoose.Schema(
  {
    storeID: { type: String,  required: true },
    shippingZones: [{ 
        zoneName:{type: String,  required: true},
        countries:{type: Array,  required: true},
        rate:[
           {
            rateName: { type: String, required: true},
            price: { type: String, required: true},
            conditions:[
                {
                    conditionName:{ type: String,  required: true},
                    min:{ type: Number,  required: true},
                    max:{ type: Number,  required: true}
                }
            ]
           }
        ]
     }],
   
    },
    {
      timestamps: true,
    }
);

const ShippingZone = mongoose.models.ShippingZone || mongoose.model('ShippingZone', shippingZoneSchema, "shipping");
export default ShippingZone;
