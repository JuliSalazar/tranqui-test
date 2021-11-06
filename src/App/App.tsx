import { Container, CssBaseline, Paper, Typography, ButtonGroup, Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import {  BrowserRouter, Link } from "react-router-dom";


function App() {

  const [initialNames, setInitialNames] = React.useState<any[]>([]);

  useEffect(() => {
    const loadInitialData = async () => {
      const response = await fetch('/api');
      let json = await response.text();
      let array = JSON.parse(json);
      setInitialNames(array);
    };
    loadInitialData();
  }, []);

  const handleClick = () => {
    initialNames.forEach((prev: any[],i)=>{
      //dont forget to create type of 
      console.log()
    });
   /*  setInitialNames(prev.forEach(() => {

    })); */
    const postData = async () => {
    const response = await fetch(`/api/count`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(initialNames),
    })
  return await console.log(response);
  }
  postData();
}

  return (<>
  <BrowserRouter>
    <CssBaseline />
    <Box bgcolor="#eeeeee" minHeight="100vh" p={4}>
      <Container maxWidth="sm">
        <Paper>
          <Box p={4}>
            <Typography variant="h4">People to click</Typography>
            <ButtonGroup
              orientation="vertical"
              aria-label="vertical outlined button group"
            >

              {initialNames.map(({ name }, index ) => {
                return (
                  <Link key={name} to="/api/count">
                  <Button key={name} onClick={handleClick} type="submit">{name}</Button>
                  </Link>
                
                );
              })}
            </ButtonGroup>
          </Box>
        </Paper>
      </Container>
    </Box>
    </BrowserRouter>
  </>);
}

export default App;
