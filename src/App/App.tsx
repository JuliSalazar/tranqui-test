import { Container, CssBaseline, Paper, Typography, ButtonGroup, Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { BrowserRouter, Link } from "react-router-dom";

type nameType = {
  name: string,
  count: number
};

function App() {
  const [initialNames, setInitialNames] = React.useState<nameType[]>([]);

  useEffect(() => {
    const loadInitialData = async () => {
      const response = await fetch('/api');
      let json = await response.text();
      let array = JSON.parse(json);
      setInitialNames(array);
    };
    loadInitialData();
     
  }, []);

  const handleClick = (index: number) => {

    initialNames[index].count = initialNames[index].count + 1;
    const postData = async () => {
      const response = await fetch(`/api/count`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(initialNames),
      })
      return await console.log(response);
    }
    postData();
    
    console.log("clicked")
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

                {initialNames.map(({ name }, index) => {
                  return (
                    <Button key={index} variant="contained" color="primary" onClick={() => { handleClick(index) }}>{name}</Button>

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
