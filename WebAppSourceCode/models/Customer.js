import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
  {
    storeID: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: Number, required: false },
    orders_count: { type: Number, required: false, default: 0 },
    tax_exempt: { type: Boolean, required: false, default: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    addresses: [
      {
        addressLine1: { type: String, required: false },
        addressLine2: { type: String, required: false },
        city: { type: String, required: false },
        country: { type: String, required: false },
        state: { type: String, required: false },
        pinCode: { type: Number, required: false },
      }
    ],
    paymentMethods: [
      {
        type: { type: String, required: false },
      }
    ],
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema, 'customers');
export default Customer;
