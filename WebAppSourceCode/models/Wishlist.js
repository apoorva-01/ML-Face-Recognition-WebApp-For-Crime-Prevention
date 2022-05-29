import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema(
  {
    cartItems: { type: Array,  required: true },

  },
  {
    timestamps: true,
  }
);

const Wishlist =
  mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema, "wishlist");
export default Wishlist;
