import React, {FC} from "react";
import {Box, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import imageAbout1 from "../images/about1.jpg"
import imageAbout2 from "../images/about2.jpg"

const About: FC = () => {

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={10} lg={8}>
        <Box mt="3rem">
          <Typography variant={"h3"}>Bazinga</Typography>
          <Typography variant={"body1"} style={{ marginTop: "1rem" }}>
            Projekt Bazinga je skvělý inzertní portál pro vše, co máte doma navíc. Nebo zdroj nevšedních předmětů s
            příběhem. Přidejte nabídku, vyberte kategorii, lokaci, kontakt a zbavte se věcí, které tak nemusíte vyhodit.
            Jinde třeba ještě dobře poslouží.
          </Typography>
          <Grid container spacing={2} justify="center" style={{marginTop: "3rem"}}>
            <Grid item md={6}>
              <img src={imageAbout1} alt="světýlka" style={{width: "100%"}}/>
            </Grid>
            <Grid item md={6}>
              <img src={imageAbout2} alt="kokos" style={{width: "100%"}}/>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default About;