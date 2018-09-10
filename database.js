/* jshint esversion : 6 */
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'gestion_stock',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});


//se connecte a la BBD
connection.connect((err) => {
    if (!err)
        console.log('Connection a la BDD réussie');
    else
        console.log('Non connectée à la BDD /n Erreur ' + JSON.stringify(err));
});

const end = () => connection.end();


// fonction qui recupère les données produit de la BDD
const getProduct = (id, clbk) => {
    console.log('jsuis la');
    var sql;
    if (id && !isNaN(id)) {
        sql = "SELECT * FROM produit WHERE id = ?";
    } else {
        sql = "SELECT * FROM produit";
    }
    console.log(sql);
    connection.query(sql, [id], (error, results, fields) => {
        if (error) throw error;
        console.log(results);
        clbk(results);
    });
};


// fonction qui recupère les donnée inseré par le client puis les intègres à la BDD
const createProduct = (clbk, data) => {
    const q = "INSERT INTO produit (nom, marque, prix, description) VALUES (?, ?, ?, ?)";
    const payload = [data.name, data.marque, data.price, data.description ];
    connection.query(q, payload, (err, res, cols) => {
        if (err) return clbk(err, null);
        return clbk(null, res)
    });
};

//const editProduct = function editProduct(clbk, product) {
//        const q = "UPDATE produit SET nom = ?, prix = ?, description = ? WHERE id = ?";
//        const payload = [produit.name, produit.prix, produit.description, produit.id];
//        connection.query(q, payload, function (err, res, fields) {
//            // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
//            if (err) return clbk(err, null);
//            return clbk(null, res);
//        });
//    };

// fonction qui supprime les données de la BDD
const removeProduct = (clbk, res) => {
    const del = "DELETE FROM produit WHERE id = ?";
    var id = res.productIds;
    id.forEach(function (id) {
        connection.query(del, [id], (err, data) => {
            if (err) return clbk(err, null);
            return clbk(null, res)
        });
    });
};


//module qui exporte les fonctions vers index.js
module.exports = {
    createProduct,
    getProduct,
    removeProduct,
    end, // raccourci es6 => si la clé est égale à la valeur   
};
