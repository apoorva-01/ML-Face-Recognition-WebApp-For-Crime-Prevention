import React, {  useContext } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { AdminDataStore } from '../../../../utils/admin/AdminDataStore';
import CountrySelect from './CountrySelect'
export default function AddShippingRate({shipping}) {
  const [open, setOpen] = React.useState(false);
  const [country, setCountry] = React.useState(false);
  const { state, dispatch } = useContext(AdminDataStore);
  const { adminStoreInfo } = state;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();


  const handleClose = () => {
    setOpen(false);
  };



  const submitHandler = async ({ name,price }) => {
    closeSnackbar();
    try {
      const { data } = await axios.post('/api/admin/shipping/add-shpping-zone', {
        storeID:adminStoreInfo._id,
        name:name,
        price:price,
      });
      enqueueSnackbar("Updated Successfully", { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(err, { variant: 'error' }
      );
    }
  };





  return (
    <div>
      <Button variant="outlined" onClick={() => setOpen(true)}>Add Zone</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Create Shipping Zone</DialogTitle>
        <form onSubmit={handleSubmit(submitHandler)} >
          <DialogContent dividers={true}>
            <Controller
              name="name"
              control={control}
              defaultValue=''
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  sx={{ my: 2 }}
                  fullWidth
                  id="name"
                  label="Rate Name"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.name)}
                  helperText={
                    errors ?
                      'Rate Name is Required' : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>

            <Controller
              name="price"
              control={control}
              defaultValue=''
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  sx={{ my: 2 }}
                  fullWidth
                  id="price"
                  label="Price"
                  inputProps={{ type: 'number' }}
                  error={Boolean(errors.price)}
                  helperText={
                    errors ?
                      'Price is Required' : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>



          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit' onClick={handleClose}>Add</Button>

          </DialogActions>
        </form>
      </Dialog>
    </div >
  );
}
