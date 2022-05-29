import mongoose from 'mongoose';

const supplierProductSchema = new mongoose.Schema(
  {
    supplierID: { type: String,  required: true },
    title: { type: String, required:  true},
    description: { type: String, required: false },
    location: { type: String, required: false },
    slug: { type: String, required:  true, unique: true },
    status: { type: Boolean, required:  true },
    liked: { type: Boolean, required:  true },
    added: { type: Boolean, required:  true },
    isFeatured: { type: Boolean, required:  true },
    isDeleted: { type: Boolean, required:  true },
    categories: { type: String, required: false },
    features: { type: Array, required: false },
    image: { type: Array, required: false },
    reviews: { 
      customer: { type: String, required:  false },
      name: { type: String, required:  false },
      rating: { type: Number, required:  false },
      comment: { type: String, required:  false },
     },
    pricing: { type: Object, required: false },
    options: { type: Object, required: false },
    rating: { type: Number, required: false, default: 0 },
    numReviews: { type: Number, required: false, default: 0 },
    size: { type: Object, required: false },
    sku: { type: String, required: false,unique:true },
    barcode: { type: String, required: false,unique:true },
    inventory: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

const SupplierProduct =
  mongoose.models.SupplierProduct || mongoose.model('SupplierProduct', supplierProductSchema, "supplierProducts");
export default SupplierProduct;
