import { useCallback } from 'react'
import useCustomer from '../customer/use-customer'
import { MutationHook } from '@commerce/utils/types'
import useSignup, { UseSignup } from '@commerce/auth/use-signup'
import { CommerceError } from '@commerce/utils/errors'
import axios from 'axios'
export default useSignup as UseSignup<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    url: '/api/customer/register',
    method: 'POST',
  },
  async fetcher({   input: { firstName, lastName, email, password },
    options,
    fetch,}) {
    const {data} = await axios.post('/api/customer/register', {
      firstName, lastName, email, password 
    });
    if (!(firstName && lastName && email && password)) {
      throw new CommerceError({
        message:
          'A first name, last name, email and password are required to signup',
      })
    }
    return data
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { revalidate } = useCustomer()

      return useCallback(
        async function signup(input) {
          const data = await fetch({ input })
          await revalidate()
          return data
        },
        [fetch, revalidate]
      )
    },
}
