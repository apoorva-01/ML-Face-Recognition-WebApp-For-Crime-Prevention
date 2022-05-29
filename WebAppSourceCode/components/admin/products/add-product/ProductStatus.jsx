import React from 'react';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
export default function ProductStatus({ status, setStatus }) {

  return (
      <FormControl fullWidth>
        <FormLabel component="legend">Product Status</FormLabel>
        <RadioGroup
          row
          name="controlled-radio-buttons-group"
          value={status}
          label="Product Status"
          onChange={(e) => setStatus(e.target.value)}
        >
          <FormControlLabel value={true} control={<Radio />} label="Active" />
          <FormControlLabel value={false} control={<Radio />} label="Draft" />
        </RadioGroup>
      </FormControl>
  );
}
