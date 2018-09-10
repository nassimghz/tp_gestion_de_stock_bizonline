/* jshint esversion : 6 */
const appClientConnectDB = (function app() {
    "use strict";
    var domList, inputname, inputprice, inputdescription, inputmarque,  productToDelete = [];

    
    
    
    const doAjax = function doAjax(url, method, callback, data) {
        try {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            data = data ? JSON.stringify(data) : null;
            if (method.toLowerCase() === "post") {
                if (!data) throw new Error('bad call');
            }
            xhr.onload = evt => callback(evt.target.response || evt.srcElement.response);
            xhr.send(data);
        } catch (err) {
            console.log(err);
        }
    };


    const createProduct = function createProduct(e) {
        e.preventDefault();
        const url = "http://localhost:5593/produit";
        doAjax(url, "POST", res => {
            console.log(JSON.parse(res));
        }, {
            name: inputname.value,
            price: inputprice.value,
            description: inputdescription.value,
            marque: inputmarque.value
        });
    };

    const getProduct = function getProduct() {
        const url = "http://localhost:5593/produit";
        doAjax(url, "GET", res => {
            console.log(JSON.parse(res));
            displayProduct(JSON.parse(res));
        });
    };

    const displayProduct = function displayProduct(productList) {
        domList.innerHTML = ""; //la liste d'user vide est est initialisé
        productList.forEach(product => { 
            let box = document.createElement("input"); //creation d'un input, li et span
            let li = document.createElement("li");
            let span = document.createElement("span");            
            box.type = "checkbox";
            //le type de l'input est une checkbox
            box.id = `product_${product.id}`;
            box.onchange = prepareProductDelete;
            span.textContent = `${product.marque} - ${product.nom} ${product.description} - ${product.prix}€ `;
            li.className = "item product";
            li.appendChild(box);
            li.appendChild(span);
            domList.appendChild(li);
        });
    };
    
    

    const removeProduct = function removeProduct(res) {
        const url = "http://localhost:5593/produit";
        console.log(productToDelete);
        doAjax(url, "DELETE", res => {
            console.log(JSON.parse(res));
            getProduct();
        }, {
            productIds: productToDelete
        });

    };

    const prepareProductDelete = function prepareProductDelete(e) {
        const id = Number(this.id.split("_")[1]);
        if (this.checked) { // si le checkbox est checked
            // pousser l'id courant dans le tableau d'ids à supprimer
            productToDelete.push(id);
        } else { // si le checkbox n'est pas checked
            // trouver le numéro de case de l'id qu'on vient de déselectionner
            let index = productToDelete.findIndex(v => v === id);
            productToDelete.splice(index, 1); // supprimer l'id du tableau d'ids à supprimer
        }
        // console.log("_(0.v.0)_ # usersToDelete =>");
        console.log(productToDelete);
    };

    //    const editProduct = function ediProduct(id) {
    //    doAjax("http://localhost:5503/produit/", "PATCH", (res) =>{
    //      // RETOUR DE L APPEL AJAX
    //      setFormMode("create"); // retour du form en mode create
    //      getPr(); // récupère la liste d'users mise à jour
    //
    //    }); // récupérer les valeurs actuelles du form




    const start = function start() {
        document.getElementById("btn_get_product").onclick =  getProduct;
        document.getElementById("btn_del_product").onclick = removeProduct;
        domList = document.getElementById("list_product");
        inputname = document.getElementById("new_product_name");
        inputprice = document.getElementById("new_product_price");
        inputdescription = document.getElementById("new_product_description");
        inputmarque = document.getElementById("new_product_marque");
        document.getElementById("new_product_btn").onclick = createProduct;
    };

    window.addEventListener("DOMContentLoaded", start);

}());
