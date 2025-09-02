const express = require('express');
const app = express();

app.use(express.json())

const PORT = 9000;
const secret = ["CPE#1","CPE#2","CPE#3","CPE#4","CPE#5","CPE#6","CPE#7","CPE#8"];

const ip = (req, res) =>  {

  if (req.socket.remoteAddress == "::1") {
    return req.socket.remoteAddress;
  }
  return req.socket.remoteAddress.split(":")[3];
}

app.get('/', (req, res) => {
  res.status(200).json({status: 'ok', ip: ip(req, res)});
});


app.post('/', (req, res) => {
  id = req.body?.id;
  let result = "";
  
  if (secret.includes(id)) {
    result = Buffer.from(secret[secret.indexOf(id)], "utf8").toString("base64");
  }
  console.log(id, secret.indexOf(id), result, ip(req, res));
  res.status(200).json({status: 'ok', code: result, ip: ip(req, res)});
});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});