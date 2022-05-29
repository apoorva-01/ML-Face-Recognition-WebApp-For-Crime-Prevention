import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import Layout from '../../../layouts/Layout/Layout';
import TextEditor from '../../../components/admin/ui/TextEditor'
import AddFeatures from '../../../components/admin/products/add-product/AddFeatures'
import UploadImage from '../../../components/admin/products/add-product/UploadImage'
import ProductStatus from '../../../components/admin/products/add-product/ProductStatus'
import DigitalFileUpload from '../../../components/admin/products/add-product/DigitalFileUpload'
import ButtonSaveProgress from '../../../components/admin/ui/ButtonSaveProgress'
import Pricing from '../../../components/admin/products/add-product/Pricing'
import IconButton from '@mui/material/IconButton';
import ChooseCategories from '../../../components/admin/products/add-product/ChooseCategories'
import Grid from '@mui/material/Grid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { AdminDataStore } from '../../../utils/admin/AdminDataStore';
import { useSnackbar } from 'notistack';

export default function DigitalProduct() {

    const router = useRouter();
    const { redirect } = router.query;
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { state } = useContext(AdminDataStore);
    const { adminStoreInfo } = state;
    const { handleSubmit, control, formState: { errors } } = useForm();
    useEffect(() => {
        if (!adminStoreInfo) {
            router.push('/admin/login');
        }
    }, [router,adminStoreInfo]);
    function slugify(string) {
        return string
            .toString()
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]+/g, "")
            .replace(/\-\-+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, "");
    }
    const [image, setImage] = useState(null);
    const [document, setDocument] = useState(null);


    const [descriptionHtml, setDescription] = useState(null)
    const [type, setType] = useState('digital')
    const [options, setOptions] = useState({})
    const [categories, setCategories] = useState([])
    const [reviews, setReviews] = useState([])
    const [features, setFeatures] = useState([])
    const [isFeatured, setIsFeatured] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)
    const [rating, setRating] = useState(0)
    const [status, setStatus] = useState(true)
    const [size, setSize] = useState(null)
    const [price, setPrice] = useState({
        value: '',
        currencyCode: 'USD',
        comparePrice: '',
        costPerItem: '',
        listPrice: '',
    })
    const [digitalAccessType, setDigitalAccessType] = useState('download')



    const submitHandler = async ({ name,code }) => {
        closeSnackbar();
        if (digitalAccessType === 'download') {
            if(document){
                try {
                    setButtonProgressLoading(true);
                    const { data } = await axios.post('/api/admin/products/add/digital', {
                        storeID: adminStoreInfo._id,
                        name: name,
                        slug: slugify(name),
                        price: price,
                        listPrice: price.listPrice,
                        descriptionHtml: descriptionHtml,
                        images: image ? ([{ url: `/${image.name}`, altText: '' }]) : null,
                        variants: [],
                        options: options,
                        status: status,
                        isFeatured: isFeatured,
                        isDeleted: isDeleted,
                        type: type,
                        categories: categories,
                        features: features,
                        reviews: reviews,
                        rating: rating,
                        digitalAccessType: digitalAccessType,
                    });
        
        
                    setButtonProgressLoading(false);
                    enqueueSnackbar('Successfully added', { variant: 'success' });
                    router.push(redirect || '/admin/products');
                } catch (err) {
                    enqueueSnackbar(
                        err,
                        { variant: 'error' }
                    );
                    setButtonProgressLoading(false);
                }

               
            }
            else{
                enqueueSnackbar('Please Upload Document',{ variant: 'error' }
               );
           }

        }
        else if(digitalAccessType === 'code'){
            if(code!==''){
                try {
                    setButtonProgressLoading(true);
                    const { data } = await axios.post('/api/admin/products/add/digital', {
                        storeID: adminStoreInfo._id,
                        name: name,
                        slug: slugify(name),
                        price: price,
                        listPrice: price.listPrice,
                        descriptionHtml: descriptionHtml,
                        images: image ? ([{ url: `/assets/${image.name}`, altText: '' }]) : null,
                        variants: [],
                        options: options,
                        status: status,
                        isFeatured: isFeatured,
                        isDeleted: isDeleted,
                        type: type,
                        categories: categories,
                        features: features,
                        reviews: reviews,
                        rating: rating,
                        digitalAccessType: digitalAccessType,
                    });
        
        
                    setButtonProgressLoading(false);
                    enqueueSnackbar('Successfully added', { variant: 'success' });
                    router.push(redirect || '/admin/products');
                } catch (err) {
                    enqueueSnackbar(
                        err,
                        { variant: 'error' }
                    );
                    setButtonProgressLoading(false);
                }

            }  else{
                enqueueSnackbar('Please Give Some Link/ Code',{ variant: 'error' }
               );
           }
        }

      
    };


    const discard = () => {
        router.push('/admin/products')
    };



    const [featureFields, setFeatureFields] = useState([
        { id: uuidv4(), name: '', value: '' },
    ]);
    const [buttonProgressLoading, setButtonProgressLoading] = React.useState(false);


    return (
        <Layout>

            <form onSubmit={handleSubmit(submitHandler)} >
                <Grid container justifyContent="center" >
                    <Grid order={{ xs: 2, lg: 1 }} item component={Paper} lg={7} xs={12} sx={{ p: 3, m: 1 }}>
                        <Typography variant='h6' fontWeight={700} component="p">Product Information</Typography>
                        {/* Product Title */}
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id=""
                                    label="Name"
                                    inputProps={{ type: 'text' }}
                                    error={Boolean(errors.name)}
                                    helperText={
                                        errors.name
                                            ? errors.name.type === 'minLength'
                                                ? 'Name can not be less than 3 charactes'
                                                : 'Name is required'
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>
                        {/* Product Description */}
                        <Typography component="p">Description</Typography>
                        <TextEditor text={descriptionHtml} setText={setDescription} />
                    </Grid>
                    <Grid order={{ xs: 1, lg: 2 }} item component={Paper} lg={4} xs={12} sx={{ p: 3, m: 1 }}>
                        <Stack sx={{ mb: 3 }} spacing={4} direction="row">
                            <Button onClick={() => discard()} variant="outlined">Discard</Button>
                            <ButtonSaveProgress text='Publish' size='md' buttonProgressLoading={buttonProgressLoading} setButtonProgressLoading={setButtonProgressLoading} />

                        </Stack>
                        {/* Product Status */}
                        <ProductStatus status={status} setStatus={setStatus} />
                        <Typography sx={{ my: 1 }} component="p" fontSize={13}>This product will be hidden from all sales channels.</Typography>

                    </Grid>
                    <Grid order={{ xs: 3 }} item component={Paper} lg={7} xs={12} sx={{ p: 3, m: 1 }}>
                        <Typography variant='h6' fontWeight={700} component="p">Pricing</Typography>
                        <Pricing price={price} setPrice={setPrice} control={control} errors={errors} />



                        <Typography variant='h6' sx={{ mt: 3 }} fontWeight={700} component="p">Categories</Typography>
                        {adminStoreInfo ? (<>
                            {adminStoreInfo.categories ? (
                                <ChooseCategories categories={adminStoreInfo.categories} />
                            ) : (<>
                                <Typography component="p">No Category Found</Typography>
                                <Link href=''>
                                    <a>

                                        <IconButton aria-label="delete" size="small">
                                            <AddCircleOutlineIcon fontSize="inherit" />
                                        </IconButton>
                                    </a>
                                </Link>
                            </>)}
                        </>) : (<></>)}

                    </Grid>
                    <Grid order={{ xs: 4 }} item component={Paper} lg={4} xs={12} sx={{ p: 3, m: 1 }}>
                        <Typography variant='h6' fontWeight={700} component="p">Media</Typography>
                        <Grid sx={{ width: '100%' }} container justifyContent='center'>
                            <UploadImage image={image} setImage={setImage} />
                        </Grid>
                    </Grid>

                    <Grid order={{ xs: 5 }} item component={Paper} lg={7} xs={12} sx={{ p: 3, m: 1 }}>
                        {/* Upload Document */}
                        <Typography variant='h6' fontWeight={700} component="p">Redemption</Typography>
                        <Typography fontWeight={700} component="p">Buyers can either directly download a file or get a code to redeem on your website.</Typography>
                        <Typography component="p">How will buyers get your product?</Typography>
                        <FormControl component="fieldset">
                            <RadioGroup
                                name="radio-buttons-group"
                            >
                                <FormControlLabel checked={digitalAccessType === 'code'}
                                    onChange={(e) => setDigitalAccessType(e.target.value)} value="code" control={<Radio />} label="Code to redeem (software, courses)" />
                                <FormControlLabel checked={digitalAccessType === 'download'}
                                    onChange={(e) => setDigitalAccessType(e.target.value)} value="download" control={<Radio />} label="Direct download (ebooks, PDFs)" />
                            </RadioGroup>
                        </FormControl>



                        {digitalAccessType === 'code' ? (
                            <>
                                <div style={{ marginTop: '2rem' }}>
                                    <Typography variant='p' component="p">Where will buyers go to redeem their codes?</Typography>
                                    <Controller
                            name="code"
                            control={control}
                            defaultValue=""
                            rules={{}}
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id=""
                                    label="Link for code redemption (URL)"
                                    inputProps={{ type: 'text' }}
                                    error={Boolean(errors.code)}
                                    helperText={
                                        errors.code? 'Name can not be less than 3 charactes' : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>
                                   
                                </div>
                            </>
                        ) : digitalAccessType === 'download' ? (
                            <DigitalFileUpload document={document} setDocument={setDocument} />
                        )
                            : (<></>)
                        }
                    </Grid>

                    <Grid order={{ xs: 6 }} item component={Paper} lg={4} xs={12} sx={{ p: 3, m: 1 }}>
                        <Typography variant='h6' fontWeight={700} component="p">Features & Options</Typography>
                        <AddFeatures featureFields={featureFields} setFeatureFields={setFeatureFields} />
                    </Grid>
                </Grid>
            </form>
        </Layout>)
}
