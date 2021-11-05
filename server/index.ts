import express from 'express';
import { env } from 'process';

const app = express();
const port = 3333;

var base = [
  {"name": "Luis Florez"
},
  {"name": "David Castaño"},{"name": "Joel Arias"}];
app.get('/api', (req, res) => {
 res.send(base);
});

/* app.get('/api:id', (req, res) => {
  res.send(base);
 }); */



/* var fs = require('fs');
fs.readFile("server/counter.txt", "utf-8", (err: string, data: string) => {
  if (err) { console.log(err) }
  console.log(data);
});

fs.appendFile('server/counter.txt', '\r\nnew data', function (err: string) {
  if (err) { console.log(err) }
  console.log("Successfully Written to File.");
}) */



app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});