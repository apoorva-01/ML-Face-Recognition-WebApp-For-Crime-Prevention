import axios from 'axios'

export type GetAllProductPathsResult = {
  products: Array<{ path: string }>
}

export default async function getAllProductPathsOperation() {
  async function getAllProductPaths(): Promise<GetAllProductPathsResult> {
    const {data} = await axios.post('/api/products', {_id:process.env.STORE_OBJECT_ID});

    return Promise.resolve({
      products: data.physicalProducts.map(({path}:{path:any}) => ({ path })),
    })
  }

  return getAllProductPaths
}
