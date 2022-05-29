import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { v4 as uuidv4 } from 'uuid';

function AddFeatures({ featureFields, setFeatureFields }) {

  const handleChangeInput = (id, event) => {
    const newfeatureFields = featureFields.map(i => {
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })

    setFeatureFields(newfeatureFields);
  }

  const handleAddFields = () => {
    setFeatureFields([...featureFields, { id: uuidv4(), name: '', vame: '' }])
  }

  const handleRemoveFields = id => {
    const values = [...featureFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setFeatureFields(values);
  }


  return (
    <>
      {featureFields.map(featureField => (
        <div key={featureField.id}>


          <FormControl sx={{ my: 2 }} fullWidth>
            <InputLabel id="demo-simple-select-label">Feature Name</InputLabel>
            <Select
              name="name"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={featureField.name}
              onChange={event => handleChangeInput(featureField.id, event)}
              label="Add Feature"
            >
              <MenuItem value={'color'}>Color</MenuItem>
              <MenuItem value={'size'}>Size</MenuItem>
              <MenuItem value={'material'}>Material</MenuItem>
              <MenuItem value={'style'}>Style</MenuItem>
            </Select>
          </FormControl>


          <TextField
            fullWidth
            name="value"
            label="Feature Value"
            variant="outlined"
            value={featureField.lastName}
            onChange={event => handleChangeInput(featureField.id, event)}
          />
          <IconButton disabled={featureFields.length === 1} onClick={() => handleRemoveFields(featureField.id)}>
            <DeleteOutlineIcon />
          </IconButton>
          <IconButton
            onClick={handleAddFields}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
      ))}
    </>
  );
}


export default AddFeatures;
