import { Fetcher } from '@commerce/utils/types'
import axios from 'axios'
export const fetcher: Fetcher = async () => {
  const {data} = await axios.post('/api/products', {_id:process.env.STORE_OBJECT_ID});
  return data.physicalProducts
}
