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

function getRandomNames() {
  
  var arrayNames = ["Luis Florez", "David Ampudia", "Joel Arias", "María Zambrano", "Juan Valencia", "Mateo Quintana", "Anthony Prieto", "William Escudero", "Christopher Bravo", "Roberto Calle", "Jayden Doe", "Andrew Smith", "Joseph Atilano", "Diana Brand"];
  let jsonNamesArray: nameType[] = [];
  for (let i = 0; i < Math.floor(Math.random() * (8 - 5 + 1) + 5); i++) {
    var name = arrayNames[Math.floor(Math.random() * arrayNames.length)];
    let element: nameType = { name: name, count: 0 }
    jsonNamesArray[i] = element;

  }
  return jsonNamesArray;

}

app.get('/api', (req, res) => {
  res.json(getRandomNames());
});

app.post('/count', (req, res) => {
  let dataFromClient: nameType[] = req.body;
  let updatedData: string = "";
  let dataFromClientString: string = "";
  dataFromClient.map(({ name, count }) => {
    return dataFromClientString += name + ": " + count + '\r\n';
  })

  fs.readFile("server/counter.txt", "utf-8", (err: string, data: string) => {
    if (err) { console.log(err) }

    let dataLines: string[] = data.split('\r\n');
    let dataFromClientLines: string[] = dataFromClientString.split('\r\n');

    dataFromClientLines.forEach(dataClientLine => {
      let name: string = dataClientLine.split(": ")[0];
      let count: number = parseInt(dataClientLine.split(": ")[1]);
      if (data.match(name) === null) {
        fs.appendFile('server/counter.txt', name + ": " + count + '\r\n', function (err: string) {
          if (err) { console.log(err) }
        })
      }
    });

    let changed: string = "";
    dataLines.forEach((line) => {
      dataFromClientLines.forEach(dataClientLine => {
        let name: string = dataClientLine.split(": ")[0];
        let count: number = parseInt(dataClientLine.split(": ")[1]);
        if (line.includes(name + ": " + (count - 1))) {
          changed = line.replace(line, dataClientLine);
          updatedData = dataLines.join('\r\n').replace(line, changed);
          fs.writeFile('server/counter.txt', updatedData, function (err: string) {
            if (err) { console.log(err) }
            return;
          })

        }
      });

    });

  });
  res.send("ok");
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}/api`);
});