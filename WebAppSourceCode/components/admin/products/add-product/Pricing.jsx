import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import CurrencySelect from './CurrencySelect'
import TextField from '@mui/material/TextField';
export default function Price({ price, setPrice}) {

  return (
    <>
      <Grid sx={{ my: 2 }} container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={3}>
          <CurrencySelect price={price} setPrice={setPrice} />
        </Grid>
        <Grid item xs={5}>
          <TextField type='number'
            value={price.value}
            onChange={e => setPrice({ ...price, value: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">{price.currencyCode} | </InputAdornment>
              ),
            }}
            label="Price" variant="outlined" />


        </Grid>
        <Grid item xs={4}>


          <TextField value={price.comparePrice}
            type='number'
            onChange={e => setPrice({ ...price, comparePrice: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">{price.currencyCode} | </InputAdornment>
              ),
            }}
            label="Compare at Price" variant="outlined" />

        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Cost Per Item</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              type='number'
              value={price.costPerItem}
              onChange={e => setPrice({ ...price, costPerItem: e.target.value })}
              startAdornment={<InputAdornment position="start">{price.currencyCode} | </InputAdornment>}
              label="Cost Per Item"
            />
          </FormControl>
          <Typography component="p" fontSize={13}>Customers won’t see this</Typography>
        </Grid>



        <Grid item xs={4}>
          <Typography component="p" fontSize={16} fontWeight="bold" >Margin</Typography>
          <Typography component="p" sx={{ mt: 1 }} fontSize={13}>{price.value &&price.value!=0? (
            <>{([(price.value - price.costPerItem) / price.value] * 100).toFixed(2)}
            </>
          ) : (<>0</>)}%</Typography>

        </Grid>
        <Grid item xs={4}>
          <Typography component="p" fontSize={16} fontWeight="bold" >Profit</Typography>
          <Typography component="p" sx={{ mt: 1 }} fontSize={13}>{(price.value - price.costPerItem).toFixed(2)}</Typography>

        </Grid>
      </Grid>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Charge tax on this product" />
    </>
  );
}
