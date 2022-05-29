import React, { useState, useContext, useEffect } from "react";
import Layout from '../../layouts/Layout/Layout';
import GoogleSearchMockup from '../../components/admin/seo/GoogleSearchMockup'
import { AdminDataStore } from '../../utils/admin/AdminDataStore';
import styles from "../../styles/admin/device-mockup.module.css";
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import Grid from "@mui/material/Grid";
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import ButtonSaveProgress from '../../components/admin/ui/ButtonSaveProgress'
export default function SEO() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { state, dispatch } = useContext(AdminDataStore);
  const { adminStoreInfo } = state;
  useEffect(() => {
    if (!adminStoreInfo) {
        router.push('/admin/login');
    }
}, [router,adminStoreInfo]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();



  const submitHandler = async ({ title, metatitle, metadescription }) => {
    setButtonProgressLoading(true);
    closeSnackbar();
    try {
      const { data } = await axios.post('/api/admin/store/seo', {
        title,
        metatitle,
        metadescription
      });
      await dispatch({ type: 'STORE_SEO', payload: { title: title, metatitle: metatitle, metadescription: metadescription } });
      setButtonProgressLoading(false);
      enqueueSnackbar("Updated Successfully", { variant: 'success' });

    } catch (err) {
      enqueueSnackbar(err,
        { variant: 'error' }
      );
      setButtonProgressLoading(false);
    }
  };

  const [buttonProgressLoading, setButtonProgressLoading] = React.useState(false);
  return (
    <Layout>

      <Grid container justifyContent="center" >
        <Grid item sx={{ p: 2 }} xs={12} lg={6}>
          {adminStoreInfo ? (
            <>

              <Paper style={{ width: '100%' }} sx={{ p: 3 }} variant="outlined"  >
                <Typography
                  variant="h5"
                  component="p"
                  textAlign='center'
                  fontWeight={500}
                >
                  Optemize Your Store
                </Typography>
                <Stack spacing={2}>
                  <form onSubmit={handleSubmit(submitHandler)} >
                    <Controller
                      name="title"
                      control={control}
                      defaultValue={adminStoreInfo.title}
                      rules={{
                        required: false,
                        minLength: 4,
                      }}
                      render={({ field }) => (
                        <TextField
                          variant="outlined"
                          sx={{ my: 2 }}
                          fullWidth
                          id="title"
                          multiline
                          row={6}
                          label="Title"
                          inputProps={{ type: 'Title' }}
                          error={Boolean(errors.title)}
                          helperText={
                            errors.name
                              ? errors.name.type === 'minLength'
                                ? 'Meta Title length is more than 1'
                                : ''
                              : ''
                          }
                          {...field}
                        ></TextField>
                      )}
                    ></Controller>


                    <Controller
                      name="metatitle"
                      control={control}
                      defaultValue={adminStoreInfo.metatitle}
                      rules={{
                        required: false,
                        minLength: 4,
                      }}
                      render={({ field }) => (
                        <TextField
                          variant="outlined"
                          fullWidth
                          sx={{ my: 2 }}
                          multiline
                          row={6}
                          id="metatitle"
                          label="Meta Title"
                          inputProps={{ type: 'Meta Title' }}
                          error={Boolean(errors.metatitle)}
                          helperText={
                            errors.name
                              ? errors.name.type === 'minLength'
                                ? 'Meta Title length is more than 1'
                                : ''
                              : ''
                          }
                          {...field}
                        ></TextField>
                      )}
                    ></Controller>
                    <Controller
                      name="metadescription"
                      control={control}
                      defaultValue={adminStoreInfo.metadescription}
                      rules={{
                        required: false,
                        minLength: 4,
                      }}
                      render={({ field }) => (
                        <TextField
                          variant="outlined"
                          fullWidth
                          sx={{ my: 2 }}
                          multiline
                          row={10}
                          id="metadescription"
                          label="Meta Description"
                          inputProps={{ type: 'Meta Description' }}
                          error={Boolean(errors.metadescription)}
                          helperText={
                            errors.name
                              ? errors.name.type === 'minLength'
                                ? 'Meta Description length is more than 1'
                                : ''
                              : ''
                          }
                          {...field}
                        ></TextField>
                      )}
                    ></Controller>
                    <ButtonSaveProgress text='Get Visible On Google' size='md' buttonProgressLoading={buttonProgressLoading} setButtonProgressLoading={setButtonProgressLoading} />
                  </form>
                </Stack>
              </Paper>
            </>
          ) : (<></>)}
        </Grid>
        <Grid item s={12} lg={6} md={12}>
          <Container >
            <section
              className={styles["phone-container"]}
              style={{
                marginTop: "8rem"
              }}
            >
              <div className={styles["preview"]}>
                <div
                  className={styles["preview-wrap"]}
                  style={{
                    transform: `scale(0.655601) translateX(-50%) translateY(-50%)
       translate3d(0px, 0px, 0px)`,
                  }}
                >
                  <div
                    className={styles["preview-inner"]}
                  >
                    <div className={styles["preview-area"]}>
                      <div height="100%" width="100%">
                        <GoogleSearchMockup />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </Container>
        </Grid>
      </Grid>

    </Layout>

  )
}
