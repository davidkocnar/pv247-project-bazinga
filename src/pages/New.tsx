import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import { Button, Typography } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles({
  input: {
    display: 'none',
  },
});

const New: FC = () => {
  const classes = useStyles();

  return(
    <Grid container spacing={2} alignContent="center" alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h4">Vložit inzerát</Typography>
      </Grid>

      <Grid item xs={6} lg={6} >
        <input
          accept="image/*"
          className={classes.input}
          id="upload-photo"
          multiple
          type="file"
        />
        <label htmlFor="upload-photo">
          <Button variant="contained" color="secondary" startIcon={<CloudUploadIcon/>} component="span">
            Vybrat fotografie
          </Button>
        </label>
      </Grid>

      <Grid item xs={6} lg={6}>
        <TextField id="searchOfferInp" label="Co prodáváte? (max. 60 znaků)" variant="outlined" fullWidth/>
      </Grid>

      <Grid item xs={6} lg={6}>
        <TextField id="searchOfferInp" label="Detaily (max. 1 000 znaků)" variant="outlined" fullWidth/>
      </Grid>

      <Grid item xs={6} lg={6}>
        <TextField id="searchOfferInp" label="Cena" variant="outlined" fullWidth />
      </Grid>

      <Grid item xs={6} lg={6}>
        <TextField id="searchOfferInp" label="E-mail" variant="outlined" fullWidth />
      </Grid>
    </Grid>
  )
};

export default New;
