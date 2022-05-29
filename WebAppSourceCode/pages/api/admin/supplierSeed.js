import nc from 'next-connect';
import SupplierProduct from '../../../models/SupplierProduct';
import db from '../../../utils/db';
import { v4 as uuidv4 } from 'uuid';

const handler = nc();
const beautyProducts= [];
const agricultureProducts= [];
const clothesProducts= [];
const mashineryProducts= [];
const sportsProducts= [];
const homeProducts= [];
const webpProducts= [];
for (let i = 1; i < 8; i++) {
    beautyProducts.push(  {
    categories: 'sensors',  supplierID: uuidv4(), status:true,
    features: [],
    image: [{
        src: `/images/supplier/products/sensors/1 (${i}).jpg`,
        alt: ""
    }],
    rating: Math.floor(Math.random() * (5- 0 + 1)) +0,
    numReviews: Math.floor(Math.random() * (30- 0 + 1)) +0,
    inventory: 2,
    location:'delhi',
    title: "Product 3",
    description: "In publishing and graphic design, Lorem ipsum is a placeholder text ",
    slug:  uuidv4(),
    type: "physical",
    isFeatured: false,
    added: false,
    liked: false,

    pricing: {
        price: Math.floor(Math.random() * (500- 0 + 1)) +0,
        currency: "USD",
        comparePrice: "",
        costPerItem: 1
    },
    isDeleted: false,
    barcode: uuidv4(),
    sku: uuidv4(),
    size: null,
},)
  }
for (let i = 1; i < 27; i++) {
    homeProducts.push(  {
    categories: 'printing',  supplierID: uuidv4(), status:true,
    features: [],
    image: [{
        src: `/images/supplier/products/printing/1 (${i}).jpg`,
        alt: ""
    }],
    rating: Math.floor(Math.random() * (5- 0 + 1)) +0,
    numReviews: Math.floor(Math.random() * (30- 0 + 1)) +0,
    inventory: 2,
    location:'kolkata',
    title: "Product 3",
    description: "In publishing and graphic design, Lorem ipsum is a placeholder text ",
    slug:  uuidv4(),
    type: "physical",
    isFeatured: false,
    added: false,
    liked: false,

    pricing: {
        price: Math.floor(Math.random() * (500- 0 + 1)) +0,
        currency: "USD",
        comparePrice: "",
        costPerItem: 1
    },
    isDeleted: false,
    barcode: uuidv4(),
    sku: uuidv4(),
    size: null,
},)
  }


for (let i = 1; i < 17; i++) {
    agricultureProducts.push(  {
    categories: 'sewing-knitting',  supplierID: uuidv4(), status:true,
    features: [],
    image: [{
        src: `/images/supplier/products/sewing-knitting/1 (${i}).jpg`,
        alt: ""
    }],
    rating: Math.floor(Math.random() * (5- 0 + 1)) +0,
    numReviews: Math.floor(Math.random() * (40- 0 + 1)) +0,
    inventory: 2,
    location:'hyderabad',
    added: false,
    liked: false,
    title: "Product 3",
    description: "In publishing and graphic design, Lorem ipsum is a placeholder text ",
    slug:  uuidv4(),
    type: "physical",
    isFeatured: false,
    pricing: {
        price: "2",
        currency: "USD",
        comparePrice: "",
        costPerItem: "1"
    },
    isDeleted: false,
    barcode: uuidv4(),
    sku: uuidv4(),
    size: null,
},)
  }

for (let i = 1; i < 21; i++) {
    clothesProducts.push(  {
    categories: 'food-processing',  supplierID: uuidv4(), status:true,
    features: [],
    image: [{
        src: `/images/supplier/products/food-processing/1 (${i}).jpg`,
        alt: ""
    }],
    rating: Math.floor(Math.random() * (5- 0 + 1)) +0,
    numReviews: Math.floor(Math.random() * (40- 0 + 1)) +0,
    inventory: 2,
    added: false,
    liked: true,
    title: "Product 3",
    location:'kolkata',
    description: "In publishing and graphic design, Lorem ipsum is a placeholder text ",
    slug:  uuidv4(),
    type: "physical",
    isFeatured: false,
    pricing: {
        price: "2",
        currency: "USD",
        comparePrice: "",
        costPerItem: "1"
    },
    isDeleted: false,
    barcode: uuidv4(),
    sku: uuidv4(),
    size: null,
},)
  }

for (let i = 1; i < 25; i++) {
    mashineryProducts.push(  {
    categories: 'water-purification',  supplierID: uuidv4(), status:true,
    features: [],
    image: [{
        src: `/images/supplier/products/water-purification/1 (${i}).jpg`,
        alt: ""
    }],
    rating: Math.floor(Math.random() * (5- 0 + 1)) +0,
    numReviews: Math.floor(Math.random() * (40- 0 + 1)) +0,
    inventory: 2,
    added: true,
    liked: false,
    title: "Product 3",
    location:'chennai',
    description: "In publishing and graphic design, Lorem ipsum is a placeholder text ",
    slug:  uuidv4(),
    type: "physical",
    isFeatured: false,
    pricing: {
        price: "2",
        currency: "USD",
        comparePrice: "",
        costPerItem: "1"
    },
    isDeleted: false,
    barcode: uuidv4(),
    sku: uuidv4(),
    size: null,
},)
  }

for (let i = 1; i < 8; i++) {
    sportsProducts.push(  {
    categories: 'automation',  supplierID: uuidv4(), status:true,
    features: [],
    image: [{
        src: `/images/supplier/products/automation/1 (${i}).jpg`,
        alt: ""
    }],
    rating: Math.floor(Math.random() * (5- 0 + 1)) +0,
    numReviews: Math.floor(Math.random() * (40- 0 + 1)) +0,
    inventory: 2,
    added: false,
    liked: true,
    title: "Product 3",
    description: "In publishing and graphic design, Lorem ipsum is a placeholder text ",
    slug:  uuidv4(),
    type: "physical",
    isFeatured: false,
    pricing: {
        price: "2",
        currency: "USD",
        comparePrice: "",
        costPerItem: "1"
    },
    isDeleted: false,
    barcode: uuidv4(),
    sku: uuidv4(),
    size: null,
},)
  }

for (let i = 1; i < 10; i++) {
    webpProducts.push(  {
    categories: 'webp',  supplierID: uuidv4(), status:true,
    features: [],
    image: [{
        src: `/images/supplier/products/webp/1 (${i}).jpg`,
        alt: ""
    }],
    rating: Math.floor(Math.random() * (5- 0 + 1)) +0,
    numReviews: Math.floor(Math.random() * (40- 0 + 1)) +0,
    inventory: 2,
    added: false,
    liked: false,
    title: "Product 3",
    description: "In publishing and graphic design, Lorem ipsum is a placeholder text ",
    slug:  uuidv4(),
    type: "physical",
    isFeatured: false,
    pricing: {
        price: "2",
        currency: "USD",
        comparePrice: "",
        costPerItem: "1"
    },
    isDeleted: false,
    barcode: uuidv4(),
    sku: uuidv4(),
    size: null,
},)
  }

handler.get(async (req, res) => {
  await db.connect();
  await SupplierProduct.deleteMany();
  await SupplierProduct.insertMany(beautyProducts);
  await SupplierProduct.insertMany(agricultureProducts);
  await SupplierProduct.insertMany(clothesProducts);
  await SupplierProduct.insertMany(mashineryProducts);
  await SupplierProduct.insertMany(sportsProducts);
  await SupplierProduct.insertMany(homeProducts);
//   await SupplierProduct.insertMany(webpProducts);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
});

export default handler;
