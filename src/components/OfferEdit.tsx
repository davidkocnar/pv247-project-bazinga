import { Button, CircularProgress, Grid, MenuItem, TextField } from '@material-ui/core';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { categoriesCollection, Category, Offer, offersCollection } from '../firebase/firestore';
import { OfferFormData } from '../pages/New';

const OfferEdit: FC<{ offer: Offer, closeUpdate: (newOffer: Offer) => void, itemId: string }> = ({ offer, closeUpdate, itemId }) => {
    const { control, handleSubmit, errors: fieldErrors } = useForm<OfferFormData>();
    const [availableCategories, setAvailableCategories] = useState<Category[]>([])
    const [currentCategory, setCurrentCategory] = useState<Category>();

    useEffect(() => {
        categoriesCollection.get().then(querySnapshot => {
            setAvailableCategories(querySnapshot.docs.map(doc => doc.data()))
        })
        categoriesCollection.doc(offer.categoryRef?.id).get().then(querySnapshot => {
            setCurrentCategory(querySnapshot.data());
        })
    }, [offer.categoryRef?.id])

    const onSubmit = (data: OfferFormData) => {
        console.log(data.category);
        categoriesCollection.where("name", "==", data.category).get().then(querySnapshot => {
            const newOffer = {
                ...offer,
                title: data.title,
                price: data.price,
                description: data.description,
                categoryRef: querySnapshot.docs.map(doc => doc.ref)[0]
            }
            console.log(querySnapshot.docs.map(doc => doc.ref)[0])
            console.log(offer.categoryRef)
            offersCollection.doc(itemId).update(newOffer).then(() => closeUpdate(newOffer));
        });
    }

    return (
        <Grid item xs={10} md={5}>
            {currentCategory ? <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                <Grid container justify="center" spacing={2}>
                    <Grid item xs={12}>
                        <Controller
                            name="title"
                            as={<TextField label="Název" variant="outlined" fullWidth helperText={fieldErrors.title ? fieldErrors.title.message : null} error={fieldErrors.title !== undefined} />}
                            control={control}
                            defaultValue={offer.title}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="price"
                            as={<TextField label="Cena" variant="outlined" fullWidth helperText={fieldErrors.title ? fieldErrors.title.message : null} error={fieldErrors.title !== undefined} />}
                            control={control}
                            defaultValue={offer.price}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="category"
                            as={
                                <TextField label="Kategorie" variant="outlined" fullWidth select helperText={fieldErrors.category ? fieldErrors.category.message : null} error={fieldErrors.category !== undefined}>
                                    {availableCategories.map((category, i) => (
                                        <MenuItem key={i} value={category.name}>
                                            {category.name}
                                        </MenuItem>))}
                                </TextField>
                            }
                            control={control}
                            defaultValue={currentCategory.name}
                            rules={{
                                required: 'Vyberte kategorii prodávaného produktu'
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="description"
                            as={
                                <TextField label="Detaily" variant="outlined" fullWidth multiline rows={8} rowsMax={8} helperText={fieldErrors.description ? fieldErrors.description.message : null} error={fieldErrors.description !== undefined} />
                            }
                            control={control}
                            defaultValue={offer.description}
                            rules={{}}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Button color="default" fullWidth onClick={() => closeUpdate(offer)} size="large" variant="contained" style={{ marginBottom: "3rem" }}>
                            Zrušit
              </Button>
                    </Grid>
                    <Grid item xs={5}>
                        <Button color="primary" fullWidth type="submit" size="large" variant="contained" style={{ marginBottom: "3rem" }}>
                            Aktualizovat inzerát
              </Button>
                    </Grid>
                </Grid>
            </form> : <CircularProgress color="secondary" />}
        </Grid>
    );
}

export default OfferEdit;