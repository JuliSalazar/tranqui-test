import { Container, CssBaseline, Paper, Typography, ButtonGroup, Button  } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';


/* window.onload = (event) => {
  console.log('The page has fully loaded');
};
 */
const buttons = [
  <Button key="one">One</Button>,
  <Button key="two">Two</Button>,
  <Button key="three">Three</Button>,
];

function App() {
  useEffect(() => {
    fetch('http://localhost:3000/api')
    .then(res => {
        console.log(res.json());
    })

  }, []);

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
              {buttons}
            </ButtonGroup>
          </Box>
        </Paper>
      </Container>
    </Box>
  </>);
}

export default App;
