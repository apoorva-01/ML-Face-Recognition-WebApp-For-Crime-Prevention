import { FC, useEffect, useState, useCallback, useContext } from 'react'
import { Info } from '@components/icons'
import { useUI } from '@components/ui/context'
import { Logo, Button, Input } from '@components/ui'
import axios from 'axios';
import { DataStore } from '../../utils/DataStore';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import {
  TextField,
  Link,
} from '@material-ui/core';

interface Props { }

const SignUpView: FC<Props> = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { state, dispatch } = useContext(DataStore);
  const { customerInfo } = state;


  async function submitHandler(mainData:any) {
    closeSnackbar();
    if (mainData.password !== mainData.confirmPassword) {
      enqueueSnackbar("Passwords don't match", { variant: 'error' });
      return;
    }
else{
  try {
    const { data } = await axios.post('/api/customers/register', {
      name:mainData.name,
      email:mainData.email,
      password:mainData.password,
    });
    dispatch({ type: 'CUSTOMER_LOGIN', payload: data });
    Cookies.set('customerInfo', JSON.stringify(data));
    closeModal()
  } catch (err:any) {
    enqueueSnackbar(err,{ variant: 'error' });
  }
}
  }

  // Form State
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [disabled, setDisabled] = useState(false)
  const { setModalView, closeModal } = useUI()



  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)}
        className="w-80 flex flex-col justify-between p-3"
      >
        <div className="flex justify-center pb-12 ">
          <Logo width="64px" height="64px" />
        </div>
        <div className="flex flex-col space-y-4">
          {message && (
            <div className="text-red border border-red p-3">{message}</div>
          )}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined" fullWidth style={{ marginTop: '1.3rem' }}

                    id="name"
                    label="Name"
                    inputProps={{ type: 'text' }}
                    error={Boolean(errors.name)}
                    helperText={
                      errors.name
                        ? errors.name.type === 'minLength'
                          ? 'Name length is more than 1'
                          : 'Name is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>

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
                    variant="outlined" fullWidth style={{ marginTop: '1.3rem' }}
                    id="email"
                    label="Email"
                    inputProps={{ type: 'email' }}
                    error={Boolean(errors.email)}
                    helperText={
                      errors.email
                        ? errors.email.type === 'minLength'
                          ? 'Name length is more than 1'
                          : 'Name is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </Grid>
            <Grid item xs={6}>


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
                    variant="outlined" fullWidth style={{ marginTop: '1.3rem' }}
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

              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 6,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined" fullWidth style={{ marginTop: '1.3rem' }}
                    id="confirmPassword"
                    label="Confirm"
                    inputProps={{ type: 'password' }}
                    error={Boolean(errors.confirmPassword)}
                    helperText={
                      errors.confirmPassword
                        ? errors.confirmPassword.type === 'minLength'
                          ? 'Confirm Password length is more than 5'
                          : 'Confirm  Password is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </Grid>
          </Grid>






          <span className="text-accent-8">
            <span className="inline-block align-middle ">
              <Info width="15" height="15" />
            </span>{' '}
            <span className="leading-6 text-sm">
              <strong>Info</strong>: Passwords must be longer than 5 chars and
              include numbers.{' '}
            </span>
          </span>
          <div className="pt-2 w-full flex flex-col">
            <Button
              variant="slim"
              type="submit"
              loading={loading}
              disabled={disabled}
            >
              Sign Up
            </Button>
          </div>

          <span className="pt-1 text-center text-sm">
            <span className="text-accent-7">Do you have an account?&nbsp;</span>
            <a
              className="text-accent-9 font-bold hover:underline cursor-pointer"
              onClick={() => setModalView('LOGIN_VIEW')}
            >
              Log In
            </a>
          </span>
        </div>
      </form>

    </>
  )
}

export default SignUpView
