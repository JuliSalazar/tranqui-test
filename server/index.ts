import express from 'express';

const app = express();
const port = 3333;
const bp = require('body-parser');
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

var base = [
  {
    "name": "Luis Florez"
  },
  {
    "name": "David Castaño"
  }, {
    "name": "Joel Arias"
  }];
app.get('/api', (req, res) => {
  res.json(base);
});
app.post('/api/count',(req, res) => {
  /* let data = {name: req.body.name}; */
console.log(req.body);

});

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