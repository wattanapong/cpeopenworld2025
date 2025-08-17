const express = require('express');
const app = express();

app.use(express.json())

const PORT = 9000;
const secret = ["CPE#1","CPE#2","CPE#3","CPE#4","CPE#5","CPE#6","CPE#7","CPE#8"];
app.get('/', (req, res) => {
  res.status(200).json({status: 'ok'});
});


app.post('/', (req, res) => {
  id = req.body?.id;
  let result = ""
  
  if (secret.includes(id)) {
    result = Buffer.from(secret[secret.indexOf(id)], "utf8").toString("base64");
  }
  console.log(id, secret.indexOf(id), result);
  res.status(200).json({status: 'ok', code: result});
});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});