import React, { useContext, useEffect, useState } from "react";
import Layout from '../../layouts/Layout/Layout';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { AdminDataStore } from '../../utils/admin/AdminDataStore';
import SearchBar from "material-ui-search-bar";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
export default function Explore() {
    const { state, dispatch } = useContext(AdminDataStore);
    const { adminStoreInfo } = state;
    const router = useRouter();

    const [searchValue, setSearchValue] = useState('')
    useEffect(() => {
        if (!adminStoreInfo) {
            router.push('/admin/login');
        }
    }, [router,adminStoreInfo]);
    async function searchProduct() {

    }
    return (
        <Layout>
            <Typography variant='h4' fontWeight={700} align='center' component="p">Explore Products</Typography>
            <Typography variant='h6' fontWeight={700} align='center' component="p">Add Product in One Click</Typography>
            <Grid container alignItems="center"
                justifyContent="center" sx={{ mt: 4 }} spacing={2}>
                <Grid item lg={5} sm={10}>
                    <SearchBar
                        value={searchValue}
                        onChange={(newValue) => setSearchValue({ searchValue: newValue })}
                        onRequestSearch={() => searchProduct(searchValue)}
                    />
                </Grid>
            </Grid>

            {/* Place */}
            {/* <Typography variant='h6' component="p">Place</Typography> */}
            <Grid container alignItems="center"
                justifyContent="center" sx={{ mt: 4 }} spacing={2}>
                <Grid item lg={2} xs={4}>
                    <Link href={'/admin/search?location=delhi'} >
                        <a>
                            <Image src='/admin/images/dashboard/product-explore/delhi_ncr.svg' alt='Delhi' width={500} height={500} />
                            <Typography variant='h6' align='center' component="p">Delhi</Typography>
                        </a>
                    </Link>
                </Grid>
                <Grid item lg={2} xs={4}>
                    <Link href={'/admin/search?location=mumbai'} >
                        <a>
                            <Image src='/admin/images/dashboard/product-explore/mumbai.svg' alt='Delhi' width={500} height={500} />
                            <Typography variant='h6' align='center' component="p">Mumbai</Typography>
                        </a>
                    </Link>
                </Grid>
                <Grid item lg={2} xs={4}>
                    <Link href={'/admin/search?location=hyderabad'} >
                        <a>
                            <Image src='/admin/images/dashboard/product-explore/hyderabad.svg' alt='Delhi' width={500} height={500} />
                            <Typography variant='h6' align='center' component="p">Hyderabad</Typography>
                        </a>
                    </Link>
                </Grid>
                <Grid item lg={2} xs={4}>
                    <Link href={'/admin/search?location=kolkata'} >
                        <a>
                            <Image src='/admin/images/dashboard/product-explore/kolkata.svg' alt='Delhi' width={500} height={500} />
                            <Typography variant='h6' align='center' component="p">Kolkata</Typography>
                        </a>
                    </Link>
                </Grid>
                <Grid item lg={2} xs={4}>
                    <Link href={'/admin/search?location=banglore'} >
                        <a>
                            <Image src='/admin/images/dashboard/product-explore/bangalore.svg' alt='Delhi' width={500} height={500} />
                            <Typography variant='h6' align='center' component="p">Bangalore</Typography>
                        </a>
                    </Link>
                </Grid>
                <Grid item lg={2} xs={4}>
                    <Link href={'/admin/search?location=chennai'} >
                        <a>
                            <Image src='/admin/images/dashboard/product-explore/chennai.svg' alt='chennai' width={500} height={500} />
                            <Typography variant='h6' align='center' component="p">Chennai</Typography>
                        </a>
                    </Link>
                </Grid>
            </Grid>

            {/* Trending */}
            <Typography align='center' variant='h6'sx={{ mt: 4 }} component="p">Trending Categories</Typography>
            <Grid container alignItems="center"
                justifyContent="center" sx={{ mt: 4 }} spacing={2}>
                <Grid item xs={2}>
                    <Link href={'/admin/search?category=sensors'} >
                        <a>
                            <Image className='gol-image' src='/admin/images/dashboard/product-explore/trending-categories/4.png' alt='Sensors' width={500} height={500} />
                            <Typography  align='center' component="p">Sensors</Typography>
                        </a>
                    </Link>
                </Grid>
                <Grid item xs={2}>
                    <Link href={'/admin/search?category=printing'} >
                        <a>
                            <Image className='gol-image' src='/admin/images/dashboard/product-explore/trending-categories/2.png' alt='>Printing Machines' width={500} height={500} />
                            <Typography  align='center' component="p">Printing Machines</Typography>
                        </a>
                    </Link>
                </Grid>
                <Grid item xs={2}>
                    <Link href={'/admin/search?category=sewing-knitting'} >
                        <a>
                            <Image className='gol-image' src='/admin/images/dashboard/product-explore/trending-categories/1.png' alt='Sewing Knitting Machines' width={500} height={500} />
                            <Typography  align='center' component="p">Sewing Knitting Machines</Typography>
                        </a>
                    </Link>
                </Grid>
                <Grid item xs={2}>
                    <Link href={'/admin/search?category=food-processing'} >
                        <a>
                            <Image className='gol-image' src='/admin/images/dashboard/product-explore/trending-categories/3.png' alt='Food Processing Machinery' width={500} height={500} />
                            <Typography align='center' component="p">Food Processing Machinery</Typography>
                        </a>
                    </Link>
                </Grid>
                <Grid item xs={2}>
                    <Link href={'/admin/search?category=water-purification'} >
                        <a>
                            <Image className='gol-image' src='/admin/images/dashboard/product-explore/trending-categories/6.png' alt='water-purification' width={500} height={500} />
                            <Typography align='center' component="p">Water Purification</Typography>
                        </a>
                    </Link>
                </Grid>
                <Grid item xs={2}>
                    <Link href={'/admin/search?category=automation'} >
                        <a>
                            <Image className='gol-image' src='/admin/images/dashboard/product-explore/trending-categories/5.png' alt='automation' width={500} height={500} />
                            <Typography  align='center' component="p">Automation</Typography>
                        </a>
                    </Link>
                </Grid>
        
       
            </Grid>
        </Layout>

    )
}
