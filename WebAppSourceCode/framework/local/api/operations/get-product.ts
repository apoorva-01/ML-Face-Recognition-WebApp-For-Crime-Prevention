import type { LocalConfig } from '../index'
import { Product } from '@commerce/types/product'
import { GetProductOperation } from '@commerce/types/product'
import axios from 'axios'
import type { OperationContext } from '@commerce/api/operations'

export default function getProductOperation({
  commerce,
}: OperationContext<any>) {
  async function getProduct<T extends GetProductOperation>({
    query = '',
    variables,
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<LocalConfig>
    preview?: boolean
  } = {}): Promise<Product | {} | any> {

    const {data} = await axios.post('/api/products/id', {slug:variables!.slug})
    return {
      product: data.physicalProducts
    }
  }

  return getProduct
}
