import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

export default function ProductType({productType, setProductType,}) {
    return (
        <FormControl sx={{ mt: 3 }} component="fieldset">
            <Typography component="p">Product Type</Typography>
            <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
            <Tooltip title="E-books,Web Elements,Software Programs,Apps,etc." placement="bottom"arrow>
                <FormControlLabel checked={productType === 'digital'}
                    onChange={(e) => setProductType(e.target.value)} value="digital" control={<Radio />} label="Digital" />
              </Tooltip>
              <Tooltip title="Electronics,Clothes,Goods, etc" placement="bottom"arrow>
                <FormControlLabel checked={productType === 'physical'}
                    onChange={(e) => setProductType(e.target.value)} value="physical" control={<Radio />} label="Physical" />
            </Tooltip>
            </RadioGroup>
        </FormControl>
    );
}
