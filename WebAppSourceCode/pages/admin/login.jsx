import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { AdminDataStore } from '../../utils/admin/AdminDataStore'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ChakraProvider } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Controller, useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import ButtonSaveProgress from '../../components/admin/ui/ButtonSaveProgress'
const theme = createTheme()

export default function SignInSide() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const router = useRouter()
  const { redirect } = router.query // login?redirect=/shipping
  const { state, dispatch } = useContext(AdminDataStore)
  const { adminStoreInfo } = state
  // useEffect(() => {
  //   if (adminStoreInfo) {
  //     router.push('/admin');
  //   }
  // }, []);

  const submitHandler = async ({ email, password }) => {
    closeSnackbar()
    try {
      setButtonProgressLoading(true)
      const { data } = await axios.post('/api/admin/users/login', {
        email,
        password,
      })
      dispatch({ type: 'USER_LOGIN', payload: data })
      Cookies.set('adminStoreInfo', JSON.stringify(data))
      setButtonProgressLoading(false)
      router.push('/admin')
    } catch (err) {
      enqueueSnackbar(
        err.response.data ? err.response.data.message : err.message,
        { variant: 'error' }
      )
      setButtonProgressLoading(false)
    }
  }
  const [buttonProgressLoading, setButtonProgressLoading] =
    React.useState(false)

  return (
    <Grid container component="main">
      <Grid item xs={12} lg={7}>
        <video muted={true} autoPlay={true}>
          <source src="/admin/sign-in.mp4" loop type="video/mp4" />
        </video>
      </Grid>
      <Grid item xs={12} lg={5}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" sx={{ fontWeight: 700 }} variant="h4">
              Login
            </Typography>
            <Box sx={{ mt: 1 }}>
              {/* Email */}
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
                    sx={{ my: 4 }}
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
                    sx={{ mb: 4 }}
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

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />

              <ChakraProvider>
                <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                  <ButtonSaveProgress
                    text="Log In"
                    size="md"
                    buttonProgressLoading={buttonProgressLoading}
                    setButtonProgressLoading={setButtonProgressLoading}
                  />
                </div>
              </ChakraProvider>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                      Forgot password?
                    </Link> */}
                </Grid>
                <Grid item>
                  <Link href="/admin/register" variant="body2">
                    <a>{"Don't have an account? Sign Up"}</a>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </form>
      </Grid>
    </Grid>
  )
}
