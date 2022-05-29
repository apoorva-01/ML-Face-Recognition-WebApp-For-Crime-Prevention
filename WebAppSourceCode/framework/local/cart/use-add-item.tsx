import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useAddItem, { UseAddItem } from '@commerce/cart/use-add-item'
import type { AddItemHook } from '@commerce/types/cart'
import useCart from './use-cart'
import axios from 'axios'

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<AddItemHook> = {
  fetchOptions: {
    url: '/api/cart/add-item',
    method: 'POST',
  },
  async fetcher({ input: item, options, fetch }) {
    console.log('use-add')
    if (
      item.quantity &&
      (!Number.isInteger(item.quantity) || item.quantity! < 1)
    ) {
      throw new CommerceError({
        message: 'The item quantity has to be a valid integer greater than 0',
      })
    }

    const data = await axios.post('/api/cart/add-item', {
      item: item
    });

    console.log(data.data)
    console.log(data.data.lineItems)
    // console.log(options)
    // console.log(item)
    // const data = await fetch({
    //   url: '/api/cart/add-item',
    //   method: 'POST',
    //   body: JSON.stringify({ item }),
    // })

    return data.data
  },
  useHook:
    ({ fetch }) =>
      () => {
        const { mutate } = useCart()
        return useCallback(
          async function addItem(input) {
            const data = await fetch({ input })
            await mutate(data, false)
            return data
          },
          [fetch, mutate]
        )
      },
}
