import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { ProductCard } from '@components/product'
import CancelIcon from '@material-ui/icons/Cancel';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import db from '../utils/db';
import PhysicalProduct from '../models/PhysicalProduct';
import useStyles from '../utils/styles';
import { DataStore } from '../utils/DataStore';
import { Layout } from '@components/common'
import axios from 'axios';
import { Pagination } from '@material-ui/lab';

const PAGE_SIZE = 3;

const prices = [
  {
    name: '$1 to $50',
    value: '1-50',
  },
  {
    name: '$51 to $200',
    value: '51-200',
  },
  {
    name: '$201 to $1000',
    value: '201-1000',
  },
];

const ratings = [1, 2, 3, 4, 5];

export default function Search(props) {
  const classes = useStyles();
  const router = useRouter();
  const {
    query = 'all',
    category = 'all',
    brand = 'all',
    price = 'all',
    rating = 'all',
    sort = 'featured',
  } = router.query;
  const { products, countProducts, categories, brands, totalPages } = props;

  const filterSearch = ({
    page,
    category,
    brand,
    sort,
    min,
    max,
    searchQuery,
    price,
    rating,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (price) query.price = price;
    if (rating) query.rating = rating;
    if (min) query.min ? query.min : query.min === 0 ? 0 : min;
    if (max) query.max ? query.max : query.max === 0 ? 0 : max;

    router.push({
      pathname: path,
      query: query,
    });
  };
  const categoryHandler = (e) => {
    filterSearch({ category: e });
  };
  const pageHandler = (e, page) => {
    filterSearch({ page });
  };
  const brandHandler = (e) => {
    filterSearch({ brand: e.target.value });
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e });
  };
  const priceHandler = (e) => {
    filterSearch({ price: e.target.value });
  };
  const ratingHandler = (e) => {
    filterSearch({ rating: e });
  };

  const { state, dispatch } = useContext(DataStore);
  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <>

      <Grid className={classes.mt1} container >
        <Grid item md={3}>
          <List>
            <ListItem>
              <Box className={classes.fullWidth}>
                <Typography style={{ fontWeight: 700 }}>Categories</Typography>


                {categories &&
                  categories.map((category) => (
                    <Typography key={category} style={{ pointer: 'cursor' }} onClick={() => categoryHandler(category)}>   {category}</Typography>

                  ))}
              </Box>
            </ListItem>
            <ListItem>
              <Box className={classes.fullWidth}>
                <Typography style={{ fontWeight: 700 }}>Brands</Typography>


                <FormControl>
                  <RadioGroup
                    value={brand} onChange={brandHandler}
                  >
                    {brands &&
                      brands.map((brand) => (
                        <FormControlLabel key={brand} value={brand} control={<Radio size="small" />} label={capitalizeFirstLetter(brand)} />

                      ))}


                  </RadioGroup>
                </FormControl>


              </Box>
            </ListItem>
            <ListItem>
              <Box className={classes.fullWidth}>
                <Typography style={{ fontWeight: 700 }}>Prices</Typography>
                <Select value={price} onChange={priceHandler} fullWidth>
                  <MenuItem value="all">All</MenuItem>
                  {prices.map((price) => (
                    <MenuItem key={price.value} value={price.value}>
                      {price.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </ListItem>
            <ListItem>
              <Box className={classes.fullWidth}>
                <Typography style={{ fontWeight: 700 }}>Ratings</Typography>
                <Rating
                  name="simple-controlled"
                  value={rating}
                  onChange={(event, newValue) => {
                    ratingHandler(newValue);
                  }}
                />
              </Box>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={7}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              {products.length === 0 ? 'No' : countProducts} Results: &nbsp;

              {query !== 'all' && query ? (<Chip label={capitalizeFirstLetter(query)} variant="outlined" />) : (<></>)}
              {category !== 'all' && category ? (<Chip label={capitalizeFirstLetter(category)} variant="outlined" />) : (<></>)}
              {brand !== 'all' && brand ? (<Chip label={capitalizeFirstLetter(brand)} variant="outlined" />) : (<></>)}
              {price !== 'all' && price ? (<Chip label={`Price: ₹${price}`} variant="outlined" />) : (<></>)}
              {rating !== 'all' && rating ? (<Chip label={`Rating: ${rating}`} variant="outlined" />) : (<></>)}

              {(query !== 'all' && query !== '') ||
                category !== 'all' ||
                brand !== 'all' ||
                rating !== 'all' ||
                price !== 'all' ? (
                <Button onClick={() => router.push('/search')}>
                  <CancelIcon />
                </Button>
              ) : null}
            </Grid>

          </Grid>
          <Grid className={classes.mt1} container spacing={3}>
            {products.map((product) => (
              <Grid item md={4} key={product.name}>
                <ProductCard
                  variant="simple"
                  key={product.path}
                  className="animated fadeIn"
                  product={product}
                  imgProps={{
                    width: 480,
                    height: 480,
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Pagination
            className={classes.mt1}
            defaultPage={parseInt(query.page || '1')}
            count={totalPages}
            onChange={pageHandler}
          ></Pagination>
        </Grid>


        <Grid item md={2}>
          <Box className={classes.fullWidth}>
            <Typography style={{ fontWeight: 700 }}>Relevance</Typography>
            <Typography style={{ pointer: 'cursor' }} onClick={() => sortHandler('featured')}>Featured</Typography>
            <Typography style={{ pointer: 'cursor' }} onClick={() => sortHandler('lowest')}>Price: Low to high</Typography>
            <Typography style={{ pointer: 'cursor' }} onClick={() => sortHandler('highest')}>Price: High to low</Typography>
            <Typography style={{ pointer: 'cursor' }} onClick={() => sortHandler('toprated')}>Top Rated</Typography>
            <Typography style={{ pointer: 'cursor' }} onClick={() => sortHandler('newest')}>Latest arrivals</Typography>
          </Box>
        </Grid>
      </Grid>

    </>
  );
}

export async function getServerSideProps({ query }) {
  await db.connect();
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || '';
  const brand = query.brand || '';
  const price = query.price || '';
  const rating = query.rating || '';
  const sort = query.sort || '';
  const searchQuery = query.query || '';

  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
        name: {
          $regex: searchQuery,
          $options: 'i',
        },
      }
      : {};
  const categoryFilter = category && category !== 'all' ? { category } : {};
  const brandFilter = brand && brand !== 'all' ? { brand } : {};
  const ratingFilter =
    rating && rating !== 'all'
      ? {
        rating: {
          $gte: Number(rating),
        },
      }
      : {};
  // 10-50
  const priceFilter =
    price && price !== 'all'
      ? {
        price: {
          $gte: Number(price.split('-')[0]),
          $lte: Number(price.split('-')[1]),
        },
      }
      : {};

  const order =
    sort === 'featured'
      ? { featured: -1 }
      : sort === 'lowest'
        ? { price: 1 }
        : sort === 'highest'
          ? { price: -1 }
          : sort === 'toprated'
            ? { rating: -1 }
            : sort === 'newest'
              ? { createdAt: -1 }
              : { _id: -1 };

  const categories = ['LoRawan Technology', 'SMT Accessories', 'IoT Products', 'IoT Accessories', 'NB IoT', 'PCB Accessories'];
  const brands = ['Dragino', 'Mitsubishi'];
  const productDocs = await PhysicalProduct.find(
    {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...brandFilter,
      ...ratingFilter,
    },
    '-reviews'
  )
    .sort(order)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await PhysicalProduct.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...brandFilter,
    ...ratingFilter,
  });
  await db.disconnect();

  const products = productDocs.map(db.convertDocToObj);

  return {
    props: {
      products,
      countProducts,
      page,
      totalPages: Math.ceil(countProducts / pageSize),
      categories,
      brands,
    },
  };
}

Search.Layout = Layout