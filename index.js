/* jshint esversion : 6 */

const express = require("express");
const app = express();
const path = require('path');
const port = 5593;
const database = require("./database.js");
//definir un dossier pour fichiers statiques (html, css, js..)

app.use(express.json({
    extended: false
}));

app.use(express.static(__dirname + '/public', {
    extensions: ['html']
}));


app.post('/produit', (req, res) => {
    database.createProduct((err, dataset) => {
        res.send(dataset);
    }, req.body);
});

app.get('/produit', (req, res) => {
    database.getProduct(null, (products) => {
        res.send(products);
    })
});

app.delete('/produit', function (req, res) {
    database.removeProduct((err, dataset) => {
        res.send(dataset);
    }, req.body);
});





//app.patch('/user', (req, res) => {
//    database.editProduct((err, dataset) => {
//        res.send(dataset);
//    }, req.body); 
//});

app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});


























