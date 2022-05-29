import React, { useContext, useState } from "react";
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
export default function AddShippingZone(props) {
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


  const [shippingZones, setShippingZones] = useState(props.shipping[0]?.shippingZones?props.shipping[0]?.shippingZones:[]);

console.log(shippingZones);

  const submitHandler = async ({ zoneName }) => {
  const data=  setShippingZones([...shippingZones, { zoneName: zoneName, countries: [country] }])
    closeSnackbar();
    try {
      await axios.post('/api/admin/shipping/add-shpping-zone', {
        storeID: adminStoreInfo._id,
        shippingZones: shippingZones
      });
      enqueueSnackbar("Updated Successfully", { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(err, { variant: 'error' }
      );
    }
  };





  return (
    <div>
      <Button onClick={() => setOpen(true)}>Add Zone</Button>
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
              name="zoneName"
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
                  id="zoneName"
                  label="Zone Name"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.zoneName)}
                  helperText={
                    errors ?
                      'Zone Name is Required' : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>


            <CountrySelect country={country} setCountry={setCountry} />

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
