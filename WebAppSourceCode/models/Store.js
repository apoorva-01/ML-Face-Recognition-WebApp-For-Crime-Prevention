import mongoose from 'mongoose'

const storeSchema = new mongoose.Schema(
  {
    storeName: { type: String, required: false, unique: true },
    storeLink: { type: String, required: false, unique: true },
    name: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    phone: { type: Number, required: false },
    verified: { type: Boolean, required: false, default: false },
    plan: { type: String, required: false, default: 'Basic' },
    password: { type: String, required: false },
    companyName: { type: String, required: false },
    title: { type: String, required: false },
    metatitle: { type: String, required: false },
    metadescription: { type: String, required: false },
    // gst: { type: String, required: false },
    // logo: { type: String, required: false },
    bio: { type: String, required: false },
    // languages: { type: Array, required: false, default: ['eng'] },
    // categories: { type: Array, required: false },
    // taxes: { type: Object, required: false },
    address: {
      addressLine1: { type: String, required: false },
      addressLine2: { type: String, required: false },
      city: { type: String, required: false },
      state: { type: String, required: false },
      pinCode: { type: Number, required: false },
      country: { type: String, required: false },
    },
    storeDetails: {
      storeIndustry: { type: String, required: false },
      storeAudience: { type: String, required: false },
      companyName: { type: String, required: false },
    },
    paymentProviders: {
      CodAvailable: { type: Boolean, required: false, default: true },
      razorpay: { type: Object, required: false },
    },

    checkout: {
      checkoutCustomerAccount: {
        type: String,
        required: false,
        default: 'required',
      },
      checkoutCustomerContact: {
        type: String,
        required: false,
        default: 'phoneEmail',
      },
      marketingConsent: {
        emailMarketingSubscribe: {
          type: Boolean,
          required: false,
          default: true,
        },
        smsMarketingSubscribe: {
          type: Boolean,
          required: false,
          default: false,
        },
      },
      formOptions: {
        lastName: { type: String, required: false, default: 'hidden' },
        companyName: { type: String, required: false, default: 'hidden' },
        addressLine2: { type: String, required: false, default: 'hidden' },
        shippingAddressPhone: {
          type: String,
          required: false,
          default: 'hidden',
        },
      },
    },
    taxes: {
      allPricesIncludeTaxes: { type: Boolean, required: false, default: false },
      shippingRatesTax: { type: Boolean, required: false, default: false },
      digitalProductVAT: { type: Boolean, required: false, default: false },
    },
    policies: {
      RefundPolicyHtml: { type: Boolean, required: false, default: false },
      PrivacyPolicyHtml: { type: Boolean, required: false, default: false },
      ShippingPolicyHtml: { type: Boolean, required: false, default: false },
      TermsOfServiceHtml: { type: Boolean, required: false, default: false },
    },
    // socialMediaLinks: {
    //   facebook: { type: String, required: false },
    //   instagram: { type: String, required: false },
    //   twitter: { type: String, required: false },
    //   github: { type: String, required: false },
    // }
  },
  {
    timestamps: true,
  }
)

const Store =
  mongoose.models.Store || mongoose.model('Store', storeSchema, 'stores')
export default Store
