import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    storeID: { type: String, required: true },
    name: { type: String, required: true },
    vendor: { type: String, required: false },
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
    detailsHtml: { type: String, required: false },
    images: { type: Array, required: false },
    documents: { type: Array, required: false },
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
    sku: { type: String, required: false },
    barcode: { type: String, required: false },
    inventory: { type: Number, required: true, default: 0 },
    size: { type: Object, required: false },
  },
  {
    timestamps: true,
  }
);

const PhysicalProduct =
  mongoose.models.PhysicalProduct || mongoose.model('PhysicalProduct', productSchema, "physicalProducts");
export default PhysicalProduct;
