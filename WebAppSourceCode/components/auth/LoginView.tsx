import { FC, useEffect, useState, useCallback, useContext } from 'react'
import { Logo, Button, Input } from '@components/ui'
import { useUI } from '@components/ui/context'
import axios from 'axios';
import { DataStore } from '../../utils/DataStore';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import {
  TextField,
} from '@material-ui/core';
interface Props { }

const LoginView: FC<Props> = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { state, dispatch } = useContext(DataStore);
  const { customerInfo } = state;

  // Form State
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [disabled, setDisabled] = useState(false)
  const { setModalView, closeModal } = useUI()




  const submitHandler = async (mainData:any) => {
    closeSnackbar();
    try {
        const { data } = await axios.post('/api/customers/login', {
            email:mainData.email, 
            password:mainData.password
        });
        dispatch({ type: 'CUSTOMER_LOGIN', payload: data });
        Cookies.set('customerInfo', JSON.stringify(data));
        closeModal()
    } catch (err:any) {
        enqueueSnackbar(  err.response.data ? err.response.data.message : err.message, { variant: 'error' }
        );
    }
};



  return (
<>
    <form onSubmit={handleSubmit(submitHandler)} className="w-80 flex flex-col justify-between p-3">
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-3">
        {message && (
          <div className="text-red border border-red p-3">
            {message}. Did you {` `}
            <a
              className="text-accent-9 inline font-bold hover:underline cursor-pointer"
              onClick={() => setModalView('FORGOT_VIEW')}
            >
              forgot your password?
            </a>
          </div>
        )}

        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          }}
          render={({ field }) => (
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: 'email' }}
              error={Boolean(errors.email)}
              helperText={
                errors.email
                  ? errors.email.type === 'pattern'
                    ? 'Email is not valid'
                    : 'Email is required'
                  : ''
              }
              {...field}
            ></TextField>
          )}
        ></Controller>

        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            minLength: 6,
          }}
          render={({ field }) => (
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              inputProps={{ type: 'password' }}
              error={Boolean(errors.password)}
              helperText={
                errors.password
                  ? errors.password.type === 'minLength'
                    ? 'Password length is more than 5'
                    : 'Password is required'
                  : ''
              }
              {...field}
            ></TextField>
          )}
        ></Controller>

  

        <Button
          variant="slim"
          type="submit"
          loading={loading}
          disabled={disabled}
        >
          Log In
        </Button>
        <div className="pt-1 text-center text-sm">
          <span className="text-accent-7">Don't have an account?</span>
          {` `}
          <a
            className="text-accent-9 font-bold hover:underline cursor-pointer"
            onClick={() => setModalView('SIGNUP_VIEW')}
          >
            Sign Up
          </a>
        </div>
      </div>
    </form>

    </>
  )
}

export default LoginView
