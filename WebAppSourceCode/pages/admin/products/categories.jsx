import React, { useContext, useState, useEffect } from 'react';
import db from "../../../utils/db";
import Store from "../../../models/Store";
import { Text } from '@components/ui'
import Layout from '../../../layouts/Layout/Layout';
import { AdminDataStore } from '../../../utils/admin/AdminDataStore';
import ButtonSaveProgress from '../../../components/admin/ui/ButtonSaveProgress'
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Fab from '@mui/material/Fab';
export default function Categories({ store}) {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { state, dispatch } = useContext(AdminDataStore);
    const { adminStoreInfo } = state;
    const [featureFields, setFeatureFields] = useState(store.categories);
    useEffect(() => {
        if (!adminStoreInfo) {
            router.push('/admin/login');
        }
    }, [adminStoreInfo]);

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
        setFeatureFields([...featureFields, { id: uuidv4(), categoryName: '', img: '' }])
    }

    const handleRemoveFields = id => {
        const values = [...featureFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setFeatureFields(values);
    }



    const submitHandler = async ({ }) => {
        setButtonProgressLoading(true);
        closeSnackbar();
        try {
            await axios.post('/api/admin/store/add-categories', {
                categories: featureFields
            });
            await dispatch({ type: 'UPDATE_CATEGORY', payload: featureFields });
            enqueueSnackbar('Successfully Updated', { variant: 'success' })
            setButtonProgressLoading(false);
        } catch (err) {
            enqueueSnackbar(err, { variant: 'error' }
            );
            setButtonProgressLoading(false);
        }
    };
    const [buttonProgressLoading, setButtonProgressLoading] = React.useState(false);


    return (
        <Layout>
               <Text variant="pageHeading">Categories</Text>
            <form onSubmit={handleSubmit(submitHandler)} >
                {featureFields.map(featureField => (
                    <div key={featureField.id}>
                        <Stack sx={{ my: 2 }} direction="row" spacing={2}>
                            <TextField
                                fullWidth
                                required
                                name="categoryName"
                                label="Add Feature"
                                variant="outlined"
                                value={featureField.categoryName}
                                onChange={event => handleChangeInput(featureField.id, event)}
                            />

                            <TextField
                                fullWidth
                                required
                                name="img"
                                label="Image Source"
                                variant="outlined"
                                value={featureField.img}
                                onChange={event => handleChangeInput(featureField.id, event)}
                            />
                            <IconButton disabled={featureFields.length === 1} onClick={() => handleRemoveFields(featureField.id)}>
                                <DeleteOutlineIcon />
                            </IconButton>

                        </Stack>





                    </div>


                ))}
                <Fab onClick={handleAddFields} size="small" sx={{ mx: 3 }} color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
                <ButtonSaveProgress text='Update Categories' size='md' buttonProgressLoading={buttonProgressLoading} setButtonProgressLoading={setButtonProgressLoading} />
                {/* <Button type="submit" variant="outlined">Update</Button> */}
            </form>
        </Layout>
    );
}

export async function getServerSideProps() {
    await db.connect();
    const store = await Store.find({ _id: process.env.STORE_OBJECT_ID }).lean();
    await db.disconnect();

    return {
        props: {
            store: store.map(db.convertDocToObj)[0],
        },
    };
}
