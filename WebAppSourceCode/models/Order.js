import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    customer:  { type: String },
    storeID: { type: String,  required: false  },
    isConfirmed: { type: Boolean,  required: false,default: false },
    orderItems:  { type: Array, required: false },
    shippingAddress: {
      fullName: { type: String, required: false },
      address: { type: String, required: false },
      city: { type: String, required: false },
      postalCode: { type: String, required: false },
      country: { type: String, required: false },
      location: {
        lat: String,
        lng: String,
        address: String,
        name: String,
        vicinity: String,
        googleAddressId: String,
      },
    },
    paymentMethod: { type: String, required: false  },
    // paymentResult: { id: String, status: String, email_address: String },
    itemsPrice: { type: Number, required: false  },
    shippingPrice: { type: Number, required: false  },
    taxPrice: { type: Number, required: false  },
    totalPrice: { type: Number, required: false  },
    isPaid: { type: Boolean, required: false, default: false },
    orderStatus: { type: String, required: false, default: false },
    paidAt: { type: Date , required: false},
    deliveredAt: { type: Date, required: false }
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema,'orders');
export default Order;
