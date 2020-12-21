import { Grid, Typography } from '@material-ui/core';
import { FC } from 'react';

const BasicInfoRow: FC<{ title: string, content: string }> = ({ title, content }) => {

    const variant = "subtitle2";

    return (
        <>
            <Grid item xs={12} sm={4} md={3}>
                <Typography variant={variant} align="right">{title}</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
                <Typography variant={variant} align="left">{content}</Typography>
            </Grid>
        </>
    );
}

export default BasicInfoRow;