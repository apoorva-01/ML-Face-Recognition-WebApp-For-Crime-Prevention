import { useRouter } from 'next/router'
import { Layout } from '@components/common'
import { ProductView } from '@components/product'
import db from "../../utils/db";
import PhysicalProduct from "../../models/PhysicalProduct";
import DigitalProduct from "../../models/DigitalProduct";


export default function Slug({product}) {
  const router = useRouter()

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    
    <ProductView product={product}  relatedProducts={[product]} />
  )
}





export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const physicalProduct = await PhysicalProduct.findOne({ slug }, '-reviews').lean();
  if (physicalProduct != null) {
    await db.disconnect();
    return {
      props: {
        product: db.convertDocToObj(physicalProduct),
      },
    };
  }
  else {
    const digitalProduct = await DigitalProduct.findOne({ slug }, '-reviews').lean();
    await db.disconnect();
    return {
      props: {
        product: db.convertDocToObj(digitalProduct),
      },
    };

  }

}


Slug.Layout = Layout
