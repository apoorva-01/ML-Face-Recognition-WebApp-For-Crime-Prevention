import React, { useContext, useEffect } from 'react';
import Layout from '../../../layouts/Layout/Layout';
import { useRouter } from 'next/router';
import Image from "next/image";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import InfoIcon from '@mui/icons-material/Info';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Tooltip from '@mui/material/Tooltip';
import { AdminDataStore } from '../../../utils/admin/AdminDataStore';
import IconButton from "@mui/material/IconButton";
export default function AddProduct() {
    const router = useRouter();
    const { state } = useContext(AdminDataStore);
    const { adminStoreInfo } = state;
    useEffect(() => {
        if (!adminStoreInfo) {
            router.push('/admin/login');
        }
    }, [adminStoreInfo,router]);
    const productTypes = [
        {
            title: "Digital Product",
            productType: "Digital",
            description: 'Upload eBooks, music, videos, software or anything else digital.',
            toolTip: 'Upload eBooks, music, videos, software or anything else digital.',
            image: '/admin/images/dashboard/add_digital_product.svg',
            link: '/admin/add-product/digital-product'
        },
        {
            title: "Physical Product",
            productType: "Physical",
            description: 'Add t-shirts, books, art, merchandise or any other product that requires shipping.',
            toolTip: 'Add t-shirts, books, art, merchandise or any other product that requires shipping.',
            image: '/admin/images/dashboard/add_physical_product.svg',
            link: '/admin/add-product/physical-product'
        }
        // {
        //     title: "Subscription",
        //     productType: "Subscription",
        //     description: 'Launch courses, workshops or sell yearly software licences with recurring billing.',
        //     image: '/images/dashboard/add_subscription.svg',
        //     link: '/add-product/subscription'
        // },
        // {
        //     title: "Freebie",
        //     productType: "Freebie",
        //     description: 'Add a product teaser or basic version of your premium product to give away for free.',
        //     image: '/images/dashboard/add_physical_product.svg',
        //     link: '/add-product/freebie'
        // },

    ]

    return (
        <Layout>
            <div style={{ padding: '2rem' }}>
                <Typography variant="h5" fontWeight={700} component="h3">
                    Add New Product
                </Typography>

                {productTypes.map((productType) => (
                    <Link key={productType.link} href={productType.link}><a>
                        <Paper key={productType.title} sx={{ p: 3, my: 2 }} variant="outlined" square>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <Image
                                        src={productType.image}
                                        alt="Add Product"
                                        width="150"
                                        height="150"
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant="h6" sx={{ color: '#008060' }} fontWeight={700} component="h3">
                                        {productType.title} &nbsp;&nbsp;&nbsp;
                                        <Tooltip title={productType.toolTip} placement="top" arrow>
                                        <IconButton>
                                            <InfoIcon />
                                        </IconButton>
                                    </Tooltip>
                                    </Typography>
                            

                                    <Typography variant="h6" component="h3">
                                        {productType.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </a></Link>
                ))}
            </div>
        </Layout>
    );
}
