import React, { useContext } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AdminDataStore } from '../../../../utils/admin/AdminDataStore';
import useStyles from '../../../../utils/admin/styles';
export default function Checkout() {
    const classes = useStyles();
    const { state, dispatch } = useContext(AdminDataStore);
    const { adminStoreInfo } = state;
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <>
         <Box  sx={{width:'100%',px:4}} >
            <Typography className={classes.coloredHeading} component="h5">Checkout</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant='p' fontWeight={700} component="p">Customer accounts</Typography>
            <Typography variant='p' component="p">Choose if you want to prompt your customer to create an account when they check out.</Typography>
            <Paper sx={{ p: 3 }} variant="outlined" square>
                <FormControl component="fieldset">
                    <RadioGroup
                        defaultValue="account_disabled"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="account_disabled" control={<Radio />} label="Accounts are disabled" />
                        <FormControlLabel value="account_optional" control={<Radio />} label="Accounts are optional" />
                        <FormControlLabel value="account_required" control={<Radio />} label="Accounts are required" />
                    </RadioGroup>
                </FormControl>

            </Paper>

            <Typography variant='p' fontWeight={700} component="p">Form options</Typography>
            <Typography variant='p' fontWeight={700} component="p">Choose whether your checkout form requires extra information from your customer.</Typography>
            <Paper sx={{ p: 3 }} variant="outlined" square>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Full Name</FormLabel>
                    <RadioGroup
                        defaultValue="account_disabled"
                        name="radio-buttons-group">
                        <FormControlLabel value="account_disabled" control={<Radio />} label="Require last name only" />
                        <FormControlLabel value="account_optional" control={<Radio />} label="Require first and last name" />
                    </RadioGroup>
                </FormControl>
            </Paper>
            </Box>
        </>
    );
}
