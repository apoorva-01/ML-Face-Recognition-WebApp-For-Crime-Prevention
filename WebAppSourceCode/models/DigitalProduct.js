import mongoose from 'mongoose';

const digitalProductSchema = new mongoose.Schema(
  {

    storeID: { type: String, required: true },
    name: { type: String, required: true },
    path: { type: String, required: true , unique: true},
    slug: { type: String, required: true, unique: true },
    price: {
      value: { type: String, required: false },
      currencyCode: { type: String, required: false },
      comparePrice: { type: String, required: false },
      costPerItem: { type: String, required: false }
    },
    listPrice: { type: Number, required: false},
    descriptionHtml: { type: String, required: false },
    images: { type: Array, required: false },
    variants: { type: Array, required: false },
    options: { type: Array, required: false },
    status: { type: Boolean, required: true },
    isFeatured: { type: Boolean, required: true },
    isDeleted: { type: Boolean, required: true },
    type: { type: String, required: true },
    categories: { type: Array, required: false },
    features: { type: Array, required: false },
    reviews: {
      customer: { type: String, required: false },
      name: { type: String, required: false },
      rating: { type: Number, required: false },
      comment: { type: String, required: false },
    },
    rating: { type: Number, required: false, default: 0 },
    digitalAccessType: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const DigitalProduct =
  mongoose.models.DigitalProduct || mongoose.model('DigitalProduct', digitalProductSchema, "digitalProducts");
export default DigitalProduct;
