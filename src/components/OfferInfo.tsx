import { Grid, Typography } from '@material-ui/core';
import { FC } from 'react';
import { Offer } from '../firebase/firestore';

const numberWithSpaces = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const OfferInfo: FC<{ offer: Offer }> = ({ offer }) => {
    return (
        <Grid item xs={10} md={5} >
            <Typography variant="h5" align="left">Cena: {numberWithSpaces(parseFloat(offer.price || '0'))} Kč</Typography>
            <Typography variant="h6" align="left" style={{ marginTop: "1rem" }}>Vloženo: {offer.created.toDate().toLocaleDateString('cs')}</Typography>
            <Typography variant="subtitle2" align="left" style={{ marginTop: "3rem" }}>{offer.description}</Typography>
        </Grid>
    );
}

export default OfferInfo;