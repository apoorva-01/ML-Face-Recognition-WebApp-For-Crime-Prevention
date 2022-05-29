import { MutationHook } from '@commerce/utils/types'
import useLogin, { UseLogin } from '@commerce/auth/use-login'
import { CommerceError } from '@commerce/utils/errors'
import axios from 'axios'
export default useLogin as UseLogin<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({input: { email, password }}) {
    if (!(email && password)) {
      throw new CommerceError({
        message: 'An email and password are required to login',
      })
    }

    const {data} = await axios.post('/api/customer/login', {
      email, password
    });
    return data
  },
  useHook: () => () => {
    return async function () {}
  },
}
