import { Container, CssBaseline, Paper, Typography, ButtonGroup, Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';

window.onload = (event) => {
  console.log('The page has fully loaded');
};

function App() {

  const [initialNames, setInitialNames] = React.useState([]);

  useEffect(() => {
    const loadInitialData = async () => {
      const response = await fetch('/api');
      let json = await response.text();
      let array = JSON.parse(json);
      setInitialNames(array);
    };
    loadInitialData();
  }, []);
  const sendData = async () => {
    const request = await fetch('/api', {
      method: 'POST',
      body: JSON.stringify({ name: 'kitten'})
    });
  };
  const handleClick = () => {
  sendData();
  }

  return (<>
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
        
              {initialNames.map(({ name }) => {
                return <Button key={name} formMethod="POST" onClick={handleClick}>{name}</Button>
              })}
            </ButtonGroup>
          
          </Box>
        </Paper>
      </Container>
    </Box>
  </>);
}

export default App;
