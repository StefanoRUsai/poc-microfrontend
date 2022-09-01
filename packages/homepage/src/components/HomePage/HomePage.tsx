import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Navigate, useNavigate } from 'react-router-dom';

const cards = [{name:'app1', path:'appone'},{name:'app2', path:'appone'},{name:'app3', path:'appone'},{name:'app4', path:'appone'},{name:'vue', path:'vue'}]
const theme = createTheme();


export default function Album() {
  let navigate = useNavigate();

const onClick = (path:string) => {
    return navigate(`/${path}`, { replace: true });

  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <main>
        {/* Hero unit */}

        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card, idx) => (
              <Grid item key={idx} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', width: "50%",  display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{ height: '100%', width: "100%"}}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardActions>
                    <Button size="small"   onClick={() => {
    onClick(card.path);
  }}>{card.name}</Button>
                    
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}