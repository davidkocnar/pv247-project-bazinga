import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import NtbImage from '../images/ntb1.jpg';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  margin: { marginBottom: theme.spacing(2), marginTop: theme.spacing(2) }
}));

const Detail: FC = () => {

  const numberWithSpaces = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  const classes = useStyles();

  // TODO fetch from DB
  const name = "Zpět na přehled"
  const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis varius nunc, a gravida neque. Proin nec magna feugiat, commodo augue eu, tristique purus. Aliquam in orci quis nunc eleifend dapibus. In aliquet felis tellus, at tincidunt ex congue ac. Fusce nisl leo, ullamcorper a arcu eget, eleifend dignissim nisi. Fusce molestie dignissim sodales. Nam euismod nisi magna, in sodales sapien lobortis a. Praesent rhoncus velit id nunc eleifend lacinia elementum ac neque."
  const price = 15000;
  const uploadTime = new Date();

  return (
    <>
      <Grid container justify="flex-start">
        <Link to="/">
          <Button startIcon={<ArrowBackIosIcon />}>{name}</Button>
        </Link>
      </Grid>
      <Grid className={classes.margin} container justify="center">
        <Grid xs={10}>
          <Typography variant="h4" align="left">Notebook Lenovo</Typography>
        </Grid>
        <Grid className={classes.margin} container xs={5} direction="column" alignItems="flex-start" justify="center">
          <img src={NtbImage} alt="NTB" width={350} />
          <BasicInfo />
          <Button className={classes.margin} color="secondary" variant="contained">Kontaktovat</Button>
        </Grid>
        <Grid container xs={5} direction="column" alignItems="flex-start">
          <Typography variant="h5">Cena: {numberWithSpaces(price)}</Typography>
          <Typography variant="h6">Vloženo: {uploadTime.toDateString()}</Typography>
          <Typography variant="subtitle2" align="left">{description}</Typography>
        </Grid>
      </Grid >
    </>
  );
}

const BasicInfo: FC = () => {

  const classes = useStyles();

  const titleWidth = 2;
  const contentWidth = 10;
  const variant = "subtitle2"


  const space = '\u00A0'
  const titles = [`Prodávající:${space}`, `e-mail:${space}`, `tel:${space}`, `místo:${space}`,];

  // TODO fetch from DB
  const contents = ["Pavel V.", "pavelv@gmail.com", "+420735555555", "Brno"]

  return (
    <Grid className={classes.margin} container xs={12} alignItems="flex-start">
      {titles.map((title, index) => (
        <>
          <Grid item xs={titleWidth}>
            <Typography variant={variant} align="right">{title}</Typography>
          </Grid>
          <Grid item xs={contentWidth}>
            <Typography variant={variant} align="left">{contents[index]}</Typography>
          </Grid>
        </>
      ))}
    </Grid>
  );
}

export default Detail;