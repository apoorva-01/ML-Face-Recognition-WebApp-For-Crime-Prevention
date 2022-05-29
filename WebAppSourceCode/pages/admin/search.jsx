
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import Pagination from '@mui/material/Pagination';
import CancelIcon from '@material-ui/icons/Cancel';
import { useRouter } from 'next/router';
import React, { useContext ,useEffect} from 'react';
import Layout from '../../layouts/Layout/Layout';
import db from '../../utils/admin/db';
import SupplierProduct from '../../models/SupplierProduct';
import useStyles from '../../utils/admin/styles';
import ProductCard from '../../components/admin/ui/ProductCard';
import { AdminDataStore } from '../../utils/admin/AdminDataStore';
import axios from 'axios';
import Image from 'next/image'


const PAGE_SIZE = 30;

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
  const { state, dispatch } = useContext(AdminDataStore);
  const { adminStoreInfo } = state;

  const {
    query = 'all',
    category = 'all',
    location = 'all',
    price = 'all',
    rating = 'all',
    sort = 'featured',
  } = router.query;
  const { products, countProducts, categories, locations, pages } = props;

  const filterSearch = ({
    page,
    category,
    location,
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
    if (location) query.location = location;
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
    // console.log(e.target.value)
    filterSearch({ category: e.target.value });
  };
  const pageHandler = (e, page) => {
    filterSearch({ page });
  };
  const locationHandler = (e) => {
    filterSearch({ location: e.target.value });
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };
  const priceHandler = (e) => {
    filterSearch({ price: e.target.value });
  };
  const ratingHandler = (e) => {
    filterSearch({ rating: e });
  };


  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/admin/products/${product._id}`);
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

  useEffect(() => {
    if (!adminStoreInfo) {
        router.push('/admin/login');
    }
}, [router,adminStoreInfo]);
  return (
    <Layout title="Search">
      <Grid className={classes.mt1} container spacing={1}>
        <Grid style={{ backgroundColor: '#F8F9FA' }} item md={3} xs={12}>
        <Typography variant='h6' component="p">Filters</Typography>
          <List>
          <hr/>
            <ListItem>
              <Box className={classes.fullWidth}>
                <Typography  >Categories</Typography>
                <Grid>
                  <Grid item sx={6}>
                    <FormControl>
                      <RadioGroup
                        value={category}
                        onChange={categoryHandler}
                      >
                        {categories &&
                          categories.map((category) => (
                            <FormControlLabel key={category} value={category} control={<Radio size="small" />} label={capitalizeFirstLetter(category)} />
                          ))}

                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item sx={6}></Grid>
                </Grid>

              </Box>
            </ListItem>
            <hr/>
            <ListItem>
              <Box className={classes.fullWidth}>
                <Typography>Ratings</Typography>
                <Rating
                  name="simple-controlled"
                  value={rating}
                  onChange={(event, newValue) => {
                    ratingHandler(newValue);
                  }}
                />
              </Box>
            </ListItem>
            <hr/>
            <ListItem>
              <Box className={classes.fullWidth}>
                <Typography>Location</Typography>

                <FormControl>
                  <RadioGroup
                    value={location} onChange={locationHandler}
                  >
                    {locations &&
                      locations.map((location) => (
                        <FormControlLabel key={location} value={location} control={<Radio size="small" />} label={capitalizeFirstLetter(location)} />

                      ))}


                  </RadioGroup>
                </FormControl>
              </Box>
            </ListItem>
            <hr/>
            <ListItem>
              <Box className={classes.fullWidth}>
                <Typography>Prices</Typography>
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



          </List>
        </Grid>
        <Grid item md={9}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography>
              <Grid item>
                {products.length === 0 ? 'No' : countProducts} Results: &nbsp;

                {query !== 'all' && query ? (<Chip label={capitalizeFirstLetter(query)} variant="outlined" />) : (<></>)}
                {category !== 'all' && category ? (<Chip label={capitalizeFirstLetter(category)} variant="outlined" />) : (<></>)}
                {location !== 'all' && location ? (<Chip label={capitalizeFirstLetter(location)} variant="outlined" />) : (<></>)}
                {price !== 'all' && price ? (<Chip label={`Price: ₹${price}`} variant="outlined" />) : (<></>)}
                {rating !== 'all' && rating ? (<Chip label={`Rating: ${rating}`} variant="outlined" />) : (<></>)}



                {(query !== 'all' && query !== '') ||
                  category !== 'all' ||
                  location !== 'all' ||
                  rating !== 'all' ||
                  price !== 'all' ? (
                  <Button onClick={() => router.push('/search')}>
                    <CancelIcon />
                  </Button>
                ) : null}
              </Grid>
            </Typography>
            <Grid item>
              <Typography component="span" className={classes.sort}>
                Sort By:
              </Typography>
              <FormControl variant="standard" style={{ m: 1, minWidth: 70 }}>
                <Select value={sort} onChange={sortHandler}>
                  <MenuItem value="featured">Featured</MenuItem>
                  <MenuItem value="lowest">Price: Low to High</MenuItem>
                  <MenuItem value="highest">Price: High to Low</MenuItem>
                  <MenuItem value="toprated">Customer Reviews</MenuItem>
                  <MenuItem value="newest">Newest Arrivals</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {products.length !== 0 ? (<Grid className={classes.mt1} container spacing={3}>
            {products.map((product) => (
              <Grid item md={4} key={product.name}>
                <ProductCard
                  product={product}
                  addToCartHandler={addToCartHandler}
                />
              </Grid>
            ))}
          </Grid>) : (<>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={3}>
                <Image src={'/admin/images/dashboard/products.svg'} alt={'No Product Found'} width={200} height={200}></Image>
                <Typography variant='h6' fontWeight={700} component="p">No Products Found</Typography>
              </Grid>
            </Grid>
          </>)}

          <Pagination
            className={classes.mt1}
            defaultPage={parseInt(query.page || '1')}
            count={pages}
            onChange={pageHandler}
          ></Pagination>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  await db.connect();
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || '';
  const location = query.location || '';
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
  const locationFilter = location && location !== 'all' ? { location } : {};
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

  const categories = ['sensors', 'printing', 'sewing-knitting', 'food-processing', 'water-purification','automation'];
  const locations = ['delhi', 'mumbai', 'kolkata', 'banglore'];
  const productDocs = await SupplierProduct.find(
    {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...locationFilter,
      ...ratingFilter,
    },
    '-reviews'
  )
    .sort(order)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await SupplierProduct.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...locationFilter,
    ...ratingFilter,
  });
  await db.disconnect();

  const products = productDocs.map(db.convertDocToObj);

  return {
    props: {
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
      categories,
      locations,
    },
  };
}
