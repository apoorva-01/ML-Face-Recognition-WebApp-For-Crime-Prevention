import { Layout } from '@components/common'
import { useContext, useEffect } from "react";
// import Cookies from 'js-cookie';
import Cookies from 'cookies';
import { DataStore } from "../utils/DataStore";
import { ProductCard } from '@components/product'
import { Marquee, Hero } from '@components/ui'
// import { Grid, Marquee, Hero } from '@components/ui'
import db from "../utils/db";
import Store from "../models/Store";
import PhysicalProduct from "../models/PhysicalProduct";
import DigitalProduct from "../models/DigitalProduct";
import Grid from '@mui/material/Grid';

export default function Home({ physicalProducts, store, digitalProducts }: { physicalProducts: any, store: any, digitalProducts: any }) {
  const { state, dispatch } = useContext(DataStore);


  useEffect(() => {
    dispatch({ type: 'STORE_SETUP', payload: store });
    // Cookies.set('storeInfo', JSON.stringify(store));
  }, [dispatch, store]);
  const { storeInfo } = state;
  return (
    <>
      <Grid  container spacing={1}>

        {physicalProducts.map((product: any, i: number) => (
          <Grid sx={{margin:2}} key={product._id} item md={2} xs={12} sm={6} >
            <ProductCard
              product={product}
              imgProps={{
                width: i === 0 ? 1080 : 540,
                height: i === 0 ? 1080 : 540,
              }} />
          </Grid>
        ))}

      </Grid>
      {/* <Grid variant="filled">
        {physicalProducts.map((product: any, i: number) => (
           <>
           <ProductCard
             key={product._id}
             product={product}
             imgProps={{
               width: i === 0 ? 1080 : 540,
               height: i === 0 ? 1080 : 540,
             }}/>
         </>
        ))}
      </Grid> */}
        <Hero
        headline={storeInfo?.storeDetails?.storeIndustry}
        description={`${storeInfo?.bio?.substring(0, 400)}  ${storeInfo?.bio?.length > 400 ? '....' : null}`}
      />
      <Marquee variant="secondary">
        {physicalProducts.map((product: any, i: number) => (
          <ProductCard key={product._id} product={product} variant="slim" />
        ))}
      </Marquee>
    
      {/* <Grid layout="B" variant="filled">
        {digitalProducts.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product._id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
            }}
          />
        ))}
      </Grid>
      <Marquee>
        {digitalProducts.slice(3).map((product: any, i: number) => (
          <ProductCard key={product._id} product={product} variant="slim" />
        ))}
      </Marquee> */}
      {/* <HomeAllProductsGrid
        newestProducts={products}
        categories={categories}
        brands={brands}
      /> */}
    </>
  )
}



export async function getServerSideProps({req, res}:any) {
  await db.connect();
  const physicalProducts = await PhysicalProduct.find({storeID:process.env.STORE_OBJECT_ID }).lean();
  const digitalProducts = await DigitalProduct.find({storeID:process.env.STORE_OBJECT_ID }).lean();
  const store = await Store.find({ _id: process.env.STORE_OBJECT_ID }).lean();
  await db.disconnect();
      // // Create a cookies instance
      const cookies = new Cookies(req, res)
      // Set a cookie
      cookies.set('storeInfo', JSON.stringify(store));
  return {
    props: {
      physicalProducts: physicalProducts.map(db.convertDocToObj),
      digitalProducts: digitalProducts.map(db.convertDocToObj),
      store: store.map(db.convertDocToObj)[0],
    },
  };
}



Home.Layout = Layout


