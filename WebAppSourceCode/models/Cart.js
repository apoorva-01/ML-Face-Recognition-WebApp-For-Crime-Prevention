import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
  {
    cartItems: { type: Array,  required: true },
    shippingAddress: { type: Array,  required: true },
    paymentMethod: { type: Array,  required: true },

  },
  {
    timestamps: true,
  }
);

const Cart =
  mongoose.models.Cart || mongoose.model('Cart', cartSchema, "cart");
export default Cart;
