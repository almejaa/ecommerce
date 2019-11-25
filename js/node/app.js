const express = require('express');
const fs = require('fs')

// Set up the express app
const app = express();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// get all todos
app.get('/buy/all', (req, res) => {
  const jsonString = fs.readFileSync('./buy.json')
  const buy = JSON.parse(jsonString)

res.status(200).send(buy);
});

app.get('/cartinfo/all', (req, res) => {
  const jsonString = fs.readFileSync('./carti.json')
  const cartinfo = JSON.parse(jsonString)

res.status(200).send(cartinfo);
});

app.get('/categories/all', (req, res) => {
  const jsonString = fs.readFileSync('./cat.json')
  const categories = JSON.parse(jsonString)

res.status(200).send(categories);
});

app.get('/categoriesinfo/all', (req, res) => {
  const jsonString = fs.readFileSync('./cati.json')
  const categoriesinfo = JSON.parse(jsonString)

res.status(200).send(categoriesinfo);
});

app.get('/product/all', (req, res) => {
  const jsonString = fs.readFileSync('./prod.json')
  const categories = JSON.parse(jsonString)

res.status(200).send(product);
});

app.get('/productinfo/all', (req, res) => {
  const jsonString = fs.readFileSync('./prodi.json')
  const productinfo = JSON.parse(jsonString)

res.status(200).send(productinfo);
});

app.get('/publish/all', (req, res) => {
  const jsonString = fs.readFileSync('./publish.json')
  const publish = JSON.parse(jsonString)

res.status(200).send(publish);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});