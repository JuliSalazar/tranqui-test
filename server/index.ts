import express from 'express';

const app = express();
const port = 3333;
const bp = require('body-parser');
var fs = require('fs');
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

type nameType = {
  name: string,
  count: number
};

var base: nameType[] = [
  {
    name: "Luis Florez",
    count: 0
  },
  {
    name: "David Ampudia",
    count: 0
  }, {
    name: "Joel Arias",
    count: 0
  }];

app.get('/api', (req, res) => {
  res.json(base);
});

app.post('/api/count', (req, res) => {
  let dataFromClient: nameType[] = req.body;
  let updatedData: string = "";

  fs.readFile("server/counter.txt", "utf-8", (err: string, data: string) => {
    if (err) { console.log(err) }
    let dataLines = data.split('\r\n');
    let changed: string = "";

    let newName = false;

    dataFromClient.forEach(element => {
      let name: string = element.name;
      let count: number = element.count;
      console.log(count);
      dataLines.forEach((line, index) => {

//array filter? why only 6 updates
        if (line.includes(name) && count.toString() !== line.split(': ')[1]) {

          changed = line.replace(line.split(': ')[1], count.toString());
          updatedData = dataLines.join('\r\n').replace(line, changed);
          fs.writeFile('server/counter.txt', updatedData, function (err: string) {
            if (err) { console.log(err) }
            console.log("Overwrited data");
          })
        } else if (line.split(': ')[0] !== name) {
          console.log("DIF" + line);

          /* fs.appendFile('server/counter.txt', name+": "+count+'\r\n', function (err: string) {
            if (err) { console.log(err) }
            console.log("New Data");
          })  */
        }
      });
    });
    /*  if(newName){
 
       
     } */

  });
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});