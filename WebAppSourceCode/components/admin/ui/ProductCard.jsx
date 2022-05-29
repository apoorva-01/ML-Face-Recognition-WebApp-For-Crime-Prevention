import React,{ useContext} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DataStore } from '../../../utils/DataStore';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import axios from 'axios';
import { useSnackbar } from 'notistack';

export default function RecipeReviewCard({ product }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { state } = useContext(DataStore);
  const { storeInfo } = state;
  async function addProduct(product){
    try {
      const { data } = await axios.post('/api/products/add/supplier', {
        storeID:storeInfo._id,
        title: product.title,
        description: product.description,
        slug: product.slug,
        image: product.image,
        type: product.type,
        options: product.options,
        categories: product.categories,
        reviews: product.reviews,
        features: product.features,
        isFeatured: product.isFeatured,
        pricing: product.pricing,
        isDeleted: product.isDeleted,
        rating: product.rating,
        barcode: product.barcode,
        sku: product.sku,
        inventory:product.inventory, 
        size:product.size, 
      });
      console.log(data);
      enqueueSnackbar('Added', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(err, { variant: 'error' });
    }
  }
  
  async function likeProduct(product){
    try {
      const { data } = await axios.put('/api/supplier-products/like', {
        productId:product._id,
        liked:true,
      });
      console.log(data);
      enqueueSnackbar('Added to your Wishlist', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(err, { variant: 'error' });
    }
  }
  
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        subheader={product.title}
      />
      <CardMedia
        component="img"
        height="194"
        image={product.images[0].url}
        alt={product.images[0].altText}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {product.liked===true ? (
           <Tooltip title="Add to Wishlist" placement="top" arrow>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon onClick={()=> likeProduct(product)} style={{color: "red"}} />
        </IconButton></Tooltip>) : (  
             <Tooltip title="Add to Wishlist" placement="top" arrow>
           <IconButton aria-label="add to favorites">
          <FavoriteIcon  onClick={()=> likeProduct(product)} />
        </IconButton></Tooltip>)}

        {product.added===true ? (
          <Tooltip title="Add to your Store" placement="top" arrow>
        <IconButton aria-label="add to favorites">
          <AddCircleIcon onClick={()=> addProduct(product)} style={{color: "red"}} />
        </IconButton>
        </Tooltip>) : (  
           <Tooltip title="Add to your Store" placement="top" arrow>
           <IconButton aria-label="add to Ecommerce">
          <AddCircleIcon onClick={()=> addProduct(product)} />
        </IconButton></Tooltip>)}


<Typography style={{marginLeft:'5rem'}} >{'$'} {product.pricing.price}</Typography><WorkspacePremiumIcon fontSize='small'/>
      </CardActions>
    </Card>
  );
}
